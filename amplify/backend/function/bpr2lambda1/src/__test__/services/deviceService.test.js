import { deviceServices } from '../../code/services/deviceService';
import {
  DynamoDBClient,
  PutItemCommand,
  GetItemCommand,
  DeleteItemCommand,
  UpdateItemCommand,
  QueryCommand,
  ScanCommand,
} from '@aws-sdk/client-dynamodb';
import { marshall } from '@aws-sdk/util-dynamodb';
import { BadRequestError, DynamoDBError, NotFoundError } from '../../code/helpers/apiError';

jest.mock('@aws-sdk/client-dynamodb');

// Mock the v4 method to simulate a successful generation of a UUID
jest.mock('uuid', () => ({
  v4: jest.fn().mockReturnValue('12345'),
}));

const mockSend = jest.fn();
DynamoDBClient.prototype.send = mockSend;

describe('deviceServices', () => {
  afterEach(() => {
    mockSend.mockClear();
  });

  describe('createDevice', () => {
    it('should create a device if it does not already exist for the user', async () => {
      // Mock the DynamoDB send method for GetItemCommand to simulate a non-existing device
      mockSend.mockResolvedValueOnce({ Items: [] });

      // Mock the DynamoDB send method for PutItemCommand
      mockSend.mockResolvedValueOnce({});

      const device = {
        deviceId: '12345',
        name: 'Test Device',
      };

      const userId = 'user123';

      const result = await deviceServices.createDevice(device, userId);

      // Expect the DynamoDB client to have been called with GetItemCommand and PutItemCommand
      expect(mockSend).toHaveBeenCalledWith(expect.any(QueryCommand));
      expect(mockSend).toHaveBeenCalledWith(expect.any(PutItemCommand));

      // Expect the result to be the created device
      expect(result).toEqual({
        id: expect.any(String),
        deviceId: '12345',
        name: 'Test Device',
        userId: 'user123',
      });
    });

    it('should throw a BadRequestError if the device already exists for the user', async () => {
      // Mock the DynamoDB query method for QueryCommand to simulate an existing device
      mockSend.mockResolvedValueOnce({ Items: [marshall({ deviceId: 'existingDeviceId', userId: 'user123' })] });

      const device = {
        deviceId: 'existingDeviceId',
        name: 'Existing Device',
        userId: 'user123',
      };

      const userId = 'user123';

      // Call the createDevice function and expect it to throw a BadRequestError
      await expect(deviceServices.createDevice(device, userId)).rejects.toThrowError(BadRequestError);
    });

    it('should throw a DynamoDBError if the DynamoDB client throws an error', async () => {
      // Mock the DynamoDB send method for QueryCommand to simulate a DynamoDB error
      mockSend.mockRejectedValueOnce(new Error('DynamoDB error'));

      const device = {
        deviceId: '12345',
        name: 'Test Device',
      };

      const userId = 'user123';

      // Call the createDevice function and expect it to throw a DynamoDBError
      await expect(deviceServices.createDevice(device, userId)).rejects.toThrowError(DynamoDBError);
    });

    it('should throw a DynamoDBError if the thrown exception is not an instance of ApiError', async () => {
      // Mock the DynamoDB send method for QueryCommand to simulate a non-ApiError exception

      mockSend.mockRejectedValueOnce(new Error('DynamoDB error'));

      const device = {
        deviceId: '12345',
        name: 'Test Device',
      };

      const userId = 'user123';

      // Call the createDevice function and expect it to throw a DynamoDBError
      await expect(deviceServices.createDevice(device, userId)).rejects.toThrowError(DynamoDBError);
    });
  });

  describe('updateDeviceById', () => {
    it('should update a device if it belongs to the user and the new deviceId does not exist', async () => {
      // Device to update
      const deviceToUpdate = {
        id: 'deviceIdToUpdate',
        deviceId: 'deviceToUpdate',
        name: 'Device To Update',
        userId: 'user123',
      };

      // Mock the DynamoDb send method for a GetItemCommand to simulate a successful get
      mockSend.mockResolvedValueOnce({
        Item: marshall(deviceToUpdate),
      });

      // Mock the DynamoDB send method for a QueryCommand to simulate a non-existing deviceId
      mockSend.mockResolvedValueOnce({ Items: [] });

      // Mock the DynamoDB send method for UpdateItemCommand to simulate a successful update
      mockSend.mockResolvedValueOnce({
        Attributes: marshall(deviceToUpdate),
      });

      const deviceIdToUpdate = 'deviceIdToUpdate';
      const userId = 'user123';

      const result = await deviceServices.updateDeviceById(deviceIdToUpdate, userId, deviceToUpdate);

      // Expect the DynamoDB client to have been called with UpdateItemCommand and QueryCommand
      expect(mockSend).toHaveBeenCalledWith(expect.any(GetItemCommand));
      expect(mockSend).toHaveBeenCalledWith(expect.any(QueryCommand));
      expect(mockSend).toHaveBeenCalledWith(expect.any(UpdateItemCommand));

      // Expect the result to be the updated device
      expect(result).toEqual(deviceToUpdate);
    });

    it('should throw a NotFoundError if the device does not belong to the user with id', async () => {
      // Device to update
      const deviceToUpdate = {
        id: 'deviceIdToUpdate',
        deviceId: 'deviceToUpdate',
        name: 'Device To Update',
        userId: 'user123',
      };

      // Mock the DynamoDB send method for QueryCommand to simulate an existing device with the new deviceId
      mockSend.mockResolvedValueOnce({
        Items: [marshall(deviceToUpdate)],
      });

      const deviceIdToUpdate = 'deviceIdToUpdate';

      const userId = 'user123';

      await expect(deviceServices.updateDeviceById(deviceIdToUpdate, userId, deviceToUpdate)).rejects.toThrowError(
        NotFoundError,
      );
    });

    it('should throw a BadRequestError if the deviceId is already taken', async () => {
      // Device to update
      const deviceToUpdate = {
        id: 'deviceIdToUpdate',
        deviceId: 'deviceToUpdate',
        name: 'Device To Update',
        userId: 'user123',
      };

      // Mock the DynamoDB send method for GetItemCommand to return a successful get
      mockSend.mockResolvedValueOnce({
        Item: marshall(deviceToUpdate),
      });

      // Mock the DynamoDB send method for QueryCommand to return a device that belongs to the user
      mockSend.mockResolvedValueOnce({
        Items: [marshall(deviceToUpdate)],
      });

      const deviceIdToUpdate = 'deviceIdToUpdate';

      const userId = 'user123';

      await expect(deviceServices.updateDeviceById(deviceIdToUpdate, userId, deviceToUpdate)).rejects.toThrowError(
        BadRequestError,
      );
    });

    it('should throw a NotFoundError if the device does not exist', async () => {
      // Mock the DynamoDB send method for UpdateItemCommand to simulate a non-existing device
      mockSend.mockResolvedValueOnce({});
      const deviceIdToUpdate = 'nonExistingDeviceId';
      const userId = 'user123';
      const updatedDevice = {
        deviceId: 'updatedDeviceId',
        name: 'Updated Device',
      };

      // Call the updateDeviceById function and expect it to throw a NotFoundError
      await expect(deviceServices.updateDeviceById(deviceIdToUpdate, userId, updatedDevice)).rejects.toThrowError(
        NotFoundError,
      );
    });

    it('should throw a DynamoDBError if the DynamoDB client throws an error', async () => {
      // Mock the DynamoDB send method for UpdateItemCommand to simulate a DynamoDB error
      mockSend.mockRejectedValueOnce(new Error('DynamoDB error'));

      const deviceIdToUpdate = 'deviceIdToUpdate';
      const userId = 'user123';
      const updatedDevice = {
        deviceId: 'updatedDeviceId',
        name: 'Updated Device',
      };

      // Call the updateDeviceById function and expect it to throw a DynamoDBError
      await expect(deviceServices.updateDeviceById(deviceIdToUpdate, userId, updatedDevice)).rejects.toThrowError(
        DynamoDBError,
      );
    });

    it('should throw a DynamoDBError if the thrown exception is not an instance of ApiError', async () => {
      // Mock the DynamoDB send method for UpdateItemCommand to simulate a non-ApiError exception
      mockSend.mockRejectedValueOnce(new Error('DynamoDB error'));

      const deviceIdToUpdate = 'deviceIdToUpdate';
      const userId = 'user123';
      const updatedDevice = {
        deviceId: 'updatedDeviceId',
        name: 'Updated Device',
      };

      // Call the updateDeviceById function and expect it to throw a DynamoDBError
      await expect(deviceServices.updateDeviceById(deviceIdToUpdate, userId, updatedDevice)).rejects.toThrowError(
        DynamoDBError,
      );
    });
  });

  describe('getDeviceById', () => {
    it('should get a device if it belongs to the user', async () => {
      // Mock the DynamoDB send method for GetItemCommand to simulate a successful get
      mockSend.mockResolvedValueOnce({
        Items: [
          marshall({
            id: 'deviceIdToGet',
            deviceId: 'deviceToGet',
            name: 'Device To Get',
            userId: 'user123',
          }),
        ],
      });

      const deviceIdToGet = 'deviceIdToGet';
      const userId = 'user123';

      const result = await deviceServices.getDeviceInformationForDeviceId(deviceIdToGet, userId);

      // Expect the DynamoDB client to have been called with QueryCommand
      expect(mockSend).toHaveBeenCalledWith(expect.any(QueryCommand));

      // Expect the result to be the device
      expect(result).toEqual({
        id: 'deviceIdToGet',
        deviceId: 'deviceToGet',
        name: 'Device To Get',
        userId: 'user123',
      });
    });

    it('should throw a NotFoundError if the device does not belong to the user', async () => {
      // Mock the DynamoDB send method for GetItemCommand to simulate a non-existing device
      mockSend.mockResolvedValueOnce({ Items: [] });

      const deviceIdToGet = 'deviceIdToGet';
      const userId = 'user123';

      // Call the getDeviceById function and expect it to throw a NotFoundError
      await expect(deviceServices.getDeviceInformationForDeviceId(deviceIdToGet, userId)).rejects.toThrowError(
        NotFoundError,
      );
    });

    it('should throw a DynamoDBError if the DynamoDB client throws an error', async () => {
      // Mock the DynamoDB send method for GetItemCommand to simulate a DynamoDB error
      mockSend.mockRejectedValueOnce(new Error('DynamoDB error'));

      const deviceIdToGet = 'deviceIdToGet';
      const userId = 'user123';

      // Call the getDeviceById function and expect it to throw a DynamoDBError
      await expect(deviceServices.getDeviceInformationForDeviceId(deviceIdToGet, userId)).rejects.toThrowError(
        DynamoDBError,
      );
    });

    it('should throw a DynamoDBError if the thrown exception is not an instance of ApiError', async () => {
      // Mock the DynamoDB send method for GetItemCommand to simulate a non-ApiError exception
      mockSend.mockRejectedValueOnce(new Error('DynamoDB error'));

      const deviceIdToGet = 'deviceIdToGet';
      const userId = 'user123';

      // Call the getDeviceById function and expect it to throw a DynamoDBError
      await expect(deviceServices.getDeviceInformationForDeviceId(deviceIdToGet, userId)).rejects.toThrowError(
        DynamoDBError,
      );
    });
  });

  describe('deleteDeviceById', () => {
    it('should delete a device if it belongs to the user', async () => {
      // Mock the DynamoDB send method for GetItemCommand to simulate a successful get
      mockSend.mockResolvedValueOnce({
        Item: marshall({
          id: 'deviceIdToDelete',
          deviceId: 'deviceToDelete',
          name: 'Device To Delete',
          userId: 'user123',
        }),
      });

      // Mock the DynamoDB send method for DeleteItemCommand to simulate a successful delete
      mockSend.mockResolvedValueOnce({});

      const deviceIdToDelete = 'deviceIdToDelete';
      const userId = 'user123';

      await deviceServices.deleteDeviceById(deviceIdToDelete, userId);

      // Expect the DynamoDB client to have been called with GetItemCommand and DeleteItemCommand
      expect(mockSend).toHaveBeenCalledWith(expect.any(GetItemCommand));
      expect(mockSend).toHaveBeenCalledWith(expect.any(DeleteItemCommand));
    });

    it('should throw a NotFoundError if the device does not belong to the user', async () => {
      // Mock the DynamoDB send method for GetItemCommand to simulate a non-existing device
      mockSend.mockResolvedValueOnce({ Items: [] });

      const deviceIdToDelete = 'deviceIdToDelete';
      const userId = 'user123';

      // Call the deleteDeviceById function and expect it to throw a NotFoundError
      await expect(deviceServices.deleteDeviceById(deviceIdToDelete, userId)).rejects.toThrowError(NotFoundError);
    });

    it('should throw a DynamoDBError if the DynamoDB client throws an error', async () => {
      // Mock the DynamoDB send method for GetItemCommand to simulate a DynamoDB error
      mockSend.mockRejectedValueOnce(new Error('DynamoDB error'));

      const deviceIdToDelete = 'deviceIdToDelete';
      const userId = 'user123';

      // Call the deleteDeviceById function and expect it to throw a DynamoDBError
      await expect(deviceServices.deleteDeviceById(deviceIdToDelete, userId)).rejects.toThrowError(DynamoDBError);
    });

    it('should throw a DynamoDBError if the thrown exception is not an instance of ApiError', async () => {
      // Mock the DynamoDB send method for GetItemCommand to simulate a non-ApiError exception
      mockSend.mockRejectedValueOnce(new Error('DynamoDB error'));

      const deviceIdToDelete = 'deviceIdToDelete';
      const userId = 'user123';

      // Call the deleteDeviceById function and expect it to throw a DynamoDBError
      await expect(deviceServices.deleteDeviceById(deviceIdToDelete, userId)).rejects.toThrowError(DynamoDBError);
    });
  });

  describe('getCurrentReadingForDeviceId', () => {
    it('should get a current reading if it belongs to the user', async () => {
      // Mock the DynamoDB send method for QueryCommand to simulate a successful query
      mockSend.mockResolvedValueOnce({
        Items: [
          marshall({
            deviceId: 'deviceToGet',
            id: 'deviceIdToGet',
            userId: 'user123',
            name: 'Device To Get',
          }),
        ],
      });

      // Mock the DynamoDB send method for QueryCommand to simulate a successful query
      mockSend.mockResolvedValueOnce({
        Items: [
          marshall({
            id: 'deviceIdToGet',
            deviceId: 'deviceToGet',
            light: '100',
            temperature: '25',
            humidity: '50',
            ph: '7',
            waterTemp: '25',
          }),
        ],
      });

      const deviceIdToGet = 'deviceIdToGet';
      const userId = 'user123';

      const result = await deviceServices.getCurrentReadingForDeviceId(deviceIdToGet, userId);

      // Expect the DynamoDB client to have been called with QueryCommand
      expect(mockSend).toHaveBeenCalledWith(expect.any(QueryCommand));

      // Expect the result to be the device
      expect(result).toEqual({
        id: 'deviceIdToGet',
        deviceId: 'deviceToGet',
        light: '100',
        temperature: '25',
        humidity: '50',
        ph: '7',
        waterTemp: '25',
      });
    });

    it('should throw a NotFoundError if the device does not belong to the user', async () => {
      // Mock the DynamoDB send method for QueryCommand to simulate a non-existing device
      mockSend.mockResolvedValueOnce({ Items: [] });

      const deviceIdToGet = 'deviceIdToGet';
      const userId = 'user123';

      // Call the getCurrentReadingForDeviceId function and expect it to throw a NotFoundError
      await expect(deviceServices.getCurrentReadingForDeviceId(deviceIdToGet, userId)).rejects.toThrowError(
        NotFoundError,
      );
    });

    it('should throw a DynamoDBError if the DynamoDB client throws an error', async () => {
      // Mock the DynamoDB send method for QueryCommand to simulate a DynamoDB error
      mockSend.mockRejectedValueOnce(new Error('DynamoDB error'));

      const deviceIdToGet = 'deviceIdToGet';
      const userId = 'user123';

      // Call the getCurrentReadingForDeviceId function and expect it to throw a DynamoDBError
      await expect(deviceServices.getCurrentReadingForDeviceId(deviceIdToGet, userId)).rejects.toThrowError(
        DynamoDBError,
      );
    });

    it('should throw a DynamoDBError if the thrown exception is not an instance of ApiError', async () => {
      // Mock the DynamoDB send method for QueryCommand to simulate a non-ApiError exception
      mockSend.mockRejectedValueOnce(new Error('DynamoDB error'));

      const deviceIdToGet = 'deviceIdToGet';
      const userId = 'user123';

      // Call the getCurrentReadingForDeviceId function and expect it to throw a DynamoDBError
      await expect(deviceServices.getCurrentReadingForDeviceId(deviceIdToGet, userId)).rejects.toThrowError(
        DynamoDBError,
      );
    });
  });

  describe('getHistoricalReadingsForDeviceId', () => {
    it('should get a historical reading if it belongs to the user', async () => {
      // Mock the DynamoDB send method for QueryCommand to simulate a successful query
      mockSend.mockResolvedValueOnce({
        Items: [
          marshall({
            deviceId: 'deviceToGet',
            id: 'deviceIdToGet',
            userId: 'user123',
            name: 'Device To Get',
          }),
        ],
      });

      // Mock the DynamoDB send method for QueryCommand to simulate a successful query
      mockSend.mockResolvedValueOnce({
        Items: [
          marshall({
            id: 'deviceIdToGet',
            deviceId: 'deviceToGet',
            light: '100',
            temperature: '25',
            humidity: '50',
            ph: '7',
            waterTemp: '25',
            timestamp: 123456789,
          }),
          marshall({
            id: 'deviceIdToGet',
            deviceId: 'deviceToGet',
            light: '100',
            temperature: '25',
            humidity: '50',
            ph: '7',
            waterTemp: '25',
            timestamp: 123456789,
          }),
        ],
        Count: 1,
        LastEvaluatedKey: marshall({
          deviceId: 'deviceIdToGet',
        }),
      });

      const deviceIdToGet = 'deviceIdToGet';
      const userId = 'user123';
      const start = 1610000000000;
      const end = 1620000000000;

      const result = await deviceServices.getHistoricalReadingsForDeviceId(deviceIdToGet, userId, start, end);

      // Expect the DynamoDB client to have been called with QueryCommand
      expect(mockSend).toHaveBeenCalledWith(expect.any(QueryCommand));

      // Expect the result to be the device
      expect(result).toEqual({
        devices: [
          {
            id: 'deviceIdToGet',
            deviceId: 'deviceToGet',
            light: '100',
            temperature: '25',
            humidity: '50',
            ph: '7',
            waterTemp: '25',
            timestamp: 123456789,
          },
          {
            id: 'deviceIdToGet',
            deviceId: 'deviceToGet',
            light: '100',
            temperature: '25',
            humidity: '50',
            ph: '7',
            waterTemp: '25',
            timestamp: 123456789,
          },
        ],
        count: 1,
        lastEvaluatedKey: {
          deviceId: 'deviceIdToGet',
        },
      });
    });

    it('should throw a NotFoundError if the device does not belong to the user', async () => {
      // Mock the DynamoDB send method for QueryCommand to simulate a non-existing device
      mockSend.mockResolvedValueOnce({ Items: [] });

      const deviceIdToGet = 'deviceIdToGet';
      const userId = 'user123';

      // Call the getHistoricalReadingsForDeviceId function and expect it to throw a NotFoundError
      await expect(deviceServices.getHistoricalReadingsForDeviceId(deviceIdToGet, userId)).rejects.toThrowError(
        NotFoundError,
      );
    });

    it('should throw a DynamoDBError if the DynamoDB client throws an error', async () => {
      // Mock the DynamoDB send method for QueryCommand to simulate a DynamoDB error
      mockSend.mockRejectedValueOnce(new Error('DynamoDB error'));

      const deviceIdToGet = 'deviceIdToGet';
      const userId = 'user123';

      // Call the getHistoricalReadingsForDeviceId function and expect it to throw a DynamoDBError
      await expect(deviceServices.getHistoricalReadingsForDeviceId(deviceIdToGet, userId)).rejects.toThrowError(
        DynamoDBError,
      );
    });

    it('should throw a DynamoDBError if the thrown exception is not an instance of ApiError', async () => {
      // Mock the DynamoDB send method for QueryCommand to simulate a non-ApiError exception
      mockSend.mockRejectedValueOnce(new Error('DynamoDB error'));

      const deviceIdToGet = 'deviceIdToGet';
      const userId = 'user123';

      // Call the getHistoricalReadingsForDeviceId function and expect it to throw a DynamoDBError
      await expect(deviceServices.getHistoricalReadingsForDeviceId(deviceIdToGet, userId)).rejects.toThrowError(
        DynamoDBError,
      );
    });
  });

  describe('getDeviceIdsForUser', () => {
    it('should get all devices for the user', async () => {
      // Mock the DynamoDB send method for QueryCommand to simulate a successful query returning 3 devices with only id
      mockSend.mockResolvedValueOnce({
        Items: [
          marshall({
            deviceId: 'deviceIdToGet',
          }),
          marshall({
            deviceId: 'deviceIdToGet',
          }),
          marshall({
            deviceId: 'deviceIdToGet',
          }),
        ],
        LastEvaluatedKey: marshall({ deviceId: 'deviceIdToGet' }),
      });

      const userId = 'user123';

      const result = await deviceServices.getDeviceIdsForUser(userId);

      // Expect the DynamoDB client to have been called with QueryCommand
      expect(mockSend).toHaveBeenCalledWith(expect.any(ScanCommand));

      // Expect the result to be the device
      expect(result).toEqual({
        ids: ['deviceIdToGet', 'deviceIdToGet', 'deviceIdToGet'],
        lastEvaluatedKey: {
          deviceId: 'deviceIdToGet',
        },
      });
    });

    it('should throw a NotFoundError if the device does not belong to the user', async () => {
      const userId = 'user123';

      // Call the getDeviceIdsForUser function and expect it to throw a NotFoundError
      await expect(deviceServices.getDeviceIdsForUser(userId)).rejects.toThrowError(NotFoundError);
    });

    it('should throw a DynamoDBError if the DynamoDB client throws an error', async () => {
      // Mock the DynamoDB send method for QueryCommand to simulate a DynamoDB error
      mockSend.mockRejectedValueOnce(new Error('DynamoDB error'));

      const userId = 'user123';

      // Call the getDeviceIdsForUser function and expect it to throw a DynamoDBError
      await expect(deviceServices.getDeviceIdsForUser(userId)).rejects.toThrowError(DynamoDBError);
    });

    it('should throw a DynamoDBError if the thrown exception is not an instance of ApiError', async () => {
      // Mock the DynamoDB send method for QueryCommand to simulate a non-ApiError exception
      mockSend.mockRejectedValueOnce(new Error('DynamoDB error'));

      const userId = 'user123';

      // Call the getDeviceIdsForUser function and expect it to throw a DynamoDBError
      await expect(deviceServices.getDeviceIdsForUser(userId)).rejects.toThrowError(DynamoDBError);
    });
  });
});

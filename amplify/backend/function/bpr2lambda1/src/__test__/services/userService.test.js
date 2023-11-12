import {
  DynamoDBClient,
  PutItemCommand,
  QueryCommand,
  DeleteItemCommand,
  UpdateItemCommand,
  GetItemCommand,
} from '@aws-sdk/client-dynamodb';
import { marshall } from '@aws-sdk/util-dynamodb';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { userServices } from '../../code/services/userService';
import { BadRequestError, DynamoDBError, NotFoundError, UnauthorizedError } from '../../code/helpers/apiError';

// Mock the v4 method to simulate a successful generation of a UUID
jest.mock('uuid', () => ({
  v4: jest.fn().mockReturnValue('12345'),
}));

// Mock the bcrypt compare method
jest.mock('bcrypt');

// Mock the jwt sign method
jest.mock('jsonwebtoken');

// Mock the DynamoDBClient and its methods
jest.mock('@aws-sdk/client-dynamodb');

// Define the DynamoDB mock functions
const mockSend = jest.fn();

// Mock the DynamoDB client
DynamoDBClient.prototype.send = mockSend;

// Mock the jwt sign method to simulate a token
jwt.sign.mockReturnValue('token');

// Define a sample user object for testing
const sampleUser = {
  id: '12345',
  username: 'testuser',
  email: 'testuser@example.com',
  password: 'hashedpassword',
  firstName: 'Test',
  lastName: 'User',
};

describe('userServices', () => {
  afterEach(() => {
    // Clear the mock calls after each test
    mockSend.mockClear();
  });

  describe('should check if a user exists', () => {
    it('should return true if a user with id exists', async () => {
      // Mock the DynamoDB send method for GetItemCommand to simulate an existing user
      mockSend.mockResolvedValueOnce({
        Item: marshall(sampleUser),
      });

      const result = await userServices.checkIfUserWithIdExists(sampleUser.id);

      // Expect the DynamoDB client to have been called and QueryCommand to have been called with any arguments
      expect(mockSend).toHaveBeenCalledWith(expect.any(GetItemCommand));

      // Ensure that the DynamoDB client has been called only once
      expect(mockSend).toHaveBeenCalledTimes(1);
      // Ensure that the checkIfUserWithIdExists function returns true
      expect(result).toBe(true);
    });

    it('should return false if a user with id does not exist', async () => {
      // Mock the DynamoDB send method for GetItemCommand to simulate a nonexistent user
      mockSend.mockResolvedValueOnce({});
      const result = await userServices.checkIfUserWithIdExists(sampleUser.id);

      // Expect the DynamoDB client to have been called and QueryCommand to have been called with any arguments
      expect(mockSend).toHaveBeenCalledWith(expect.any(GetItemCommand));

      // Ensure that the DynamoDB client has been called only once
      expect(mockSend).toHaveBeenCalledTimes(1);
      // Ensure that the checkIfUserWithIdExists function returns false
      expect(result).toBe(false);
    });

    it('should return user if a user with id exists and isReturnSpecified is true', async () => {
      // Mock the DynamoDB send method for GetItemCommand to simulate an existing user
      mockSend.mockResolvedValueOnce({
        Item: marshall(sampleUser),
      });

      const result = await userServices.checkIfUserWithIdExists(sampleUser.id, true);

      // Expect the DynamoDB client to have been called and QueryCommand to have been called with any arguments
      expect(mockSend).toHaveBeenCalledWith(expect.any(GetItemCommand));

      // Ensure that the DynamoDB client has been called only once
      expect(mockSend).toHaveBeenCalledTimes(1);
      // Ensure that the checkIfUserWithIdExists function returns the user
      expect(result).toEqual(sampleUser);
    });

    it('should throw a DynamoDBError if the DynamoDB client throws an error', async () => {
      // Mock the DynamoDB send method for QueryCommand to simulate a DynamoDB error
      mockSend.mockRejectedValueOnce(new Error('DynamoDB error'));

      // Call the checkIfUserWithIdExists function and expect it to throw a DynamoDBError
      await expect(userServices.checkIfUserWithIdExists(sampleUser.id, false)).rejects.toThrowError(DynamoDBError);
    });

    it('should rethrow a thrown exception if it is an instance of ApiError', async () => {
      // Mock the DynamoDB send method for QueryCommand to simulate a BadRequestError
      mockSend.mockRejectedValueOnce(new BadRequestError('Bad request'));

      // Call the checkIfUserWithIdExists function and expect it to throw a BadRequestError
      await expect(userServices.checkIfUserWithIdExists(sampleUser.id, false)).rejects.toThrowError(BadRequestError);
    });
  });

  describe('should query for a user with username', () => {
    it('should return a user if a user with username exists', async () => {
      // Mock the DynamoDB send method for QueryCommand to simulate an existing user
      mockSend.mockResolvedValueOnce({
        Items: [marshall(sampleUser)],
      });

      const result = await userServices.queryForUserWithUsername(sampleUser.username);

      // Expect the DynamoDB client to have been called and QueryCommand to have been called with any arguments
      expect(mockSend).toHaveBeenCalledWith(expect.any(QueryCommand));

      // Ensure that the DynamoDB client has been called only once
      expect(mockSend).toHaveBeenCalledTimes(1);
      // Ensure that the queryForUserWithUsername function returns the user
      expect(result).toEqual(sampleUser);
    });

    it('should return null if a user with username does not exist', async () => {
      // Mock the DynamoDB send method for QueryCommand to simulate a nonexistent user
      mockSend.mockResolvedValueOnce({
        Items: [],
      });

      const result = await userServices.queryForUserWithUsername(sampleUser.username);

      // Expect the DynamoDB client to have been called and QueryCommand to have been called with any arguments
      expect(mockSend).toHaveBeenCalledWith(expect.any(QueryCommand));

      // Ensure that the DynamoDB client has been called only once
      expect(mockSend).toHaveBeenCalledTimes(1);
      // Ensure that the queryForUserWithUsername function returns null
      expect(result).toBeNull();
    });

    it('should return null if no username is provided', async () => {
      const result = await userServices.queryForUserWithUsername(null);

      // Ensure that the DynamoDB client has not been called
      expect(mockSend).not.toHaveBeenCalled();
      // Ensure that the queryForUserWithUsername function returns null
      expect(result).toBeNull();
    });

    it('should rethrow a thrown exception if it is an instance of ApiError', async () => {
      // Mock the DynamoDB send method for QueryCommand to simulate a BadRequestError
      mockSend.mockRejectedValueOnce(new BadRequestError('Bad request'));

      // Call the queryForUserWithUsername function and expect it to throw a BadRequestError
      await expect(userServices.queryForUserWithUsername(sampleUser.username)).rejects.toThrowError(BadRequestError);
    });
  });

  describe('should register a user', () => {
    it('should register a user', async () => {
      // Mock the DynamoDB send method for QueryCommand to simulate a nonexistent user
      mockSend.mockResolvedValueOnce({ Items: [] });

      // Mock the DynamoDB send method for PutItemCommand
      mockSend.mockResolvedValueOnce({});

      // Mock the bcrypt hash method to simulate a successful hashing
      bcrypt.hash.mockResolvedValueOnce('hashedpassword');

      // Call the registerUser function
      const result = await userServices.registerUser(sampleUser);

      // Expect the DynamoDB client to have been called and PutItemCommand to have been called with any arguments
      expect(mockSend).toHaveBeenCalledWith(expect.any(PutItemCommand));

      // Expect the result to contain a token
      expect(result).toHaveProperty('token');
    });

    it('should not register a user if username already exists', async () => {
      // Mock the DynamoDB send method for QueryCommand to simulate an existing user
      mockSend.mockResolvedValueOnce({
        Items: [marshall(sampleUser)],
      });

      // Call the registerUser function and expect it to throw a BadRequestError
      await expect(userServices.registerUser(sampleUser)).rejects.toThrowError(BadRequestError);
    });

    it('should not register a user if the DynamoDB client throws an error', async () => {
      // Mock the DynamoDB send method for QueryCommand to simulate a DynamoDB error
      mockSend.mockRejectedValueOnce(new Error('DynamoDB error'));

      // Call the registerUser function and expect it to throw a DynamoDBError
      await expect(userServices.registerUser(sampleUser)).rejects.toThrowError(DynamoDBError);
    });

    it('should not register a user and should throw a DynamoDBError if the thrown exception is not an instance of ApiError', async () => {
      // Mock the DynamoDB send method for QueryCommand to simulate a nonexistent user
      mockSend.mockResolvedValueOnce({ Items: [] });

      // Mock the bcrypt compare method to simulate a failed comparison
      bcrypt.hash.mockImplementation(() => {
        throw new Error('Bcrypt error');
      });

      // Call the registerUser function and expect it to throw a DynamoDBError
      await expect(userServices.registerUser(sampleUser)).rejects.toThrowError(DynamoDBError);
    });
  });

  describe('should login a user', () => {
    it('should login a user with correct credentials', async () => {
      // Mock the DynamoDB send method for QueryCommand to simulate a user with correct credentials
      mockSend.mockResolvedValueOnce({
        Items: [marshall(sampleUser)],
      });

      // Define the user credentials for login
      const loginCredentials = {
        username: 'testuser',
        password: 'hashedpassword', // Correct password
      };

      // Mock the bcrypt compare method to simulate a successful comparison
      bcrypt.compareSync.mockReturnValue(true);

      // Call the loginUser function
      const result = await userServices.loginUser(loginCredentials);

      // Expect the result to contain a token
      expect(result).toHaveProperty('token');
    });

    it('should not login a user with incorrect password', async () => {
      // Mock the DynamoDB send method for QueryCommand to simulate a user with incorrect credentials
      mockSend.mockResolvedValueOnce({
        Items: [marshall(sampleUser)],
      });

      // Mock the bcrypt compare method to simulate a failed comparison
      bcrypt.compareSync.mockReturnValue(false);

      // Define the user credentials with an incorrect password
      const loginCredentials = {
        username: 'testuser',
        password: 'incorrectpassword', // Incorrect password
      };

      // Call the loginUser function and expect it to throw an UnauthorizedError
      await expect(userServices.loginUser(loginCredentials)).rejects.toThrowError(UnauthorizedError);
    });

    it('should not login a user if the user does not exist', async () => {
      // Mock the DynamoDB send method for QueryCommand to simulate a user that does not exist
      mockSend.mockResolvedValueOnce({ Items: [] });

      // Define the user credentials for a nonexistent user
      const loginCredentials = {
        username: 'nonexistentuser',
        password: 'password123',
      };

      // Call the loginUser function and expect it to throw a NotFoundError
      await expect(userServices.loginUser(loginCredentials)).rejects.toThrowError(BadRequestError);
    });

    it('should throw a new UnauthorizedError if the caught exception is not instance of ApiError', async () => {
      // Mock they DynamoDB send method for QueryCommand to simulate an existing user
      mockSend.mockResolvedValueOnce({
        Items: [marshall(sampleUser)],
      });

      // Mock the bcrypt compare method to simulate a failed comparison
      bcrypt.compareSync.mockImplementation(() => {
        throw new Error('Bcrypt error');
      });

      // Define the user credentials for login
      const loginCredentials = {
        username: 'testuser',
        password: 'hashedpassword', // Correct password
      };

      // Call the loginUser function and expect it to throw a DynamoDBError
      await expect(userServices.loginUser(loginCredentials)).rejects.toThrowError(DynamoDBError);
    });
  });

  describe('should delete a user', () => {
    it('should delete a user', async () => {
      // Mock the DynamoDB send method for DeleteItemCommand
      mockSend.mockResolvedValueOnce({});

      // Call the deleteUserById function
      await userServices.deleteUserById(sampleUser.id);

      // Expect the DynamoDB client to have been called and DeleteItemCommand to have been called with any arguments
      expect(mockSend).toHaveBeenCalledWith(expect.any(DeleteItemCommand));
    });

    it('should not delete a user if the user does not exist', async () => {
      // Mock the DynamoDB send method for QueryCommand to simulate a nonexistent user
      mockSend.mockRejectedValueOnce(new Error('User does not exist'));
      // Call the deleteUserById function and expect it to throw a NotFoundError
      await expect(userServices.deleteUserById('1234234233')).rejects.toThrowError(DynamoDBError);
    });

    it('should not delete a user if the DynamoDB client throws an error', async () => {
      // Mock the DynamoDB send method for DeleteItemCommand to simulate a DynamoDB error
      mockSend.mockRejectedValueOnce(new Error('DynamoDB error'));

      // Call the deleteUserById function and expect it to throw a DynamoDBError
      await expect(userServices.deleteUserById(sampleUser.id)).rejects.toThrowError(DynamoDBError);
    });

    it('should not delete a user and should forward a thrown exception if it is an instance of ApiError', async () => {
      // Mock the DynamoDB send method for DeleteItemCommand to simulate a BadRequestError
      mockSend.mockRejectedValueOnce(new BadRequestError('Bad request'));

      // Call the deleteUserById function and expect it to throw a BadRequestError
      await expect(userServices.deleteUserById(sampleUser.id)).rejects.toThrowError(BadRequestError);
    });

    it('should not delete a user and should throw a DynamoDBError if the thrown exception is not an instance of ApiError', async () => {
      // Mock the DynamoDB send method for DeleteItemCommand to simulate a DynamoDB error
      mockSend.mockRejectedValueOnce(new Error('DynamoDB error'));

      // Call the deleteUserById function and expect it to throw a DynamoDBError
      await expect(userServices.deleteUserById(sampleUser.id)).rejects.toThrowError(DynamoDBError);
    });

    it('should not delete a user if the delete command conditional check fails', async () => {
      // Mock the DynamoDB send method to throw an exception with name equal to ConditionalCheckFailedException
      mockSend.mockRejectedValueOnce({
        name: 'ConditionalCheckFailedException',
      });

      // Call the deleteUserById function and expect it to throw a NotFoundError
      await expect(userServices.deleteUserById(sampleUser.id)).rejects.toThrowError(NotFoundError);
    });
  });

  describe('should update a user', () => {
    it('should update a user', async () => {
      // Mock the DynamoDB send method for QueryCommand to simulate an existing user
      mockSend.mockResolvedValueOnce({
        Item: marshall(sampleUser),
      });
      mockSend.mockResolvedValueOnce({
        Items: [],
      });

      // Define the updated user object
      const updatedUser = {
        id: sampleUser.id,
        username: 'updateduser',
        email: 'updateEmail',
        firstName: 'updatedFirstName',
        lastName: 'updatedLastName',
      };

      // Mock the DynamoDB send method for UpdateItemCommand to simulate a successful update and return the updated user
      mockSend.mockResolvedValueOnce({
        Attributes: marshall(updatedUser),
      });

      // Call the updateUserById function
      await userServices.updateUserById(sampleUser.id, updatedUser);

      // Expect the DynamoDB client to have been called and UpdateItemCommand to have been called with any arguments
      expect(mockSend).toHaveBeenCalledWith(expect.any(GetItemCommand));
      expect(mockSend).toHaveBeenCalledWith(expect.any(QueryCommand));
      expect(mockSend).toHaveBeenCalledWith(expect.any(UpdateItemCommand));
    });

    it('should not update a user if the user does not exist', async () => {
      // Mock the DynamoDB send method for QueryCommand to simulate a nonexistent user
      mockSend.mockResolvedValueOnce({});

      // Define the updated user object
      const updatedUser = {
        id: sampleUser.id,
        username: 'updateduser',
        email: 'updateEmail',
        firstName: 'updatedFirstName',
        lastName: 'updatedLastName',
      };

      // Call the updateUserById function and expect it to throw a BadRequestError
      await expect(userServices.updateUserById(sampleUser.id, updatedUser)).rejects.toThrowError(BadRequestError);
    });

    it('should not update a user if the DynamoDB client throws an error', async () => {
      // Mock the DynamoDB send method for QueryCommand to simulate an existing user
      mockSend.mockResolvedValueOnce({
        Item: marshall(sampleUser),
      });
      mockSend.mockResolvedValueOnce({
        Items: [],
      });

      // Mock the DynamoDB send method for UpdateItemCommand to simulate a DynamoDB error
      mockSend.mockRejectedValueOnce(new Error('DynamoDB error'));

      // Define the updated user object
      const updatedUser = {
        id: sampleUser.id,
        username: 'updateduser',
        email: 'updateEmail',
        firstName: 'updatedFirstName',
        lastName: 'updatedLastName',
      };

      // Call the updateUserById function and expect it to throw a DynamoDBError
      await expect(userServices.updateUserById(sampleUser.id, updatedUser)).rejects.toThrowError(DynamoDBError);
    });

    it('should not update a user and should forward a thrown exception if it is an instance of ApiError', async () => {
      // Mock the DynamoDB send method for QueryCommand to simulate an existing user
      mockSend.mockResolvedValueOnce({
        Item: marshall(sampleUser),
      });
      mockSend.mockResolvedValueOnce({
        Items: [],
      });

      // Mock the DynamoDB send method for UpdateItemCommand to simulate a BadRequestError
      mockSend.mockRejectedValueOnce(new BadRequestError('Bad request'));

      // Define the updated user object
      const updatedUser = {
        id: sampleUser.id,
        username: 'updateduser',
        email: 'updateEmail',
        firstName: 'updatedFirstName',
        lastName: 'updatedLastName',
      };

      // Call the updateUserById function and expect it to throw a BadRequestError
      await expect(userServices.updateUserById(sampleUser.id, updatedUser)).rejects.toThrowError(BadRequestError);
    });

    it('should not update a user and should throw a DynamoDBError if the thrown exception is not an instance of ApiError', async () => {
      // Mock the DynamoDB send method for QueryCommand to simulate an existing user
      mockSend.mockResolvedValueOnce({
        Item: marshall(sampleUser),
      });
      mockSend.mockResolvedValueOnce({
        Items: [],
      });

      // Mock the DynamoDB send method for UpdateItemCommand to simulate a DynamoDB error
      mockSend.mockRejectedValueOnce(new Error('DynamoDB error'));

      // Define the updated user object
      const updatedUser = {
        id: sampleUser.id,
        username: 'updateduser',
        email: 'updateEmail',
        firstName: 'updatedFirstName',
        lastName: 'updatedLastName',
      };

      // Call the updateUserById function and expect it to throw a DynamoDBError
      await expect(userServices.updateUserById(sampleUser.id, updatedUser)).rejects.toThrowError(DynamoDBError);
    });

    it('should not update a user if the update command conditional check fails', async () => {
      // Mock the DynamoDB send method for QueryCommand to simulate an existing user
      mockSend.mockResolvedValueOnce({
        Item: marshall(sampleUser),
      });
      mockSend.mockResolvedValueOnce({
        Items: [],
      });

      // Mock the DynamoDB send method to throw an exception with name equal to ConditionalCheckFailedException
      mockSend.mockRejectedValueOnce({
        name: 'ConditionalCheckFailedException',
      });

      // Define the updated user object
      const updatedUser = {
        username: 'updateduser',
        email: 'updateEmail',
        firstName: 'updatedFirstName',
        lastName: 'updatedLastName',
      };

      // Call the updateUserById function and expect it to throw a NotFoundError
      await expect(userServices.updateUserById(sampleUser.id, updatedUser)).rejects.toThrowError(NotFoundError);
    });
  });
});

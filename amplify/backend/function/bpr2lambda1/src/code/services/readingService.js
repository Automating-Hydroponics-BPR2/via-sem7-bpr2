import { v4 as uuidv4 } from 'uuid';
import { DynamoDBClient, PutItemCommand } from '@aws-sdk/client-dynamodb';
import { marshall } from '@aws-sdk/util-dynamodb';
import { DynamoDBError, ApiError } from '../helpers/apiError.js';
const dynamoDb = new DynamoDBClient({ region: 'eu-central-1' });

const createReading = async (reading, deviceId) => {
  try {
    console.log(deviceId, reading);
    const readingToCreate = {
      id: uuidv4(),
      deviceId: deviceId,
      ...reading,
      timestamp: Math.floor(Date.now() / 1000),
    };

    console.log(readingToCreate);

    await dynamoDb.send(
      new PutItemCommand({
        TableName: process.env.DYNAMODB_TABLE_NAME_READINGS,
        Item: marshall(readingToCreate),
      }),
    );

    return readingToCreate;
  } catch (error) {
    if (error instanceof ApiError) throw error;
    throw new DynamoDBError(error, 'src/services/deviceService.js - createDevice');
  }
};

export const readingService = {
  createReading,
};

import {
  BadRequestError,
  NotFoundError,
  DynamoDBError,
  UnauthorizedError,
  InternalServerError,
  ForbiddenError,
  ApiError,
} from '../../src/helpers/apiError';

describe('apiError', () => {
  it('should create a new BadRequestError', () => {
    const error = new BadRequestError('Bad request', 'test.js - testFunction');
    expect(error instanceof BadRequestError).toBeTruthy();
    expect(error instanceof ApiError).toBeTruthy(); // Branch 1
  });

  it('should create a new NotFoundError', () => {
    const error = new NotFoundError('Not found', 'test.js - testFunction');
    expect(error instanceof NotFoundError).toBeTruthy();
    expect(error instanceof ApiError).toBeTruthy(); // Branch 2
  });

  it('should create a new DynamoDBError', () => {
    const error = new DynamoDBError('DynamoDB error', 'test.js - testFunction');
    expect(error instanceof DynamoDBError).toBeTruthy();
    expect(error instanceof ApiError).toBeTruthy(); // Branch 3
  });

  it('should create a new UnauthorizedError', () => {
    const error = new UnauthorizedError('Unauthorized', 'test.js - testFunction');
    expect(error instanceof UnauthorizedError).toBeTruthy();
    expect(error instanceof ApiError).toBeTruthy(); // Branch 4
  });

  it('should create a new InternalServerError', () => {
    const error = new InternalServerError('Internal server error', 'test.js - testFunction');
    expect(error instanceof InternalServerError).toBeTruthy();
    expect(error instanceof ApiError).toBeTruthy(); // Branch 5
  });

  it('should create a new ForbiddenError', () => {
    const error = new ForbiddenError('Forbidden', 'test.js - testFunction');
    expect(error instanceof ForbiddenError).toBeTruthy();
    expect(error instanceof ApiError).toBeTruthy(); // Branch 6
  });

  it('should create a new ApiError', () => {
    const error = new ApiError('Api error', 'test.js - testFunction');
    expect(error instanceof ApiError).toBeTruthy();
  });

  it('should be true to see that the error is an instance of ApiError', () => {
    const error = new InternalServerError('Error that should be a subclass of ApiError', 'test.js - testFunction');
    expect(error instanceof ApiError).toBeTruthy();
  });

  it('should create a new ApiError with a custom status code', () => {
    const error = new ApiError('Custom error', 'test.js - testFunction', 503);
    expect(error instanceof ApiError).toBeTruthy();
    expect(error.statusCode).toBe(503); // Branch 1
  });

  it('should create a new ApiError without a custom status code', () => {
    const error = new ApiError('Custom error', 'test.js - testFunction');
    expect(error instanceof ApiError).toBeTruthy();
    expect(error.statusCode).toBe(500); // Branch 2
  });

  it('should create a new ApiError without a source or custom status code', () => {
    const error = new ApiError('Custom error');
    expect(error instanceof ApiError).toBeTruthy();
    expect(error.statusCode).toBe(500); // Branch 4
  });

  it('should create a new ApiError without a source but with a custom status code', () => {
    const error = new ApiError('Custom error', undefined, 503);
    expect(error instanceof ApiError).toBeTruthy();
    expect(error.statusCode).toBe(503); // Branch 3
  });

  it('should create a new ApiError without a message but with a source and custom status code', () => {
    const error = new ApiError(undefined, 'test.js - testFunction', 503);
    expect(error instanceof ApiError).toBeTruthy();
    expect(error.statusCode).toBe(503); // Branch 5
  });

  it('should create a new ApiError without a message or source but with a custom status code', () => {
    const error = new ApiError(undefined, undefined, 503);
    expect(error instanceof ApiError).toBeTruthy();
    expect(error.statusCode).toBe(503); // Branch 6
  });

  it('should create a new ApiError without a message, source, or custom status code', () => {
    const error = new ApiError();
    expect(error instanceof ApiError).toBeTruthy();
    expect(error.statusCode).toBe(500); // Branch 7
  });

  it('should create a new NotFoundError without a message, source, or custom status code', () => {
    const error = new NotFoundError();
    expect(error instanceof NotFoundError).toBeTruthy();
    expect(error.statusCode).toBe(404); // Branch 8
  });

  it('should create a new DynamoDBError without a message, source, or custom status code', () => {
    const error = new DynamoDBError();
    expect(error instanceof DynamoDBError).toBeTruthy();
    expect(error.statusCode).toBe(500); // Branch 9
  });

  it('should create a new UnauthorizedError without a message, source, or custom status code', () => {
    const error = new UnauthorizedError();
    expect(error instanceof UnauthorizedError).toBeTruthy();
    expect(error.statusCode).toBe(401); // Branch 10
  });

  it('should create a new InternalServerError without a message, source, or custom status code', () => {
    const error = new InternalServerError();
    expect(error instanceof InternalServerError).toBeTruthy();
    expect(error.statusCode).toBe(500); // Branch 11
  });

  it('should create a new ForbiddenError without a message, source, or custom status code', () => {
    const error = new ForbiddenError();
    expect(error instanceof ForbiddenError).toBeTruthy();
    expect(error.statusCode).toBe(403); // Branch 12
  });

  it('should create a new BadRequestError without a message, source, or custom status code', () => {
    const error = new BadRequestError();
    expect(error instanceof BadRequestError).toBeTruthy();
    expect(error.statusCode).toBe(400); // Branch 13
  });
});

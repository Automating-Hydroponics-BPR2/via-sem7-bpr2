class ApiError extends Error {
  constructor(message, source, statusCode) {
    super();
    this.statusCode = statusCode || 500;
    this.message = message || 'Internal Server Error';
    this.source = source || 'Unknown';
  }
}

class NotFoundError extends ApiError {
  constructor(message = 'Not Found', source) {
    super(message, source, 404);
  }
}

class DynamoDBError extends ApiError {
  constructor(message = 'DynamoDB Error', source) {
    super(message, source, 500);
  }
}

class ForbiddenError extends ApiError {
  constructor(message = 'Forbidden', source) {
    super(message, source, 403);
  }
}

class InternalServerError extends ApiError {
  constructor(message = 'Internal Server Error', source) {
    super(message, source, 500);
  }
}

class UnauthorizedError extends ApiError {
  constructor(message = 'Unauthorized Request', source) {
    super(message, source, 401);
  }
}

class BadRequestError extends ApiError {
  constructor(message = 'Bad Request', source) {
    super(message, source, 400);
  }
}

export {
  ApiError,
  NotFoundError,
  ForbiddenError,
  InternalServerError,
  UnauthorizedError,
  BadRequestError,
  DynamoDBError,
};

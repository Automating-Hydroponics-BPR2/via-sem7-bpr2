import logger from '../util/logger.js';

const apiErrorHandler = function (error, req, res, next) {
  if (error.source) {
    logger.error(error.source);
  }

  res.status(error.statusCode).json({
    status: 'error',
    statusCode: error.statusCode || 500,
    message: error.message,
  });
};

export default apiErrorHandler;

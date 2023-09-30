import logger from '../util/logger.js';

const apiErrorHandler = function (error, req, res, next) {
  if (error.source) {
    logger.error(`${error.message} ----->  ${error.source}`);
  }

  res.status(error.statusCode).json({
    status: 'error',
    statusCode: `${error.statusCode}`,
    stack: error.stack,
  });
};

export default apiErrorHandler;

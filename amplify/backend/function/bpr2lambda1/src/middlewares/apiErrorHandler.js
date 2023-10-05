import logger from '../util/logger.js';

const apiErrorHandler = function (error, req, res, next) {
  if (error.source) {
    logger.error(`${error.message} ----->  ${error.source}`);
  }

  res.status(error.statusCode ?? 500).json({
    status: 'error',
    statusCode: `${error.statusCode}` ?? 500,
    stack: error.stack,
  });
};

export default apiErrorHandler;

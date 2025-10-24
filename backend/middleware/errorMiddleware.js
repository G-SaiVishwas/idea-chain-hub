import { StatusCodes } from 'http-status-codes';

const notFoundHandler = (_req, res, _next) => {
  res.status(StatusCodes.NOT_FOUND).json({
    message: 'Route not found'
  });
};

// Central error formatter to avoid leaking stack traces in prod
// Expects thrown errors to include statusCode when possible
// eslint-disable-next-line no-unused-vars
const errorHandler = (err, _req, res, _next) => {
  const status = res.statusCode && res.statusCode !== StatusCodes.OK ? res.statusCode : err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR;
  const response = {
    message: err.message || 'An unexpected error occurred'
  };

  if (err.details) {
    response.details = err.details;
  }

  if (process.env.NODE_ENV !== 'production' && err.stack) {
    response.stack = err.stack;
  }

  res.status(status).json(response);
};

export { notFoundHandler, errorHandler };

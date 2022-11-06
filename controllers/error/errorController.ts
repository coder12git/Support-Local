import { ErrorRequestHandler } from 'express';

const globalErrorHandler: ErrorRequestHandler = (err, req, res) => {
  const statusCode = err.statusCode || 500;

  // Operational, trusted error: send message to client
  if (err.isOperational && process.env.NODE_ENV === 'development') {
    return res.status(statusCode).json({
      status: err.status || 'error',
      error: err,
      message: err.message,
      stack: err.stack,
    });
  }

  if (err.isOperational && process.env.NODE_ENV === 'production') {
    return res.status(statusCode).json({
      status: err.status || 'error',
      message: err.message,
    });
  }

  // Programming or other unknown error: don't leak error details
  // 1) Log error
  console.error('ERROR 💥', err);

  // 2) Send generic message
  res.status(500).json({
    status: 'error',
    message: 'Something went very wrong!',
  });
};

export default globalErrorHandler;

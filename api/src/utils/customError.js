class CustomError extends Error {
  constructor(errMsg, statusCode, source, details, errorCode) {
    super(errMsg);
    this.statusCode = statusCode;
    this.status = statusCode >= 400 && statusCode < 500 ? "fail" : "error";
    this.isOperational = true;
    this.source = source;
    this.details = details;
    this.source = source;
    this.errorCode = errorCode;

    Error.captureStackTrace(this, this.constructor);
  }
}

module.exports = CustomError;

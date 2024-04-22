const errorHandler = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || "error";
  err.message = err.message || "Server Error";
  err.details = err.details || "No details available";
  err.errorCode = err.errorCode || "Error code is not available";

  console.error(`ERROR (${err.source} | ${err.statusCode}): ${err.message}`);

  if (process.env.APP_ENV === "DEVELOPMENT") {
    console.error(
      `\n------------------\nERROR STACK: ${err.stack}\n------------------\n`
    );
  }

  return res.status(err.statusCode).json({
    success: false,
    data: null,
    error: {
      code: err.errorCode,
      message: err.message,
      details: err.details,
    },
  });
};

module.exports = errorHandler;

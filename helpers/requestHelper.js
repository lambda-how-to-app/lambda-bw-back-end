const requestHandler = {
  success(res, statusCode, message, payload) {
    if (payload) {
      return res.status(statusCode).json({
        success: true,
        statusCode,
        message,
        data: [{ ...payload }]
      });
    }
    return res.status(statusCode).json({
      success: true,
      statusCode,
      message
    });
  },
  error(res, statusCode, message, err) {
    return res.status(statusCode).json({
      success: false,
      statusCode,
      message,
      err
    });
  }
};

module.exports = requestHandler;

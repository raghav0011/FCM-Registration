//THis is the reponse of API

//When there is success
exports.success = (message, results, statusCode) => {
  return {
    message,
    error: false,
    code: statusCode,
    results,
  };
};

//When there is error
exports.error = (message, statusCode) => {
  return {
    message,
    code: statusCode,
    error: true,
  };
};

//THis is the reponse of API

//When there is success
const success = (message, results, statusCode) => {
  return {
    message,
    error: false,
    code: statusCode,
    results,
  };
};

const error = (message, statusCode) => {
  return {
    message,
    code: statusCode,
    error: true,
  };
};

module.exports = { success, error };
//When there is error

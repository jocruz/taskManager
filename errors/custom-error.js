/**
 * The super() method is used to call the constructor of the parent class, Error in this case, with the message parameter.
 * This is necessary because CustomAPIError extends the built-in Error class and needs to inherit its properties and methods.
 *
 *  CustomAPIError class is creating a new error type that extends the built-in Error class
 *  and has an additional property called statusCode that can be set when creating a new instance of the class.
 */
class CustomAPIError extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
  }
}

const createCustomError = (msg, statusCode) => {
  return new CustomAPIError(msg, statusCode);
};

module.exports = { createCustomError, CustomAPIError };

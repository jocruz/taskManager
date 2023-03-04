/**
 * Here's a step-by-step breakdown of what's happening:
 *
 * The asyncWrapper function is defined. It takes in a function fn as an argument.
 * The asyncWrapper function returns a new function that takes in three arguments: req, res, and next. This new function is also defined as an async function, meaning it can use the await keyword to handle asynchronous operations.
 * Within the new function, there is a try/catch block. The try block calls the fn function passed in as an argument with req, res, and next as its arguments using the await keyword to wait for the function to complete.
 * If the function completes successfully, the catch block is skipped and the next function is not called.
 * If the function throws an error, the catch block is executed, and the next function is called with the error as its argument.
 * This is a common pattern for handling errors in middleware functions in Express.js.
 * The getAllTasks function is defined using asyncWrapper as a decorator.
 * This means that when getAllTasks is called, it is wrapped in the asyncWrapper function, which provides error handling functionality.
 * Within the getAllTasks function, an asynchronous operation is performed using Task.find({}). The result of this operation is stored in the tasks variable.
 * The res object is used to send a JSON response with the tasks object as its data. The HTTP status code is set to 200 (OK).
 *
 *
 * If there are no middleware functions left in the chain, the error will be caught by the default error handler in Express.js, which will send a response with the error message to the client.
 */

// Define a higher-order function called asyncWrapper that takes in a function fn as an argument
const asyncWrapper = (fn) => {
  // Return a new function that takes in three arguments: req, res, and next
  return async (req, res, next) => {
    try {
      // Execute the function fn and await its result
      await fn(req, res, next);
    } catch (error) {
      // If fn throws an error, call the next middleware with the error as an argument
      next(error);
    }
  };
};

module.exports = asyncWrapper;

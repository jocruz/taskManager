# taskManager

This is a project that focuses on the back end portion of a task manager web application.

This project started off with the app.js file.

# App.js

**_Import necessary modules and middleware_**

> const express = require('express');

> const app = express();

> const tasks = require('./routes/tasks');

> const connectDB = require('./db/connect');

> require('dotenv').config();

> const notFound = require('./middleware/not-found');

> const errorHanlderMiddleware = require('./middleware/error-handler');

> const characterLimitMax = require('./middleware/character-limit');

**_Import necessary modules and middleware_**

- The express.static() middleware function serves static files, such as images or HTML files, that are stored in the 'public' folder.

> app.use(express.static('./public'));

- express.json() is a middleware function that parses incoming requests with JSON payloads. This allows us to access the JSON data sent in the request body using req.body
- Before using app.use(express.json()), if we logged req.body (where req is the request object passed to the endpoint handler), it would be an empty object: {}.
- After using app.use(express.json()), the middleware will parse the incoming request body as JSON and populate req.body with the parsed data.

> app.use(express.json());

**_Add middleware functions and routes_**

- app.use() is used to add middleware functions to the middleware stack. It takes a callback function that gets called on every request.
- app.use('/api/v1/tasks',tasks) sets up a route at '/api/v1/tasks' and uses the tasks router defined in the './routes/tasks' module.
- Remember that we will be using the endpoint '/api/v1/tasks' with the tasks route, which is defined in the './routes/tasks' module.

> app.use('/api/v1/tasks',tasks)

> app.use(notFound)

> app.use(errorHanlderMiddleware)

> app.use(characterLimitMax)

# ./routes/tasks.js

**_A router in Node.js with Express is like a map that tells the application how to handle different incoming requests to different URLs. When a client (like a web browser) sends a request to the application, the router checks the URL and method (like GET or POST) of the request, and then sends the request to the appropriate code to handle it_**

_This code creates a router object in Express, which can be used to define routes for your application. A router in Express is a middleware that can handle HTTP requests based on the request's method (GET, POST, etc.) and URL path. You can add routes to the router using the router.METHOD() functions, where METHOD is the HTTP method of the request (e.g., router.get(), router.post(), router.put(), etc.). All while using the Express framework._

> const express = require('express');

> const router = express.Router();

_The code below is using javascript destructuring, and can be rewritten as:_
const tasks = require('../controller/tasks');
const getAllTasks = tasks.getAllTasks;
const createTask = tasks.createTask;
const getTask = tasks.getTask;
const updateTask = tasks.updateTask;
const deleteTask = tasks.deleteTask;\*

_It is important to note that when we are destructuring, that the only reason that the const tasks variable gets created is because the file located at ../controller is named tasks.js, and because we export our functions in ../controller/tasks we essentially make the file itself an object._

- In the code const {getAllTasks,createTask,getTask,updateTask,deleteTask} = require('../controller/tasks'), the require function is used to import an object from the tasks.js file located in the ../controller directory.
- This object contains methods that will be used in the router object.
- The object keys are destructured and assigned to variables with the same name (getAllTasks, createTask, getTask, updateTask, deleteTask) for ease of use.
- If the filename was changed, the require statement should be updated accordingly to import the new file and assign it to a variable with the desired name (e.g., const Controllertasks = require('../controller/Controllertasks')).
- The require function reads the specified file and returns the exported object, which can be assigned to a variable with any name. In this case, it's assigned to the Controllertasks variable.
- The exported object is a collection of methods that can be used in the router object to handle HTTP requests.

  > const {getAllTasks,createTask,getTask,updateTask,deleteTask} = require('../controller/tasks')

- The first route is for the endpoint '/' and uses the .get() method to invoke the getAllTasks function. It then chains the .post() method to this route which specifies that the createTask function should be used when the route receives a POST request.

- The second route is for the endpoint /:id, which is a parameterized route that can match any string after the '/'. It uses the .get() method to invoke the getTask function and the .patch() method to invoke the updateTask function when the route receives a PATCH request. It also uses the .delete() method to invoke the deleteTask function when the route receives a DELETE request.

> router.route('/').get(getAllTasks).post(createTask)
> router.route('/:id').get(getTask).patch(updateTask).delete(deleteTask)



# ../Controllers/tasks.js

*This file contains controller functions responsible for handling the logic of a web application based on requests received from the router. These functions perform tasks such as retrieving data from a database, processing user input, and rendering views to display data to the user.*

### Dependencies
The following dependencies are imported at the top of the file:

- Task model from ../models/Task
- asyncWrapper middleware from ../middleware/async
- createCustomError function from ../errors/custom-error

### Functions
The following functions are defined:

***getAllTasks***
This function uses Task.find() to retrieve all tasks from the database and returns them as a JSON response with HTTP status code 201.

***createTask***
This function uses Task.create() to create a new task from the request body and returns it as a JSON response with HTTP status code 201.

***getTask***
This function uses Task.findOne() to find a task by ID and returns it as a JSON response with HTTP status code 200. If the task is not found, it calls the next() function with an error generated by createCustomError().

***updateTask***
This function uses Task.findOneAndUpdate() to update a task by ID with the data from the request body and returns the updated task as a JSON response with HTTP status code 200. If the task is not found, it calls the next() function with an error generated by createCustomError().

***deleteTask***
This function uses Task.findOneAndDelete() to delete a task by ID and returns a JSON response with HTTP status code 200. If the task is not found, it calls the next() function with an error generated by createCustomError().

### Export
The functions are exported as an object with the following keys:

- getAllTasks
- createTask
- getTask
- updateTask
- deleteTask


# ../middleware/async.js

### Code Summary

The code defines a higher-order function called ***asyncWrapper*** that takes in a function ***fn*** as an argument. It returns a new function that takes in three arguments: ***req***, ***res***, and ***next***. The returned function executes ***fn*** and awaits its result. If ***fn*** throws an error, the returned function calls the ***next*** middleware with the error as an argument.

The purpose of this code is to provide a wrapper for asynchronous middleware functions in ***controller/tasks.js***. It simplifies error handling in middleware functions by catching any errors that are thrown and passing them along to the next middleware function in the chain.

There is something interesting to be said about this code coming from a Java background.

>const asyncWrapper = (fn) 
The function is called asyncWrapper which is equal to a ***nameless function*** that accepts a ***callBack function*** and the way that nameless function works is as follows:

we are going to ***return a nameless function*** that takes in the following as arguments  ***req***, ***res***, and ***next***.
>return async (req, res, next) => {}
Inside the Try {} block we will  ***await*** the function ***fn*** to resolve, and the ***fn*** function takes three parameters ***req***, ***res***, and ***next***.
> try {
  >// Execute the function fn and await its result
  > await fn(req, res, next);}
We then finish off our catch block with catching an error and placing the error in our ***next*** middleware.
>catch (error) {
  >// If fn throws an error, call the next middleware with the error as an argument
  >next(error);}




# CustomAPIError: errors/custom-error.js
***CustomAPIError*** is a subclass of the built-in ***Error*** class in JavaScript that can be used to define custom error types with specific status codes. It takes two arguments: a ***message*** that describes the error, and a ***statusCode*** that specifies the HTTP status code to be returned to the client.

## Usage
To create a new instance of CustomAPIError, you can use the createCustomError function:

const { createCustomError, CustomAPIError } = require('./custom-error');

## createCustomError function

>createCustomError(message, statusCode)
createCustomError is a utility function that creates a ***new instance of CustomAPIError*** with the specified message and statusCode. It takes two arguments: a ***message*** that describes the error, and a ***statusCode*** that specifies the HTTP status code to be returned to the client. The function ***returns a new instance of CustomAPIError***.

const createCustomError = (msg, statusCode) => {
  return new CustomAPIError(msg, statusCode);
};

# errorHandlerMiddleware: middleware/error-handler.js
***errorHandlerMiddleware*** is a middleware function that can be used in an Express.js application to handle errors that occur during processing of incoming HTTP requests. It takes four arguments: ***err, req, res, and next***.

***If*** the error passed to the function is an ***instance of the CustomAPIError class***, it will return a ***JSON response*** with the error message and status code specified in the ***CustomAPIError object***.

If the error is not an instance of CustomAPIError or an unexpected error occurs, it will return a generic error message with a 500 status code.

***Keep in mind that if error is not any of these kinds or can't be handled in the middleware it will default to express.js default error handling***

# Example of the error handling

const getTask = asyncWrapper(async (req, res, next) => {
  /**
    const taskID = req.params.id;
   */
  const { id: taskID } = req.params;
  console.log({ id: taskID }); //{ id: '63f982dab64f7f5f2fc3caa4' }

  const task = await Task.findOne({ _id: taskID });
  console.log(task); // { _id: new ObjectId("63f982dab64f7f5f2fc3caa4"), name: 'Finish some lessons', completed: true, __v: 0 }
  if (!task) {
    return next(createCustomError(`No task with id : ${taskID}`, 404));
    //  return res.status(404).json({msg:`No task with ID : ${taskID} was found`})
  }

  In the code above

## explained
When a user makes a GET request to this route with a valid ID, the "getTask" function will be called.

For example, if a user makes a GET request to "/tasks/63f982dab64f7f5f2fc3caa4", the code will extract the ID from the request parameters using destructuring and assign it to the "taskID" variable.

Then, the code will use the "findOne" method of the "Task" model to retrieve a task with the given ID from the database. If a task is found, it will be logged to the console.

If a task with the given ID is not found, the "createCustomError" function is called with a 404 status code and a custom error message. This error will be handled by the "errorHandlerMiddleware" function, which will return a JSON response with the error message and status code. 

Remember we made a custom-error.js, in there we created a class that extends to the Error class, we are making a new error object there, that same file contains a function that returns an instance of the new named error, so in short, when we return next(createCustomError(`No task with id : ${taskID}`, 404)); we are returning a new instance of the Error we created which will then get handled in the error-handler.js which is part of our middleware. With out this middleware express.js would default to its own error handling.
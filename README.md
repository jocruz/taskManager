# taskManager

This is a project that focuses on the back end portion of a task manager web application.

This project started off with the app.js file.

# App.js

*** Import necessary modules and middleware ***
const express = require('express');
const app = express();
const tasks = require('./routes/tasks');
const connectDB = require('./db/connect');
require('dotenv').config();
const notFound = require('./middleware/not-found');
const errorHanlderMiddleware = require('./middleware/error-handler');
const characterLimitMax = require('./middleware/character-limit');

*** Import necessary modules and middleware ***

- The express.static() middleware function serves static files, such as images or HTML files, that are stored in the 'public' folder.
app.use(express.static('./public'));

- express.json() is a middleware function that parses incoming requests with JSON payloads. This allows us to access the JSON data sent in the request body using req.body
- Before using app.use(express.json()), if we logged req.body (where req is the request object passed to the endpoint handler), it would be an empty object: {}.
- After using app.use(express.json()), the middleware will parse the incoming request body as JSON and populate req.body with the parsed data. 

app.use(express.json());

*** Add middleware functions and routes ***

- app.use() is used to add middleware functions to the middleware stack. It takes a callback function that gets called on every request.
- app.use('/api/v1/tasks',tasks) sets up a route at '/api/v1/tasks' and uses the tasks router defined in the './routes/tasks' module.
- Remember that we will be using the endpoint '/api/v1/tasks' with the tasks route, which is defined in the './routes/tasks' module.

app.use('/api/v1/tasks',tasks)
app.use(notFound)
app.use(errorHanlderMiddleware)
app.use(characterLimitMax)



# ./routes/tasks.js

*** A router in Node.js with Express is like a map that tells the application how to handle different incoming requests to different URLs. When a client (like a web browser) sends a request to the application, the router checks the URL and method (like GET or POST) of the request, and then sends the request to the appropriate code to handle it ***


*This code creates a router object in Express, which can be used to define routes for your application. A router in Express is a middleware that can handle HTTP requests based on the request's method (GET, POST, etc.) and URL path. You can add routes to the router using the router.METHOD() functions, where METHOD is the HTTP method of the request (e.g., router.get(), router.post(), router.put(), etc.). All while using the Express framework.*

const express = require('express');
const router = express.Router();

*The code below is using javascript destructuring, and can be rewritten as:*
const tasks = require('../controller/tasks');
const getAllTasks = tasks.getAllTasks;
const createTask = tasks.createTask;
const getTask = tasks.getTask;
const updateTask = tasks.updateTask;
const deleteTask = tasks.deleteTask;*

const {getAllTasks,createTask,getTask,updateTask,deleteTask} = require('../controller/tasks')

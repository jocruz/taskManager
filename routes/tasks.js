/**
 * Routers are responsible for mapping URLs to the appropriate controller action, based on the HTTP method and parameters in the URL.
 * In other words, they define the routes that users can access in a web application, and direct incoming requests to the appropriate controller.
 *
 */

/**
 * This code defines a router for handling HTTP requests related to tasks. The router is built using the Express.js framework.
 */
const express = require("express");
const router = express.Router();

/**
 * The router object is created using the express.Router() method, which returns a new router instance.
 */
const {
  getAllTasks,
  createTask,
  getTask,
  updateTask,
  deleteTask,
} = require("../controller/tasks");

/**
 * This line of code imports the controller methods for handling tasks-related requests.
 * These two lines define the routes for handling tasks-related requests.
 *
 * router.route('/').get(getAllTasks).post(createTask) - The first line defines the route for creating new tasks and retrieving a list of all tasks.
 * router.route('/:id').get(getTask).patch(updateTask).delete(deleteTask) - The second line defines the route for retrieving, updating, and deleting individual tasks.
 */
router.route("/").get(getAllTasks).post(createTask);
router.route("/:id").get(getTask).patch(updateTask).delete(deleteTask);

/**
 * Finally, the router object is exported so that it can be used by other modules in the application.
 */
module.exports = router;

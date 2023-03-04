/**
 *
 * Controllers are responsible for handling the logic of a web application, based on the request that is received from the router.
 * They typically perform tasks such as retrieving data from a database, processing user input, and rendering views to display data to the user.
 *
 */
const Task = require("../models/Task");
const asyncWrapper = require("../middleware/async");
const { createCustomError } = require("../errors/custom-error");

const getAllTasks = asyncWrapper(async (req, res) => {
  const tasks = await Task.find({});
  res.status(201).json({ tasks });
});

const createTask = asyncWrapper(async (req, res) => {
  const task = await Task.create(req.body);
  res.status(201).json({ task });
  console.log("Created Task Successfully");
});

const getTask = asyncWrapper(async (req, res, next) => {
  /**
   * const taskID = req.params.id;
   */
  const { id: taskID } = req.params;
  console.log({ id: taskID }); //{ id: '63f982dab64f7f5f2fc3caa4' }

  const task = await Task.findOne({ _id: taskID });
  console.log(task); // { _id: new ObjectId("63f982dab64f7f5f2fc3caa4"), name: 'Finish some lessons', completed: true, __v: 0 }
  if (!task) {
    return next(createCustomError(`No task with id : ${taskID}`, 404));
    //  return res.status(404).json({msg:`No task with ID : ${taskID} was found`})
  }

  res.status(200).json({ task });
});

const updateTask = asyncWrapper(async (req, res, next) => {
  const { id: taskID } = req.params;
  const task = await Task.findOneAndUpdate({ _id: taskID }, req.body, {
    new: true,
    runValidators: true,
  });

  if (!task) {
    return next(createCustomError(`No task with id : ${taskID}`, 404));
  }
  res.status(200).json({ task });
});

const deleteTask = asyncWrapper(async (req, res, next) => {
  const { id: taskID } = req.params;
  const task = await Task.findOneAndDelete({ _id: taskID });
  if (!task) {
    return next(createCustomError(`No task with id : ${taskID}`, 404));
  }
  res.status(200).json({ msg: `The following task was deleted: ${taskID}` });
});

module.exports = {
  getAllTasks,
  createTask,
  getTask,
  updateTask,
  deleteTask,
};

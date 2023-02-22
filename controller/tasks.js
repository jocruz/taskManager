    const Task = require('../models/Task')

    const getAllTasks = (req,res) => {
        res.send("get All Tasks");
    }

    const createTask = async (req,res) =>{
        const task = await Task.create(req.body)
        res.status(201).json({task});
    }

    const getTask = (req,res) =>{
        console.log(req.params);
        res.json({id:req.params.id});
    }

    const updateTask = (req,res) =>{
        res.send ("Update a Task");
    }

    const deleteTask = (req,res) =>{
        res.send ("Delete a Task");
    }

    module.exports = {
        getAllTasks,
        createTask,
        getTask,
        updateTask,
        deleteTask
    }
    /**
     * 
     * Controllers are responsible for handling the logic of a web application, based on the request that is received from the router.
     * They typically perform tasks such as retrieving data from a database, processing user input, and rendering views to display data to the user.
     * 
     */
    
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
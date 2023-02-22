    /**
     * 
     * Controllers are responsible for handling the logic of a web application, based on the request that is received from the router.
     * They typically perform tasks such as retrieving data from a database, processing user input, and rendering views to display data to the user.
     * 
     */
    
    const Task = require('../models/Task')

    const getAllTasks = async (req,res) => {
        try{
            const tasks = await Task.find({});
            res.status(200).json({tasks})
        } catch (error){
            console.log(error)      
            res.status(500).json({msg:error})
        }
    }

    const createTask = async (req,res) =>{
        try{
            const task = await Task.create(req.body)
            res.status(201).json({task});
            console.log("Created Task Successfully")
        } catch (error){
   
            res.status(500).json({msg:error})
        }
        
    }

    const getTask = async (req,res) => {
        try{
            //const taskID = req.params.id;
            // const {ObjectId:taskID} = req.params
            // const task = await Task.findOne({ObjectId:taskID});
            // console.log(task)
            // 
            const { id: taskID } = req.params
            const task = await Task.findById({ _id: taskID.replace(/[^a-fA-F0-9]/g, '') })
            console.log(task, { _id: taskID.replace(/[^a-fA-F0-9]/g, '') });
            if (!task){
                return res.status(404).json({msg:`no task with id : ${taskID}`})
            }
            res.status(200).json({ task })
            // console.log(req.params)
            // res.json(req.params.id);
        } catch (error){
            // console.log(error)      
            return res.status(404).json({msg:`no task with id `})
        }
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
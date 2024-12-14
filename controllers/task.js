const Task = require('../models/task')


const getAllTask = async (req,res)=>{
    try{
        const tasks = await Task.find({})
        res.status(201).json({tasks})
    }
    catch(error){
        res.status(500).json({msg:'There was an error occured'})
    }
}


const createTask = async (req,res)=>{
    try{
    const tasks = await Task.create(req.body)
    res.status(201).json({tasks})
    }
    catch(error){
        res.status(500).json({msg:'There was an error occured'})
        
    }
}


const getSingleTask = async (req,res)=>{
    try{
        const {id:taskID}=req.params
        const task = await Task.findOne({_id:taskID})
        res.status(201).json({task})
        if(!task){
        return res.status(404).json({msg:`No task with ID:${taskID}`})
    }
    
    }catch(error){
        res.status(500).json({msg:'There was an error occured'})
        
    }
}


const deleteTask = async (req,res)=>{
    try{
        const {id:taskID} = req.params
        const task = await Task.findOneAndDelete({_id:taskID})
        if(!task){
            return res.status(404).json({msg:`The task does not exists:${taskID}`})
        }
        res.status(201).json({task})
    }
    catch(error){
        res.status(500).json({msg:'There was an error occured'})
    }
    
}


const updateTask = async (req,res)=>{
    try{
        const {id:taskID} = req.params
        const task = await Task.findOneAndUpdate({_id:taskID},req.body,{
            new:true,
            runValidators:true,
        })
        if(!task){
            return res.status(404).json({msg:`No task with ID:${taskID}`})
        }
        res.status(200).json({task})
    }
    catch{
        res.status(500).json({msg:'There was an error occured'})
    }
}


module.exports = {getAllTask,createTask,getSingleTask,updateTask,deleteTask}
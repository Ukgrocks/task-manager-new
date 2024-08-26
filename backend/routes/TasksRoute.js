const express = require('express');
const Tasks = require('../models/Tasks');
const router = express.Router();
const CsvParser = require('json2csv').Parser;
const fs = require('fs');  // File system module
const path = require('path');
//write an api to fetch all tasks stored in database in json format

router.get('/',(req,res)=>{
  const response = "hello project";
    res.json(response);
});

router.get('/fetchalldata', async (req, res) => {
try{
      const data = await Tasks.find().sort({ createdAt: 1 });
     res.json(data);
       }
      catch(err) {
        console.log(err);
    }
  });


  //get a particular task
router.get('/fetchtask/:id', async (req, res) => {
    try{
    const a = req.params.id;
    const data = await Tasks.findById(a)
    res.json(data);
    }
    catch(err) {
    console.log(err);
    }
});

//get a task which has status done

router.get('/fetchdonetask', async (req, res) => {
    try{
      const data = await Tasks.find({status:"done"});
     res.json(data);
       }
      catch(err) {
        console.log(err);
    }
  });

//get a task which has status in-progress 

router.get('/fetchinprogress', async (req, res) => {
  
    try{
      const data = await Tasks.find({status:"in-progress"});
     res.json(data);
       }
      catch(err) {
        console.log(err);
    }
  });

//get a task which has status to-do 

router.get('/fetchtodo', async (req, res) => {

    try{
      const data = await Tasks.find({status:"to-do"});
     res.json(data);
       }
      catch(err) {
        console.log(err);
    }
  });


//create a task
router.post('/newtasks', async (req, res) => {
  const { title, description, status } = req.body;
  const newTask = new Tasks({ title, description, status });
  
  try {
      const response = await newTask.save();
      res.status(201).json(response);
  } catch (error) {
      res.status(500).json({ error: 'Failed to add task' });
  }
});

//update a task
router.put('/updatetasks/:id', async (req, res) => {
    await Tasks.findByIdAndUpdate(req.params.id, {
        title: req.body.title,
        description: req.body.description,
        status: req.body.status
    }, { new: true })
        .then((task) => {
            res.send(task);
        })
        .catch((err) => {
            console.log(err);
        });
});

//delete a task
router.delete('/deletetasks/:id', async (req, res) => {
     const task = Tasks.findById(req.params.id);
    await Tasks.findByIdAndDelete(req.params.id)
        .then(() => {
            res.json(`Task has been successfully deleted`);
        })
        .catch((err) => {
            console.log(err);
        });
});         

router.get('/api/export', async (req, res) => {
  try {
    // const tasks = await Tasks.find().sort({ createdAt: 1 });
 let users = [];
 var userData = await Tasks.find({});
 userData.forEach((user)=>{
const {title,description,status} = user;
users.push({title,description,status});
 });
 console.log(users);
  const csvfields = ['Title', 'Description', 'Status'];
  const csvParser = new CsvParser({  csvfields });
  const csvData = csvParser.parse(users)
  res.setHeader("Content-Type", "text/csv");
  res.setHeader("Content-Disposition", "attachment: filename=userData.csv");
  res.status(200).end(csvData);
  } 
  catch (error) {
res.send({status:400,success:false,msg:error.message});
  }
});
module.exports = router
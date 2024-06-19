const express = require('express');
const app = express();
const router = express.Router();
const { checkSession } = require('./utils');

// setup: 2 tasks
const tasks = [{
    id: 1,
    "title": "The Fall",
    "description": "this is a description of the task",
    "done": true,
    "dueDate": "27.08.1996",
    "year": 1996,
    "author": "Benedict Brück"  
},
{
    id: 2,
    "title": "The Fail",
    "description": "this is a description of the task",
    "done": true,
    "dueDate": "27.08.1996",
    "year": 1996,
    "author": "Benedict Brück" 
}]

const users = {};

const tokens = {};

// Mit Hilfestellung von AI erstellt
/**
* @name GET tasks
* @description Get all tasks
* @tags Tasks
* @method GET
* @route localhost:3000/tasks
* @type Content-Type: application/json
* @security JWT
* @success 200 {Object[]} tasks - Returns an array of tasks
* @failure 401 {Object} error - "Unauthorized: No session available"
* @failure 404 {Object} error - "No task available"
* @failure 500 {Object} error - "Server error"
*/
// Ende AI-Eingriff
router.get('/tasks', (req, res) => {
    if (!checkSession(req)) {
        console.warn("session check failed");
        return res.status(401).json({ error: "unauthorized" });
    }
    try {
        if (!tasks){
            res.setHeader('Content-Type', 'application/json').status(404).json({ error: "no task available"}).end();
        }
        res.setHeader('Content-Type', 'application/json').status(200).json(tasks).end();
    } catch (error) {
        console.error(error);
        res.setHeader('Content-Type', 'application/json').status(500).json({ error: 'Server error' }).end();
    }
});

// Mit Hilfestellung von AI erstellt
/**
* @name POST task
* @description Create a task
* @tags Tasks
* @method POST
* @route localhost:3000/tasks
* @type Content-Type: application/json
* @body { "title": "The Fall", "description": "this is a description of the task", "done": true, "dueDate": "27.08.1996", "year": 1996, "author": "Benedict Brück" }
* @success 201 {Object} task - Task successfully created.
* @failure 401 {string} - "Unauthorized: No session available"
* @failure 422 {string} - "Request body is not valid"
* @failure 500 {string} - "Server error"
*/
// Ende AI-Eingriff
router.post('/tasks', (req, res) => {
    if (!checkSession(req)) {
        console.warn("session check failed");
        return res.status(401).json({ error: "unauthorized" });
    }
    try {
        const body = req.body;
        // in Postman:
        // body = {
        //     title: "The Fall"
        //    "description": "this is a description of the task",
        //    "done": true,
        //    "dueDate": "27.08.1996",
        //     year: 1996,
        //     author: "Benedict Brück"  
        // }
        if (!body || typeof body !== 'object'){
            return res.setHeader('Content-Type', 'application/json').status(422).json({ error: 'request body is not valid' });
        }
        const newtask = {
            "id": tasks.length + 1,
            "title": body.title,
            "description": body.description,
            "done": body.done,
            "dueDate": body.dueDate,
            "year": body.year,
            "author": body.author
        }
        tasks.push(newtask)
        res.setHeader('Content-Type', 'application/json').status(201).json(tasks[tasks.length-1]).end();
    } catch (error) {
        console.error(error);
        res.setHeader('Content-Type', 'application/json').status(500).json({ error: 'Server error' }).end();
    }
});


// Mit Hilfestellung von AI erstellt
/**
* @name GET task
* @description Get a task
* @tags Tasks
* @method GET
* @route localhost:3000/tasks/id
* @type Content-Type: application/json
* @success 200 {Object} task - success
* @failure 401 {string} - "no task available"
* @failure 404 {string} - "request body is not valid"
* @failure 500 {string} - "Server error."
*/
// Ende AI-Eingriff
router.get('/tasks/:id', (req, res) => {
    if (!checkSession(req)) {
        console.warn("session check failed");
        return res.status(401).json({ error: "unauthorized" });
    } 
    try {
        const id = parseInt(req.params.id);
        const taskIndex = id - 1;
        if (taskIndex < 0 || taskIndex >= tasks.length) { 
            return res.setHeader('Content-Type', 'application/json').status(404).json({ error: 'task not found' }).end();
        }
        res.setHeader('Content-Type', 'application/json').status(200).json(tasks[taskIndex]).end();
    } catch (error) {
        console.error(error);
        res.setHeader('Content-Type', 'application/json').status(500).json({ error: 'Server error' }).end();
    }
})

// Mit Hilfestellung von AI erstellt
/**
* @name PUT task
* @description Update a task
* @tags Tasks
* @method PUT
* @route localhost:3000/tasks/id
* @type Content-Type: application/json
* @body { "title": "The Wall", "description": "this is a description of the task", "done": true, "dueDate": "27.08.1996", "year": 1996, "author": "Benedict Brück" }
* @success 200 {Object} task - success
* @failure 400 {string} - "request body is not valid"
* @failure 401 {string} - "unauthorized"
* @failure 404 {string} - "id not valid" || "no task found in request body"
* @failure 500 {string} - "Server error."
*/
// Ende AI-Eingriff
router.put('/tasks/:id', (req, res) => {
    if (!checkSession(req)) {
        console.warn("session check failed");
        res.status(401).json({ error: "unauthorized" });
    } 
    try {
        const id = parseInt(req.params.id);
        if (id <= 0) {
            return res.setHeader('Content-Type', 'application/json').status(404).json({ error: 'id is not valid' }).end();
        }
        const changedtask = req.body;
        // in Postman:
        // body = {
        //     "title": "The Wall"
        //    "description": "this is a description of the task",
        //    "done": true,
        //    "dueDate": "27.08.1996",
        //     "year": 1996,
        //     "author": "Benedict Brück"  
        // }
        if (!changedtask) {
            return res.setHeader('Content-Type', 'application/json').status(404).json({ error: 'no task found in request body' }).end();
        }
        if (!req.body.title || !req.body.description || !req.body.done || !req.body.dueDate || !req.body.year || !req.body.author){
            return res.setHeader('Content-Type', ' application/json').status(400).json({ error: 'request body is not valid'}).end();
        }
        const taskIndex = tasks.findIndex(task => task.id === id);
        tasks[taskIndex].title = req.body.title;
        tasks[taskIndex].description = req.body.description;
        tasks[taskIndex].done = req.body.done;
        tasks[taskIndex].dueDate = req.body.dueDate;
        tasks[taskIndex].year = req.body.year;
        tasks[taskIndex].author = req.body.author;
        res.setHeader('Content-Type', 'application/json').status(200).json(tasks[taskIndex]).end();
    } catch (error) {
        console.error(error);
        res.setHeader('Content-Type', 'application/json').status(500).json({ error: 'Server error' }).end();
    }
})

// Mit Hilfestellung von AI erstellt
/**
* @name DELETE task 
* @description Delete a task
* @tags Tasks
* @method DELETE
* @route localhost:3000/tasks/id
* @type Content-Type: application/json
* @success 204 
* @failure 404 {string} - "id not valid" || "task not found"
* @failure 422 {string} - "request body is not valid"
* @failure 500 {string} - "Server error."
*/
// Ende AI-Eingriff
router.delete('/tasks/:id', (req, res) => {
    if (!checkSession(req)) {
        console.warn("session check failed");
        return res.status(401).json({ error: "unauthorized" });
    } 
    try {
        const id = parseInt(req.params.id);
        if (id <= 0) {
            res.setHeader('Content-Type', 'application/json').status(422).json({ error: 'unprocessable Entity Id' }).end();
        } 
        else {
            taskIndex = tasks.findIndex(task => task.id === id);
            if(!taskIndex) {
                return res.setHeader('Content-Type', 'application/json').status(404).json({ error: 'task not found' }).end();
            }
            tasks.splice(taskIndex, 1);
            res.setHeader('Content-Type', 'application/json').status(204).end();
        }
    } catch (error) {
        console.error(error);
        res.setHeader('Content-Type', 'application/json').status(500).json({ error: 'Server error' }).end();
    }
})


module.exports = router;

const express = require('express');
const dotenv = require('dotenv');
const basicAuth = require('express-basic-auth')
var session = require('express-session')
const swaggerAutogen = require('swagger-autogen');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger-output.json');

const app = express();
const port = 3000;

app.use(express.json())

// Settings for session (cookie)
app.use(session({
    secret: 'BenedictsKey',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false, maxAge: 1000 * 60 * 5 }
  }));
// body = {
    //     title: "The Fall"
    //    "description": "this is a description of the task",
    //    "done": true,
    //    "dueDate": "27.08.1996",
    //     year: 1996,
    //     author: "Benedict Brück"  
    // }
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


dotenv.config();
users[process.env.USER_NAME] = process.env.PASSWORD;
if (!process.env.USER_NAME || !process.env.PASSWORD) {
    console.error('USERNAME and PASSWORD must be set in the .env file');
    process.exit(1);
}



// GET all tasks
app.get('/tasks', (req, res) => {
        res.setHeader('Content-Type', 'application/json').status(200).json(tasks).end();

})



// POST new task
app.post('/tasks', (req, res) => {
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
})




// GET 1 task
app.get('/tasks/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const taskIndex = id - 1;
    res.setHeader('Content-Type', 'application/json').status(200).json(tasks[taskIndex]).end();

})



// PUT
app.put('/tasks/:id', (req, res) => {
    const id = parseInt(req.params.id);
    if (id <= 0) {
        return res.setHeader('Content-Type', 'application/json').status(404).json({ error: 'id is not valid' }).end();
    }
    const changedtask = req.body;
    // in Postman:
    // body = {
    //     title: "The Fail"
    //     year: 1996,
    //     author: "Max Master"  
    // }
    const taskIndex = tasks.findIndex(task => task.id === id);
    tasks[taskIndex].Title = req.body.title;
    tasks[taskIndex].year = req.body.year;
    tasks[taskIndex].author = req.body.author;
    res.setHeader('Content-Type', 'application/json').status(200).json(tasks[taskIndex]).end();

})



// DELETE
app.delete('/tasks/:id', (req, res) => {
        const id = parseInt(req.params.id);
        taskIndex = tasks.findIndex(task => task.id === id);
        if(!taskIndex) {
            return res.setHeader('Content-Type', 'application/json').status(404).json({ error: 'task not found' }).end();
        }
        tasks.splice(taskIndex, 1);
        res.setHeader('Content-Type', 'application/json').status(204).end();

})


function checkSession(req) {
    const session = req.session;
    return session && session.authenticated;
}


app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
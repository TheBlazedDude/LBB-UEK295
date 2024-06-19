const express = require('express');
const dotenv = require('dotenv');
const session = require('express-session');
const taskRoutes = require('./routes/taskRoutes');
const authRoutes = require('./routes/authRoutes');
const swaggerAutogen = require('swagger-autogen');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger-output.json');

const app = express();
const port =  3000;
dotenv.config();

app.use(express.json());

app.use(session({
    secret: 'BenedictsSecretKey',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false, maxAge: 1000 * 60 * 5 } // max time 5 minutes :D have fun
}));


app.use('/tasks', taskRoutes); // /tasks -> /tasks/tasks/1
app.use('/auth', authRoutes); // /auth -> /auth/login or verify or logout


app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});

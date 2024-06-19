const swaggerAutogen = require('swagger-autogen')();

const doc = {
  info: {
    title: 'LBB_BenBrc',
    description: 'tasks and sessions',
    author: 'Benedict Brück'
  },
  host: 'localhost:3000',
  tags: [
    {
      name: 'Tasks',
      description: 'Tasks API'
    },
    {
      name: 'Auth',
      description: 'Sessions API'
    }
  ],
};

const outputFile = './swagger-output.json';
const routes = ['./endpunkte.js'];

/* NOTE: If you are using the express Router, you must pass in the 'routes' only the 
root file where the route starts, such as index.js, app.js, routes.js, etc ... */

swaggerAutogen(outputFile, routes, doc);
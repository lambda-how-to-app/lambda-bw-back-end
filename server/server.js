const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const routes = require('../routes/routes');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('../ApiDoc.json');

const server = express();
server.use(helmet());
server.use(cors());
server.use(express.json());
server.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

server.use('/api/v1', routes);

server.get('/', (req, res) => {
  res.status(200).json({
    status: 200,
    message: 'Welcome'
  });
});

server.get('*', (req, res) => {
  res.status(404).json({
    message: 'Invalid routes'
  });
});

module.exports = server;

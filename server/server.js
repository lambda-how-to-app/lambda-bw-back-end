const express = require('express');
const helmet = require('helmet');

const server = express();
server.use(helmet());
server.use(express.json());

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

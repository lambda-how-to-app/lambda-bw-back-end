const knex = require('knex');
const environment = require('../environments');

const config = require('../knexfile');

module.exports = knex(config[environment]);

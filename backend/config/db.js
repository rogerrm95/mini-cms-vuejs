const config = require('../knexfile.js')
const knex = require('knex')(config)

// Realiza as migrations assim que o npm start é executado
knex.migrate.latest([config]) 

module.exports = knex
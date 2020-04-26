const Sequelize = require('sequelize');
const db = new Sequelize('postgres://localhost:5432/farmy');

module.exports = db;
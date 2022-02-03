const Sequelize = require('sequelize');
const config = require('../../config/db.json');
const connection = new Sequelize({
  dialect: config.db_dialect,
  username: config.db_username,
  password: config.db_password,
  host: config.db_host,
  port: config.db_port,
  database: config.db_name,
  pool: config.db_pool,
});

const db = {};

db.Sequelize = Sequelize;
db.connection = connection;
db.config = config;

module.exports = db;
global.db = db;

const DataTypes = require('sequelize');

const guild = db.connection.define('guild', {
  guild_id: {
    primaryKey: true, type: DataTypes.STRING, required: true,
  },
  guild_name: {
    type: DataTypes.STRING,
  },
  bot_admin_role: {
    type: DataTypes.STRING, required: false,
  },
}, {
  schema: db.config.db_schema,
});

module.exports = guild;

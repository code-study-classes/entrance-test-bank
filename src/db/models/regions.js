const { DataTypes } = require('sequelize');
const sequelize = require('../index');

const Regions = sequelize.define('Regions', {
    name: {
      type: DataTypes.STRING,
    }
  })
  

module.exports = Regions;
const { DataTypes } = require('sequelize');
const sequelize = require('../index');

const Hotels = sequelize.define('Hotels', {
    name: {
      type: DataTypes.STRING,
    },
    region: {
      type: DataTypes.INTEGER,
    }
})

module.exports = Hotels;
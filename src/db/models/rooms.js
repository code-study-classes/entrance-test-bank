const { DataTypes } = require('sequelize');
const sequelize = require('../index');

const Rooms = sequelize.define('Rooms', {
    hotel: {
      type: DataTypes.INTEGER,
    },
    category: {
        type: DataTypes.STRING,
        values: ['standart', 'luxury', 'apartments'],
    },
    count: {
        type: DataTypes.INTEGER
    },
    status: {
        type: DataTypes.BOOLEAN
    }
})
  

module.exports = Rooms;
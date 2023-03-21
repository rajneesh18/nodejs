const Sequelize = require('sequelize');

const sequelize = require('../util/db');

const CartItem = sequelize.define('cartItem', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: true,
        primaryKey: true
    },
    quantity: Sequelize.INTEGER
});

module.exports = CartItem;
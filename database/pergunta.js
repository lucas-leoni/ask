const Sequelize = require('sequelize');
const connection = require('./database');

const pergunta = connection.define('pergunta', {
    title: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    description: {
        type: Sequelize.TEXT,
        allowNull: false,
    },
});

pergunta.sync({force: false}).then(() => {});
module.exports = pergunta;
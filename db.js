const Sequalize = require("sequelize");

const sequalize = new Sequalize("database", "user", "password", {
    host: "localhost",
    dialect: 'sqlite',
    logging: false,
    //SQLite only
    storage: "database.sqlite",
});

const Sinners = sequalize.define("sinners", {
    discord_id: {
        type: Sequalize.STRING,
        unique: true,
        primaryKey: true,
    },
    discord_name: {
        type: Sequalize.STRING,
        unique: true,
        allowNull: false,
    },
    sin_count: {
        type: Sequalize.INTEGER,
        defaultValue: 0,
        allowNull: false,
    },
});

const Sin_Records = sequalize.define("sin_records", {
    id: {
        type: Sequalize.INTEGER,
        autoIncrement: true,
        unique: true,
        primaryKey: true,
    },
    user_id: {
        type: Sequalize.STRING,
        allowNull: false,
    },
    description: {
        type: Sequalize.TEXT,
        defaultValue: null,
    },
});

module.exports = {
    database : sequalize,
    sinners : Sinners,
    records : Sin_Records,
};
const Sequalize = require("sequelize");
require('dotenv').config();

var sequalize = null

//sqlite default database for local testing
if(!process.env.DATABASE_URL){

     sequalize = new Sequalize("database", "user", "password", {
        host: "localhost",
        dialect: 'sqlite',
        logging: false,
        //SQLite only
        storage: "database.sqlite",
    });
} else {
     sequalize = new Sequalize(process.env.DATABASE_URL, {
        protocol: 'postgres',
        dialect: 'postgres',
        logging: false,
    });
}

//Database model definitions
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

const Requests = sequalize.define("requests", {
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
    request: {
        type: Sequalize.TEXT,
        allowNull: false,
    },
    status: {
        type: Sequalize.STRING,
        defaultValue: "Not Accepted",
    },
});

module.exports = {
    database : sequalize,
    sinners : Sinners,
    records : Sin_Records,
    requests: Requests,
};
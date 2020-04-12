const fs = require("fs");
const Discord = require("discord.js");
const { prefix, token } = require("./config.json");
const Sequalize = require("sequelize");

const client = new Discord.Client();
client.commands = new Discord.Collection();

const commandFiles = fs
  .readdirSync("./commands")
  .filter((file) => file.endsWith(".js"));

for (const file of commandFiles) {
  const command = require(`./commands/${file}`);

  client.commands.set(command.name, command);
}

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
  sin_count: {
    type: Sequalize.INTEGER,
    defaultValue: 0,
    allowNull: false,
  },
});

const Sin_Records = sequalize.define("sin_records", {
  id: {
    type: Sequalize.INTEGER,
    unique: true,
    primaryKey: true,
  },
  description: {
    type: Sequalize.TEXT,
    defaultValue: null,
  },
});

Sin_Records.belongsTo(Sinners);

client.once("ready", () => {
  Sinners.sync();
  Sin_Records.sync();

  console.log("Ready!");
});

client.login(token);

client.on("message", (message) => {
  if (!message.content.startsWith(prefix) || message.author.bot) return;

  const withoutPrefix = message.content.replace("$", "");
  const split = withoutPrefix.split(" ");
  const commandName = split[0];
  const args = split.slice(1);

  console.log(commandName);

  if (!client.commands.has(commandName)) return;

  const command = client.commands.get(commandName);

  if (command.args && !args.length) {
    return message.channel.send(
      `You didn't provide any arguments, ${message.author}!`
    );
  }

  try {
    command.execute(message, args);
  } catch (error) {
    console.error(error);
    message.reply("There was an error trying to execute that command.");
    message.author.id;
  }
});

var sinCount = 0;

const fs = require("fs");
const Discord = require("discord.js");
const { prefix, token } = require("./config.json");
const db = require("./db.js");

const client = new Discord.Client();
client.commands = new Discord.Collection();

const commandFiles = fs
  .readdirSync("./commands")
  .filter((file) => file.endsWith(".js"));

for (const file of commandFiles) {
  const command = require(`./commands/${file}`);

  client.commands.set(command.name, command);
}


client.once("ready", () => {
  db.sinners.sync();
  db.records.sync();

  console.log("Ready!");
});

client.login(token);

client.on("message", (message) => {
  if (!message.content.startsWith(prefix) || message.author.bot) return;

  const withoutPrefix = message.content.replace("$", "");
  const split = withoutPrefix.split(" ");
  const commandName = split[0];
  const args = split.slice(1);

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

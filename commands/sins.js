const db = require("../db.js");

module.exports = {
  name: "sins",
  usage: "<user>",
  args: true,
  aliases: ["history"],
  description: "Returns number of sins a user has committed.",
  async execute(message, args) {
    //check if the user is registered in the sin counter repo
    //If not, add them to the database and initialize their counter to 0

    //If user is in database, return the number of sins
    if (args[0].startsWith("<@") && args[0].endsWith(">")) {
      var mention = args[0];

      mention = mention.slice(2, -1);

      if (mention.startsWith("!")) {
        mention = mention.slice(1);
      }

      var user = message.client.users.cache.get(mention);

      console.log(user);

      try {
        const record = await db.records.findAll({
          where: { user_id: user.username },
        });
        message.channel.send(`Recorded sins for ${user.username}:`);
        for (let index = 0; index < record.length; index++) {
          message.channel.send(`${record[index].dataValues.description}`);
        }
      } catch (e) {
        console.log(e.message);
        return message.channel.send(
          `${user.username} has no sins to be returned `
        );
      }
    }
  },
};

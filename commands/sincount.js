const db = require("../db.js");

module.exports = {
  name: "sincount",
  usage: "<user>",
  args: true,
  aliases: ["sc", "SC", "Sc", "Sincount", "Sin count"],
  description: "Returns number of sins a user has committed.",
  async  execute(message, args) {
    //check if the user is registered in the sin counter repo
    //If not, add them to the database and initialize their counter to 0

    //If user is in database, return the number of sins
    if (args[0].startsWith("<@") && args[0].endsWith(">")) {
      var mention = args[0];

      mention = mention.slice(2, -1);

      if (mention.startsWith("!")) {
        mention = mention.slice(1);
      }

      var userName = message.client.users.cache.get(mention);

      console.log(mention);

      try {
        const sinner = await db.sinners.findOne({ where: { discord_id: mention } });
        var sins = sinner.sin_count;

        if (sins === 1) {
          message.channel.send(
            `${userName} has sinned ${sins} time`
          );
        } else {
          message.channel.send(
            `${userName} has sinned ${sins} times`
          );
        }
      } catch (error) {
        message.channel.send(`WHOA! ${userName} has NEVER sinned`);
      }
    }
  }
};

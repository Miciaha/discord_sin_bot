const { users } = require("./../sinners.json");

module.exports = {
  name: "sincount",
  usage: "<user>",
  args: true,
  aliases: ["sc", "SC", "Sc", "Sincount", "Sin count"],
  description: "Returns number of sins a user has committed.",
  execute(message, args) {
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

      if (users[mention]) {
        if (users[mention]["sins"] === "1") {
          message.channel.send(
            `${userName} has sinned ${users[mention]["sins"]} time`
          );
        } else {
          message.channel.send(
            `The people have spoken. ${userName} has sinned ${users[mention]["sins"]} times`
          );
        }
      } else {
        message.channel.send(`WHOA! ${userName} has NEVER sinned`);
      }
    } else {
      message.channel.send(`You didn't tag a user ${message.author}`);
    }
  },
};

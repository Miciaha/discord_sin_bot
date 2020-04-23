const fs = require('fs');

module.exports = {
  name: "meow",
  usage: "join a voice channel and type in the command...",
  aliases: ["cat"],
  description: "Returns a line from the critically acclaimed movie Cats",
  async execute(message, args) {
    if (message.member.voice.channel) {
      const connection = await message.member.voice.channel.join();

      connection.play(
        fs.createReadStream("./resources/sounds/MEOW.mp3")
      );

      setTimeout(function (){
        return connection.disconnect();
      }, 5000)

      
    } else {
      return message.reply("You need to join a voice channel first!");
    }
  },
};

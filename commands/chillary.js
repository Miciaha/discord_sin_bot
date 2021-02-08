const fs = require('fs');

module.exports = {
  name: "chillary",
  usage: "join a voice channel and type in the command...",
  aliases: ["chillin"],
  description: "Our girl is so chill omfg!!",
  async execute(message, args) {
    if (message.member.voice.channel) {
      const connection = await message.member.voice.channel.join();

      connection.play(
        fs.createReadStream("./resources/sounds/chill.mp3")
      );

      setTimeout(function (){
        return connection.disconnect();
      }, 5000)

      
    } else {
      return message.reply("You need to join a voice channel first!");
    }
  },
};

const fs = require('fs');

module.exports = {
  name: "jeb",
  usage: "join a voice channel and type in the command...",
  aliases: ["clap"],
  description: "Poor Jeb",
  async execute(message, args) {
    if (message.member.voice.channel) {
      const connection = await message.member.voice.channel.join();

      connection.play(
        fs.createReadStream("./resources/sounds/clap.mp3")
      );

      setTimeout(function (){
        return connection.disconnect();
      }, 5000)

      
    } else {
      return message.reply("You need to join a voice channel first!");
    }
  },
};

const fs = require('fs');

module.exports = {
  name: "pokemongo",
  usage: "join a voice channel and type in the command...",
  aliases: ["polls"],
  description: "HELLO FELLOW KIDS!",
  async execute(message, args) {
    if (message.member.voice.channel) {
      const connection = await message.member.voice.channel.join();

      connection.play(
        fs.createReadStream("./resources/sounds/pokemongo.mp3")
      );

      setTimeout(function (){
        return connection.disconnect();
      }, 5000)

      
    } else {
      return message.reply("You need to join a voice channel first!");
    }
  },
};

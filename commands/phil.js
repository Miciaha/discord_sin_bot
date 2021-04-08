module.exports = {
  name: "phil",
  description: "PHIL DID IT!!",
  aliases: ["quit"],
  usage: [""],
  execute(message, args) {

    var phrases = {
      0: "Please leave them alone. They're on to bigger and better things now :heart_eyes:",
      1: "Nah, they're fine. Thanks.",
      2: "We get what you're trying to say. Try telling that to Miciaha, lololol.",
      3: "Phil is a saint.",
      4: "Phil said byeeeee toxic work culture! Lol, what a man!"
    }

    var phrase = Math.floor(Math.random() * 5 );

    return message.channel.send(phrases[phrase]);
}
};

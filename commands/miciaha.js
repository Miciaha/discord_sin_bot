module.exports = {
  name: "phil",
  description: "QUIT YOUR FUCKING JOB PHIL!",
  aliases: ["quit"],
  usage: [""],
  execute(message, args) {

    var phrases = {
      0: "QUIT YOUR FUCKING JOB DUDE! WTF ARE YOU DOING???",
      1: "We all see you're in an abusive relationship. Please get out. PLEASE QUIT!",
      2: "Bruh, if you died they'd replace you in a week. Is it worth it? Just leave.",
      3: "You're worth more than this madness. Move on <3",
      4: "Alexa, play Despicito and tell this fucker to quit their job."
    }

    var phrase = Math.floor(Math.random() * 5 );

    return message.channel.send(phrases[phrase]);
}
};

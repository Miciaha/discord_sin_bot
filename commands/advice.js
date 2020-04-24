var Sentiment = require("sentiment");

module.exports = {
  name: "advice",
  description: "Let the sin bot advise you. Ask yes/no questions",
  aliases: ["crystalball", "8ball", "shouldI"],
  usage: ["<question>"],
  execute(message, args) {
    var sentiment = new Sentiment();

    var options = {
      extras: {
        eat: 5,
        alcohol: 7,
        binge: 8,
        drink: 7,
        drunk: 9,
        plastered: 10,
        shit: 8,
        hammered: 10,
        exercise: -4,
        meditate: -4,
        patience: -5,
        fun: 6,
        read: -5,
        fuck: 7,
        damn: 5,
        shit: 6,
        games: 3,
        video: 1,
        bed: -4,
        sleep: -6,
        trashed: 8,
      },
    };

    var question = args.join(" ");

    if (
      question.includes("what") ||
      question.includes("What") ||
      question.includes("who") ||
      question.includes("Who") ||
      question.includes("when") ||
      question.includes("When") ||
      question.includes("where") ||
      question.includes("Where") ||
      question.includes("why") ||
      question.includes("Why") ||
      question.includes("how") ||
      question.includes("How")
    ) {
        return message.reply(" Uhm, I only answer yes/no questions...")
    }

    if(!question.includes("?")){
      var quips = {
        0: "I don't think that's a question",
        1: "I don't feel like answering that",
        2: "????",
        3: "I can't advise you if you're not asking a question",
        4: "Sir this is a Wendy's.",
      }

      var response = quips[Math.floor(Math.random() * 5)]

      return message.reply(response)
    }

    var result = sentiment.analyze(question, options);

    var phrases = {
      0: "YOU SPEAK MY FUCKING LANGUAGE! YES YES YES!",
      1: "yes! And maybe marry me?!",
      2: "of course, you brilliant, brilliant individual! :heart_eyes:",
      3: "ahaha! Definitely!",
      4: "YEA YEA YEA YEA YEA!!!",
      5: "oH FOr sUrE BAbY!",
      6: "most definitely!",
      7: "why even ask when you know the answer is DUH!",
      8: "sounds good, yeah!",
      9: "dude, of course!",
      10: "the cards say... yes.",
      11: "as you have written, so it shall be :relieved:",
      12: ":metal: Heck yes friendo :metal:",
      13: "you betcha",
      14: "uh huh",
      15: "maybe...",
      16: "nope.",
      17: "ever thought about just, like, answering your own damn questions?",
      18: "no.",
      19: "I guess...",
      20: "yep",
      21: "sounds like a horrible idea",
      22: "WHY WOULD I EVER SAY YES TO THIS?!",
      23: "definitely not...",
      24: "gross thing to ask, definitely not :middle_finger:",
      25: "nope",
      26: "no.",
      27: "negative.",
      28: "if I was a regular jerk, I’d say no to this one.",
      29: "is the mitochondria the powerhouse of the cell?",
      30: "I totally ‘scored’ getting asked by you. Yes!",
      31: "yes, my liege.",
      32: "upon close examination of the aforementioned data, I wholeheartedly accept your conclusion as plausible.",
      33: "give me an ‘N.’ Give me an ‘O.’ Give me an ‘N-O!’",
      34: "not today, Satan! Not today.",
      35: "how does ‘no’ sound to you?",
      36: "Bah hambug!",
      37: "Die!",
      38: "blah blah blah!",
      39: "you deserve a ‘boo’ for that idea."
    };

    var phrase = Math.floor(Math.random() * 40 );

    return message.reply(phrases[phrase]);
  },
};

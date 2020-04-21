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

    var result = sentiment.analyze(question, options);

    var excitedPhrases = {
      0: "YOU SPEAK MY FUCKING LANGUAGE! YES YES YES!",
      1: "Yes! And maybe marry me?!",
      2: "Of course, you brilliant, brilliant individual! :heart_eyes:",
      3: "Ahaha! Definitely!",
      4: "YEA YEA YEA YEA YEA!!!",
      5: "oH FOr sUrE BAbY!",
    };

    var enablingPhrases = {
      0: "Why even ask when you know the answer is DUH!",
      1: "Sounds good, yeah!",
      2: "Dude, of course!",
      3: "The cards say... yes.",
      4: "As you have written, so it shall be :relieved:",
      5: ":metal: Heck yes friendo :metal:",
    };

    var indifferentPhrases = {
      0: "Presumably",
      1: "Maybe...",
      2: "Nope.",
      3: "Ever thought about just, like, answering your own damn questions?",
      4: "No.",
      5: "I guess...",
    };

    var disagreePhrases = {
      0: "Sounds like a horrible idea",
      1: "WHY WOULD I EVER SAY YES TO THIS?!",
      2: "Definitely not...",
      3: "Gross thing to ask, definitely not :middle_finger:",
      4: "Nope",
      5: "No.",
    };

    var phrase = Math.floor(Math.random() * 6);

    if (result.score > 10) {
      return message.reply(excitedPhrases[phrase]);
    } else if (result.score > 3) {
      return message.reply(enablingPhrases[phrase]);
    } else if (result.score > -3) {
      return message.reply(indifferentPhrases[phrase]);
    } else {
      return message.reply(disagreePhrases[phrase]);
    }
  },
};

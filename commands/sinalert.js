const db = require("../db.js");

module.exports = {
    name: "sinalert",
    usage: "<user> <reason>",
    args: true,
    aliases: ["addSin", "newSin"],
    description: "Adds users sin to the sin database",
    async execute(message, args) {

        var sinner, record, mention;

        if (args[0].startsWith("<@") && args[0].endsWith(">")) {
            mention = args[0];

            mention = mention.slice(2, -1);

            if (mention.startsWith("!")) {
                mention = mention.slice(1);
            }

            var userName = message.client.users.cache.get(mention).username;

            console.log(userName);

            //Add user if they don't exist in the database
            try {
                // equivalent to: INSERT INTO tags (name, description, username) values (?, ?, ?);
                sinner = await db.sinners.create({
                    discord_id: mention,
                    discord_name: userName,
                    sin_count: 1,
                });
                //return message.channel.send(`${userName}\'s first sin has been recorded... Excellent \:smiling_imp:`);
            }
            catch (e) {

                console.log("User is already in the database, kewl. Increasing send counter and moving on");

                try {

                    const moreSin = await db.sinners.findOne({ where: {discord_id: mention}});
                    if(moreSin){
                        moreSin.increment('sin_count');
                    }
                    // count = count + 1;

                    // const updateCount = await db.sinners.update({ sin_count: count }, { where: { discord_id: mention } });
                    // console.log(updateCount);

                }
                catch (e) {
                    console.log(e.name);
                    message.channel.send(`Something went wrong when trying to update the counter`)
                }

                //return message.reply('Something went wrong with adding a tag.');
            }

        } else {
            message.channel.send(
                `${message.author} try using the command again with the format being <user> <reason>`
            )
        }

        if (args[1]) {
            args.shift()
            var reason = args.join(' ');

            console.log(reason);

            var userName = message.client.users.cache.get(mention).username;

            //Add record 

            try {
                // equivalent to: INSERT INTO tags (name, description, username) values (?, ?, ?);
                record = await db.records.create({
                    user_id: userName,
                    description: reason,
                    sinnerDiscordId: mention,
                });
                return message.channel.send(`${userName}\'s sin has been recorded.`);
            }
            catch (e) {
                if (e.discord_id === 'SequelizeUniqueConstraintError') {
                    //return message.reply('That tag already exists.');
                    console.log("User is already in the database, kewl. Moving on.")
                }
                //return message.reply('Something went wrong with adding a tag.');
            }

        } else {
            message.channel.send(
                `${message.author} try using the command again with the format being <user> <reason>`
            )
        }
    }
};

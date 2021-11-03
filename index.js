require('dotenv').config();
const Discord = require('discord.js');
const {Client, Intents} = require('discord.js');
const client = new Client({intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES]});
client.commands = new Discord.Collection();
const botCommands = require('./commands');
const mongoose = require('mongoose');
const Users = require('./models/users');
const {getUserInfo, addPoints, updateLevel} = require('./functions/userFunctions');

client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
    mongoose.connect(process.env.mongodbURI);
});

Object.keys(botCommands).map((key) => {
    client.commands.set(botCommands[key].name, botCommands[key]);
});

client.on('messageCreate', (msg) => {
    const args = msg.content.split(/ +/);
    const command = args.shift().toLowerCase();

    if (!client.commands.has(command)) {
        getUserInfo(msg.author.id).then(userInfo => {
            console.log(userInfo);

            addPoints(msg.author.id);

            if (userInfo.points > 100) {
                updateLevel(msg.author.id);
                msg.reply('Congratulations, you level up!')
            }
        });
        return;
    };

    Users.findOne({id: msg.author.id}, function (err, obj) {
        if (err) {
            console.log(err);
        } else {
            if (obj === null) {
                const doc = Users.create({userId: msg.author.id});
                doc.save();
            }
        }
    });

    try {
        if (msg.content.includes('gamble')) {
            client.commands.get(command).execute(msg, args);
        } else if (msg.content.includes('stats')) {
            client.commands.get(command).execute(msg, args);
        } else {
            getUserInfo(msg.author.id).then(userInfo => {
                console.log(userInfo);

                addPoints(msg.author.id);

                if (userInfo.points > 100) {
                    updateLevel(msg.author.id);
                    msg.reply('Congratulations, you level up!')
                }
            });
            client.commands.get(command).execute(msg, args);
        }
    } catch (error) {
        console.error(error);
        msg.reply('There was an error.');
    }
});

client.login(process.env.token);

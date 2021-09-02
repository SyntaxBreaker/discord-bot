require('dotenv').config();
const fs = require('fs');
const Discord = require('discord.js');
const client = new Discord.Client();
client.commands = new Discord.Collection();
const botCommands = require('./commands');

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);

  if (!fs.existsSync('database.json')) {
    fs.writeFile('database.json', '{}', function (err) {
      if (err) throw err;
    });
  }
});

Object.keys(botCommands).map((key) => {
  client.commands.set(botCommands[key].name, botCommands[key]);
});

client.on('message', (msg) => {
  const args = msg.content.split(/ +/);
  const command = args.shift().toLowerCase();
  let db = JSON.parse(fs.readFileSync('./database.json', 'utf-8'));

  if (!client.commands.has(command)) return;

  if (!db[msg.author.id]) {
    db[msg.author.id] = {
      xp: 0,
      level: 0,
    };
  }

  let userData = db[msg.author.id];

  try {
    if (msg.content.includes('gamble')) {
      client.commands.get(command).execute(msg, args);
    } else if(msg.content.includes('stats'))  {
      client.commands.get(command).execute(msg, args, userData);
    } else {
      userData.xp += Math.floor(Math.random() * 10) + 1;

      if (userData.xp > 100) {
        userData.level++;
        userData.xp = 0;
        msg.reply(`Congratulations, you level up!`);
      }

      fs.writeFile('./database.json', JSON.stringify(db), (err) => {
        if (err) console.error(err);
      });

      client.commands.get(command).execute(msg, args);
    }
  } catch (error) {
    console.error(error);
    msg.reply('There was an error.');
  }
});

client.login(process.env.TOKEN);

const fs = require("fs");

module.exports = {
  name: "gamble",
  description: "",
  execute(msg, args) {
    let db = JSON.parse(fs.readFileSync('./database.json', 'utf-8'));
    let userData = db[msg.author.id];

    if (args === 0) {
      msg.reply(`You can't bet because you have 0 points!`);
    } else if (args > 100) {
      msg.reply(`You can't bet more than 100 points!`);
    } else {
      if (userData.xp >= args) {
        let random = Math.floor(Math.random() * (2 - 1 + 1)) + 1;

        if (random === 1) {
          userData.xp -= parseInt(args);
          msg.reply(`You lost ${args} points!`);
        } else {
          userData.xp += parseInt(args);
          msg.reply(`You win ${args} points!`);
        }
      } else {
        msg.reply(`You can't bet more points than you have!`);
      }
    }
    fs.writeFile('./database.json', JSON.stringify(db), (err) => {
      if (err) console.error(err);
    });
  },
};

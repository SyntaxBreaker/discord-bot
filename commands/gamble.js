const {getUserInfo, removePoints, addPoints} = require('../functions/userFunctions');

module.exports = {
  name: "gamble",
  description: "",
  execute(msg, args) {
    getUserInfo(msg.author.id).then(userInfo => {
      if(args === 0) {
        msg.reply(`You can't bet 0 points!`);
      } else if(args > 100) {
        msg.reply(`You can't bet more than 100 points!`);
      } else {
        if(userInfo.points >= args) {
          let random = Math.floor(Math.random() * (2 - 1 + 1)) + 1;

          if(random === 1) {
            removePoints(msg.author.id, args);
            msg.reply(`You lost ${args} points!`);
          } else {
            addPoints(msg.author.id, args);
            msg.reply(`You win ${args} points!`);
          }
        } else {
          msg.reply(`You can't bet more points than you have!`);
        }
      }
    })
  },
};

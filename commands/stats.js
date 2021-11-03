const Discord = require('discord.js');
const {getUserInfo} = require('../functions/userFunctions');

module.exports = {
    name: 'stats',
    description: 'Show user stats',
    execute(msg, args) {
        getUserInfo(msg.author.id).then(userInfo => {
            const stats = new Discord.MessageEmbed()
                .setColor('#0099ff')
                .setTitle(`Stats ${msg.member.displayName}`)
                .addFields(
                    {name: 'Level:', value: `${userInfo.level}`},
                    {name: 'Points:', value: `${userInfo.points}`}
                );

            msg.reply({embeds: [stats]});
        });
    }
}
const Discord = require('discord.js');

module.exports = {
    name: 'stats',
    description: 'Show user stats',
    execute(msg, args, userData) {
        const stats = new Discord.MessageEmbed()
            .setColor('#0099ff')
            .setTitle(`Stats ${msg.member.displayName}`)
            .addFields(
                {name: 'Level:', value: `${userData.level}`},
                {name: 'Points:', value: `${userData.xp}`}
            )

        msg.reply(stats);
    }
}
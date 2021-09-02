const axios = require('axios');

module.exports = {
    name: 'activity',
    description: 'Gives you something to do',
    execute(msg, args) {
        axios.get(`https://www.boredapi.com/api/activity`)
            .then(res => msg.reply(res.data.activity))
    }
}
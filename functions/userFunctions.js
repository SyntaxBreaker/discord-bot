const mongoose = require('mongoose');
const Users = require('../models/users');

module.exports = {
    getUserInfo: async function(userId) {
        let userInfo = await Users.findOne({id: userId});
        if(!userInfo) return false;

        return userInfo;
    },
    addPoints: function(userId, points) {
        const pointsToAdd = points ? points[0] : Math.floor(Math.random() * 10) + 1;
        Users.findOneAndUpdate(userId, {$inc: {'points': +pointsToAdd}}).exec();
    },
    removePoints: function(userId, points) {
        const pointsToRemove = points ? points[0] : Math.floor(Math.random() * 10) + 1;
        Users.findOneAndUpdate(userId, {$inc: {'points': -pointsToRemove}}).exec();
    },
    updateLevel: function(userId) {
        Users.findOneAndUpdate(userId, {$inc: {'level': 1}, points: 0}).exec();
    },
}
const mongoose = require('mongoose');

const usersSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    userId: {
        type: String,
        required: true,
    },
    points: {
        type: Number,
        required: true,
        default: 0
    },
    level: {
        type: Number,
        required: true,
        default: 1
    }
});

const Users = mongoose.model('users', usersSchema);

module.exports = Users;
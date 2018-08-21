console.log('user.js works');

const mongoose = require('mongoose');

var UserSchema = new mongoose.Schema({
    username: String,
    password: String,
    portfolioValue: Number,
    principleValue: Number,
    investments: Array
}, {timestamps: true});

mongoose.model('User', UserSchema);

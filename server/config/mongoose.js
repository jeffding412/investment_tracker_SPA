console.log('mongoose.js works');

const mongoose = require('mongoose');
path = require('path'),
fs = require('fs');

module.exports = function(){
    mongoose.connect('mongodb://localhost:27017/investment_tracker', { useNewUrlParser: true });
    var models_path = path.join(__dirname, './../models');
    fs.readdirSync(models_path).forEach(function(file) {
        if(file.endsWith('.js')) {
            require(models_path + '/' + file);
        }
    });
}
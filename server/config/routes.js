console.log('routes.js works');

const Users = require('./../controllers/users.js');

module.exports = function(app){
    app.get('/users', Users.all);
    app.get('/users/:username', Users.findOne);
    app.get('/user/:id', Users.findOneByID);
    app.post('/users/login', Users.login);
    app.post('/users', Users.create);
    app.put('/users/:id', Users.update);
    app.put('/users/:id/buy', Users.buyInvestment);
    app.put('/users/:id/sell', Users.sellInvestment);
    app.delete('/users/:id', Users.delete);
}
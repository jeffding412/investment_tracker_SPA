console.log('routes.js works');

const Users = require('./../controllers/users.js');

module.exports = function(app){
    app.get('/users', Users.all);
    app.get('/users/:username', Users.findOne);
    app.post('/users/login', Users.login);
    app.post('/users', Users.create);
    // app.put('/task/:id', Tasks.update);
    app.delete('/users/:id', Users.delete);
}
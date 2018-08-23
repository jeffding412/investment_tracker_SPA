console.log('users.js works');

const mongoose = require('mongoose'),
User = mongoose.model("User");
const bcrypt = require('bcryptjs');

class Users{

    all(req, res){
        User.find({}, function(err, users){
            if(err){
                res.json({'status': 500, 'errors': err});
            }else{
                res.json(users);
            }
        });
    }

    findOne(req, res){
        User.findOne({username: req.params.username}, function(err, user){
            if(err){
                res.json({'status': 500, 'errors': err});
            }else{
                res.json(user);
            }
        });
    }

    findOneByID(req, res){
        User.findOne({_id: req.params.id}, function(err, user){
            if(err){
                res.json({'status': 500, 'errors': err});
            }else{
                res.json(user);
            }
        });
    }

    login(req, res) {
        User.findOne({username: req.body.username}, function(err, user){
            bcrypt.compare(req.body.password, user.password)
            .then(result => {
                if (result) {
                    res.json(user);
                }
                else {
                    res.json({'status': 500, 'errors': err});
                }
            })
        });
    }

    create(req, res){
        bcrypt.hash(req.body.password, 10)
        .then(hashed_password => {
            req.body.password = hashed_password;
            User.create(req.body, function(err, user){
                if(err){
                    res.json({'status': 500, 'errors': err});
                }else{
                    res.json(user);
                }
            });
        })
    }

    update(req, res){
        if (req.body.password) {
            bcrypt.hash(req.body.password, 10)
            .then(hashed_password => {
                req.body.password = hashed_password;
                User.update({_id: req.params.id}, req.body, function(err, user){
                    if(err){
                        res.json({'status': 500, 'errors': err});
                    }else{
                        res.json(user);
                    }
                });
            })
        }
        else {
            User.update({_id: req.params.id}, req.body, function(err, user){
                if(err){
                    res.json({'status': 500, 'errors': err});
                }else{
                    res.json(user);
                }
            });
        }
    }

    buyInvestment(req,res) {
        User.findOne({_id: req.params.id}, function(err, user){
            if(err){
                res.json({'status': 500, 'errors': err});
            }else{
                for (var i = 0; i < user["investments"].length; i++) {
                    if (user["investments"][i]["symbol"] == req.body.symbol) {
                        req.body.shares += user["investments"][i]["shares"];
                        req.body.principal = (parseFloat(user["investments"][i]["principal"]) + parseFloat(req.body.principal)).toFixed(2);
                        user["investments"].splice(i, 1);      
                    }
                }
                user.save(function(err) {
                    User.update({_id: req.params.id}, {$push: {investments: req.body}}, function(err, user){
                        if(err){
                            res.json({'status': 500, 'errors': err});
                        }else{
                            res.json(user);
                        }               
                    })
                })  
            }               
        })
    }

    sellInvestment(req, res) {
        User.findOne({_id: req.params.id}, function(err, user){
            var sold = false;
            if(err){
                res.json({'status': 500, 'errors': err});
            }else{
                for (var i = 0; i < user["investments"].length; i++) {
                    if (user["investments"][i]["symbol"] == req.body.symbol) {
                        req.body.shares = user["investments"][i]["shares"]-req.body.shares;
                        req.body.principal = ((parseFloat(user["investments"][i]["principal"]))*(req.body.shares/user["investments"][i]["shares"])).toFixed(2);
                        user["investments"].splice(i, 1);
                        sold = true; 
                    }
                }
                user.save(function(err) {
                    if (sold && req.body.shares > 0) {
                        User.update({_id: req.params.id}, {$push: {investments: req.body}}, function(err, user){
                            if(err){
                                res.json({'status': 500, 'errors': err});
                            }else{
                                res.json(user);
                            }               
                        })
                    }
                    else if (req.body.shares == 0) {
                        res.json({'status': 200});
                    }
                    else {
                        res.json({'status': 500, 'errors': err});
                    }
                })  
            }               
        })
    }

    delete(req, res){
        User.remove({_id: req.params.id}, function(err){
            if(err){
                res.json({'status': 500, 'errors': err});
            }else{
                res.json({'status': 200});
            }
        });
    }

}

module.exports = new Users();
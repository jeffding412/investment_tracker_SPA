console.log('users.js works');

const mongoose = require('mongoose'),
User = mongoose.model("User");
const bcrypt = require('bcryptjs');

class Users{

    all(req, res){
        console.log("getting users");
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

    login(req, res) {
        console.log(req.body);
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

    // update(req, res){
    //     Task.update({_id: req.params.id}, req.body, function(err, task){
    //         if(err){
    //             res.json({'status': 500, 'errors': err});
    //         }else{
    //             res.json({'status': 200, 'tasks': task});
    //         }
    //     });
    // }

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
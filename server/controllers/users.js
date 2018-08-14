console.log('users.js works');

const mongoose = require('mongoose'),
User = mongoose.model("User");

class Users{

    // all(req, res){
    //     console.log("getting tasks");
    //     Task.find({}, function(err, tasks){
    //         if(err){
    //             res.json({'status': 500, 'errors': err});
    //         }else{
    //             res.json({'status': 200, 'tasks': tasks});
    //         }
    //     });
    // }

    // findOne(req, res){
    //     Task.findOne({_id: req.params.id}, function(err, task){
    //         if(err){
    //             res.json({'status': 500, 'errors': err});
    //         }else{
    //             res.json({'status': 200, 'task': task});
    //         }
    //     });
    // }

    // create(req, res){
    //     Task.create(req.body, function(err, task){
    //         if(err){
    //             res.json({'status': 500, 'errors': err});
    //         }else{
    //             res.json({'status': 200, 'task': task});
    //         }
    //     });
    // }

    // update(req, res){
    //     Task.update({_id: req.params.id}, req.body, function(err, task){
    //         if(err){
    //             res.json({'status': 500, 'errors': err});
    //         }else{
    //             res.json({'status': 200, 'tasks': task});
    //         }
    //     });
    // }

    // delete(req, res){
    //     Task.remove({_id: req.params.id}, function(err){
    //         if(err){
    //             res.json({'status': 500, 'errors': err});
    //         }else{
    //             res.json({'status': 200});
    //         }
    //     });
    // }

}

module.exports = new Users();
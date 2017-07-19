var helpers = require('../config/helperfunctions.js');
var UserModel = require('../models/UserModel.js');
//FAKE DB
var users = {};
var max_user_id = 0;

module.exports = function(server){
	server.get("/",function(req,res,next){
		UserModel.find({}, function (err, users) {
		  helpers.success(res,next,users);
		});
		
	});

	server.get("/user/:id",function(req,res,next){
		req.assert('id','Id is required and must be numeric').notEmpty();
		var errors = req.validationErrors();
		if (errors) {
			helpers.failure(res,next,errors[0],400);
		}
		UserModel.findOne({_id:req.params.id}, function (err, user) {
			if(err){
				helpers.failure(res,next,'Something went wrong while fetching User from database',500);
			}
			if(user=== null){
				helpers.failure(res,next,"the specified user could not be found in the database",404);
			}
		  helpers.success(res,next,user);
		});
		
	});

	server.del("/user/:id",function(req,res,next){
		req.assert('id','Id is required and must be numeric').notEmpty().isInt();
		var errors = req.validationErrors();
		if (errors) {
			helpers.failure(res,next,errors[0],400);
		}
		UserModel.findOne({_id:req.params.id}, function (err, user) {
			if(err){
				helpers.failure(res,next,'Something went wrong while fetching User from database',500);
			}
			if(user=== null){
				helpers.failure(res,next,"the specified user could not be found in the database",404);
			}			
			user.remove(function(err){
				helpers.failure(res,next,'Error removing user from database',500);
			});
		  helpers.success(res,next,user);
		});
		delete users[parseInt(req.params.id)];
		helpers.success(res,next,[]);
	});

	server.put("/user/:id",function(req,res,next){
		req.assert('id','Id is required and must be numeric').notEmpty();
		var errors = req.validationErrors();
		if (errors) {
			helpers.failure(res,next,errors[0],400);
		}
		UserModel.findOne({_id:req.params.id}, function (err, user) {
			if(err){
				helpers.failure(res,next,'Something went wrong while fetching User from database',500);
			}
			if(user=== null){
				helpers.failure(res,next,"the specified user could not be found in the database",404);
			}
			
			var updates = req.params;
			delete updates.id;
			for(field in updates){
				user[field]=updates[field];
			}
			user.save(function(err){
				helpers.failure(res,next,'Error saving user to database',500);
			});
		  helpers.success(res,next,user);
		});
	});

	server.post("/user",function(req,res,next){
		req.assert('first_name','First name is requierd').notEmpty();
		req.assert('last_name','Last name is requierd').notEmpty();
		req.assert('email_address','Email is requierd and must be valid').notEmpty().isEmail();
		req.assert('career','must be either student,teacher or professor').isIn(['student','teacher','professor']);
		var errors = req.validationErrors();
		if (errors) {
			helpers.failure(res,next,errors,400);
		}
		var user = new UserModel();
		user.first_name = req.params.first_name;
		user.last_name = req.params.last_name;
		user.email_address = req.params.email_address;
		user.career = req.params.career;
		user.save(function(err){
			helpers.failure(res,next,'Error saving user to database',500);
		});
		helpers.success(res,next,user);
	});

}
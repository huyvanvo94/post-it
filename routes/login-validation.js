var express = require('express');
var router = express.Router();

//Controller to handle validation of Login form
router.post('/',
	function(req, res)
	{
		console.log("validate-sign-in");
		var username = req.param('username');
		var password = req.param('password');
		var db = req.db;
		var collection = db.get("users");

		collection.findOne({"userName": username}, function (e, docs) {

			var user = docs;
			var validated = user.validated;

			// user has validated the address through email
			if(validated && password === user.password){
                User = username;

                var userId = user._id.toString();
                res.cookie("id", userId);

                res.redirect('/');
			}else{
				// error
				// send back error
                res.redirect('/login.html');
			}

		});
	}
);

  module.exports = router;

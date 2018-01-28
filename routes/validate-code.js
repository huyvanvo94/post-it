var express = require('express');
var router = express.Router();
const querystring = require('querystring');
var alert= 0;
var userCode;
//var sess;


//Controller to handle validation of code
router.post('/',
	function (req, res){
		console.log("validate-code");
		var code = req.param("code");
		var userId = req.param("_id");
		sess = req.session;
		var db = req.db;

		//var studentId = process.env.studentId;
		var studentId = sess.studentId;

		console.log('student id on validate code page is ' + studentId);

		var collection = db.get("users");

		collection.findOne({"studentId": studentId}, function (e, docs){
			// should only return one!
			var user = docs;
			userCode = user.validation_code;
			var userId =  user._id.toString();

			if(code === userCode){
				collection.update({_id: userId}, {$set: {validated: true}}, function (err,docs) {

					if(err){

					}else{
						res.cookie("userId", userId);
						res.redirect("/home.html");
					}
                });
			}

			 else{
				const query = querystring.stringify({
					"alert": -1
				});
				res.redirect('/validation.html?'+query);
			}
 	});
});

module.exports = router;

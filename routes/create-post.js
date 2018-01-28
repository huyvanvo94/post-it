var express = require('express');
var router = express.Router();

router.get("/", function (req, res) {

    console.log("create-post.html");

    var userId = req.cookies.userId;

    if (userId) {

    	res.redirect("create-post.html");
	}else{
    	res.redirect("login.html");
	}
});


module.exports = router;

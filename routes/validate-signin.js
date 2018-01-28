var express = require('express');
var router = express.Router();
const querystring = require('querystring');
var User= " ";

//Controller to handle validation of Login form
router.post('/',
    function(req, res)
    {
        console.log("validate-sign-in");
        var username = req.param('username');
        var password = req.param('password');
        var db = req.db;
        var collection = db.get("users");

        collection.findOne({"username": username}, function (err, docs) {
            if(err){
                var query = querystring.stringify({
                    "v": 1
                });
                res.redirect('/login.html?'+query);
            }else{

                var user = docs;
                console.log(user===null);
                if(user === null){
                    var query = querystring.stringify({
                        "v": 1
                    });
                    res.redirect('/login.html?'+query);
                }else{
                    var validated = user.validated;

                    // user has validated the address through email
                    if(validated && password === user.password){
                        User = username;

                        var userId = user._id.toString();
                        res.cookie("userId", userId);
                        res.redirect('/');
                    }else{
                        // error
                        // send back error
                        var query = querystring.stringify({
                            "v": 1
                        });
                        res.redirect('/login.html?'+query);
                    }
                }
            }


        });
    }
);


module.exports = router;

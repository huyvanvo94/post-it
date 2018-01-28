var express = require('express');
var router = express.Router();

//Controller to handle validation of Login form
router.get('/',
    function(req, res)
    {
        console.log("email requested");
        var id = req.param('id');
        var db = req.db;
        var collection = db.get("users");

        collection.findOne({"_id": id}, function (err, docs) {
            if(err){
                res.redirect('/');
            }else{
                res.send(docs.emailAddress);
            }
        });
    }
);


module.exports = router;

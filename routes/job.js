var express = require('express');
var router = express.Router();

//Controller to render selling-post page
router.get('/',
	function(req, res)
	{
		res.redirect('/posts/job-post.html');
	}
);

module.exports = router;
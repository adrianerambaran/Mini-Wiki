var express = require('express');
var router = express.Router();
var articleController = require('../controllers/articleController');
// GET HOME PAGE
router.get('/',function(req,res)
{
	res.redirect('/wiki');
});

router.get('/edit/:url', function(req,res)
{
	res.redirect('/wiki/edit/'+req.params.url);
});


module.exports = router;
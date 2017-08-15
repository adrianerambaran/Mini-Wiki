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

router.get('/uploadImage', function(req,res)
{
	res.redirect('/wiki_image/uploadImage');
});

module.exports = router;
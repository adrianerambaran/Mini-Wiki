var express = require('express');
var router = express.Router();

//Require controllers
var articleController = require('../controllers/articleController');


router.get('/', articleController.index); //HomePage

router.get('/search', articleController.get_search_articles);

router.get('/edit/:url', articleController.get_edit_URL);

router.get('/:url', articleController.get_URL);

router.post('/edit/saveData', articleController.post_save_data);


module.exports = router;
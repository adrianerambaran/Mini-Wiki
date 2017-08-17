var express = require('express');
var router = express.Router();

//Require controllers
var imageController = require('../controllers/imageController');

router.get('/', imageController.index);

router.get('/uploadImage', imageController.get_upload_image);

router.post('/submitImage', imageController.post_submit_image);

module.exports = router;
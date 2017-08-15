var image = require('../models/WikiImages');
var multer = require('multer');
var path = require('path');
var customError = require('../CustomError');
const MAX_FILE_SIZE = 4000000; //4MB max size for file.
var storage = multer.diskStorage({
	destination: function(req, file, callback)
	{

		callback(null, '../public/uploaded_images');
	},
	filename: function(req, file, callback)
	{
		var fileExt = path.extname(file.originalname);
		callback(null, req.body.image_name + fileExt);	
	}
});
var upload = multer(
	{
		storage: storage, 
		limits:{fileSize: MAX_FILE_SIZE},
		fileFilter: function(req,file,callback)
		{
			var fileExt = path.extname(file.originalname);
			var imagePath =  '/public/upload_images/' + req.body.image_name + fileExt ;
			if(fileExt !== '.png' && fileExt !== '.jpg' && fileExt !== '.jpeg')
			{
				return callback(new customError('Invalid file type', 'INVALID_FILE_TYPE'));//return custom error code and handle in upload function
			}
			image.findImage(req.body.image_name + fileExt,function(err, result)
			{
				if(err) return callback(err);
				if(result[0].length > 0)
				{
					return callback(new customError('Image name already exists', 'ER_DUP_IMAGE'));//return custom error code and handle in upload function
				}
				callback(null, true);
			});
			
		},
	}).single('image_file'); 

exports.index = function(req,res,next)
{
	res.redirect('/wiki_image/uploadImage');
}
exports.get_upload_image = function(req,res,next)
{
	res.render('uploadImage');
};

exports.post_submit_image = function(req,res,next)
{
	upload(req,res,function(err)
	{
		if(err) return next(err);
		var fileExt = path.extname(req.file.originalname);
		var imagePath = req.file.destination.substring(2) + '/' + req.body.image_name + fileExt ;
		image.saveImage(req.body.image_name + fileExt, imagePath, fileExt, req.file.size, function(err, result)
		{
			if(err) return next(err);
			res.send('Image uploaded');
		});
	});
};



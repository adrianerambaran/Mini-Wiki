/*
--Creation of Stored Procedures for mySQL DB -> http://github.com/adrianerambaran/cleanMiniWiki/...
*/
var dbconnection = require('../dbconnection');

var imageQueries =
{
	saveImage: function(image_name,image_path,image_ext,image_size,callback)
	{
		return dbconnection.query('call saveImage(?,?,?,?)',[image_name,image_path,image_ext,image_size], callback);
	},

	findImage: function(image_name,callback)
	{
		return dbconnection.query('call findImage(?)',image_name,callback);
	}
};

module.exports = imageQueries;
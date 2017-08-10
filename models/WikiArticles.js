/*
--Creation of Stored Procedures for mySQL DB -> http://github.com/adrianerambaran/cleanMiniWiki/...
*/
var dbconnection = require('../dbconnection');


var wikiQueries = 
{
	findArticle:function(title,callback)
	{
		return dbconnection.query('call findArticle(?)', title, callback);
	},

	findTitle:function(title, callback)
	{
		return dbconnection.query('call findTitle(?)', title, callback);
	},

	saveArticleContent:function(title,content,callback)
	{
		return dbconnection.query('call saveArticleContent(?,?)', [title,content], callback);
	},

	saveArticle:function(title,content,prevTitle,callback)
	{
		return dbconnection.query('call saveArticle(?,?,?)', [title,content,prevTitle], callback);
	},

	deleteArticle:function(prevTitle, callback)
	{
		return dbconnection.query('call deleteArticle(?)', prevTitle, callback);
	},

	submitNewArticle:function(title, content,callback)
	{
		return dbconnection.query('call submitNewData(?,?)', [title, content], callback);
	},

	searchArticles:function(title, callback)
	{
		return dbconnection.query('call searchTitles(?)',title,callback);
	}
};

module.exports = wikiQueries;
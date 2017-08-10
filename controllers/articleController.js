var WikiArticle = require('../models/WikiArticles');
var path = require('path');
var marked = require('marked');

exports.index = function(req,res,next)
{
	WikiArticle.findArticle('Welcome to MiniWiki', function(err, result)
	{
		if(err) return next(err);

		//Successful...now render
		var article = 
		{
			title: result[0][0].title,
			content: marked(result[0][0].content)
		}
		res.render('homepage', article); 
	});
};

exports.get_URL = function(req,res,next)
{
	WikiArticle.findArticle(req.params.url, function(err, result)
	{
		if(err) return next(err);
		if(result[0].length > 0) //Article Exists. Return requested article.
		{
			var article = 
			{
				title: result[0][0].title,
				content: marked(result[0][0].content)

			}
			res.render('homepage', article);
		}
		else //Page not found...Should be added Page like Wikipedia if not Found.
		{
			res.render('Page_Not_Found', {title: req.params.url});
		}
	});
};

exports.get_edit_URL = function(req,res,next)
{
	var pageToEdit = req.originalUrl.substring(11).replace(/\%20/g, ' '); //Strip /wiki/edit and replace %20 with whitespace if any.
	
	WikiArticle.findArticle(pageToEdit, function(err, result)
	{
		if(err) return next(err);
		if(result[0].length > 0) //If a title exists, then we pull article, if not then return empty.
		{
			var article = 
			{
				title: result[0][0].title,
				content: result[0][0].content
			}
		}
		else
		{
			var article = 
			{
				title: pageToEdit,
				content: "ADD SOME TEXT"
			}
		}
		res.render('edit', article);
	});
};

exports.post_save_data = function(req,res,next)
{
	if(req.body.title == req.body.prevTitle)//Title hasn't changed or new article.
	{
		WikiArticle.findTitle(req.body.title,function(err,result)
		{
			if(err) return next(err);
			if(result[0].length > 0)//Update article if  title found.
			{
				WikiArticle.saveArticleContent(req.body.title, req.body.content, function(err, result)
				{
					if(err) return next(err);
					res.send({redirect: '../'+req.body.title});
				});
			}
			else //Create new article
			{
				WikiArticle.submitNewArticle(req.body.title, req.body.content,function(err,result)
				{
					if(err) return next(err);
					res.send({redirect: '../'+req.body.title});
				});
			}
		});
	}
	else //Title Change. Check if title can be used and updated.
	{
		WikiArticle.findTitle(req.body.title, function(err, result)
		{
			if(err) return next(err);
			if(result[0].length> 0)
			{
				res.send("Title is already being used. Enter in a different title name");
			}
			else//Update article and delete old one since title is being changed.
			{ 
					WikiArticle.saveArticle(req.body.title, req.body.content, req.body.prevTitle, function(err, result)
					{
						if(err) return next(err);
					});
					WikiArticle.deleteArticle(req.body.prevTitle, function(err,result)
					{
						if(err) return next(err);
						res.send({redirect: '../'+req.body.title});
					});
			}
		});
	}
};

//Fetch article titles that are have a substring of user input.
exports.get_search_articles = function(req,res,next)
{
	WikiArticle.searchArticles(req.query.text, function(err, result)
	{
		if(err) return next(err);
		var data = [];
		for(i=0;i<result[0].length;i++)
		{
			data.push(result[0][i].title);//[0][i] table.title
		}
		res.end(JSON.stringify(data)); //Send titles found.
	});
}


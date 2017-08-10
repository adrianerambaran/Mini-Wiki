#Database Tables/Schema

Create Table article_content(
title varchar(50) NOT NULL UNIQUE,
content TEXT,
created datetime NOT NULL default current_timestamp,
modified datetime NOT NULL default current_timestamp,
);

insert into article_content (title,content)
values ('# This is mini wiki
* As of now it supports adding pages
* editing pages
* Supports markdown from Marked Library[Marked]
* If you want to add a new page, simply enter a desired article name in the URL like this localhost:8080/wiki/[DESIRED ARTICLE NAME HERE]
[Marked]:https://github.com/chjj/marked');

##End Database Tables/Schema

#STORED PROCEDURES Creation
#

DELIMITER $$
Create procedure findTitle
(IN input_title varchar(50))
Begin 
Select title from article_content
WHERE title = input_title;
END $$
DELIMITER ;

DELIMITER $$
Create procedure findArticle
(IN input_title varchar(50))
Begin 
Select title, content from article_content
WHERE title = input_title;
END $$
DELIMITER ;

DELIMITER $$
Create procedure submitNewData
(IN input_title varchar(50), IN input_content TEXT)
Begin 
INSERT into article_content (title, content)
VALUES (input_title, input_content);
END $$
DELIMITER ;

DELIMITER $$
Create procedure saveArticleContent
(IN input_title varchar(50), IN input_content TEXT)
Begin
UPDATE article_content
SET content = input_content
WHERE title = input_title;
END $$
DELIMITER ;

DELIMITER $$
Create procedure saveArticle
(IN input_title varchar(50), IN input_content TEXT, IN input_prevTitle varchar(50))
Begin
UPDATE article_content
SET content = input_content, title = input_title
WHERE title = input_prevTitle;
END $$
DELIMITER ;

DELIMITER $$
Create procedure deleteArticle
(IN input_prevTitle varchar(50))
Begin
DELETE FROM article_content
WHERE title = input_prevTitle;
END $$
DELIMITER ;

DELIMITER $$
Create procedure searchTitles
(IN input_title varchar(50))
Begin 
Select title from article_content
WHERE title like CONCAT('%',input_title,'%');
END $$
DELIMITER ;
##End Stored Procedures
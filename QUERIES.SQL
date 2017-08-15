#Database Tables/Schema
/*
--AddOn in future
Add User table with email and password field.
-Add to wiki_article1 email field which will show the article belongs to that user. On Default set it to PUBLIC
--to show it belongs to no user and anyone can edit.
*/
Create Table wiki_article1(
title varchar(50) NOT NULL UNIQUE,
created datetime NOT NULL default current_timestamp,
modified datetime NOT NULL default current_timestamp,
Primary Key (title));

Create Table article_content1(
title varchar(50) NOT NULL UNIQUE,
content TEXT,
created datetime NOT NULL default current_timestamp,
modified datetime NOT NULL default current_timestamp,
);
create table uploaded_images
(
	image_id int(9) UNIQUE NOT NULL auto_increment,
    image_name varchar(50) NOT NULL,
    image_path varchar(255) NOT NULL,
    image_ext varchar(5) NOT NULL,
    image_size int(7) NOT NULL,
    image_create_date datetime NOT NULL default current_timestamp
);

insert into wiki_article2 (title) values('Welcome to MiniWiki');

insert into article_content2 (title,content)
values ('Welcome to MiniWiki','This is a mini Wiki created by Adriane Rambaran. 
	The wiki runs on a Node.js server and uses the Express Framework API. 
	The routing and parsing capabilities of the Express Framework are being utilized. 
	All content is hosted on a MySQL Database. Each title of a Wiki article must be unique.
	This is a mini Wiki created by Adriane Rambaran.');

##End Database Tables/Schema

#STORED PROCEDURES Creation
#

DELIMITER $$
Create procedure findTitle
(IN input_title varchar(50))
Begin 
Select title from article_content1
WHERE title = input_title;
END $$
DELIMITER ;

DELIMITER $$
Create procedure findArticle
(IN input_title varchar(50))
Begin 
Select title, content from article_content1
WHERE title = input_title;
END $$
DELIMITER ;

DELIMITER $$
Create procedure submitNewData
(IN input_title varchar(50), IN input_content TEXT)
Begin 
INSERT into article_content1 (title, content)
VALUES (input_title, input_content);
END $$
DELIMITER ;
select * from article_content1;

DELIMITER $$
Create procedure saveArticleContent
(IN input_title varchar(50), IN input_content TEXT)
Begin
UPDATE article_content1
SET content = input_content
WHERE title = input_title;
END $$
DELIMITER ;

DELIMITER $$
Create procedure saveArticle
(IN input_title varchar(50), IN input_content TEXT, IN input_prevTitle varchar(50))
Begin
UPDATE article_content1
SET content = input_content, title = input_title
WHERE title = input_prevTitle;
END $$
DELIMITER ;

DELIMITER $$
Create procedure deleteArticle
(IN input_prevTitle varchar(50))
Begin
DELETE FROM article_content1
WHERE title = input_prevTitle;
END $$
DELIMITER ;

DELIMITER $$
Create procedure searchTitles
(IN input_title varchar(50))
Begin 
Select title from article_content1
WHERE title like CONCAT('%',input_title,'%');
END $$
DELIMITER ;

DELIMITER $$
CREATE PROCEDURE saveImage
(IN input_image_name varchar(50), IN input_image_path varchar(100), IN input_image_ext varchar(5), IN input_image_size int (7))
Begin
Insert into uploaded_images (image_name, image_path, image_ext, image_size)
values (input_image_name, input_image_path, input_image_ext, input_image_size);
END $$
DELIMITER $$

##End Stored Procedures
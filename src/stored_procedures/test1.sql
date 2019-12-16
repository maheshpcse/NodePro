CREATE PROCEDURE IF NOT EXISTS `test_user`(IN `id` INT(100)) NOT DETERMINISTIC NO SQL SQL SECURITY DEFINER 


BEGIN 


CREATE TEMPORARY TABLE IF NOT EXISTS users(
    `userid` INT(100) NOT NULL,
    `name` VARCHAR(50) NOT NULL, 
    `age` INT(50) NOT NULL 
) ENGINE=memory;


ALTER TABLE `users`
    ADD PRIMARY KEY (`userid`)


set @mquery = concat("insert into users (userid,name,age) values (1,'john',24)"); 
PREPARE stat FROM @mquery; 
EXECUTE stat; 


set @mquery1 = concat("select * from users"); 
PREPARE stat FROM @mquery1; 
EXECUTE stat; 


END
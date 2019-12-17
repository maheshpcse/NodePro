CREATE PROCEDURE IF NOT EXISTS `test_task`(IN `id` INT(100)) NOT DETERMINISTIC NO SQL SQL SECURITY DEFINER


BEGIN


CREATE TEMPORARY TABLE IF NOT EXISTS tasks(
    `taskid` INT(100) NOT NULL,
    `title` VARCHAR(50) NOT NULL,
    `description` VARCHAR(50) NOT NULL
) ENGINE=memory;


ALTER TABLE `tasks`
    ADD PRIMARY KEY (`taskid`)


set @mquery = concat("insert into tasks (taskid,title,description) values (,'','')"); 
PREPARE stat FROM @mquery; 
EXECUTE stat;


END
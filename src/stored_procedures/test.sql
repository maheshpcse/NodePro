CREATE PROCEDURE IF NOT EXISTS `test_task`(IN `id` INT(100), IN `dates` DATE)

BEGIN

    set @tddate = dates;


    CREATE TEMPORARY TABLE IF NOT EXISTS `temp_tasks`(
        `id` INT(11) UNSIGNED NOT NULL,
        `task_id` INT(100) NOT NULL,
        `title` VARCHAR(100) NOT NULL,
        `description` VARCHAR(100) NOT NULL,
        `is_complete` TINYINT(1) NOT NULL,
        `user_id` INT(100) NOT NULL,
        `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    ) ENGINE=memory;

    ALTER TABLE `temp_tasks` ADD INDEX (`id`);

    ALTER TABLE `temp_tasks` ADD PRIMARY KEY (`task_id`);


    set @mquery = concat("insert into temp_tasks (title,description,is_complete,user_id,created_at,updated_at) values ('','','0',1,'",@tddate,"','",@tddate,"')"); 
    PREPARE stat FROM @mquery; 
    EXECUTE stat;


    set @mquery1 = concat("select * from temp_tasks");
    PREPARE stat FROM @mquery1;
    EXECUTE stat;

END
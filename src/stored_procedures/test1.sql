CREATE PROCEDURE IF NOT EXISTS `test_user`(IN `id` INT(100), IN `dates` DATE)


BEGIN


    set @tddate = dates;


    CREATE TEMPORARY TABLE IF NOT EXISTS `temp_users`(
        `id` INT(11) UNSIGNED NOT NULL,
        `user_id` INT(100) NOT NULL,
        `firstname` VARCHAR(100) NOT NULL,
        `lastname` VARCHAR(100) NOT NULL,
        `username` VARCHAR(100) NOT NULL,
        `email` VARCHAR(100) NOT NULL, 
        `password` VARCHAR(100) NOT NULL,
        `phonenumber` VARCHAR(20) NOT NULL,
        `role` VARCHAR(20) NOT NULL,
        `assigned_roles` ENUM('admin', 'user', 'manager') NOT NULL,
        `designation` VARCHAR(100) NOT NULL,
        `department` VARCHAR(100) NOT NULL,
        `profilePath` VARCHAR(255) NOT NULL,
        `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    ) ENGINE=memory;


    ALTER TABLE `temp_users` ADD INDEX (`id`);

    ALTER TABLE `temp_users` ADD PRIMARY KEY (`user_id`);


    set @mquery = concat("insert into temp_users (firstname,lastname,username,email,password,phonenumber,role,assigned_roles,designation,department,created_at,updated_at) values ('','','','','','','','','','','",@tddate,"','",@tddate,"')"); 
    PREPARE stat FROM @mquery; 
    EXECUTE stat;


    set @mquery1 = concat("select * from temp_users"); 
    PREPARE stat FROM @mquery1; 
    EXECUTE stat;


END
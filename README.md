# Web Server 应用开发

>## 原生代码实现简单博客功能

> 创建users表

> ——————————————————————————————————

| column        | datatype    |  PK主键 | nn不为空 | AI自动增加 | Default |
| --------      | :-----:     | :----:  | :----:   | :----:     | :----:  |
| id            |int          |   Y     |  Y       |            |         |
| username      | varchar(20) |         |  Y       |            |         |
| password      | varchar(20) |         |  Y       |            |         |
| realname      | varchar(20) |         |  Y       |            |         |


> 创建blogs表

> ——————————————————————————————————

| column        | datatype    |  PK主键 | nn不为空 | AI自动增加 | Default |
| --------      | :-----:     | :----:  | :----:  | :----:    | :----:  |
| id            |int          |   Y     |  Y      |           |         |
| title         | varchar(50) |         |  Y      |           |         |
| content       | longtext    |         |  Y      |           |         |
| createtime    | bigint(20)  |         |  Y      |           |     0   |
| author        | bigint(20)  |         |  Y      |           |         |


```SQL
    USE myblog;

    SHOW TABLES 
    INSERT INTO users (
        username,
        `password`,
        realname
    )
    VALUES
        ('lisan', '123', '李四');

    SELECT * FROM users

    USE myblog;

    -- SHOW TABLES 
    -- INSERT INTO users (
    -- 	username,
    -- 	`password`,
    -- 	realname
    -- )
    -- VALUES
    -- 	('lisan', '123', '李四');

    -- SELECT * FROM users

    -- UPDATE users set realname = '李四2' WHERE username='lisan'
    -- DELETE from users where username='lisi'

    -- SET sql_safe_update = 0

    -- INSERT INTO blogs (title, content, createtime, author) VALUES ('标题A','内容A',1546870368066,'lisi')

    SELECT * FROM blogs WHERE title LIKE '%标题%' ORDER BY createtime DESC;

    SELECT VERSION()

```

什么是cookie  非常重要
1、存储在浏览器的一段字符串（最大5KB）
2、跨域不共享
3、格式如k1=v1;k2=v2;k3=v3;因此可以存储结构化数据;
4、每次发送http请求，会将请求域的cookie一起发送给server；
5、server可以修改cookie并返回给浏览器;
6、浏览器中可以通过JavaScript修改cookie（有限制）

什么是session  非常重要


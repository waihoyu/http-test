# Web Server 应用开发

>## 原生代码实现简单博客功能

> 创建users表
> ——————————————————————————————————

| column        | datatype    |  PK主键      | nn不为空 | AI自动增加        | Default |
| --------      | :-----:     | :----:      | :----:   | :----:           | :----:  |
| id|int          |   Y         |  Y       |                  |         |
| username | varchar(20) |             |  Y       |                  |         |
| password | varchar(20) |             |  Y       |                  |         |
| realname | varchar(20) |             |  Y       |                  |         |





> 创建blogs表
> ——————————————————————————————————

| column        | datatype    |  PK主键      | nn不为空 | AI自动增加       | Default |
| --------      | :-----:     | :----:      | :----:   | :----:           | :----:  |
| id            |int          |   Y         |  Y       |                  |         |
| title      | varchar(50) |             |  Y       |                  |         |
| content      | longtext|             |  Y       |                  |         |
| createtime      | bigint(20) |             |  Y       |                  |     0    |
| author      | bigint(20) |             |  Y       |                  |         |



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
```
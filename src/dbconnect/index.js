/*
 *@description: 数据库连接信息
 *@author: Wai HoYu
 *@date: 2019-09-18 13:11:01
 *@version: V1.0.5
*/

const mysql = require('mysql')
const con = mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'123456',
    port:'3306',
    database: 'myblog'
});

con.connect()

const sql = 'select * from users';
con.query(sql, (err, result)=>{
    if (err) {
       console.error(err)
       return;     
    }
    console.log(result)
})

con.end()
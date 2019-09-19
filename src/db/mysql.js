/*
 *@description:
 *@author: Wai HoYu
 *@date: 2019-09-18 15:03:46
 *@version: V1.0.5
*/

const mysql = require('mysql')
const {MYSQL_CONF} = require('../conf/db')

const con = mysql.createConnection(MYSQL_CONF);
con.connect()
function exec(sql){
    const promise = new Promise((resolve, reject)=>{
        con.query(sql, (err, result)=>{
            if (err) {
                reject(err)
               return;     
            }
            resolve(result)
        })
    })
    return  promise;
}
module.exports = {
    exec
}

// const sql = 'select * from users';
// con.query(sql, (err, result)=>{
//     if (err) {
//        console.error(err)
//        return;     
//     }
//     console.log(result)
// })
// con.end()
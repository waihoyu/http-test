/*
 *@description:
 *@author: Wai HoYu
 *@date: 2019-09-18 01:12:09
 *@version: V1.0.5
*/

const {exec} = require('../db/mysql');


const login = (username, password)=>{
    // if (username === 'zhangsan' && password === '123') {
    //         return  true;
    // }
    // return false;
    const sql = `select username, realname from users  where username='${username}' and password='${password}' `;
    return exec(sql).then(rows =>{
        return rows[0] ||{};
    })
}

module.exports = {
    login
}



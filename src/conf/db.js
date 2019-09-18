/*
 *@description: 环境参数配置
 *@author: Wai HoYu
 *@date: 2019-09-18 13:01:09
 *@version: V1.0.5
*/
const env = process.env.NODE_ENV   //环境参数

//配置

let MYSQL_CONF = {}

if (env === 'dev') {
    MYSQL_CONF = {
        host:'localhost',
        user:'root',
        password:'123456',
        port:'3306',
        database: 'myblog'
    } 
}

if (env === 'production') {
    MYSQL_CONF = {
        host:'localhost',
        user:'root',
        password:'123456',
        port:'3306',
        database: 'myblog'
    } 
}

module.exports = {
    MYSQL_CONF
}
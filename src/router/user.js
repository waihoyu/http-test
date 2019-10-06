/*
 *@description:
 *@author: Wai HoYu
 *@date: 2019-09-17 14:21:07
 *@version: V1.0.5
*/


const {login} = require('../controller/user')
const {SuccessModel, ErrorModel} = require('../model/resModel')
const {get, set} = require('../db/redis');

const getCookieExpires = ()=>{
    const d = new Date();
    d.setTime(d.getTime() + (24 * 60 * 60 * 1000));
    return d.toGMTString();
}

const handleUserRouter = (req, res) => {
    const method = req.method;
    const url = req.url;
    const path = url.split('?')[0];
    if (method === 'POST' && path === '/api/user/login') {
        // const {username, password} = req.body //req.query;  
        const {username, password} = req.body //req.query;
        const result = login(username, password)
        return result.then(data => {
            if (data.username) {
                // res.setHeader('Set-Cookie', `username=${data.username}; path=/; httpOnly;expires=${getCookieExpires()}`)
                req.session.username = data.username;
                req.session.realname = data.realname;
                set(req.sessionId, req.session);
                return new SuccessModel() ;
            }
            return  new ErrorModel('登录失败');
        });
    }
    //登录验证的测试
    if (method === 'GET' && req.path === '/api/user/login-test') {
        console.log(req.session)
          if (req.session.username) {
             return Promise.resolve(new SuccessModel({
                 session: req.session
             }));
          }
          return  Promise.resolve(new ErrorModel("尚未登录！")); 
    }
}

module.exports = handleUserRouter
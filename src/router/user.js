/*
 *@description:
 *@author: Wai HoYu
 *@date: 2019-09-17 14:21:07
 *@version: V1.0.5
*/
const {loginCheck} = require('../controller/user')
const {SuccessModel, ErrorModel} = require('../model/resModel')

const handleUserRouter = (req, res) => {
    const method = req.method;
    const url = req.url;
    const path = url.split('?')[0];

    if (method === 'POST' && path === '/api/user/login') {
        const {username, password} = req.body
        const result = loginCheck(username, password)
        return result.then(data => {
            if (data.username) {
                   return new SuccessModel() ;
            }
            return  new ErrorModel();
        });
        // if (result) {
        //      return new SuccessModel()   
        // }
        // return new ErrorModel('login failed')
    }
}

module.exports = handleUserRouter
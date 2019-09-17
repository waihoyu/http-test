/*
 *@description:
 *@author: Wai HoYu
 *@date: 2019-09-17 14:21:07
 *@version: V1.0.5
*/

const handleUserRouter = (req, res) => {
    const method = req.method;
    const url = req.url;
    const path = url.split('?')[0];

    if (method === 'POST' && path === '/api/user/login') {
            return {
                msg: 'login'
            }
    }
 
}

module.exports = handleUserRouter
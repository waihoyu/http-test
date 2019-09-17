/*
 *@description:
 *@author: Wai HoYu
 *@date: 2019-09-18 01:12:09
 *@version: V1.0.5
*/


const loginCheck = (username, password)=>{
    if (username === 'zhangsan' && password === '123') {
            return  true;
    }
    return false;
}

module.exports = {
    loginCheck
}



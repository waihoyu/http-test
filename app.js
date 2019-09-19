/*
 *@description:
 *@author: Wai HoYu
 *@date: 2019-09-17 14:37:05
 *@version: V1.0.5
*/

const querystring = require('querystring')
const handleBlogRouter = require('./src/router/blog.js')
const handleUserRouter = require('./src/router/user.js')

const getCookieExpires = ()=>{
    const d = new Date();
    d.setTime(d.getTime() + (24 * 60 * 60 * 1000));
    return d.toGMTString();
}

const SESSION_DATA = {};

const getPostData = (req) => {
    const promise = new Promise((resolve, reject)=>{
        if (req.method !== 'POST') {
            resolve({})
            return     
        }
        if (req.headers['content-type'] !== 'application/json') {
            resolve({})
            return 
        }
        let postData = ''
        req.on('data', chunk =>{
            postData += chunk.toString()
        })
        req.on('end',()=>{
            if (!postData) {
                 resolve({})  
                 return  
            }
            resolve(JSON.parse(postData))
        }) 
    })
    return promise
}

const serverHandle = (req, res) => {
    res.setHeader('Content-type','application/json')
    const url = req.url;
    req.path = url.split('?')[0];
    req.query = querystring.parse(url.split('?')[1])
    
    //解析cookie
    req.cookie = {};
    const cookieStr = req.headers.cookie || '';  //  k1=v1;
    cookieStr.split(';').forEach(item=>{
        if (!item) {
             return    
        }
        const arr = item.split('=');
        const key = arr[0].trim();
        const val = arr[1].trim();
        req.cookie[key] = val;
    });

    //session处理
    let needSetCookie = false;
    let userId = req.cookie.userid;
    if (userId) {
           //session数据
        if (!SESSION_DATA[userId]) {
            SESSION_DATA[userId] = {};
         }
    }else {
        needSetCookie = true;
        userId = `${Date.now()}_${Math.random()}`;
        SESSION_DATA[userId] = {};
    }
    req.session =  SESSION_DATA[userId];

    //处理 post data;
    getPostData(req).then( postData =>{
        req.body = postData;
        //博客
        const blogResult = handleBlogRouter(req, res);
        if (blogResult) {
            blogResult.then(blogData =>{
                if (needSetCookie) {
                    res.setHeader('Set-Cookie', `userid=${userId}; path=/; httpOnly;expires=${getCookieExpires()}`)
                }
                res.end(JSON.stringify(blogData))
            });
            return ;
        }

        // const blogData = handleBlogRouter(req, res);
        // if (blogData) {
        //         res.end(
        //             JSON.stringify(blogData)
        //         )
        //         return
        // }
        //用户
        // const userData = handleUserRouter(req, res);
        // if (userData) {
        //         res.end(JSON.stringify(userData))
        //         return
        // }
        const userResult = handleUserRouter(req, res);
        console.log(userResult)
        if (userResult) {
            userResult.then(userData => {
                if (needSetCookie) {
                    res.setHeader('Set-Cookie', `userid=${userId}; path=/; httpOnly;expires=${getCookieExpires()}`); 
                }                
                res.end(JSON.stringify(userData));
            })
            return
        }
        res.writeHead(404, {"Content-type": "text/plain"})
        res.write("404 Not Found \n")
        res.end()
    })
}

module.exports = serverHandle


//-------------------------------------------------------
// const http = require('http')
// const querystring = require('querystring')

// const server = http.createServer((req, res)=>{
//     const method = req.method;
//     const url = req.url;
//     const path = url.split('?')[0];
//     const query = querystring.parse(url.split('?')[1]);
//     //设置返回格式为JSON
//     res.setHeader('Content-type','application/json');
//     // res.end('....')
//     //返回的数据
//     const resData = {
//         method,
//         url,
//         path,
//         query
//     }
//     //返回
//     if (method === 'GET') {
//         res.end(
//             JSON.stringify(resData)
//         )
//     }
//     if (method === 'POST') {
//         let postData = ''
//         req.on('data', chunk =>{
//             postData += chunk.toString()
//         })
//         req.on('end',()=>{
//             resData.postData = postData;
//             res.end(
//                 JSON.stringify(resData)
//             );
//         })        
//     }
// })
// server.listen(8000)
// console.log('OK')
/*
 *@description:
 *@author: Wai HoYu
 *@date: 2019-09-17 14:37:05
 *@version: V1.0.5
*/

const querystring = require('querystring')
const handleBlogRouter = require('./src/router/blog.js')
const handleUserRouter = require('./src/router/user.js')

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

    getPostData(req).then( postData =>{
        req.body = postData;
        //博客
        const blogResult = handleBlogRouter(req, res);
        if (blogResult) {
            blogResult.then(blogData =>{
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
        const userData = handleUserRouter(req, res);
        if (userData) {
                res.end(JSON.stringify(userData))
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
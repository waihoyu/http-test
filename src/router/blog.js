/*
 *@description: 路由
 *@author: Wai HoYu
 *@date: 2019-09-17 14:21:07
 *@version: V1.0.5
*/

const {getList, getDetail, newBlog, updateBlog, delBlog} = require('../controller/blog')
const {SuccessModel, ErrorModel} = require('../model/resModel')

//统一的登录验证函数
const loginCheck = (req)=>{
    if (req.session && !req.session.username) {
        return  Promise.resolve(new ErrorModel("尚未登录！")); 
        // return Promise.resolve(new SuccessModel({
        //     session: req.session
        // }));
     }    
}

const handleBlogRouter = (req, res) => {
    const method = req.method;
    const url = req.url;
    const path = url.split('?')[0];
    const id = req.query.id;
    // const query = query.

    //博客列表
    if (method === 'GET' && path === '/api/blog/list') {
        let author = req.query.author || '';
        const keyword = req.query.keyword || '';
        // const listData = getList(author, keyword);
        // return new SuccessModel(listData);     
        
        if (req.query.isadmin) {
            const loginCheckResult = loginCheck(req); 
            if (loginCheckResult) {
                return loginCheckResult;
            }
            author = req.session.username; 
        }

        const result = getList(author, keyword);
        // console.log(result)
        return result.then((listData)=>{
            return new SuccessModel(listData);
        });
    }
    //博客详情
    if (method === 'GET' && path === '/api/blog/detail') {
        // const data = getDetail(id);
        // return new SuccessModel(data);
        const result = getDetail(id);
        return result.then(data=>{
            return new SuccessModel(data);
        });
    }   

    //新建博客
    if (method === 'POST' && path === '/api/blog/new') {
        // const blogData = req.body;
        // const data = newBlog(blogData)
        // return new SuccessModel(data);
        const loginCheckResult = loginCheck(req);
        
        if (loginCheckResult) {
                return loginCheckResult;
        }
        const author = req.session.username;
        req.body.author = author ;
        const result = newBlog(req.body)
        return result.then(data=>{
            return new SuccessModel(data)
        })
    }
    //更新博客
    if (method === 'POST' && path === '/api/blog/update') {
        const loginCheckResult = loginCheck(req);
        if (loginCheckResult) {
                return loginCheckResult;
        }
       const result = updateBlog(id, req.body);
       return result.then(val => {
        console.log(val)
        if (val) {
            return new SuccessModel()
        }else {
            return new ErrorModel()
        }
       })
    }
    //删除博客
    if (method === 'POST' && path === '/api/blog/del') {
        const loginCheckResult = loginCheck(req);
        if (loginCheckResult) {
                return loginCheckResult;
        }
        const author = req.session.username;
        const result = delBlog(id, author);
        return result.then(val => {
            if (val) {
                return new SuccessModel()
            }else{
                return new ErrorModel()
            }
        })
    } 
}

module.exports = handleBlogRouter

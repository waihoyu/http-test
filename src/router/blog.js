/*
 *@description: 路由
 *@author: Wai HoYu
 *@date: 2019-09-17 14:21:07
 *@version: V1.0.5
*/

const {getList, getDetail, newBlog, updateBlog, delBlog} = require('../controller/blog')
const {SuccessModel, ErrorModel} = require('../model/resModel')

const handleBlogRouter = (req, res) => {
    const method = req.method;
    const url = req.url;
    const path = url.split('?')[0];
    const id = req.query.id;
    // const query = query.
    //博客列表
    if (method === 'GET' && path === '/api/blog/list') {
        const author = req.query.author || '';
        const keyword = req.query.keyword || '';
        // const listData = getList(author, keyword);
        // return new SuccessModel(listData);       
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
        const author = 'zhangsan';
        req.body.author = author ;
        const result = newBlog(req.body)
        return result.then(data=>{
            return new SuccessModel(data)
        })
    }
    //更新博客
    if (method === 'POST' && path === '/api/blog/update') {
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
        const author = 'zhangsan';
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


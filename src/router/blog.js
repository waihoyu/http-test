/*
 *@description:
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
    if (method === 'GET' && path === '/api/blog/list') {
        const author = req.query.author || '';
        const keyword = req.query.keyword || '';
        const listData = getList(author, keyword);
        return new SuccessModel(listData);
    }

    if (method === 'GET' && path === '/api/blog/detail') {
        const data = getDetail(id);
        return new SuccessModel(data);
    }   
    if (method === 'POST' && path === '/api/blog/new') {
        const blogData = req.body;
        const data = newBlog(blogData)
        return new SuccessModel(data);
    }
    if (method === 'POST' && path === '/api/blog/update') {
       const result = updateBlog(id, req.body);
       if (result) {
               return new SuccessModel({"t":123})
       }else{
        return new ErrorModel()
       }
    }
    if (method === 'POST' && path === '/api/blog/del') {
        const result = delBlog(id);
        if (result) {
            return new SuccessModel({"del":123})
        }else{
            return new ErrorModel()
        }
    } 
}
module.exports = handleBlogRouter
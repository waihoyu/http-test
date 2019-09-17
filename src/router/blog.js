/*
 *@description:
 *@author: Wai HoYu
 *@date: 2019-09-17 14:21:07
 *@version: V1.0.5
*/


const {getList, getDetail} = require('../controller/blog')
const {SuccessModel, ErrorModel} = require('../model/resModel')

const handleBlogRouter = (req, res) => {
    const method = req.method;
    const url = req.url;
    const path = url.split('?')[0];
    // const query = query.
    if (method === 'GET' && path === '/api/blog/list') {
        const author = req.query.author || '';
        const keyword = req.query.keyword || '';
        const listData = getList(author, keyword);
        return new SuccessModel(listData);
    }
    if (method === 'GET' && path === '/api/blog/detail') {
        const id = req.query.id;
        const data = getDetail(id);
        return new SuccessModel(data);
    }   
    if (method === 'GET' && path === '/api/blog/new') {
        return {
            msg: '新建'
        }
    }
    if (method === 'GET' && path === '/api/blog/update') {
        return {
            msg: '更新'
        }
    }
    if (method === 'GET' && path === '/api/blog/del') {
        return {
            msg: '删除'
        }
    } 
}

module.exports = handleBlogRouter
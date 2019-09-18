/*
 *@description:
 *@author: Wai HoYu
 *@date: 2019-09-17 15:27:58
 *@version: V1.0.5
*/

const {exec} = require('../db/mysql')

//获得博客的列表详情
const getList = (author, keyword) => {
        let sql = `select id, title, content, author from blogs where 1=1 `;
        if (author) {
            sql += `and author='${author}' `;
        }
        if (keyword) {
            sql += `and title like '%${keyword}%' `; 
        }
        sql += `order by createtime desc`;
        return exec(sql);
  }

//获得博客的详细内容
const getDetail = (id )=> {
    const sql = `select * from blogs where id='${id}' `
    //先返回假数据
    return exec(sql).then(rows=>{
        return rows[0]
    });
}

//新建博客
const newBlog = (blogData = {}) =>{
    const title = blogData.title;
    const content = blogData.content;
    const author = blogData.author;
    const createTime = Date.now(0);
    const sql = `insert into blogs (title, content, createtime,author) values ('${title}', '${content}', ${createTime}, '${author}')`;
    return exec(sql).then(insertData => {
        console.log(insertData);
        return {
            id: insertData.insertId
        }
    })
}

//更新博客
const updateBlog = (id, blogData = {}) =>{
    const title = blogData.title;
    const content = blogData.content;
    const sql = `update blogs set title= '${title}', content='${content}' where id='${id}'`;
    return exec(sql).then((updateData)=>{
        // console.log(updateData);
        if (updateData.affectedRows > 0) {
            return true;
        }
        return false;
    })
}

//删除博客
const delBlog = (id, author) =>{
    console.log('del blog')
    const sql = `delete from blogs where id='${id}' and author='${author}' `;
    return exec(sql).then((delData)=>{
        console.log(delData);
        if (delData.affectedRows > 0) {
            return true;
        }
        return false;
    })
}

module.exports = {
    getList,
    getDetail,
    newBlog,
    updateBlog,
    delBlog
}



const getList1 = (author, keyword) => {
    return [
        {
            id: 1,
            title: '标题A',
            content: '内容A',
            createTime: 1546610491112,
            author:'zhangsan'
        },
        {
          id: 2,
          title: '标题B',
          content: '内容B',
          createTime: 1546610524373,
          author:'lisi'
      },
      {
          id: 3,
          title: '标题C',
          content: '内容C',
          createTime: 1546610491112,
          author:'zhangsan'
      }
    ]
  }




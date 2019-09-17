/*
 *@description:
 *@author: Wai HoYu
 *@date: 2019-09-17 15:27:58
 *@version: V1.0.5
*/

const getList = (author, keyword) => {
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

const getDetail = (id )=> {
    //先返回假数据
    return {
        id: 3,
        title: '标题C',
        content: '内容C',
        createTime: 1546610491112,
        author:'zhangsan'
    }
}

module.exports = {
    getList,
    getDetail
}
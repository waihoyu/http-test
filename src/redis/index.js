/*
 *@description: redis
 *@author: Wai HoYu
 *@date: 2019-09-19 13:50:32
 *@version: V1.0.5
*/

const redis = require('redis');
const redisClient = redis.createClient(6379, '127.0.0.1');
redisClient.on('error',(err)=>{
    console.log(err);
});

redisClient.set('myname','zhangsan2',redis.print);
redisClient.get('lisan', (err, val)=> {
    if (err) {
        console.error(err);
        return;
    }
    console.log('val',val);
    redisClient.quit();
});
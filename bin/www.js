/*
 *@description:
 *@author: Wai HoYu
 *@date: 2019-09-17 15:04:32
 *@version: V1.0.5
*/

const http = require('http')

const PORT = 6000

const serverHandle = require('../app')

const server = http.createServer(serverHandle)


server.listen(PORT);

console.log('OK')
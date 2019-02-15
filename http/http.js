var http = require('http')  //引入http模块

http
  .createServer(function(req, res) {
  	res.writeHead(200, {'Content-Type': 'text/plain'})
  	res.write('Hello Nodejs')
  	res.end()
  })  //启动服务器
  .listen(2019)  //监听端口
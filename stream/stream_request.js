var http = require('http')
var fs = require('fs')
// 需要npm install request
var request = require('request')

http.createServer(function(req, res) {
  // 使用fs模块读取文件
  //fs.readFile('jinbohui.jpg', function(err, data) {
  //  if(err) {
  //    res.end('file not exist!')
  //  } else {
  //    res.writeHeader(200, {
  //      'Content-Type': 'text/html'
  //    })
  //    res.end(data)
  //  }
  //})
  
  // 使用stream读取照片并且显示在浏览器中
  // fs.createReadStream('jinbohui.jpg').pipe(res)
  
  // 使用request读取照片并且显示在浏览器中，体验pipe事件的魔力
  request('https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=4118960086,2125569760&fm=27&gp=0.jpg').pipe(res)
}).listen(8090)
console.log('Server runing --- http://localhost:8090')
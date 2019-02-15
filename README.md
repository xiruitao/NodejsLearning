### Node.js简单了解

[官方文档](http://nodejs.cn/)中对Node.js的描述为：

Node.js 是一个基于 Chrome V8 引擎的 JavaScript 运行环境。 
Node.js 使用了一个事件驱动、非阻塞式 I/O 的模型，使其轻量又高效。 

1、Node.js是一个让JavaScript运行在服务器端的开发平台。Node.js不是一种独立的语言，Node.js使用JavaScript语言进行开发，运行在服务器端的V8引擎上。Node.js没有Web容器，它开发的网站可以不部署在任何HTTP服务器上。

#### http

```js
var http = require('http')  //引入http模块

http
  .createServer(function(req, res) {
  	res.writeHead(200, {'Content-Type': 'text/plain'})
  	res.write('Hello Nodejs')
  	res.end()
  })  //启动服务器
  .listen(2019)  //监听端口
```

在浏览器打开网址：localhost:2019，页面打印出Hello Nodejs

小应用：

爬取页面HTML源码

爬取页面内数据

站内评论

#### 事件监听

```js
var EventEmitter = require('events').EventEmitter
// 生成一个EventEmitter实例
var life = new EventEmitter()

// 设置监听事件数量增大,<=11
life.setMaxListeners(11)

// 监听函数

// 具名函数，可清楚
function water(who) {
	console.log('给 ' + who + ' 倒水')
}
life.on('touch', water)  //addEventListener

life.on('touch', function(who) {
  console.log('给 ' + who + ' 按摩')
})
life.on('touch', function(who) {
  console.log('给 ' + who + ' 做饭')
})
life.on('touch', function(who) {
  console.log('给 ' + who + ' 洗衣服')
})
life.on('touch', function(who) {
  console.log('给 ' + who + ' 扫地')
})
life.on('touch', function(who) {
  console.log('给 ' + who + ' 。。。6')
})
life.on('touch', function(who) {
  console.log('给 ' + who + ' .。。7')
})
life.on('touch', function(who) {
  console.log('给 ' + who + ' .。。8')
})
life.on('touch', function(who) {
  console.log('给 ' + who + ' .。。9')
})
life.on('touch', function(who) {
  console.log('给 ' + who + ' .。。10')
})
life.on('touch', function(who) {
  console.log('我还能再做一件事哦')
})

life.on('nani', function(who) {
  console.log('给 ' + who + ' 买衣服')
})
life.on('nani', function(who) {
  console.log('给 ' + who + ' 交工资')
})

// // 清除单个事件
// life.removeListener('touch', water)
// // 清除所有的指定事件
// life.removeAllListeners('touch')
// // 清除所有的事件
// life.removeAllListeners()

var a = life.emit('touch', '宝宝我')
var b = life.emit('nani', '老娘我')
var c = life.emit('haha', '老娘和宝宝')

// 查看被监听的事件数量
console.log(life.listeners('touch').length)
console.log(EventEmitter.listenerCount(life, 'touch'))
console.log(EventEmitter.listenerCount(life, 'nani'))
// 判断事件是否被监听
console.log(a) //true
console.log(b) //true
console.log(c) //false
```

输出为：

```
给 宝宝我 倒水
给 宝宝我 按摩
给 宝宝我 做饭
给 宝宝我 洗衣服
给 宝宝我 扫地
给 宝宝我 。。。6
给 宝宝我 .。。7
给 宝宝我 .。。8
给 宝宝我 .。。9
给 宝宝我 .。。10
我还能再做一件事哦
给 老娘我 买衣服
给 老娘我 交工资
11
11
2
true
true
false
```

#### 上下文

##### this

```js
// var pet = {
// 	words: '...',
// 	speak: function() {
// 		console.log(this.words)
// 		console.log(this === pet)
// 	}
// }
// pet.speak()  //作为对象的方法调用，this指向调用这个函数的对象
/*-----------------------------------------------------------*/
// function pet(words) {
// 	this.words = words

// 	console.log(this.words)
// 	console.log(this === global)
// }
// pet('...')  //函数的调用，this指向全局变量
/*-----------------------------------------------------------*/
function Pet(words) {
	this.words = words
	this.speak = function() {
		console.log(this.words)
		console.log(this)
	}
}
var cat = new Pet('Miao')
cat.speak()  //构造函数的调用，this指向实例对象（新构建好的对象）
```

输出为：

...
true

...
true

Miao
Pet { words: 'Miao', speak: [Function] }

##### call和apply

使用call和apply可以改变上下文执行对象，可以在自定义上下文中执行函数，两者作用相同，仅仅是方法的第二个参数不同，call直接使用参数列表，apply使用参数数组（可以直接用JavaScript本身有的arguments数组或者封装成数组[参数1，参数2，…]）。具体作用是调用一个对象的方法，以另一个对象替换当前对象，实际上是改变this指向的对象内容。

```js
function Pet(words) {
	this.words = words
	this.speak = function() {
		console.log(this.words)
	}
}

function Dog(words) {
	//使用call继承,参数直接传递
	Pet.call(this, words)  //通过call继承
	
	//使用apply继承，参数作为一个数组传递
	// Pet.apply(this, arguments)
}

var dog = new Dog('Wang')

dog.speak()
```

输出为：Wang

#### 回调函数

```JS
function learn(something) {
	console.log(something)
}

// 具名函数调用
function we(callback, something) {
	something += ' is cool'
	callback(something)
}
we(learn, 'Nodejs')


// 匿名函数调用
we(function(something) {
	console.log(something)
}, 'Jack')
```

输出为：

Nodejs is cool

Jack is cool

#### 同步/异步

```js
var c = 0

function printIt() {
	console.log(c)
}

//同步
// function plus() {
// 	// 设置延时
// 	setTimeout(function() {
// 		c += 1
// 	}, 1000)
// }
// plus()
// printIt()


//异步
function plus(callback) {
	setTimeout(function() {
		c += 1
		callback()
	}, 1000)
}
plus(printIt)
```

同步：输出0，1秒后结束

异步：1秒后输出1，结束

#### Promise

Promise最大的好处是在异步执行的流程中，把执行代码和处理结果的代码清晰地分离

Promise可以串行执行若干异步任务

Promise可以并行执行异步任务

#### Buffer

`Buffer` 类的实例类似于整数数组，但 `Buffer` 的大小是固定的、且在 V8 堆外分配物理内存。 `Buffer` 的大小在创建时确定，且无法改变。

`Buffer` 类是一个全局变量，使用时无需 `require('buffer').Buffer`。

小应用：

将图片转换为base64编码及从base64编码转换为图片

#### Stream

流（stream）是 Node.js 中处理流式数据的抽象接口。 `stream` 模块用于构建实现了流接口的对象。

Node.js 提供了多种流对象。 例如，[HTTP 服务器的请求](http://nodejs.cn/s/2RqpEw)和 [`process.stdout`](http://nodejs.cn/s/tQWUzG) 都是流的实例。

流可以是可读的、可写的、或者可读可写的。 所有的流都是 [`EventEmitter`](http://nodejs.cn/s/pGAddE) 的实例。

使用方法如下：

```js
const stream = require('stream');
```

[参考](https://github.com/CruxF/IMOOC/tree/master/Node)

#### 参考

慕课课程《进击的Node.js继承》一、二，已下架
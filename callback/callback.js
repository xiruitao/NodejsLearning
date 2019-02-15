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
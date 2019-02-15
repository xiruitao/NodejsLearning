var c = 0

function printIt() {
	console.log(c)
}

//同步
function plus() {
	// 设置延时
	setTimeout(function() {
		c += 1
	}, 1000)
}
plus()
printIt()


// //异步
// function plus(callback) {
// 	setTimeout(function() {
// 		c += 1
// 		callback()
// 	}, 1000)
// }
// plus(printIt)
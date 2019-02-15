var pet = {
	words: '...',
	speak: function() {
		console.log(this.words)
		console.log(this === pet)
	}
}

pet.speak()  //作为对象的方法调用，this指向调用这个函数的对象


// function pet(words) {
// 	this.words = words

// 	console.log(this.words)
// 	console.log(this === global)
// }

// pet('...')  //函数的调用，this指向全局变量



// function Pet(words) {
// 	this.words = words
// 	this.speak = function() {
// 		console.log(this.words)
// 		console.log(this)
// 	}
// }

// var cat = new Pet('Miao')

// cat.speak()  //构造函数的调用，this指向实例对象（新构建好的对象）
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
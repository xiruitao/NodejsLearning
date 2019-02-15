function clickIt(e) {
	window.alert('Button is clicked')
}

var button = document.getElementById('#button')

button.addEventListener('click', clickIt)

// nodejs报错: 
// ReferenceError: document is not defined
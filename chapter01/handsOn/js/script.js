window.addEventListener('load', start);

var redBar = null;
var greenBar = null;
var blueBar = null;

var redText = null;
var greenText = null;
var blueText = null;

var colorBox = null;

function start() {
    redBar = document.querySelector('#redBar');
    greenBar = document.querySelector('#greenBar');
    blueBar = document.querySelector('#blueBar');

    redText = document.querySelector('#redText');
    greenText = document.querySelector('#greenText');
    blueText = document.querySelector('#blueText');

    redText.value = redBar.value;
    greenText.value = greenBar.value;
    blueText.value = blueBar.value;

    colorBox = document.querySelector('.colorBox');
    colorBox.style.backgroundColor = `rgb(${redBar.value}, ${greenBar.value}, ${blueText.value})`
    
    redBar.addEventListener('input', function() {
        document.getElementById('redText').value = redBar.value
        updateBackgroundColor(colorBox)
    })
    greenBar.addEventListener('input', function() {
        document.getElementById('greenText').value = greenBar.value
        updateBackgroundColor(colorBox)
    })
    blueBar.addEventListener('input', function() {
        document.getElementById('blueText').value = blueBar.value
        updateBackgroundColor(colorBox)
    })

}

function updateBackgroundColor (element) {
	element.style.backgroundColor = `rgb(${redText.value}, ${greenText.value}, ${blueText.value} )`}
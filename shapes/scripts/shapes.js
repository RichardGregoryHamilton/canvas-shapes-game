$('#my-header').load('header.html');
$('#my-footer').load('footer.html');

setTimeout(function() {
    $('#coins-display .coins-badge').html(localStorage['shapesCoins']);
}, 100);

var shapes = [];
var playing = false;

function checkStorage(key) {
    if (!localStorage[key]) {
        localStorage[key] = JSON.stringify([]);
    }
}

checkStorage('shapesAchievements');
checkStorage('shapeScores');
checkStorage('shapePurchases');

if (!localStorage['shapesGamesPlayed']) {
    localStorage['shapesGamesPlayed'] = 0;
}

if (!localStorage['shapesTotalScore']) {
    localStorage['shapesTotalScore'] = 0;
}

if (!localStorage['shapesCoins']) {
    localStorage['shapesCoins'] = 0;
}

// Create a new canvas element and append to the DOM
function createCanvas() {
    $('#canvas-block').append('<canvas></canvas>');
}

function readyCanvas() {
    canvas = $('canvas')[0];
    ctx = canvas.getContext('2d');
    width = canvas.width;
    height = canvas.height;
}

var colors = ['red', 'orange', 'gold', 'green', 'blue', 'purple'];

function randColor() {
    return colors[Math.floor(Math.random() * colors.length)];
}

function fillShape(shape) {
    ctx.fillStyle = randColor();
    ctx.fill();
    shapes[0] = shape;
}

// There are different context functions for circles and rectangles.
function generateCircle() {
    ctx.beginPath();
    ctx.arc(150, 80, 30, 0, 2 * Math.PI);
    fillShape('circle');
}

function generateRectangle() {
    ctx.rect(100, 50, 100, 60);
    fillShape('rectangle');
}

function generateTriangle() {
    ctx.beginPath();
    ctx.moveTo(100, 100);
    ctx.lineTo(150, 50);
    ctx.lineTo(200, 100);
    ctx.lineTo(100,100);
    fillShape('triangle');
    ctx.closePath();
}

function generatePentagon() {
    ctx.beginPath();
    ctx.moveTo(120, 70);
    ctx.lineTo(150, 30);
    ctx.lineTo(180, 70);
    ctx.lineTo(180, 110);
    ctx.lineTo(120, 110);
    ctx.lineTo(120, 70);
    fillShape('pentagon');
    ctx.closePath();
}

function generateHexagon() {
    ctx.beginPath();
    ctx.moveTo(100, 80);
    ctx.lineTo(130, 50);
    ctx.lineTo(160, 50);
    ctx.lineTo(190, 80);
    ctx.lineTo(160, 110);
    ctx.lineTo(130, 110);
    ctx.lineTo(100, 80);
    fillShape('hexagon');
    ctx.closePath();
}

function generateStar() {
    ctx.beginPath();
    ctx.moveTo(150, 60);
    ctx.lineTo(160, 20);
    ctx.lineTo(170, 60);
    ctx.lineTo(210, 70);
    ctx.lineTo(170, 80);
    ctx.lineTo(160, 120);
    ctx.lineTo(150, 80);
    ctx.lineTo(110, 70);
    ctx.lineTo(150, 60);
    fillShape('star');
    ctx.closePath();
}

function rightAnswer() {
    incrementScore();
    clearCanvas();
    gameLoop();
}

//These selectShape() functions are called when their respective buttons are clicked
function selectShape(shape) {
    shapes[0] == shape ? rightAnswer() : gameOver();
}

function addCoins() {
    var currentCoins = Number(localStorage['shapesCoins']);
    var coinsEarned = Math.floor(score / 5);
    localStorage['shapesCoins'] = currentCoins > 0 ? currentCoins + coinsEarned: coinsEarned;
    $('#coins-display .coins-badge').html(localStorage['shapesCoins']);
}

// Game over has its own specialty canvas
function gameOver() {
    clearCanvas();
    createCanvas();
    readyCanvas();
    endMessage();
    resetScore();
    playing = false;
}

function endMessage() {
    ctx.font = '25px Arial';
    var gradient = ctx.createLinearGradient(80, 50, 200, 0);
    gradient.addColorStop('0', 'magenta');
    gradient.addColorStop('0.5', 'blue');
    gradient.addColorStop('1.0', 'red');
    ctx.fillStyle = gradient;
    ctx.fillText('Game Over', 80, 30);
    
    ctx.fillStyle = 'green';
    ctx.font = '15px Arial';
    ctx.fillText('STATISTICS', 80, 70);
    ctx.fillStyle = 'black';
    ctx.fillText('You scored ' + score + ' points', 80, 90);
    ctx.fillText('You reached level ' + level, 80, 110);
    ctx.fillText("You've earned " + Math.floor(score / 5) + " coins", 80, 130);
}

// As you level up, the time you have to select an answer decreases
function setTimer() {
    var previousScore = score;
    setTimeout(function() {
        if (score == previousScore) {
            gameOver();
        }
    }, levels[level]);
};

function gameLoop() {
    createCanvas();
    readyCanvas();
    randShape();
    setTimer();
}

function clearCanvas() {
    $('#canvas-block').empty();
}

function startGame() {
    // Clears the game over canvas
    if ($('#canvas-block').children.length > 0) {
        clearCanvas();
    }
    playing = true;
    localStorage['shapesGamesPlayed']++;
    $('#circle, #rectangle').css({ 'visibility': 'visible' });
    gameLoop();
    displayScore();
}

var controls = { 67: 'circle',
                 82: 'rectangle',
                 84: 'triangle', 
                 80: 'pentagon',
                 72: 'hexagon',
                 83: 'star' };
        
$(document).on('keydown', function(event) {
    if (playing) {
        if (Object.keys(controls).indexOf(String(event.keyCode)) != -1) {
            selectShape(controls[event.keyCode]);
			console.log('keycode' + controls[event.keyCode]);
        }
    }
});

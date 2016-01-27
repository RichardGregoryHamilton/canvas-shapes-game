$('#my-header').load('header.html');

var shapes = [];

function checkStorage(key) {
    if(!localStorage[key]) {
        localStorage[key] = JSON.stringify([]);
    }
}

checkStorage('shapesAchievements');
checkStorage('shapeScores');

if (!localStorage['shapesGamesPlayed']) {
    localStorage['shapesGamesPlayed'] = 0;
}

if (!localStorage['shapesTotalScore']) {
    localStorage['shapesTotalScore'] = 0;
}

// Create a new canvas element and append to the DOM
function createCanvas() {
    $('#canvas-block').append("<canvas class='my-canvas'></canvas>");
}

function readyCanvas() {
    canvas = $('.my-canvas')[0];
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
    shapes.push(shape);
}

// There are different context functions for circles and rectangles.
function generateCircle() {
    ctx.beginPath();
    ctx.arc(width / 2, height / 2, 50, 0, 2 * Math.PI);
    fillShape('circle');
}

function generateRectangle() {
    ctx.rect(width / 2, height / 2, 100, 160);
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
    ctx.moveTo(100, 100);
    ctx.lineTo(150, 50);
    ctx.lineTo(200, 100);
    ctx.lineTo(200, 150);
    ctx.lineTo(100, 150);
    ctx.lineTo(100, 100);
    fillShape('pentagon');
    ctx.closePath();
}

function generateHexagon() {
    ctx.beginPath();
    ctx.moveTo(100, 100);
    ctx.lineTo(150, 50);
    ctx.lineTo(200, 50);
    ctx.lineTo(250, 100);
    ctx.lineTo(200, 150);
    ctx.lineTo(150, 150);
    ctx.lineTo(100, 100);
    fillShape('hexagon');
    ctx.closePath();
}

function generateStar() {
    ctx.beginPath();
    ctx.moveTo(150, 60);
    ctx.lineTo(170, 10);
    ctx.lineTo(190, 60);
    ctx.lineTo(240, 80);
    ctx.lineTo(190, 100);
    ctx.lineTo(170, 150);
    ctx.lineTo(150, 100);
    ctx.lineTo(100, 80);
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
    shapes.slice(-1) == shape ? rightAnswer() : gameOver();
}

// Game over has its own specialty canvas
function gameOver() {
    clearCanvas();
    createCanvas();
    readyCanvas();
    endMessage();
    resetScore();
}

function endMessage() {
    ctx.font = '30px Arial';
    ctx.fillText('Game Over', 140, 50);
    ctx.font = '15px Arial';
    ctx.fillText('You scored ' + score + ' points', 140, 100);
    ctx.fillText('You reached level ' + level, 140, 120);
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
    localStorage['shapesGamesPlayed']++;
    $("#circle, #rectangle").css({ 'visibility': 'visible' });
    gameLoop();
    displayScore();
}

$(document).on('keydown', function(event) {
    if (event.keyCode == 67) {
        selectShape('circle');
    }
    else if (event.keyCode == 82) {
        selectShape('rectangle');
    }
    else if (event.keyCode == 84) {
        selectShape('triangle');
    }
    else if (event.keyCode == 80) {
        selectShape('pentagon');
    }
    else if (event.keyCode == 72) {
        selectShape('hexagon');
    }
    else if (event.keyCode == 83) {
        selectShape('star');
    }
});

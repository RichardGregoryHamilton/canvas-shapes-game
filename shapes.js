var canvasBlock = document.getElementsByClassName("canvas-block")[0];
var scoreBoard = document.getElementById("score");
var displayLevel = document.getElementById("level");
var score = 0;
var level = 1;

// Create a new canvas element and append to the DOM
function createCanvas() {
    var canvas = document.createElement("canvas");
    canvas.classList.add("my-canvas");
    canvasBlock.appendChild(canvas);
}

function readyCanvas() {
    canvas = document.getElementsByClassName("my-canvas")[0];
    ctx = canvas.getContext("2d");
    width = canvas.width;
    height = canvas.height;
}

var colors = ["red", "orange", "gold", "green", "blue", "purple"];

function randColor() {
    return colors[Math.floor(Math.random() * colors.length)];
}

// There are different context functions for circles and rectangles.
function generateCircle() {
    ctx.beginPath();
    ctx.arc(width/2, 50, 25, 0, 2 * Math.PI);
    ctx.fillStyle = randColor();
    ctx.fill();
}

function generateRectangle() {
    ctx.rect(100,10,100,70);
    ctx.fillStyle = randColor();
    ctx.fill();
}

var shapes = [];

// Randomly generates either a circle or rectangle
function randShape() {
    var rand = Math.random();
    if (rand > 0.5) {
        generateCircle();
        shapes.push("circle");
    }
    else {
        generateRectangle();
        shapes.push("rectangle");
    }
}

// When score increases, a check is performed to see if you can level up
function incrementScore() {
    score++;
    scoreBoard.innerHTML = "<strong>Score: </strong>" + score;
    incrementLevel();
}

function rightAnswer() {
    incrementScore();
    clearCanvas();
    gameLoop();
}

//These selectShape() functions are called when their respective buttons are clicked
function selectCircle() {
    shapes[shapes.length - 1] == "circle" ? rightAnswer() : gameOver();
}

function selectRectangle() {
    shapes[shapes.length - 1] == "rectangle" ? rightAnswer() : gameOver();
}

function resetScore() {
    score = 0;
    scoreBoard.innerHTML = "<strong>Score: </strong>" + score;
}

// There are 10 levels, so a switch statement is used here
function incrementLevel() {
    switch(true) {
        case (score < 10):
            level = 1;
            break;
        case (score >= 10 && score < 20):
            level = 2;
            break;
        case (score >= 20 && score < 30):
            level = 3;
            break;
        case (score >= 30 && score < 40):
            level = 4;
            break;
        case (score >= 40 && score < 50):
            level = 5;
            break;
        case (score >= 50 && score < 60):
            level = 6;
            break;
        case (score >= 60 && score < 70):
            level = 7;
            break;
        case (score >= 70 && score < 80):
            level = 8;
            break;
        case (score >= 80 && score < 100):
            level = 9;
            break;
        case (score > 100):
            level = 10;
            break;
    }
    displayLevel.innerHTML = "<strong>Level: </strong>" + level;
}

// Game over has its own specialty canvas
function gameOver() {
    resetScore();
    clearCanvas();
    createCanvas();
    readyCanvas();
    ctx.font = "30px Arial";
    ctx.fillText("Game Over", 30, 30);
}

// This is a hash that maps the levels with the time in ms to get an answer
var levels = { "1": 5000,
               "2": 4500,
               "3": 4000,
               "4": 3500,
               "5": 3000,
               "6": 2500,
               "7": 2000,
               "8": 1500,
               "9": 1000,
               "10": 500
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
    canvasBlock.removeChild(canvas);
}

function startGame() {
    // Clears the game over canvas
    if (canvasBlock.childNodes.length > 1) {
        clearCanvas();
    }
    else {
        gameLoop();
        scoreBoard.innerHTML = "<strong>Score: </strong>" + score;
        displayLevel.innerHTML = "<strong>Level: </strong" + level;
    }
}

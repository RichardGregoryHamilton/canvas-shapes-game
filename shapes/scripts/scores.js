
/* This JavaScript file deals with all score logic */

$('#my-header').load('header.html');
$('#my-footer').load('footer.html');

var displayLevel = document.getElementById('level');
var score = 0;
var scores = [];
var level = 1;

var oldScores = JSON.parse(localStorage['shapeScores']);

var sorted = oldScores.sort(function(scoreA, scoreB) {
    return scoreB - scoreA;
});

function displayScore() {
    var currentCoins = Number(localStorage['shapesCoins']);
    displayLevel.innerHTML = "<strong>Level: </strong>" + level + 
                             "<span id='score'>Score: " + score + "</span>" +
                             "<span id='high-score'>High Score: " + highScore() + "</span>" +
                             "<span id='coins'>Coins: " + "<span class='coins-badge'>" + currentCoins + "</span></span";
}

// When score increases, a check is performed to see if you can level up
function incrementScore() {
    score++;
    increaseTotalScore();
    displayScore();
    incrementLevel();
}

function increaseTotalScore() {
    var currentScore = Number(localStorage['shapesTotalScore']);
    localStorage['shapesTotalScore'] = ++currentScore;
}

function incrementLevel() {
    level = Math.ceil(score / 10);
    if (level == 2) {
        $('#triangle').css({ 'visibility': 'visible' });
    }
    if (level == 4) {
        $('#pentagon').css({ 'visibility': 'visible' });
    }
    if (level == 6) {
        $('#hexagon').css({ 'visibility': 'visible' });
    }
    if (level == 8) {
        $('#star').css({ 'visibility': 'visible' });
    }
    addAchievement(level);
    displayScore();
}

function highScore() {
    var currentScores = JSON.parse(localStorage['shapeScores']);
    var prevHigh = Math.max.apply(Math, currentScores);
    return Math.max(prevHigh, 0);
}

function addScores() {
    var shapeScores = JSON.parse(localStorage['shapeScores']);
    if (scores.indexOf(score) == -1) {
        scores.push(score);
    }
    if (shapeScores.length > scores.length) {
        var newScores = localStorage['shapeScores'].replace(']', ',') + score + ']';
        localStorage['shapeScores'] = newScores; 
    }
    else {
        localStorage['shapeScores'] = JSON.stringify(scores);
    }
}

function resetScore() {
    addScores();
    addCoins();
    score = 0;
    displayScore();
}

// This is a hash that maps the levels with the time in ms to get an answer
var levels = { 
               '1': 5000,
               '2': 4500,
               '3': 4000,
               '4': 3500,
               '5': 3000,
               '6': 2500,
               '7': 2000,
               '8': 1500,
               '9': 1000,
               '10': 500
             }

// Fill in the High Scores table
$('#scores-table tr:not(:first-child)').each(function(index) {
    var score = sorted[index];
    var level = Math.floor(score / 10) + 1;
    $(this).find('td:eq(1)').html(score || '');
    $(this).find('td:eq(2)').html(level || '');
});

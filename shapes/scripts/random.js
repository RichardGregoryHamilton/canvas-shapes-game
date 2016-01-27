/* This JavaScript file deals with the generation of random shapes */

function randShape() {
    var rand = Math.random();
    if (level < 2) {
        rand > 0.5 ? generateCircle() : generateRectangle();
    }
    else if (level >= 2 && level <= 3) {
        randMed();
    }
    else if (level >= 4 && level <= 5) {
        randHard();
    }
    else if (level >= 6 && level <= 7) {
        randExtreme();
    }
    else {
        randImpossible();
    }
}

function randMed() {
    var rand = Math.random();
    switch(true) {
        case rand > 0.66: 
            generateCircle();
            break;
        case (rand > 0.33 && rand <= 0.66):
            generateRectangle();
            break;
        default:
            generateTriangle();
            break;
    }
}

/* For the more advanced level this function randomly generates circles,
   rectangles, triangles or pentagons */
   
function randHard() {
    var rand = Math.random();
    switch(true) {
        case rand > 0.75:
            generateCircle();
            break;
        case (rand > 0.5 && rand <= 0.75):
            generateRectangle();
            break;
        case (rand > 0.25 && rand <= 0.5):
            generateTriangle();
            break;
        default:
            generatePentagon();
            break;
    }
}

function randExtreme() {
    var rand = Math.random();
    switch(true) {
        case rand > 0.8:
            generateCircle();
            break;
        case (rand > 0.6 && rand <= 0.8):
            generateRectangle();
            break;
        case (rand > 0.4 && rand <= 0.6):
            generateTriangle();
            break;
        case (rand > 0.2 && rand <= 0.4):
            generatePentagon();
            break;
        default:
            generateHexagon();
            break;
    }
}

function randImpossible() {
    var rand = Math.random();
    switch(true) {
        case rand > 0.83:
            generateCircle();
            break;
        case (rand > 0.67 && rand <= 0.83):
            generateRectangle();
            break;
        case (rand > 0.5 && rand <= 0.67):
            generateTriangle();
            break;
        case (rand > 0.33 && rand <= 0.5):
            generatePentagon();
            break;
        case (rand > 0.17 && rand <= 0.33):
            generateStar();
            break;
        default:
            generateHexagon();
            break;
    }
}
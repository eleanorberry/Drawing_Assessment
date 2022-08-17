/** This file contains
 * Col array
 * Grid class
 * Canvas height and width specifications
 * Interactive Object class
 * Shape classes (Rect, ellipse and Line)
 *
 */
// Colours used throughout the program in an array
let colArray = [
    [ // opaque
        // black (0)               black (1)               black (2)
        "rgba(0,0,0,1)", "rgba(0,0,0,0.58)", "rgb(0,0,0,0.35)",
        // grey (0)               grey (1)               grey (2)
        "rgb(150,150,150)", "rgba(150,150,150,0.56)", "rgb(150,150,150,0.35)",
        // white (0)               white (1)               white (2)
        "rgb(255,255,255)", "rgba(255,255,255,0.6)", "rgba(255,253,253,0.4)",
        // red  (3)            (4) red 2            (5) red 3
        "rgb(255,36,36)", "rgba(255,31,31,0.69)", "rgba(255,24,24,0.42)",
        // Orange (6)          Orange 2   (7)         Orange 3 (8)
        "rgb(252,86,34)", "rgba(236,106,62,0.65)", "rgba(243,128,54,0.42)",
        // Yellow (9)           Yellow 2   (10)        Yellow 3 (11)
        "rgb(255,234,0)", "rgba(244,232,0,0.7)", "rgba(255,222,7,0.47)",
        // Green (12)        Green 2   (13)       Green 3 (14)
        "rgb(3,196,3)", "rgb(3,196,3,0.63)", "rgba(3,196,3,0.43)",
        // Blue (9)          Blue 2  (10)        Blue 3 (11)
        "rgb(8,24,253)", "rgba(0,85,244,0.56)", "rgba(33,139,215,0.4)",
        // Pink (12)          Pink 2  (13)        Pink 3 (14)
        "rgb(255,143,253)", "rgba(255,143,253,0.56)", "rgba(255,143,253,0.38)",
        // Brown (15)          Brown 2  (16)        Brown 3 (17)
        "rgb(141,85,36)", "rgba(141,85,36,0.56)", "rgba(141,85,36,0.35)",
        // Brown (18)          Brown 2  (19)        Brown 3 (20)
        "rgb(241,194,125)", "rgba(241,194,125,0.54)", "rgba(241,194,125,0.35)"

    ],
    [ // formatting colours - specifically to play around with interface design
        // black (0)               grey (1)               white (2)
        "rgba(0,0,0,1)", "rgba(150,150,150,1)", "rgb(255,255,255)",
        // pink  (3)           purple (4)       deep blue (5)
        "rgb(255,143,253)", "rgb(153,19,206,1)", "rgb(16,16,250,1)",
        // pale blue (6)           yellow   (7)         bright yellow (8)
        "rgba(135,211,243,1)", "rgba(246,244,193,1)", "rgba(250,250,0,1)",
        // intense green (9)           pale pink   (10)        dull green (11)
        "rgb(188,215,172)", "rgb(203,166,175)", "rgb(136,204,133)",
        // red (12)           dull red   (13)        orange red (14)
        "rgb(208,67,67)", "rgb(243,124,43)", "rgba(255,100,100,1)"
    ]
];

canvas = document.querySelector('#myCanvas');
let ctx = canvas.getContext('2d');

// Defining the height and width of the canvas
let width = 1000;
let height = 700;

// Defining the scale
let scale = 2;

// Setting the canvas' width and height
canvas.width = width * scale;
canvas.height = height * scale;
ctx.scale(scale, scale);

// Bringing in the canvas
// Laying out basic styling
let my_c = document.getElementById('myCanvas');
my_c.style.backgroundColor = "rgb(218,215,215)";
my_c.style.width = width + "px";
my_c.style.height = height + "px";
my_c.style.border = "8px solid rgba(0, 0, 0)";
my_c.style.display = "block";
my_c.style.margin = "auto";
document.body.style.backgroundColor = "rgb(188,215,172)";

/**
 * Interactive object class - used as the base for all objects in program
 */
class InteractiveObject {
    constructor() {
        // Listeners to test mouse and send signals
        canvas.addEventListener('mousedown', this.mDown.bind(this));
        canvas.addEventListener('mouseup', this.mUp.bind(this));
        canvas.addEventListener('mousemove', this.mMove.bind(this));
        canvas.addEventListener('mouseleave', this.mLeave.bind(this));
        canvas.addEventListener('click', this.mClick.bind(this));
        this.xMouseStart = 0;
        this.yMouseStart = 0;
        this.xMouse = 0;
        this.yMouse = 0;
        this.mouseIsDown = false;
    }
    mDown(e) {
        // Finds the coordinates of the point clicked down on
        this.xMouseStart = e.offsetX;
        this.yMouseStart = e.offsetY;
        this.mouseIsDown = true;
    }
    mUp(e) {
        // Mouse has been released
        this.mouseIsDown = false;
    }

    mMove(e) {
        // Coordinates of the mouse moving
        this.xMouse = e.offsetX;
        this.yMouse = e.offsetY;
    }
    mLeave(e) {
        // The mouse has left the canvas
        this.mouseIsDown = true;
    }

    mClick(e) {}
    // To check whether the mouse is in an area (button, drawing area etc.)
    inBoundsCheck(xmid, ymid, x, y, w, h) {
        // If within the area return true
        if (xmid > x && xmid < x + w && ymid > y && ymid < y + h) {
            return true;
            // Otherwise false
        } else {
            return false;
        }
    }
}
/**
 * Class to draw a rectangle
 * @param {number} x x coordinate of rectangle
 * @param {number} y y coordinate of rectangle
 * @param {number} w width
 * @param {number} h height
 * @param {string} fill The fill colour of rectangle
 */
class Rectangle {
    constructor(x, y, w, h, fill) {
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        this.fill = fill;
    }
    // Triggers the class
    update() {
        this.draw();
    }
    // Active part
    draw() {
        ctx.fillStyle = this.fill;
        // begins the drawing
        ctx.beginPath();
        // calls in the rectangle function with the variables
        ctx.rect(this.x, this.y, this.w, this.h);
        // fills the shape with the preselected swatch
        ctx.fill();
    }

}

/***
 * This is a class to draw an ellipse
 * @param {number} x coordinate of centre
 * @param {number} y coordinate of centre
 * @param {number} w width
 * @param {number} h height
 * @param {string} fillcolour fill colour
 */
class Ellipse {
    constructor(x, y, w, h, fillcolour) {
        this.x = x + w / 2;
        this.y = y + h / 2;
        // Calculating the radius of the ellipse
        this.xR = Math.abs(w / 2);
        this.yR = Math.abs(h / 2);
        this.c = fillcolour;
    }

    update() {
        // Triggers the class
        this.draw();
    }

    draw() {
        // starts the drawing
        ctx.beginPath();
        // Calls in the ellipse function using the variables
        ctx.ellipse(this.x, this.y, this.xR, this.yR, 0, 0, 2 * Math.PI);
        ctx.fillStyle = this.c;
        // fills the shape with the preselected swatch
        ctx.fill();
    }
}

/***
 * Class that generates a line
 * @param {number} x coordinate of first point
 * @param {number} y coordinate of first point
 * @param {number} w width
 * @param {number} h height
 * @param {string} c colour filled
 * @param {number} lw stroke width
 */
class Line {
    constructor(x, y, w, h, c, lw) {
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        this.lw = lw;
        this.fill = c;
    }

    update() {
        // Triggers the class
        this.draw();
    }

    draw() {
        ctx.strokeStyle = this.fill;
        // Takes the preselected line width size
        ctx.lineWidth = this.lw;
        ctx.lineCap = "round";
        ctx.beginPath();
        ctx.moveTo(this.x, this.y);
        // Takes the coordinates of the mouse's movement and draws a line
        ctx.lineTo(this.x + this.w, this.y + this.h);
        ctx.stroke();
    }
}

/***
 * This is a class to draw a triangle
 * @param {number} x coordinate of centre
 * @param {number} y coordinate of centre
 * @param {number} w width
 * @param {number} h height
 * @param {string} fill fill colour
 */
class Triangle {
    constructor(x, y, w, h, fill) {
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        this.fill = fill;
    }

    update() {
        this.draw();
    }

    draw() {
        ctx.fillStyle = this.fill;
        ctx.beginPath();
        // Calculates the position for the first point
        ctx.moveTo(this.x + this.w / 2, this.y);
        // Draws a line to the second point
        ctx.lineTo(this.x + this.w, this.y + this.h);
        // Closes the triangle
        ctx.lineTo(this.x, this.y + this.h);
        ctx.closePath();
        ctx.fill();
    }
}
/***
 * This is a class to draw a rotating triangle
 * @param {number} x coordinate of centre
 * @param {number} y coordinate of centre
 * @param {number} w width
 * @param {number} h height
 * @param {string} fill fill colour
 */
class Rotating_Triangle {
    constructor(x, y, w, h, fill) {
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        this.xC = x + w / 2;
        this.yC = y + h / 2;
        this.fill = fill;
        this.counter = 0;
    }

    update() {
        // Controls the movement
        this.counter += 1;
        this.draw();
    }

    draw() {
        ctx.fillStyle = this.fill;
        ctx.save();
        ctx.translate(this.xC, this.yC);
        // Rotates the triangle
        ctx.rotate(1 * this.counter * Math.PI / 360);
        // Draws the triangle
        ctx.beginPath();
        ctx.moveTo(0, -this.h / 2);
        ctx.lineTo(-this.w / 2, this.h / 2);
        ctx.lineTo(this.w / 2, this.h / 2);
        ctx.closePath();
        ctx.fill();
        ctx.restore();
    }
}

/**
 * Ball that moves up down
 * @param {number} x_b base x position
 * @param {number} y_b base y position
 * @param {number} radius radius
 * @param {string} fillColour fill colour
 * @param {number} T total Tick interval (50 ticks = about 1 second)
 * @param {number} H total Height covered by up/down motion
 */
class Bouncing {
    constructor(x_b, y_b, w, h, fillColour, T, H, xIS = 0) {
        this.x_b = x_b + w / 2;
        this.y_b = y_b + h / 2;
        // Calculating radius
        this.xR = Math.abs(w / 2);
        this.yR = Math.abs(h / 2);
        this.dy = 0;
        this.dx = 0;
        this.y = y;
        this.x = x;
        this.fillColour = fillColour;
        // variables that control the animation; speed and movement
        this.t = 0;
        this.T = T;
        // The distance which the ball travels up and down
        this.H = 525;
        this.xIntervalShift = xIS;
    }
    update() {
        // Adds one to the value of 't' every update
        this.t += 1;
        this.x_b += this.dx;
        this.y_b += this.dy;
        if (this.x_b > 25 + 750 || this.y_b < 25) {
            this.dy = -this.dy;
        }
        if (this.x_b < 500 || this.x_b > 500 + 475) {
            this.dx = -this.dx;
        }
        this.draw();
    }
    draw() {
        // calculating the value of y through linear interpolation
        let y = this.linearinterpolate(this.t, this.T, this.H);
        // draws the shape
        this.drawEllipse(this.x_b, y, this.xR, this.yR, 0, 0, 2 * Math.PI);
    }
    linearinterpolate(t, T, H) {
        // takes the parameters t, T, H
        // modulus
        t = t % T;
        // setting the y value and determining the value
        let y;
        if (t < T / 2) {
            y = (-2 * H * t) / (T) + H;
        } else {
            y = (2 * H * t) / (T) - H;
        }
        return y;
    }
    // calls in function
    drawEllipse(x, y, xr, yr) {
        ctx.beginPath();
        ctx.ellipse(x, y, xr, yr, 0, 0, 2 * Math.PI);
        ctx.fillStyle = this.fillColour;
        ctx.fill();
    }
}

/**
 * This is a class to draw a Flower
 * @param {number} x coordinate of centre
 * @param {number} y coordinate of centre
 * @param {number} w width
 * @param {number} h height
 * @param {number} numPetals number of petals
 * @param {string} fillcolour fill colour
 */
class Flower {
    constructor(centerX, centerY, w, h, numPetals, fillcolour) {
        this.centerX = centerX;
        this.centerY = centerY;
        this.xR = Math.abs(w / 2);
        this.yR = Math.abs(h / 2);
        this.numPetals = numPetals;
        this.fillcolour = fillcolour;
    }

    update() {
        this.draw();
    }

    draw() {
        ctx.beginPath();
        // loop to draw petals
        // Checking the number to decide how many to draw and dimensions
        for (let n = 0; n < this.numPetals; n++) {
            let theta1 = ((Math.PI * 2) / this.numPetals) * (n - 1);
            let theta2 = ((Math.PI * 2) / this.numPetals) * (n);
            // Calculating variables
            let x1 = (this.xR * Math.sin(theta1)) + this.centerX;
            let y1 = (this.yR * Math.cos(theta1)) + this.centerY;
            let x2 = (this.xR * Math.sin(theta2)) + this.centerX;
            let y2 = (this.yR * Math.cos(theta2)) + this.centerY;
            ctx.moveTo(this.centerX, this.centerY);
            // draws the petal using variables
            ctx.bezierCurveTo(x1, y1, x2, y2, this.centerX, this.centerY);
        }

        ctx.closePath();
        ctx.fillStyle = this.fillcolour;
        ctx.fill();

        // draws the yellow center on top of the petals
        ctx.beginPath();
        ctx.ellipse(this.centerX, this.centerY, this.xR / 5, this.yR / 5, 0, 0, 2 * Math.PI);
        ctx.fillStyle = colArray[0][15];
        ctx.fill();
    }
}

/**
 * This is a class to draw a Heart
 * @param {number} centerX coordinate of centre
 * @param {number} centerY coordinate of centre
 * @param {number} w width
 * @param {number} h height
 * @param {string} fillcolour fill colour
 */
class Heart {
    constructor(centerX, centerY, w, h, fillcolour) {
        this.cX = centerX;
        this.cY = centerY;
        this.fillcolour = fillcolour;
        // Calculates the size of the heart
        this.d = Math.min(w, h);
        // Holds the position of the heart
        //this.p = 0;
    }
    update() {
        this.draw();
    }
    draw() {
        let p = 0;
        let d = this.d;
        ctx.save();
        // initial position
        ctx.translate(this.cX, this.cY);
        ctx.beginPath();
        // draws quadratic curves in succession to make heart
        ctx.moveTo(p, p + d / 4);
        ctx.quadraticCurveTo(p, p, p + d / 4, p);
        ctx.quadraticCurveTo(p + d / 2, p, p + d / 2, p + d / 4);
        ctx.quadraticCurveTo(p + d / 2, p, p + d * 3 / 4, p);
        ctx.quadraticCurveTo(p + d, p, p + d, p + d / 4);
        ctx.quadraticCurveTo(p + d, p + d / 2, p + d * 3 / 4, p + d * 3 / 4);
        ctx.lineTo(p + d / 2, p + d);
        ctx.lineTo(p + d / 4, p + d * 3 / 4);
        ctx.quadraticCurveTo(p, p + d / 2, p, p + d / 4);
        // Fills the heart with the colour selected from swatch
        ctx.fillStyle = this.fillcolour;
        ctx.fill();
        ctx.restore();

    }
}

// Function to draw basic filled rectangle
function filledRect(x, y, w, h, colour = "rgb(255,255,255)") {
    //console.log("filled")
    ctx.beginPath();
    ctx.rect(x, y, w, h);
    ctx.fillStyle = colour;
    ctx.fill();
}

// Function to draw basic stroke rectangle
function strokeRect(x, y, w, h, colour = "rgb(255,255,255,200", l = 1) {
    ctx.beginPath();
    ctx.rect(x, y, w, h);
    ctx.lineWidth = l;
    ctx.strokeStyle = colour;
    ctx.stroke();
}

// Function to draw basic line
function drawLine(x_1, y_1, x_2, y_2, strokeColour, strokeWidth) {
    ctx.beginPath();
    ctx.moveTo(x_1, y_1);
    ctx.lineTo(x_2, y_2);
    ctx.lineCap = "round";
    ctx.strokeStyle = strokeColour;
    ctx.lineWidth = strokeWidth;
    ctx.stroke();
}

// Function to draw basic stroke circle
function drawStrokeCircle(x, y, r, strokeC, strokeW = 1) {
    ctx.beginPath();
    ctx.arc(x, y, r, 0, 2 * Math.PI);
    ctx.strokeStyle = strokeC;
    ctx.lineWidth = strokeW;
    ctx.stroke();

}
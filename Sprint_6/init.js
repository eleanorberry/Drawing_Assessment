/** This file contains
 * Col array
 * Grid class
 * Canvas height and width specifications
 * Interactive Object class
 * Shape classes (Rect, ellipse and Line)
 *
 */

let colArray=[
    [ // opaque
        // black (0)               black (1)               black (2)
        "rgba(0,0,0,1)" , "rgba(0,0,0,0.58)", "rgb(0,0,0,0.35)" ,
        // grey (0)               grey (1)               grey (2)
        "rgb(150,150,150)" , "rgba(150,150,150,0.56)", "rgb(150,150,150,0.35)" ,
        // white (0)               white (1)               white (2)
        "rgb(255,255,255)" , "rgba(255,255,255,0.6)", "rgba(255,253,253,0.4)" ,
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
    [ // formatting colours
            // black (0)               grey (1)               white (2)
            "rgba(0,0,0,1)" , "rgba(150,150,150,1)", "rgb(255,255,255)" ,
            // pink  (3)           purple (4)       deep blue (5)
            "rgb(255,143,253)", "rgb(153,19,206,1)", "rgb(16,16,250,1)",
            // pale blue (6)           yellow   (7)         bright yellow (8)
            "rgba(135,211,243,1)", "rgba(246,244,193,1)", "rgba(250,250,0,1)",
            // intense green (9)           pale pink   (10)        dull green (11)
            "rgb(188,215,172)", "rgb(203,166,175)", "rgb(136,204,133)",
            // red (12)           dull red   (13)        orange red (14)
            "rgb(208,67,67)", "rgb(243,124,43)", "rgba(255,100,100,1)"
    ]
]

canvas = document.querySelector('#myCanvas');
let ctx = canvas.getContext('2d');

// define height and width
let width = 1000;
let height = 700;

// define scale of 1
let scale = 2;

// set the canvas width and height
canvas.width = width*scale;
canvas.height = height*scale;

//scale the canvas
ctx.scale(scale, scale);

// get the canvas element
// style here for consistency

let my_c = document.getElementById('myCanvas');
my_c.style.backgroundColor = "rgb(218,215,215)";
my_c.style.width = width+"px";
my_c.style.height = height+"px";
my_c.style.border = "8px solid rgba(0, 0, 0)";
my_c.style.display = "block";
my_c.style.margin = "auto";
document.body.style.backgroundColor = "rgb(188,215,172)";

class InteractiveObject{
    constructor(){
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
    mDown(e){
        this.xMouseStart = e.offsetX;
        this.yMouseStart = e.offsetY;
        this.mouseIsDown = true;
        let output = "This mouse went down at x = " + e.offsetX + "and y = " + e.offsetY;
        //console.log (output)
    }
    mUp(e){
        this.mouseIsDown = false;
        let output = "This mouse went up at x = " + e.offsetX + "and y = " + e.offsetY;
        console.log(output)
    }

    mMove(e){
        this.xMouse = e.offsetX;
        this.yMouse = e.offsetY;
        //console.log("moving")
    }
    mLeave(e){
        //console.log("Mouse has left the canvas")
    }

    mClick(e){
        console.log("click");
    }

    inBoundsCheck(xM, yM, x, y, w, h){
        // if inside button return true
        if(xM>x && xM<x+w && yM>y && yM<y+h){
            return true;
        }else{
            return false;
        }
    }
}

class Rectangle{
    /***
     * Class to draw a rectangle
     * @param x x coordinate of rectangle
     * @param y y coordinate of rectangle
     * @param w width
     * @param h height
     * @param fill The fill colour of rectangle
     */
    constructor(x,y,w,h,fill){
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        this.fill = fill;
    }

    update(){
        this.draw();
    }

    draw(){
        ctx.fillStyle = this.fill;
        ctx.beginPath();
        ctx.rect(this.x, this.y, this.w, this.h);
        ctx.fill();
    }

}

class Ellipse {
    /***
     * This is a class to draw an ellipse
     * @param x coordinate of centre
     * @param y coordinate of centre
     * @param w width
     * @param h height
     * @param fillcolour fill colour
     */
    constructor(x, y, w, h, fillcolour) {
        this.x = x + w / 2;
        this.y = y + h / 2;
        this.xR = Math.abs(w / 2);
        this.yR = Math.abs(h / 2);
        this.c = fillcolour;
    }

    update(){
        this.draw();
    }

    draw() {
        ctx.beginPath();
        ctx.ellipse(this.x, this.y, this.xR, this.yR, 0, 0, 2 * Math.PI);
        ctx.fillStyle = this.c;
        ctx.fill();
    }
}

class Line {
    /***
     * Class that generates a line
     * @param x coordinate of first point
     * @param y coordinate of first point
     * @param w width
     * @param h height
     * @param c colour filled
     * @param lw stroke width
     */
    constructor(x, y, w, h, c, lw){
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.lw= lw
    this.fill = c;
    }

    update(){
        this.draw();
    }

    draw(){

        ctx.strokeStyle = this.fill;
        ctx.lineWidth = this.lw;
        ctx.lineCap = "round";
        ctx.beginPath();

        ctx.moveTo(this.x, this.y);
        ctx.lineTo(this.x+this.w, this.y+this.h);
        ctx.stroke();
        // This code is in the wrong place
        if (Size_button.Size === "S") {
            ctx.lineWidth = 4;
        } else if (Size_button.Size === "M") {
            ctx.lineWidth = 8;
        } else if (Size_button.Size === "L") {
            ctx.lineWidth = 12;
        }

    }
}

class Triangle{
    // Class that generates a triangle
    constructor(x,y,w,h,fill) {
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        this.fill = fill;
    }

        update(){
            this.draw();
        }

        draw(){
            ctx.fillStyle = this.fill;
            ctx.beginPath();
            ctx.moveTo(this.x + this.w/2, this.y);
            ctx.lineTo(this.x+this.w, this.y+this.h);
            ctx.lineTo(this.x, this.y+this.h);
            ctx.closePath();
            ctx.fill();
        }
}

class Rotating_Triangle{
    // Class that generates a triangle
    constructor(x,y,w,h,fill) {
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        this.xC = x+ w/2;
        this.yC = y+ h/2
        this.fill = fill;
        this.counter = 0;
    }

    update(){
        this.counter +=1;
        this.draw();
    }

    draw(){
        ctx.fillStyle = this.fill;
        ctx.save()
        ctx.translate(this.xC, this.yC);
        ctx.rotate(1*this.counter*Math.PI/360)
        ctx.beginPath();
        ctx.moveTo(0, -this.h/2);
        ctx.lineTo(-this.w/2, this.h/2);
        ctx.lineTo(this.w/2, this.h/2);
        /*
        ctx.moveTo(this.x + this.w/2, this.y);
        ctx.lineTo(this.x+this.w, this.y+this.h);
        ctx.lineTo(this.x, this.y+this.h);

         */

       // ctx.rotate(1*this.counter*Math.PI/360);
        ctx.closePath();
        ctx.fill();
        ctx.restore()
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
class Bouncing{
    constructor(x_b,y_b,r, fillColour, T, H, xIS=0){
        this.x_b = x_b;
        this.y_b = y_b;
        this.r = r;
        this.fillColour = fillColour;
        // animation variables
        this.t = 0;
        this.T = T;
        // The distance which the ball travels up and down, need to replace with randomised in boundaries
        this.H = H;
        this.xIntervalShift = xIS
    }
    update(){
        // add one to the value of little t each time update is called
        this.t +=1
        this.draw()
        //console.log("update")
    }
    draw(){
        // get y value from the piecewise function
        let y = this.linearinterpolate(this.t, this.T, this.H)
        // the interval is multiplied by the x interval shift
        let x = this.linearinterpolate(this.t, this.T*this.xIntervalShift,this.H)
        this.drawStrokeCircle(this.x_b,y+this.y_b, this.r)
    }
    linearinterpolate(t,T,H){
        // takes parameter t, T, H
        // we could hard code in this.T etc. but is more flexible to have parameters
        // make sure t is between 0 and T
        t = t%T; // modulus operator
        // set y variable and use to get value from equations
        let y;
        if(t<T/2){
            y = (-2*H*t)/(T) + H
        }else{
            y = (2*H*t)/(T) - H
        }
        return y
    }
    drawStrokeCircle(x,y,r){
        ctx.beginPath()
        ctx.arc(x, y, r, 0, 2*Math.PI)
        ctx.fillStyle = this.fillColour
        ctx.fill();
    }


}

class Flower{
    constructor(centerX, centerY, w,h, numPetals, fillcolour) {

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

            // draw petals
            for (let n = 0; n < this.numPetals; n++) {
                let theta1 = ((Math.PI * 2) / this.numPetals) * (n - 1);
                let theta2 = ((Math.PI * 2) / this.numPetals) * (n);

                let x1 = (this.xR * Math.sin(theta1)) + this.centerX;
                let y1 = (this.yR * Math.cos(theta1)) + this.centerY;
                let x2 = (this.xR * Math.sin(theta2)) + this.centerX;
                let y2 = (this.yR * Math.cos(theta2)) + this.centerY;

                ctx.moveTo(this.centerX, this.centerY);
                ctx.bezierCurveTo(x1, y1, x2, y2, this.centerX, this.centerY);
            }

           ctx.closePath();
            ctx.fillStyle = this.fillcolour;
            ctx.fill();

            // draw yellow center
            ctx.beginPath();
            //ctx.ellipse(0, 0, 200, 100, 0, 0, 2 * Math.PI);
            ctx.ellipse(this.centerX, this.centerY, this.xR/5, this.yR/5, 0, 0, 2 * Math.PI);
            ctx.fillStyle = colArray[0][15];
            ctx.fill();
        }
}

class Heart {
    constructor(centerX, centerY, w,h, fillcolour) {
        this.cX = centerX;
        this.cY = centerY;
        this.fillcolour = fillcolour;
        this.d = Math.min(w, h);
        this.k = 0;
    }
    update() {
    this.draw();
    }
    draw() {
        let k = this.k+this.cX/4;
        k = 0
        let d = this.d;
        ctx.save()
        ctx.translate(this.cX, this.cY)
        ctx.beginPath();
        ctx.moveTo(k,k + d / 4);
        ctx.quadraticCurveTo(k, k, k + d / 4, k);
        ctx.quadraticCurveTo(k + d / 2, k, k + d / 2, k + d / 4);
        ctx.quadraticCurveTo(k + d / 2, k, k + d * 3/4, k);
        ctx.quadraticCurveTo(k + d, k, k + d, k + d / 4);
        ctx.quadraticCurveTo(k + d, k + d / 2, k + d * 3/4, k + d * 3/4);
        ctx.lineTo(k + d / 2, k + d);
        ctx.lineTo(k + d / 4, k + d * 3/4);
        ctx.quadraticCurveTo(k, k + d / 2, k, k + d / 4);
        ctx.fillStyle = this.fillcolour;
        ctx.fill();
        ctx.restore()

        }
}


function filledRect(x,y,w,h,colour = "rgb(255,255,255)"){
    //console.log("filled")
    ctx.beginPath();
    ctx.rect(x,y,w,h);
    ctx.fillStyle = colour;
    ctx.fill();
}


function strokeRect(x,y,w,h,colour = "rgb(255,255,255,200", l=1){
    ctx.beginPath();
    ctx.rect(x,y,w,h);
    ctx.lineWidth = l;
    ctx.strokeStyle = colour;
    ctx.stroke();
}


function drawLine(x_1,y_1,x_2,y_2,strokeColour,strokeWidth,ct =ctx){
    ctx.beginPath();
    ctx.moveTo(x_1,y_1);
    ctx.lineTo(x_2,y_2);
    ctx.lineCap = "round";
    ctx.strokeStyle = strokeColour;
    ctx.lineWidth = strokeWidth;
    ctx.stroke();
}

function drawStrokeCircle(x,y,r, strokeC, strokeW = 1){
    ctx.beginPath();
    ctx.arc(x,y, r, 0, 2*Math.PI);
    ctx.strokeStyle = strokeC;
    ctx.lineWidth = strokeW;
    ctx.stroke();

}




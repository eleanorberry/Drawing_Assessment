/** This file contains
 * Col array
 * Grid class
 * Canvas height and width specifications
 * Interactive Object class
 * Shape classes (Rect, ellipse and Line)
 *
 */


//console.log("init.js is called");

let colArray=[
    [ // opaque
        // black (0)               grey (1)               white (2)
        "rgba(0,0,0,1)" , "rgba(150,150,150,1)", "rgb(255,253,253)" ,
        // red  (3)            (4)       deep blue (5)
        "rgb(255,36,36)", "rgba(255,31,31,0.69)", "rgba(255,24,24,0.42)",
        // pale blue (6)           yellow   (7)         bright yellow (8)
        "rgb(252,86,34)", "rgba(236,106,62,0.65)", "rgba(243,128,54,0.42)",
        // intense green (9)           pale green   (10)        dull green (11)
        "rgb(255,234,0)", "rgba(244,232,0,0.7)", "rgba(255,222,7,0.47)",
        // red (12)           dull red   (13)        orange red (14)
        "rgb(3,196,3)", "rgb(3,196,3,0.63)", "rgba(3,196,3,0.43)",
        // intense green (9)           pale green   (10)        dull green (11)
        "rgb(8,24,253)", "rgba(0,85,244,0.56)", "rgba(33,139,215,0.4)",
        // red (12)           dull red   (13)        orange red (14)
        "rgb(255,143,253)", "rgba(255,143,253,0.56)", "rgba(255,143,253,0.38)"
    ],
    [ // formatting colours
            // black (0)               grey (1)               white (2)
            "rgba(0,0,0,1)" , "rgba(150,150,150,1)", "rgb(255,255,255)" ,
            // pink  (3)           purple (4)       deep blue (5)
            "rgb(255,143,253)", "rgb(153,19,206,1)", "rgb(16,16,250,1)",
            // pale blue (6)           yellow   (7)         bright yellow (8)
            "rgba(135,211,243,1)", "rgba(246,244,193,1)", "rgba(250,250,0,1)",
            // intense green (9)           pale green   (10)        dull green (11)
            "rgb(188,215,172)", "rgb(203,166,175)", "rgba(0,190,100,1)",
            // red (12)           dull red   (13)        orange red (14)
            "rgba(240,0,0,1)", "rgba(200,80,0,1)", "rgba(255,100,100,1)"
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
        //console.log(output)
    }

    mMove(e){
        this.xMouse = e.offsetX;
        this.yMouse = e.offsetY;
        //console.log("moving")
    }
    mLeave(e){
        console.log("Mouse has left the canvas")
    }

    mClick(e){
        //console.log("click");
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
     * @param y y coordinate of rectange
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
        //ctx.ellipse(0, 0, 200, 100, 0, 0, 2 * Math.PI);
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
    constructor(x, y, w, h, c, lw = 5){
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


function drawLine(x_1,y_1,x_2,y_2,strokeColour,strokeWidth=1,ct =ctx){
    ct.beginPath();
    ct.moveTo(x_1,y_1);
    ct.lineTo(x_2,y_2);
    ct.lineCap = "round";
    ct.strokeStyle = strokeColour;
    ct.lineWidth = strokeWidth;
    ct.stroke();
}

function drawStrokeCircle(x,y,r, strokeC, strokeW = 1){
    ctx.beginPath();
    ctx.arc(x,y, r, 0, 2*Math.PI);
    ctx.strokeStyle = strokeC;
    ctx.lineWidth = strokeW;
    ctx.stroke();

}






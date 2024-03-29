/*** This file contains
 * The rectangle for drawing
 * Calling in buttons
 * Guidelines for shape drawing
 */

//console.log("control.js is called");

// This class contains the control object which is used to instantiate all of the different shapes as separate objects within the program
class ControlObject extends InteractiveObject{
    constructor(){
        super();
        this.x = 270
        this.y = 25
        this.draw_w = 695
        this.draw_h = 500
        this.w = 0;
        this.h = 0;
        this.objectSet = [];
        this.onDrawingArea = false
        this.changeChoice = null
    }

    mDown(e) {
        super.mDown(e);
        // Checks whether mouse is within the canvas drawing area
       this.onDrawingArea = this.inBoundsCheck(this.xMouse, this.yMouse, this.x, this.y, this.draw_w, this.draw_h)
        this.changeChoice = null
    }
    // What program does upon release of mouse
    mUp(e) {
        super.mUp(e);
        //
        let fillColour
        if (Swatch.selected) {
            console.log("Swatch is selected")
            fillColour = Swatch.selected.fill
            //console.log(fillColour)
        } else {
            fillColour = "rgb(0,0,0)"
        }
        if (this.onDrawingArea) {
            // instantiates the different shapes with relevant variables
            if (Button.Shape === "Rectangle") {
                let temp = new Rectangle(this.xMouseStart, this.yMouseStart, this.w, this.h, fillColour);
                this.objectSet.push(temp);
            } else if (Button.Shape === "Ellipse") {
                let temp = new Ellipse(this.xMouseStart, this.yMouseStart, this.w, this.h, fillColour);
                this.objectSet.push(temp);
            } else if (Button.Shape === "Triangle") {
                let temp = new Triangle(this.xMouseStart, this.yMouseStart, this.w, this.h, fillColour);
                this.objectSet.push(temp);}
            else if (Button.Shape === "Rotating Triangle") {
                    let temp = new Rotating_Triangle(this.xMouseStart, this.yMouseStart, this.w, this.h, fillColour);
                    this.objectSet.push(temp);
            } else if (Button.Shape === "Bouncing") {
                let temp = new Bouncing( this.xMouseStart,this.yMouseStart+ this.h / 2,50, fillColour,500,300);
                this.objectSet.push(temp);
            } else if (Button.Shape === "Flower") {
                let temp = new Flower(this.xMouseStart + this.w / 2, this.yMouseStart + this.h / 2, this.w, this.h, Flower_button.Petals, fillColour);
                this.objectSet.push(temp);
            }
            else if(Button.Shape === "Line"){
                if (Size_button.Size === "S"){
                    let temp = new Line(this.xMouseStart, this.yMouseStart, this.w, this.h, 4, fillColour);
                    this.objectSet.push(temp);
                }
                else if (Size_button.Size === "M"){
                    let temp = new Line(this.xMouseStart, this.yMouseStart, this.w, this.h, 8, fillColour);
                    this.objectSet.push(temp);
                }
                else if (Size_button.Size === "L"){
                    let temp = new Line(this.xMouseStart, this.yMouseStart, this.w, this.h, 12, fillColour);
                    this.objectSet.push(temp);
                }
                else{
                    let temp = new Line(this.xMouseStart, this.yMouseStart, this.w, this.h, 4, fillColour);
                    this.objectSet.push(temp);
                }}
        }
        //Conditions for clear, undo and redo buttons
        // Starts a list for all removed and added objects
        if (this.changeChoice === "Clear") {
            this.objectSet = [];
            this.removedSet = [];
        } else if (this.changeChoice === "Undo") {
            if (this.objectSet.length > 0) {
                this.removedSet.push(this.objectSet[this.objectSet.length - 1]);
            }
            this.objectSet.pop()
        } else if (this.changeChoice === "Redo") {
            if (this.removedSet.length > 0) {
                this.objectSet.push(this.removedSet[this.removedSet.length - 1]);
                this.removedSet.pop();
            }}else if (Button.Shape === "Heart") {
            let temp = new Heart(this.xMouseStart, this.yMouseStart, this.w, this.h, fillColour);
            this.objectSet.push(temp);
        }
            this.onDrawingArea = false;
        }

    update(){
        ctx.save()
        this.filledRect(this.x, this.y, this.draw_w, this.draw_h, colArray[1][2])
        ctx.clip()
        this.w = this.xMouse - this.xMouseStart;
        this.h = this.yMouse - this.yMouseStart;
        for(let i = 0; i<this.objectSet.length; i++){
            this.objectSet[i].update();
        }
        if (this.onDrawingArea) {
            this.draw();
        }

        this.inBounds = this.inBoundsCheck(this.xMouse,this.yMouse,this.xMouseStart,this.yMouseStart, this.draw_w, this.draw_h)
        //console.log(this.inBounds)
        for (let i = 0; i < this.objectSet.length; i++ && this.inBounds) {
            this.objectSet[i].update()
        }
        if (this.onDrawingArea) {
            //console.log("mouse is down")
            this.draw();
        }
        ctx.restore()

    }

    draw(){
        let fillColour
        if (Swatch.selected) {
            //console.log("Swatch is selected")
            fillColour = Swatch.selected.fill
            //console.log(fillColour)
        }
        let x = this.xMouseStart;
        let y = this.yMouseStart;
        let w = this.w;
        let h = this.h;
        if (Button.Shape === "Rectangle") {
            this.strokeRect(x,y,w,h,fillColour);
            this.drawLine(x,y,x+w, y+h, fillColour);
            this.drawLine(x,y+h,x+w,y, fillColour);
        }
       else if(Button.Shape === "Ellipse"){
            this.strokeRect(x,y,w,h,fillColour);
       }
       else if(Button.Shape === "Line"){
            if (Size_button.Size === "S") {
                this.drawLine(x,y,x+w, y+h, fillColour,4);
            } else if (Size_button.Size === "M") {
                this.drawLine(x,y,x+w, y+h, fillColour,8);
            } else if (Size_button.Size === "L") {
                this.drawLine(x,y,x+w, y+h, fillColour,12);
            }
        }
        else if(Button.Shape === "Triangle"){
            this.strokeRect(x,y,w,h,fillColour);
        }
        else if(Button.Shape === "Heart"){
            this.strokeRect(x,y,w,h,fillColour);
        }
        else if(Button.Shape === "Bouncing"){
            this.strokeRect(x,y,w,h,fillColour);
        }
        else if(Button.Shape === "Flower"){
            this.strokeRect(x,y,w,h,fillColour);
        }
        else if(Button.Shape === "Rotating Triangle"){
            this.strokeRect(x,y,w,h,fillColour);
        }
    }
}

ControlObject.prototype.strokeRect = strokeRect;
ControlObject.prototype.drawLine = drawLine;
ControlObject.prototype.drawStrokeCircle = drawStrokeCircle;
ControlObject.prototype.filledRect = filledRect;


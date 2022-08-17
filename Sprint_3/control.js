/*** This file contains
 * The rectangle for drawing
 * Calling in buttons
 * Guidelines for shape drawing
 */

//console.log("control.js is called");

class ControlObject extends InteractiveObject{
    constructor(canvas) {
        super();
        this.x = 425
        this.y = 25
        this.draw_w = 550
        this.draw_h = 650
        this.w = 0;
        this.h = 0;
        this.objectSet = [];
        this.onDrawingArea = false
    }

    mDown(e) {
        super.mDown(e);
       this.onDrawingArea = this.inBoundsCheck(this.xMouse, this.yMouse, this.x, this.y, this.draw_w, this.draw_h)
    }

    mUp(e){
        super.mUp(e);
        let fillColour
        if (Swatch.selected) {
            console.log("Swatch is selected")
            fillColour = Swatch.selected.fill
            console.log(fillColour)
        }else{
            fillColour = "rgb(0,0,0)"
        }
        if(this.onDrawingArea) {
            if (Button.Shape === "Rectangle") {
                let temp = new Rectangle(this.xMouseStart, this.yMouseStart, this.w, this.h, fillColour);
                this.objectSet.push(temp);
            } else if (Button.Shape === "Ellipse") {
                let temp = new Ellipse(this.xMouseStart, this.yMouseStart, this.w, this.h, fillColour);
                this.objectSet.push(temp);
            } else if (Button.Shape == "Line") {
                let temp = new Line(this.xMouseStart, this.yMouseStart, this.w, this.h, fillColour);
                this.objectSet.push(temp);
            }
        }

        this.onDrawingArea = false

        //console.log(Button.Shape)
    }

    update(){
        this.filledRect(this.x, this.y, this.draw_w, this.draw_h, colArray[0][2])
        this.w = this.xMouse - this.xMouseStart;
        this.h = this.yMouse - this.yMouseStart;
        for(let i = 0; i<this.objectSet.length; i++){
            this.objectSet[i].update();
        }
        if (this.onDrawingArea) {
            this.draw();
        }
    }

    draw(){
        let x = this.xMouseStart;
        let y = this.yMouseStart;
        let w = this.w;
        let h = this.h;
        this.strokeRect(x,y,w,h,colArray[0][12]);
        this.drawLine(x,y,x+w, y+h, colArray[0][12]);
        this.drawLine(x,y+h,x+w,y, colArray[0][12]);
        let radius = this.w+this.h/60
        if(radius += 5 > this.h){
            radius = (this.h/10)
        }
        this.drawStrokeCircle(x+ w/2, y +h/2, Math.abs(radius), colArray[0][6]);
    }
}

ControlObject.prototype.strokeRect = strokeRect;
ControlObject.prototype.drawLine = drawLine;
ControlObject.prototype.drawStrokeCircle = drawStrokeCircle;
ControlObject.prototype.filledRect = filledRect;


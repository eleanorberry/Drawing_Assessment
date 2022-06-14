/*** This file contains
 * The rectangle for drawing
 * Calling in buttons
 * Guidelines for shape drawing
 */

//console.log("control.js is called");

class ControlObject extends InteractiveObject{
    constructor(canvas) {
        super();
        this.x = 270
        this.y = 25
        this.draw_w = 695
        this.draw_h = 500
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
            } else if (Button.Shape === "Line") {
                let temp = new Line(this.xMouseStart, this.yMouseStart, this.w, this.h, fillColour);
                this.objectSet.push(temp);
            }

        }
        this.onDrawingArea = false

        if (Button.Shape === "Clear"){
            this.objectSet = [];
            Button.Shape = "";
        }
        if (Button.Shape === "Undo"){
            this.objectSet.pop();
            Button.Shape = "";
        }

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
        console.log(this.inBounds)
        for (let i = 0; i < this.objectSet.length; i++ && this.inBounds) {
            this.objectSet[i].update()
        }
        if (this.onDrawingArea) {
            console.log("mouse is down")
            this.draw();
        }
        ctx.restore()

    }

    draw(){
        let x = this.xMouseStart;
        let y = this.yMouseStart;
        let w = this.w;
        let h = this.h;
        if (Button.Shape === "Rectangle") {
            this.strokeRect(x,y,w,h,colArray[0][0]);
            this.drawLine(x,y,x+w, y+h, colArray[0][0]);
            this.drawLine(x,y+h,x+w,y, colArray[0][0]);
        }
       else if(Button.Shape === "Ellipse"){
            this.strokeRect(x,y,w,h,colArray[0][0]);
       }
       else if(Button.Shape === "Line"){
           this.drawLine(x,y,x+w, y+h, colArray[0][0]);
        }
    }
}

ControlObject.prototype.strokeRect = strokeRect;
ControlObject.prototype.drawLine = drawLine;
ControlObject.prototype.drawStrokeCircle = drawStrokeCircle;
ControlObject.prototype.filledRect = filledRect;


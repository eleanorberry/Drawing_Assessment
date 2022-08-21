/*** This file contains
 * The rectangle for drawing
 * Calling in buttons
 * Guidelines for shape drawing
 */

// This class contains the control object which is used to instantiate all the different shapes
// as separate objects within the program
class ControlObject extends InteractiveObject {
    constructor() {
        super();
        this.x = 270;
        this.y = 25;
        // Drawing area dimensions
        this.draw_w = 695;
        this.draw_h = 500;
        this.w = 0;
        this.h = 0;
        // This is the list that keeps track of all objects drawn
        this.objectSet = [];
        // This is the list that keeps track of all objects removed
        this.removedSet = [];
        this.onDrawingArea = false;
    }

    mDown(e) {
        super.mDown(e);
        // Checks whether mouse is within the canvas drawing area
        this.onDrawingArea = this.inBoundsCheck(this.xMouse, this.yMouse, this.x, this.y, this.draw_w, this.draw_h);
    }
    mClick(e) {
        // On click the edit button is deselected
        Edit_button.selected = null;
        this.changeChoice = null;
    }
    // What program does upon release of mouse
    mUp(e) {
        super.mUp(e);
        // Clear, redo and undo button outcomes
        // If edit button is selected / is not null
        if (Edit_button.selected != null) {
            this.changeChoice = Edit_button.selected.text;
            if (this.changeChoice === "Clear") {
                // if clear - clears all lists
                this.objectSet = [];
                this.removedSet = [];
            } else if (this.changeChoice === "Undo") {
                // deletes one from object list and pushes one to removed
                if (this.objectSet.length > 0) {
                    this.removedSet.push(this.objectSet[this.objectSet.length - 1]);
                }
                this.objectSet.pop();
            } else if (this.changeChoice === "Redo") {
                // if redo pushes the last removed object into object set
                if (this.removedSet.length > 0) {
                    this.objectSet.push(this.removedSet[this.removedSet.length - 1]);
                    this.removedSet.pop();
                }
            }
        }
        // deselects edit button
        Edit_button.selected = null;
        this.changeChoice = null;
        // sets the colour (as chosen in swatch) for all shapes
        let fillColour;
        if (Swatch.selected) {
            fillColour = Swatch.selected.fill;
        } else {
            // if no swatch is selected colour is black
            fillColour = "rgb(0,0,0)";
        }
        // If the area selected is on drawing area and height is larger than 0 shape can be drawn
        if (this.onDrawingArea && this.h!==0){
            // instantiates the different shapes with relevant variables
            if (Button.Shape === "Rectangle") {
                let temp = new Rectangle(this.xMouseStart, this.yMouseStart, this.w, this.h, fillColour);
                this.objectSet.push(temp);
            } else if (Button.Shape === "Ellipse") {
                let temp = new Ellipse(this.xMouseStart, this.yMouseStart, this.w, this.h, fillColour);
                this.objectSet.push(temp);
            } else if (Button.Shape === "Triangle") {
                let temp = new Triangle(this.xMouseStart, this.yMouseStart, this.w, this.h, fillColour);
                this.objectSet.push(temp);
            } else if (Button.Shape === "Rotating Triangle") {
                let temp = new Rotating_Triangle(this.xMouseStart, this.yMouseStart, this.w, this.h, fillColour);
                this.objectSet.push(temp);
            } else if (Button.Shape === "Bouncing") {
                let temp = new Bouncing(this.xMouseStart, this.yMouseStart, this.w, this.h, fillColour, 500, this.h);
                this.objectSet.push(temp);
            } else if (Button.Shape === "Flower") {
                let temp = new Flower(this.xMouseStart + this.w / 2, this.yMouseStart + this.h / 2, this.w, this.h, Flower_button.Petals, fillColour);
                this.objectSet.push(temp);
            } else if (Button.Shape === "Heart") {
                let temp = new Heart(this.xMouseStart, this.yMouseStart, this.w, this.h, fillColour);
                this.objectSet.push(temp);
            }
        }
        // Separate area from other shapes to enable dots to be made with line (where height is technically 0
        if (this.onDrawingArea && Button.Shape === "Line") {
            // sets the size of the line according to selection
            if (Size_button.Size === "S") {
                let line_s = new Line(this.xMouseStart, this.yMouseStart, this.w, this.h, fillColour, 4);
                this.objectSet.push(line_s);
            } else if (Size_button.Size === "M") {
                let line_m = new Line(this.xMouseStart, this.yMouseStart, this.w, this.h, fillColour, 8);
                this.objectSet.push(line_m);
            } else if (Size_button.Size === "L") {
                let line_l = new Line(this.xMouseStart, this.yMouseStart, this.w, this.h, fillColour, 12);
                this.objectSet.push(line_l);
            } else {
                let temp = new Line(this.xMouseStart, this.yMouseStart, this.w, this.h, fillColour, 4);
                this.objectSet.push(temp);
            }}
        this.onDrawingArea = false;
    }

    update() {
        // Updates all objects and pushes into program
        ctx.save();
        this.filledRect(this.x, this.y, this.draw_w, this.draw_h, colArray[1][2]);
        ctx.clip();
        // sets the width and height dependent on distance moved by mouse
        this.w = this.xMouse - this.xMouseStart;
        this.h = this.yMouse - this.yMouseStart;
        // Every object added to the object set list
        for (let i = 0; i < this.objectSet.length; i++) {
            this.objectSet[i].update();
        }
        if (this.onDrawingArea) {
            this.draw();
        }
        // if the object is within bounds
        this.inBounds = this.inBoundsCheck(this.xMouse, this.yMouse, this.xMouseStart, this.yMouseStart, this.draw_w, this.draw_h);
        for (let i = 0; i < this.objectSet.length; i++ && this.inBounds) {
            this.objectSet[i].update();
        }
        if (this.onDrawingArea) {
            this.draw();
        }
        ctx.restore();
    }

    draw() {
        let fillColour;
        // brings selected swatch in for shape colour
        if (Swatch.selected) {
            fillColour = Swatch.selected.fill;
        }
        // declaring variables
        let x = this.xMouseStart;
        let y = this.yMouseStart;
        let w = this.w;
        let h = this.h;
        // Sets the guidelines for the shapes while drawing
        if (Button.Shape === "Rectangle") {
            this.strokeRect(x, y, w, h, fillColour);
            this.drawLine(x, y, x + w, y + h, fillColour);
            this.drawLine(x, y + h, x + w, y, fillColour);
        } else if (Button.Shape === "Ellipse") {
            this.strokeRect(x, y, w, h, fillColour);
        }
        // This sets the guidelines for the line, dependent on the size selected
        else if (Button.Shape === "Line") {
            if (Size_button.Size === "S") {
                this.drawLine(x, y, x + w, y + h, fillColour, 4);
            } else if (Size_button.Size === "M") {
                this.drawLine(x, y, x + w, y + h, fillColour, 8);
            } else if (Size_button.Size === "L") {
                this.drawLine(x, y, x + w, y + h, fillColour, 12);
            }
        } else if (Button.Shape === "Triangle") {
            this.strokeRect(x, y, w, h, fillColour);
        } else if (Button.Shape === "Heart") {
            this.strokeRect(x, y, w, w, fillColour);
        } else if (Button.Shape === "Bouncing") {
            this.strokeRect(x, y, w, h, fillColour);
        } else if (Button.Shape === "Flower") {
            this.strokeRect(x, y, w, h, fillColour);
        } else if (Button.Shape === "Rotating Triangle") {
            this.strokeRect(x, y, w, h, fillColour);
        }
    }
}

ControlObject.prototype.strokeRect = strokeRect;
ControlObject.prototype.drawLine = drawLine;
ControlObject.prototype.drawStrokeCircle = drawStrokeCircle;
ControlObject.prototype.filledRect = filledRect;
/*** This file contains
 * Button class
 * Swatch class
 */

/**
 *
 * @param {number} x x coordinate of button
 * @param {number} y y coordinate of button
 * @param {number} w width of button
 * @param {number} h height of button
 * @param {string} text text in button
 * @param {string} c1 colour of button outline
 * @param {string} c2 colour of button fill
 * @param {string} c3 colour of button hover
 */
class Button {
    constructor(x, y, w, h, text, c1, c2, c3) {
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        this.text = text;
        this.outline = c1;
        this.fill = c2;
        this.hover = c3;
        // listens for mouse movements and enacts specifications
        canvas.addEventListener('click', this.mClick.bind(this));
        canvas.addEventListener('mousemove', this.mMove.bind(this));
        canvas.addEventListener('mousedown', this.mDown.bind(this));
        this.xMouse = 0;
        this.yMouse = 0;
        this.inBounds = false;
        this.name = Button;
    }
    mDown(e){
    }

    mUp(e) {}

    mClick(e) {
        // if within bounds sets name and shape
        if (this.inBounds) {
            this.name.selected = this;
            this.name.Shape = this.text;
        }
    }

    mMove(e) {
        // determines mouse movement
        this.xMouse = e.offsetX;
        this.yMouse = e.offsetY;
        this.inBounds = this.inBoundsCheck(this.xMouse, this.yMouse, this.x, this.y, this.w, this.h);
    }

    inBoundsCheck(xmid, ymid, x, y, w, h) {
        // Checks whether mouse is within bounds
        // If within parameters of button return true
        return xmid > x && xmid < x + w && ymid > y && ymid < y + h;
    }

    update() {
        this.draw();
    }

    draw() {
        ctx.strokeStyle = this.outline;
        ctx.fillStyle = this.fill;
        ctx.lineWidth = 0.5;
        ctx.beginPath();
        ctx.rect(this.x, this.y, this.w, this.h);

        // Changes the colour if hovered over
        if (this.inBounds || this.name.selected === this) {
            ctx.fillStyle = this.hover;
            ctx.lineWidth = 2;
            ctx.fill();
            // This sets the text code it will be written in the same colour as fill
            ctx.fillStyle = this.fill;
        } else {
            ctx.fillStyle = this.fill;
            ctx.fill();
            // Fills the text with a different colour
            ctx.fillStyle = this.outline;
        }

        ctx.stroke();

        ctx.fillStyle = this.outline;
        let myFont = "bold 20px 'Trebuchet MS', Verdana, sans-serif";
        ctx.textBaseline = 'middle';
        ctx.textAlign = 'center';
        ctx.font = myFont;
        // makes sure that the text is in the middle of the button
        ctx.fillText(this.text, this.x + this.w / 2, this.y + this.h / 2);

    }
}

// Makes sure that only one button can be clicked at once
Button.Clicked = "";
// Makes certain that the shape can be changed
Button.Shape = "";

/**
 *Flower button that attaches to the main button and allows the user to choose the number of petals
 * @param {number} x x coordinate of button
 * @param {number} y y coordinate of button
 * @param {number} w width of button
 * @param {number} h height of button
 * @param {string} text text in button
 * @param {string} c1 colour of button outline
 * @param {string} c2 colour of button fill
 * @param {string} c3 colour of button hover
 */
class Flower_button extends Button {
    constructor(x, y, w, h, text, c1, c2, c3) {
        super(x, y, w, h, text, c1, c2, c3);
        Flower_button.Clicked = this;
        Flower_button.Petals = this.text;
        Flower_button.selected = this;
    }
    update() {
        this.draw();
    }

    draw() {
        ctx.strokeStyle = this.outline;
        ctx.fillStyle = this.fill;
        ctx.lineWidth = 0.5;
        ctx.beginPath();
        ctx.rect(this.x, this.y, this.w, this.h);

        if (this.inBounds || Flower_button.selected === this) {
            ctx.fillStyle = this.hover;
            ctx.lineWidth = 2;
            ctx.fill();
            // This sets the shape code it will be the same colour as fill
            ctx.fillStyle = this.fill;
        } else {
            ctx.fillStyle = this.fill;
            ctx.fill();
            // Fills the shape with a different colour
            ctx.fillStyle = this.outline;
        }
        ctx.stroke();

        ctx.fillStyle = this.outline;
        let myFont = "bold 20px 'Trebuchet MS', Verdana, sans-serif";
        ctx.textBaseline = 'middle';
        ctx.textAlign = 'center';
        ctx.font = myFont;
        // makes sure that the text is in the middle of the button
        ctx.fillText(this.text, this.x + this.w / 2, this.y + this.h / 2);

    }

    mClick() {
        if (this.inBounds) {
            // main button selected
            Flower_button.selected = this;
            // Holds number of petal information
            Flower_button.Petals = this.text;
            ctx.lineWidth = 4;
        }
    }
}

// Makes sure that only one button can be selected at once
Flower_button.Clicked = "";
// Changes petal selection
Flower_button.Petals = "";

/**
 *Size button that attaches to the main button and allows the user to choose the size of the line
 * @param {number} x x coordinate of button
 * @param {number} y y coordinate of button
 * @param {number} w width of button
 * @param {number} h height of button
 * @param {string} text text in button
 * @param {string} c1 colour of button outline
 * @param {string} c2 colour of button fill
 * @param {string} c3 colour of button hover
 */
class Size_button extends Button {
    constructor(x, y, w, h, text, c1, c2, c3) {
        super(x, y, w, h, text, c1, c2, c3);
        Size_button.Clicked = this;
        Size_button.Size = this.text;
        Size_button.selected = this;
    }
    update() {
        this.draw();
    }
    draw() {
        ctx.strokeStyle = this.outline;
        ctx.fillStyle = this.fill;
        ctx.lineWidth = 0.5;
        ctx.beginPath();
        ctx.rect(this.x, this.y, this.w, this.h);

        if (this.inBounds || Size_button.selected === this) {
            ctx.fillStyle = this.hover;
            ctx.lineWidth = 2;
            ctx.fill();
            // This sets the shape code it will be the same colour as fill
            ctx.fillStyle = this.fill;
        } else {
            ctx.fillStyle = this.fill;
            ctx.fill();
            // Fills the shape with a different colour
            ctx.fillStyle = this.outline;
        }
        ctx.stroke();

        ctx.fillStyle = this.outline;
        let myFont = "bold 20px 'Trebuchet MS', Verdana, sans-serif";
        ctx.textBaseline = 'middle';
        ctx.textAlign = 'center';
        ctx.font = myFont;
        // makes sure that the text is in the middle of the button
        ctx.fillText(this.text, this.x + this.w / 2, this.y + this.h / 2);

    }

    mClick() {
        if (this.inBounds) {
            Size_button.selected = this;
            Size_button.Size = this.text;
            ctx.lineWidth = 4;
        }
    }

}

// Makes sure that only one button can be selected at once
Size_button.Clicked = "";
// Changes petal selection
Size_button.Size = "";

/**
 * This button controls the edit options (undo, redo and clear)
 * @param {number} x x coordinate of button
 * @param {number} y y coordinate of button
 * @param {number} w width of button
 * @param {number} h height of button
 * @param {string} text text in button
 * @param {string} c1 colour of button outline
 * @param {string} c2 colour of button fill
 * @param {string} c3 colour of button hover
 */
class Edit_button extends Button {
    constructor(x, y, w, h, text, c1, c2, c3) {
        super(x, y, w, h, text, c1, c2, c3);
        this.name = Edit_button;
    }
    mDown(e) {
        if (this.inBounds) {
            this.name.selected = this;
            Edit_button.selected = this;
            console.log("selected");
        }
    }
    update() {
        this.draw();
    }

    mClick(){
        if(this.inBounds){
            Edit_button.selected = this;
        }
    }
}
// Makes certain that the function can be changed
Edit_button.selected = "";


class Swatch extends Button {
    constructor(x, y, w, h, c1, c2, c3) {
        super(x, y, w, h, "", c1, c2, c3);
        this.fill = c2;
        this.name = Swatch;
        Swatch.selected = this;
    }
    update() {
        this.draw();
    }

    draw() {
        ctx.strokeStyle = this.outline;
        ctx.fillStyle = this.fill;
        ctx.lineWidth = 0.5;
        ctx.beginPath();
        ctx.rect(this.x, this.y, this.w, this.h);

        if (this.inBounds || Swatch.selected === this) {
            ctx.fillStyle = this.hover;
            ctx.lineWidth = 2;
            ctx.fill();
            // This sets the shape code it will be the same colour as fill
            ctx.fillStyle = this.fill;
        } else {
            ctx.fillStyle = this.fill;
            ctx.fill();
            // Fills the shape with a different colour
            ctx.fillStyle = this.outline;
        }
        ctx.stroke();
    }

    mClick() {
        if (this.inBounds) {
            Swatch.selected = this;
            ctx.lineWidth = 4;
        }
    }

}

// Makes sure that only one swatch can be selected at once
Swatch.Clicked = "";
// Changes swatch selection
Swatch.Colour = colArray[0][0];
Swatch.selected = "";
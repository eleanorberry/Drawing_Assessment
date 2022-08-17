/*** This file contains
 * Button class
 * Swatch class
 */

//console.log("button js called");

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
        canvas.addEventListener('click', this.mClick.bind(this));
        canvas.addEventListener('mousemove', this.mMove.bind(this));
        this.xMouse = 0;
        this.yMouse = 0;
        this.inBounds = false;
        this.name = Button
    }

    mClick(e){
        if(this.inBounds){
            this.name.Clicked = this;
            this.name.Shape = this.text;
        }
    }

    mMove(e){
        this.xMouse = e.offsetX;
        this.yMouse = e.offsetY;
        this.inBounds = this.inBoundsCheck(this.xMouse,this.yMouse, this.x, this.y, this.w, this.h)

    }

    inBoundsCheck(xM, yM, x, y, w, h){
        // If within parameters of button return true
        if(xM>x && xM<x+w && yM>y && yM<y+h){
            return true;
        }else{
            return false;
        }
    }

    update(){
        this.draw();
    }


    draw(){
        ctx.strokeStyle = this.outline;
        ctx.fillStyle = this.fill;
        ctx.lineWidth = 0.5;
        ctx.beginPath();
        ctx.rect(this.x,this.y,this.w,this.h);


        // Changes the colour if hovered over
        if(this.inBounds || this.name.Clicked === this){
            ctx.fillStyle = this.hover;
            ctx.lineWidth = 2;
            ctx.fill();
            // This sets the text code it will be written in the same colour as fill
            ctx.fillStyle = this.fill;
        }
        else{
            ctx.fillStyle = this.fill;
            ctx.fill();
            // Fills the text with a different colour
            ctx.fillStyle = this.outline;
        }


        ctx.stroke();

        ctx.fillStyle=this.outline
        let myFont = "bold 20px 'Trebuchet MS', Verdana, sans-serif";
        ctx.textBaseline = 'middle';
        ctx.textAlign = 'center';
        ctx.font=myFont;
        // makes sure that the text is in the middle of the button
        ctx.fillText(this.text, this.x+this.w/2, this.y+this.h/2)

    }
}

// Makes sure that only one button can be clicked at once
Button.Clicked = "";
// Makes certain that the shape can be changed
Button.Shape = "";

class Flower_button extends Button{
    constructor(x, y, w, h, text, c1, c2, c3) {
        super(x, y, w, h,text, c1, c2, c3);
        Flower_button.Clicked = this;
        Flower_button.Petals = this.text;
        Flower_button.selected = this;
    }
    update(){
        this.draw();
    }


    draw(){
        ctx.strokeStyle = this.outline;
        ctx.fillStyle = this.fill;
        ctx.lineWidth = 0.5;
        ctx.beginPath();
        ctx.rect(this.x,this.y,this.w,this.h);



        if(this.inBounds || Flower_button.selected === this){
            ctx.fillStyle = this.hover;
            ctx.lineWidth = 2;
            ctx.fill();
            // This sets the shape code it will be the same colour as fill
            ctx.fillStyle = this.fill;
        }
        else{
            ctx.fillStyle = this.fill;
            ctx.fill();
            // Fills the shape with a different colour
            ctx.fillStyle = this.outline;
        }
        ctx.stroke();

        ctx.fillStyle=this.outline
        let myFont = "bold 20px 'Trebuchet MS', Verdana, sans-serif";
        ctx.textBaseline = 'middle';
        ctx.textAlign = 'center';
        ctx.font=myFont;
        // makes sure that the text is in the middle of the button
        ctx.fillText(this.text, this.x+this.w/2, this.y+this.h/2)

    }


    mClick(){
        if(this.inBounds){
            Flower_button.selected = this;
            Flower_button.Petals = this.text;
            ctx.lineWidth = 4;
        }
    }
}

// Makes sure that only one button can be selected at once
Flower_button.Clicked = "";
// Changes petal selection
Flower_button.Petals = "5";

class Swatch extends Button {
    constructor(x, y, w, h, c1, c2, c3) {
        super(x, y, w, h,"", c1, c2, c3);
        this.fill = c2;
        console.log(c2)
        this.name = Swatch
        Swatch.selected = this
    }
    update(){
        this.draw();
    }


    draw(){
        ctx.strokeStyle = this.outline;
        ctx.fillStyle = this.fill;
        ctx.lineWidth = 0.5;
        ctx.beginPath();
        ctx.rect(this.x,this.y,this.w,this.h);


        if(this.inBounds || Swatch.selected === this){
            ctx.fillStyle = this.hover;
            ctx.lineWidth = 2;
            ctx.fill();
            // This sets the shape code it will be the same colour as fill
            ctx.fillStyle = this.fill;
        }
        else{
            ctx.fillStyle = this.fill;
            ctx.fill();
            // Fills the shape with a different colour
            ctx.fillStyle = this.outline;
        }
        ctx.stroke();
    }


    mClick(){
        if(this.inBounds){
            Swatch.selected = this;
            ctx.lineWidth = 4;
        }
}

}

// Makes sure that only one swatch can be selected at once
Swatch.Clicked = "";
// Changes swatch selection
Swatch.Colour = colArray[0][0];
Swatch.selected = ""

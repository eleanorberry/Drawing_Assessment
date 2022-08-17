//console.log("button js called");

class Button{
    constructor(x,y,w,h,text, c1, c2, c3){
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        this.text = text;
        this.outline = c1;
        this.fill = c2;
        this.hover = c3;
        // this could also have a selected colour
        // 'click' is an offical JavaScript EVENT
        canvas.addEventListener('click', this.mClick.bind(this));
        canvas.addEventListener('mousemove', this.mMove.bind(this));

        // mouse locations starts at 0
        this.xMouse = 0;
        this.yMouse = 0;
        //  false is the default setting
        this.inBounds = false;
    }


    mClick(e){
        if(this.inBounds){
            //console.log("click inside the boundary");
            //button has been selected

            Button.Clicked = this;
            Button.Shape = this.text;
            // it will say this 'this is the selected object'
            // it'll push out a button, if a new one becomes clicked

            //Button.shape = this.text;

        }

    }

    mMove(e){
        // update the x and y position variables to be the correct canvas coordinates
        this.xMouse = e.offsetX;
        this.yMouse = e.offsetY;
        //console.log(this.xMouse);
        //console.log(this.yMouse);
        this.inBounds = this.inBoundsCheck(this.xMouse,this.yMouse, this.x, this.y, this.w, this.h)
        //console.log(this.inBounds);

    }

    inBoundsCheck(xM, yM, x, y, w, h){
        // if inside button return true
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


        // change colour if mouse is over button
        if(this.inBounds || Button.Clicked == this){
            ctx.fillStyle = this.hover;
            ctx.lineWidth = 2;
            ctx.fill();
            // this is set for the text code , so it will be written in the fill colour
            ctx.fillStyle = this.fill;
        }
        else{
            ctx.fillStyle = this.fill;
            ctx.fill();
            // fill txt with different colour, this is set for the text code next
            ctx.fillStyle = this.outline;
        }


        ctx.stroke();

        ctx.fillStyle=this.outline
        let myFont = "bold 20px 'Trebuchet MS', Verdana, sans-serif";
        ctx.textBaseline = 'middle';
        ctx.textAlign = 'center';
        // sets the font from 'var myFont'
        ctx.font=myFont;
        // set the text in the middle of the button
        ctx.fillText(this.text, this.x+this.w/2, this.y+this.h/2)

    }


}


// to make it so only one button can be clicked at one time
Button.Clicked = "";
// to make sure that the drag and drop shape can be changed
Button.Shape = "";
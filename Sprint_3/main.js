/*** This file contains
 * Button implementation code
 * Swatch placement code
 */

console.log("main.js is called")

// let G = new Grid(width,height, 25, colArray[0][6],0.3);
let C = new ControlObject(canvas);

let name_list = ["Rectangle", "Ellipse", "Line"]
let button_list=[]
let x = 35;
let y = 25;
let w = 200;
let h = 50;

for (let i=0; i<name_list.length ; i++){
    button_list.push(new Button(x,y+i*(w/3.5),w,h, name_list[i], colArray[0][0], colArray[0][9], colArray[0][6]))
}
Button.Clicked = button_list[0]
Button.Shape = button_list[0].text

let colname_list=["white","grey","black","pink","purple","deep_blue","pale_blue","yellow","bright_yellow","intense_green","pale_green","dull_green","red","dull_red","orange_red"]
let colour_list=[]
x = 40;
y = 415;
w = 30;
h = 30;

// List of colours for palette using swatch class
let c1= "rgb(0,0,0)"
let white = new Swatch(x,y,w,h, c1, colArray[0][0], colArray[1][0])
let grey = new Swatch(x,y+1.3*w,w,h, c1, colArray[0][1], colArray[1][1])
let black = new Swatch(x,y+2.7*w,w,h, c1, colArray[0][2], colArray[1][2])

let pink = new Swatch(x+1.3*w,y,w,h, c1, colArray[0][3], colArray[1][3])
let purple = new Swatch(x+1.3*w,y+1.3*w,w,h, c1, colArray[0][4], colArray[1][4])
let deep_blue = new Swatch(x+1.3*w,y+2.7*w,w,h, c1, colArray[0][5], colArray[1][5])

let pale_blue= new Swatch(x+2.6*w,y,w,h, c1, colArray[0][6], colArray[1][6])
let yellow = new Swatch(x+2.6*w,y+1.3*w,w,h, c1, colArray[0][7], colArray[1][7])
let bright_yellow = new Swatch(x+2.6*w,y+2.7*w,w,h, c1, colArray[0][8], colArray[1][8])

let intense_green = new Swatch(x+3.9*w,y,w,h, c1, colArray[0][9], colArray[1][9])
let pale_green = new Swatch(x+3.9*w,y+1.3*w,w,h, c1, colArray[0][10], colArray[1][10])
let dull_green = new Swatch(x+3.9*w,y+2.7*w,w,h, c1, colArray[0][11], colArray[1][11])

let red = new Swatch(x+5.2*w,y,w,h, c1, colArray[0][12], colArray[1][12])
let dull_red = new Swatch(x+5.2*w,y+1.3*w,w,h, c1, colArray[0][13], colArray[1][13])
let orange_red = new Swatch(x+5.2*w,y+2.7*w,w,h, c1, colArray[0][14], colArray[1][14])
Swatch.Clicked = colour_list[0]

let colourSet = [white, grey, black, pink, purple, deep_blue, pale_blue, yellow, bright_yellow, intense_green, pale_green, dull_green, red, dull_red, orange_red]

function animate(){
    ctx.clearRect(0,0,width,height);

    C.update();
    for (let i=0; i<colourSet.length; i++){
        colourSet[i].update();
    }
    for(let i=0;i<button_list.length;i++){
        button_list[i].update();
    }


    window.requestAnimationFrame(animate);
    G.update();
}


animate();
animate();
/*** This file contains
 * Button implementation code
 * Swatch placement code
 */

console.log("main.js is called")

let C = new ControlObject(canvas);

let name_list = ["Rectangle", "Ellipse", "Line","Triangle"]
let button_list=[]
let x = 35;
let y = 25;
let w = 200;
let h = 50;

for (let i=0; i<name_list.length ; i++){
    button_list.push(new Button(x,y+i*(w/3.5),w,h, name_list[i], colArray[1][0], colArray[1][9], colArray[1][10]))
}
Button.Clicked = button_list[0]
Button.Shape = button_list[0].text

// defining the flower and Petal button
let flower_list = ["Flower", "4", "5", "6","7"]
button_list.push(new Button(x,y+400,w,h, flower_list[0], colArray[1][0], colArray[1][9], colArray[1][10]))
for (let i=0; i<(flower_list.length-1) ; i++){
    button_list.push(new Flower_button(x+i*50,(y+400)+h,50,h, flower_list[i+1],colArray[1][0], colArray[1][9], colArray[1][10]))
}

let colour_list=[]
x = 270;
y = 555;
w = 33;
h = 33;

// List of colours for palette using swatch class
let c1= "rgb(0,0,0)"
let black_1 = new Swatch(x,y,w,h, c1, colArray[0][0], colArray[0][0])
let black_2 = new Swatch(x,y+1.3*w,w,h, c1, colArray[0][1], colArray[0][1])
let black_3 = new Swatch(x,y+2.7*w,w,h, c1, colArray[0][2], colArray[0][2])

let grey_1 = new Swatch(x+1.3*w,y,w,h, c1, colArray[0][3], colArray[0][3])
let grey_2 = new Swatch(x+1.3*w,y+1.3*w,w,h, c1, colArray[0][4], colArray[0][4])
let grey_3 = new Swatch(x+1.3*w,y+2.7*w,w,h, c1, colArray[0][5], colArray[0][5])

let white_1 = new Swatch(x+2.6*w,y,w,h, c1, colArray[0][6], colArray[0][6])
let white_2 = new Swatch(x+2.6*w,y+1.3*w,w,h, c1, colArray[0][7], colArray[0][7])
let white_3 = new Swatch(x+2.6*w,y+2.7*w,w,h, c1, colArray[0][8], colArray[0][8])

let red_1 = new Swatch(x+3.9*w,y,w,h, c1, colArray[0][9], colArray[0][9])
let red_2 = new Swatch(x+3.9*w,y+1.3*w,w,h, c1, colArray[0][10], colArray[0][10])
let red_3 = new Swatch(x+3.9*w,y+2.7*w,w,h, c1, colArray[0][11], colArray[0][11])

let orange_1 = new Swatch(x+5.2*w,y,w,h, c1, colArray[0][12], colArray[0][12])
let orange_2 = new Swatch(x+5.2*w,y+1.3*w,w,h, c1, colArray[0][13], colArray[0][13])
let orange_3 = new Swatch(x+5.2*w,y+2.7*w,w,h, c1, colArray[0][14], colArray[0][14])

let yellow_1 = new Swatch(x+6.5*w,y,w,h, c1, colArray[0][15], colArray[0][15])
let yellow_2 = new Swatch(x+6.5*w,y+1.3*w,w,h, c1, colArray[0][16], colArray[0][16])
let yellow_3 = new Swatch(x+6.5*w,y+2.7*w,w,h, c1, colArray[0][17], colArray[0][17])

let green_1 = new Swatch(x+7.8*w,y,w,h, c1, colArray[0][18], colArray[0][18])
let green_2 = new Swatch(x+7.8*w,y+1.3*w,w,h, c1, colArray[0][19], colArray[0][19])
let green_3 = new Swatch(x+7.8*w,y+2.7*w,w,h, c1, colArray[0][20], colArray[0][20])

let blue_1 = new Swatch(x+9.1*w,y,w,h, c1, colArray[0][21], colArray[0][21])
let blue_2 = new Swatch(x+9.1*w,y+1.3*w,w,h, c1, colArray[0][22], colArray[0][22])
let blue_3 = new Swatch(x+9.1*w,y+2.7*w,w,h, c1, colArray[0][23], colArray[0][23])

let pink_1 = new Swatch(x+10.4*w,y,w,h, c1, colArray[0][24], colArray[0][24])
let pink_2 = new Swatch(x+10.4*w,y+1.3*w,w,h, c1, colArray[0][25], colArray[0][25])
let pink_3 = new Swatch(x+10.4*w,y+2.7*w,w,h, c1, colArray[0][26], colArray[0][26])

let brown_1 = new Swatch(x+11.7*w,y,w,h, c1, colArray[0][27], colArray[0][27])
let brown_2 = new Swatch(x+11.7*w,y+1.3*w,w,h, c1, colArray[0][28], colArray[0][28])
let brown_3 = new Swatch(x+11.7*w,y+2.7*w,w,h, c1, colArray[0][29], colArray[0][29])

let peach_1 = new Swatch(x+13*w,y,w,h, c1, colArray[0][30], colArray[0][30])
let peach_2 = new Swatch(x+13*w,y+1.3*w,w,h, c1, colArray[0][31], colArray[0][31])
let peach_3 = new Swatch(x+13*w,y+2.7*w,w,h, c1, colArray[0][32], colArray[0][32])
Swatch.Clicked = colour_list[0]

let colourSet = [black_1,black_2,black_3,grey_1,grey_2,grey_3,white_1,white_2,white_3, red_1,red_2,red_3,orange_1,orange_2,orange_3,yellow_1,yellow_2,yellow_3,green_1,green_2,green_3,blue_1,blue_2,blue_3,pink_1,pink_2,pink_3,brown_1,brown_2,brown_3,peach_1,peach_2,peach_3]

// defining the clear all and undo buttons
let undo = new Button(750, 560, 115, 50,"Undo", c1, colArray[1][13], colArray[1][13]);
let redo = new Button(750, 622, 115, 50, "Redo", c1, colArray[1][11], colArray[1][11]);
let clear = new Button(875, 560, 90, 112, "Clear", c1, colArray[1][12], colArray[1][12]);
button_list.push(undo,redo,clear)

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

}


animate();

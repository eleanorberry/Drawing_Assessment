console.log("main.js is called")

let G = new Grid(width,height, 25, colArray[0][2],0.3);
let C = new ControlObject(canvas);

let name_list = ["Rectangle", "Ellipse"]
let button_list=[]
let x = 150;
let y = 100;
let w = 200;
let h = 50;

for (let i=0; i<name_list.length ; i++){
    button_list.push(new Button(x,y+i*h,w,h, name_list[i], colArray[0][9], colArray[0][7], colArray[0][6]))
}

function animate(){
    ctx.clearRect(0,0,width,height);

    C.update();
    for(let i=0;i<button_list.length;i++){
        button_list[i].update();
    }


    window.requestAnimationFrame(animate);
    G.update();
}


animate();
animate();
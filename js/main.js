console.log("Source code / Forráskód: https://github.com/Cyanoure/Cyformer");
var canvas = document.getElementById("gamecanvas");
var ctx = canvas.getContext("2d");

var asd = 20;
var b = true;

var game = new cyformer(ctx);


var box1 = new game.rectObject();
box1.position.x = 0;
box1.position.y = 0;
box1.color = "#77DDEE";
game.scene.add(box1);

var box2 = new game.rectObject();
game.scene.add(box2);
box2.position = {x:50,y:50};
box2.renderPriority = -1;

var box3 = new game.rectObject();
game.scene.add(box3);
box3.position = {x:100,y:100};
box3.renderPriority = 1;
box3.filled = false;
box3.color = "#F00";

var container = new game.rectObject();
container.position.x = 300;
container.position.y = 300;
container.color = "#0088AA";
game.scene.add(container);

var cbox = new game.rectObject();
cbox.position.x = 0;
cbox.position.y = 0;
cbox.width = 50;
cbox.height = 50;
cbox.color = "#777777";
container.add(cbox);

function render(){
	/*if(b){
		asd+=1;
	}else{
		asd-=1;
	}

	if(asd>200){
		b = !b;
	}else if(asd<10){
		b = !b;
	}*/

	game.scene.position.x = canvas.width/2/game.scene.getSize();
	game.scene.position.y = canvas.height/2/game.scene.getSize();

	canvas.width = window.innerWidth;
	canvas.height = window.innerHeight;
	//ctx.fillStyle = "#AAEEFF";
	//ctx.fillRect(10,10,asd,asd);

	game.render();

	window.requestAnimationFrame(render);
}

render();

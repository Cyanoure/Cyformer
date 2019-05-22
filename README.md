# Cyformer
Object oriented JavaScript 2D (platformer) game engine
## Usage
Example project: [cyformer.github.cyanoure.ga](https://cyformer.github.cyanoure.ga)
## Create canvas
Create a canvas as like in the [index.html](https://github.com/Cyanoure/Cyformer/blob/master/index.html) file.
```
<canvas id="gamecanvas"></canvas>
```
## Add javascript in HTML
The cyformer.js is in my js folder.
```
<script src="js/cyformer.js"></script>
```
## Setting up Cyformer
```
var canvas = document.getElementById("gamecanvas");
var ctx = canvas.getContext("2d");

var game = new cyformer(ctx);
```
## Rendering
```
function render(){
  //x,y = 0,0 is at center with this 2 lines
	game.scene.position.x = canvas.width/2/game.scene.getSize();
	game.scene.position.y = canvas.height/2/game.scene.getSize();

  //set the canvas to the window's width and height
	canvas.width = window.innerWidth;
	canvas.height = window.innerHeight;

	game.render();

	window.requestAnimationFrame(render);
}

render();
```
## Create a rectangle object
```
var box1 = new game.rectObject();
game.scene.add(box1);
```

## Rectangle object settings and methods
Coloring
```
objectVariable.color = "#77DDEE";
objectVariable.filled = true; //fill the square with specified color
```
Visibility
```
objectVariable.visible = true/false;
objectVariable.alpha = (from 0 to 1); //if 0, the object is fully transparent
```
Border
```
objectVariable.borderVisible = true;
objectVariable.borderColor = "#ColorHex"; //if is "" or not set, the border color is equals to object color
```


## In-game object settings and methods
Positioning
```
objectVariable.position.x = 0;
objectVariable.position.y = 0;
objectVariable.moveTo(x,y);
objectVariable.glideTo(x,y,speed); //if the speed is not specified, the speed is 0.5
```
Width and Height
```
objectVariable.width = 100;
objectVariable.height = 100;
```
Size multiplier
```
objectVariable.size = 1;
```
Set rotation (rotation is so buggy if the object is in an another object, please help me :P)
```
objectVariable.setRotation(degree);
```
Get rotation
```
var rotationInDegree = objectVariable.getRotation();
```
Parent and children
```
var parent = objectVariable.parent; //null if no parent
var children = objectVariable.children; //empty array if no children
```
Render priority
```
objectVariable.renderPriority = 1; //higher value is upper
```
Add to object
```
objectVariable.addTo(parentObject);
objectVariable.add(childObject);
```
**_Sorry for my English :/_**

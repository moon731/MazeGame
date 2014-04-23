var canvas;
var kitty;
var context;



var currRectX = 477;
var currRectY = 3;

var mazeWidth = 626;
var mazeHeight = 626;
var intervalVar;
function drawMazeAndKitty(rectX, rectY) {
    
    var mazeImg = new Image();
    
    mazeImg.onload = function () { 
        context.drawImage(mazeImg, 0, 0);
        
       drawKittyImage(currRectX, currRectY, null);
        context.beginPath();
       
        
        context.arc(618, 139, 7, 0, 2 * Math.PI, false);
        context.closePath();
        context.fillStyle = '#FF66CC';
        context.fill();
        
    };
    
    mazeImg.src = "mazecanvas.png";
    
    
}
function drawKittyImage(x, y, style) {
	makeTail(currRectX, currRectY, 15, 15);
	console.log("here");


    currRectX = x;
    currRectY = y;
    context.beginPath();
    
    context.drawImage(kitty, x, y);
    context.closePath();
  
   


}



function makeTail(x, y, w, h) {
	context.beginPath();
	context.rect(x, y, w, h);
	context.closePath();
	context.fillStyle = "#B2FFFF";
    context.fill();
}

function clearScreen(x, y, w, h) {
    context.beginPath();
    context.rect(x, y, w, h);
    context.closePath();
    context.fillStyle = "white";
    context.fill();
}

function moveKitty(e) {

    var newX;
    var newY;
    var canMove;
    e = e || window.event;

    switch (e.keyCode) {
        
        case 38:   // arrow up key
  	case 119: // up key
            newX = currRectX;
            newY = currRectY - 3;
            break;
        
        case 37: // arrow left key
	case 97: // left key
            newX = currRectX - 3;
            newY = currRectY;
            break;
        
        case 40: // arrow down key
	case 115: // down key
            newX = currRectX;
            newY = currRectY + 3;
            break;
        
        case 39: // arrow right key
        case 100: // right key
            newX = currRectX + 3;
            newY = currRectY;
            break;
    }
    movingAllowed = canMoveTo(newX, newY);

    if (movingAllowed === 1) {      // 1 means the rectangle can move
        drawKittyImage(newX, newY, "#0000FF");
        currRectX = newX;
        currRectY = newY;
    }
    else if (movingAllowed === 2) { // 2 means the rectangle reached the end point
        clearInterval(intervalVar); 
        clearScreen(0, 0, canvas.width, canvas.height);
        context.font = "40px Arial";
        context.fillStyle = "#FF99CC";
        context.textAlign = "center";
        context.textBaseline = "middle";
        context.fillText("You earned a new life!!!", canvas.width / 2, canvas.height / 2);
        window.removeEventListener("keydown", moveKitty, true);
    }
}
function canMoveTo(destX, destY) {
console.log("here");

    var imgData = context.getImageData(destX, destY, 15, 15);
    var data = imgData.data;
    var canMove = 1; // 1 means: the rectangle can move
    if (destX >= 0 && destX <= mazeWidth - 15 && destY >= 0 && destY <= mazeHeight - 15) { // check whether the rectangle would move inside the bounds of the canvas
        for (var i = 0; i < 4 * 15 * 15; i += 4) { // look at all pixels
            if (data[i] === 0 && data[i + 1] === 0 && data[i + 2] === 0) { // if you're at an edge , it 
                canMove = 0;											//will be black and you cannot move.
                break;
            }
            else if (data[i] === 255 && data[i + 1] === 102 && data[i + 2] === 204) { // PINK: #FF66CC
                canMove = 2; // the end point is reached
                break;
            }
            
        
        }
    }
    
    
    else {
        canMove = 0;
    }
    return canMove;
}



window.onload = function() {
	
	canvas  = document.getElementById("mazecanvas");
	context= canvas.getContext("2d");
	console.log("Game canvas loaded!");
	kitty = new Image(); 
	kitty.src = "kitty1.png"
	
	
	

	init();
}


function init() {
	
	window.addEventListener("keydown",moveKitty,true);

	
	drawMazeAndKitty(477, 3);

}

//Control Class for the shooter to move
function Controls() {
 	this.Z_KEY = 122; this.z_KEY = 90; //left
 	this.X_KEY = 120; this.x_KEY = 88; //right
 	this.SPACE_KEY = 32; //bullet

 	// when the key is pressed
 	this.keyPress = function(e) {
 		keyPressed = e.which ? e.which : window.event.keyCode;
 		if(keyPressed == this.Z_KEY){
 			shooter.is_left=true;
 		}else if(keyPressed==this.X_KEY){
 			shooter.is_right = true;

 		}else if(keyPressed == this.SPACE_KEY){
 			bullets[bullets.length] = new Bullet(shooter);
 		}
 	}
 	// when the key is released
 	this.keyUp = function(e) {
 		keyPressed = e.which ? e.which : window.event.keyCode;
 		if(keyPressed == this.z_KEY){
 			shooter.is_left=false;
 		}else if(keyPressed == this.x_KEY){
 			shooter.is_right=false;
 		}
 	}
}




//draws the spcae for the game ie. the canvas so that the movement of the gameobjects are not replicated
//tried to do it with CSS, but this was our only solution
var create_game_space = function() {
 	context.fillStyle = '#000';
	context.clearRect(0, 0, WIDTH, HEIGHT);
	context.beginPath();
	context.rect(0, 0, WIDTH, HEIGHT);
	context.closePath();
	context.fill();
}

// create the enemies for initial start of the game
var create_enemy = function(total_row, total_col) {
	var x_position = (WIDTH / 2); 
	var y_position = (HEIGHT / 10);
	for(var x = 0;  x < total_row; ++x) {
		for(var y = 0; y < total_col; ++y) {
			var position_x = x_position + (40 * x);
			var position_y = y_position + (40 * y);
			enemies[enemies.length] = new Enemy(position_x, position_y);
		}
	}
}

//make the game move
var mobilize = function() {
	var curr_move = '';

	if(shooter.is_left){
		shooter.go_left();
	}	
	else if(shooter.is_right){
		shooter.go_right();
	}	

	//loop through shooting bullets
	for(i in bullets) {
		bullets[i].draw();
		if(bullets[i].step()){
			bullets.splice(i, 1);
		}
	}

	//check the movement of the enemies
	for(i in enemies) {
		curr_move = enemies[i].verify_move(); //check if enemy needs to be moved 
		if(curr_move != former_move){
			break;
		}
	}

	//loop through all the enemies
	for(i in enemies) {
		enemies[i].draw();
		if(curr_move != former_move){
			enemies[i].up();
		}else{
			enemies[i].step();		
		}
	}
	former_move = curr_move; //set previous move status 
}



//Game run
var Game = function() {
 
 	create_game_space(); //draw the window game 
	shooter.draw(); //draw the shooter	
	mobilize(); //mobilize all the elements	
	loop_game = setTimeout(Game, interval); //set timeout function
}

//NEED TO BE BOTTOM OF THE FILE OR ELSE IT WONT LOAD -_-
//CONSTANTS DECLARATION and initialization 

const WIDTH = 500;
const HEIGHT = 400;
const FRAME_RATE = 30;
var controls = new Controls();
var shooter = new Shooter();
var bullets = new Array();
var enemies = new Array();
var loop_game;

var interval = 1000 / FRAME_RATE; //set time of interval 
var former_move = 'left';
var grid = document.getElementById("gamegrid");
grid.width = WIDTH;
grid.height = HEIGHT;
var context = grid.getContext("2d");

create_enemy(5, 6);

//handle events when the a key is pressed
document.onkeypress = function(e) {
	controls.keyPress(e);	
}

//handle events when the key is released
document.onkeyup = function(e) {
	controls.keyUp(e);
}

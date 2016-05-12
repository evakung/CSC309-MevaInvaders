
/* This file consist of the game objects appearing on the screen with setter and getter functions of their position, movement, and status */

//enemy class + its functionalities
function Enemy(start_x, start_y) {
	
	//settings and config for Enemy 
	var image_source = 'alien.png';
	this.width = 16;
	this.height = 12;
	var curr_move = 'left';	//initial direction
	
	//Make animating object 
	var enemy = new GameObject(3);
	enemy.start_img(image_source, this.width, this.height);
	enemy.start_position(start_x, start_y);


	//Draws the enemy with the gameobject class onto the canvas
	this.draw = function() {
		enemy.draw();
	}

	//get the enemies position at x
	 this.get_x = function() {
	 	return enemy.x;
	 }

	//get the enemies position at y
	 this.get_y = function() {
	 	return enemy.y;
	 }

	//moves the enemy left, right
	this.step = function() {
		if(curr_move == 'left') {
			enemy.go_left();
		}else if(curr_move == 'right') {
			enemy.go_right();
		}
	}

	//moves the enemy up
	this.up = function() {
		if(curr_move == 'left') {
			curr_move = 'right';
		}else {
			curr_move = 'left';
		}
		enemy.go_front();
	}

	//verifties if the move is needed
	this.verify_move = function() {
		if(enemy.x <= 10 && curr_move == 'left') {
			curr_move = 'right';
		}else if(enemy.x >= (WIDTH - 10) && curr_move == 'right') {
			curr_move = 'left';
		}
		return curr_move;
	}

}



 //Shooter class 
function Shooter() {

	var image_source = 'shooter.png';
	this.width = 26;
	this.height = 16;

	this.is_left = false; // shooter object is moving left or right 
	this.is_right = false;

	var shooter = new GameObject(20); //instantiates the shooter with game object
	shooter.start_img('shooter.png', 26, 16);
	shooter.start_position(WIDTH / 2, HEIGHT - 15);

	//Draw the shooter onto the canvas
	this.draw = function() {
		shooter.draw();
	}

	 //get the shooter's position at x
	 this.get_x = function() { //getter function 
	 	return shooter.x;
	 }

	 //get the shooter's position y
	 this.get_y = function() { //getting function
	 	return shooter.y;
	 }

	//move the shooter go left
	this.go_left = function() {
		shooter.go_left();
	}

	//move the shooter go right
	 this.go_right = function() {
	 	shooter.go_right();
	 }

}



//Bullet class
function Bullet(shooter) {

	this.width = 3;
	this.height = 3;

	//intial position x and y (where the shooter is basically)
	this.x = shooter.get_x() - 2;
	this.y = shooter.get_y() - 15;

	//draws the bullet onto the canvas
	this.draw = function() {
		context.fillStyle = "#FFFF00";
		context.fillRect(this.x, this.y, this.width, this.height);	
	}

	//gets the bullets x
	 this.get_x = function() {
	 	return this.x;
	 }

	 //gets the bullets y
	 this.get_y = function() {
	 	return this.y;
	 }
	 
	//if bullet hits the top of the screen
	this.step = function() {
		this.y = this.y - 20;
		if(this.y <= 0)	return true;
		return false;
	}


}



 //Game object class -- generic class for the enemy and shooter
 // ie. for the positions/images etc.
function GameObject(increment) {
	var increment = increment;

	//init the image of the game object
	this.start_img = function(src, width, height) {
		this.image = new Image();
		this.image.src = src;
		this.width = width;
		this.height = height;
	}

	//init the position of the game object
	this.start_position = function(start_x, start_y) {
		this.x = start_x;
		this.y = start_y;	
	}

	//init set up of the cordinates for the gameobject
	this.set_xy = function(position_x, position_y) {
		if((position_x > 0) && (position_x < WIDTH)) { // to check the position boundaries
			this.x = position_x;
	 		this.y = position_y;
		}
	}

	//draws the game object onto the canvas
	this.draw = function() {
		context.drawImage(this.image, this.x - (this.width / 2), this.y - (this.height / 2));
	}

	//game object go left
	this.go_left = function() {
		this.set_xy(this.x - increment, this.y);
	}

	//game object go right
	this.go_right = function() {
		this.set_xy(this.x + increment, this.y);
	}

	//game object go up
	this.go_front = function() {
		this.set_xy(this.x, this.y + (increment * 3));
	}
}

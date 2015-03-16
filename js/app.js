//constants
var STEP_LEFT_RIGHT = 101;
var STEP_UP_DOWN = 83;
var NUM_ENEMY = 6;
var START_X = 202;
var START_Y = 404;
var ENEMY_SPEEDS
// Enemies our player must avoid
var Enemy = function() {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started
    this.x = 0;
    this.y = 63 + (Math.round(Math.random() * 2) * 83);
    // The speed for enemys 
    this.speed = 1 + Math.random();
    
    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
}

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.

    //update positions
    this.x  = (this.x + (101 * dt * this.speed)) % 1010;
    //this.x += this.speed * dt;
}

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
}

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function(x, y) {
    //initil position of the player
    this.x = x;
    this.y = y;
    this.score = 0;
    this.sprite = "images/char-cat-girl.png";
}

// Update player depending if touched by an enemy or reaches the water.
// Each test dispays to the console a message if condition is true.
Player.prototype.update = function() {
    // Check if player has been hit by any enemy and updates score. Resets if true.
    // Collision box created around pixel of player and enemy in If test.
    var  bug = allEnemies.length; 
    for(var index = 0; index < bug; index++) {
        if(this.x < allEnemies[index].x + 90 && this.x + 65 > allEnemies[index].x + 2 
          && this.y + 135 > allEnemies[index].y + 142 && this.y + 65 < allEnemies[index].y + 79) {
            this.score  = 0;
            this.x = START_X;
            this.y = START_Y;
        }
    }
//if player win, add 5 do score
    if(this.y <= 0) {
        this.score += 5;
        this.x = START_X;
        this.y = START_Y;
    }

    // Display Score
    ctx.clearRect(0, 0, 250, 43);
    ctx.fillStyle = 'black';
    ctx.font = '30px Arial';
    ctx.fillText("Score: " + this.score, 0, 40);
}

// Draw the player on the screen, required method for game
Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
}

// Move player  and check that it is not beyond the bounds of the field
Player.prototype.handleInput = function(direction) {
    if(direction == 'left' && this.x - STEP_LEFT_RIGHT >= 0)
        this.x -= STEP_LEFT_RIGHT;
    if(direction == 'up' && this.y - STEP_UP_DOWN >= -11)
        this.y -= STEP_UP_DOWN;
    if(direction == 'right' && this.x + STEP_LEFT_RIGHT < 505)
        this.x += STEP_LEFT_RIGHT;
    if(direction == 'down' && this.y + STEP_UP_DOWN < 487)
        this.y += STEP_UP_DOWN;
}


// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player

// Create all enemies for game.
var allEnemies = [];

for (var index = 0; index < NUM_ENEMY; index++) {
    var enemyObj = new Enemy();
    allEnemies.push(enemyObj);
};

//Create player.
var player = new Player(START_X, START_Y);

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
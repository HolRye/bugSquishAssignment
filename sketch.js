let sx = 0;
let sy = 0;
let sw = 80;
let sh = 80;
let u = 0, v = 0;
let animationLength = 8;
let currentFrame = 0;
let x = 200;
let moving = 0;
let xDirection = 1;
let walkingAnimation;
let spriteSheetFilenames = ["BugFella.png", "BugFellaBlue.png", "BugFellaPink.png", "DeadBugFella.png"];
let spriteSheets = [];
let totalAnimations = 25;
let animations = [];
let bugsSquished = 0; 
let remainingTime = 30; 
let gameOver = false;
let maxSquishedSprites = 10; 
let speedIncrement = 1; 
let baseSpeed = 5; 

function preload() {
  for (let i = 0; i < spriteSheetFilenames.length; i++) {
    spriteSheets[i] = loadImage("assets/" + spriteSheetFilenames[i]);
  }
}

function setup() {
  createCanvas(400, 400);
  imageMode(CENTER);

  
  setInterval(updateTimer, 1000);

  for (let i = 0; i < totalAnimations; i++) {
    animations[i] = walkingAnimation = new WalkingAnimation(random(spriteSheets.filter(sprite => sprite !== spriteSheets[spriteSheetFilenames.indexOf("DeadBugFella.png")])), 80, 80, random(100, 300), random(100, 300), 8, baseSpeed, 7);
  }
}

function draw() {
  background(220);

  // This portion of the code displays the counter for the amount of bugs that were squished by the user
  fill(0);
  textSize(16);
  textAlign(RIGHT, TOP);
  text("Bugs Squished: " + bugsSquished, width - 10, 10);

  // This part has the time show up at the top left corner of the screen
  fill(0);
  textSize(16);
  textAlign(LEFT, TOP);
  text("Time: " + remainingTime, 10, 10);

  
  for (let i = 0; i < animations.length; i++) {
    animations[i].draw();
    animations[i].move(); 
  }

  
  if (remainingTime === 0) {
    
    for (let i = 0; i < animations.length; i++) {
      animations[i].stop();
    }
    // This part brings up the "GAME OVER" text box and also shows the score that the player had when the time ran out.
    textAlign(CENTER, CENTER);
    textSize(48);
    fill(0, 255, 0); 
    rect(width / 2 - 150, height / 2 - 100, 300, 200);
    fill(0);
    text("GAME OVER", width / 2, height / 2 - 20);
    textSize(24);
    text("Bugs Squished: " + bugsSquished, width / 2, height / 2 + 20);
    gameOver = true;
  }
}

let squishedSprites = [];
// This portion deals with the players inputs on the game and how it affects gameplay, such as squishing, counting the amount of squishes, and also dealing with incrementing speed increase
function mousePressed() {
  if (!gameOver) {
    for (let i = 0; i < animations.length; i++) {
      let contains = animations[i].contains(mouseX, mouseY);
      if (contains && !squishedSprites.includes(animations[i])) { 
        animations[i].stop();
        animations[i].changeToDeadBug(); 
        squishedSprites.push(animations[i]); 
        bugsSquished++; 
        
        
        for (let j = 0; j < squishedSprites.length; j++) {
          squishedSprites[j].incrementSpeed(speedIncrement);
        }
        
        if (bugsSquished > maxSquishedSprites) {
          
          let removedSprite = squishedSprites.shift();
          
          removedSprite.restart();
          
          for (let j = 0; j < squishedSprites.length; j++) {
            squishedSprites[j].incrementSpeed(speedIncrement);
          }
        }
      }
    }
  }
}

function updateTimer() {
  if (!gameOver && remainingTime > 0) {
    remainingTime--;
  }
}
//the class for everything having to do with how the sprite moves and interacts on the sketch
class WalkingAnimation {
  constructor(character, sw, sh, dx, dy, animationLength, speed, framerate) {
    this.character = character;
    this.sw = sw;
    this.sh = sh;
    this.dx = dx;
    this.dy = dy;
    this.u = 0;
    this.v = 0;
    this.animationLength = animationLength;
    this.currentFrame = 0;
    this.speed = speed;
    this.originalSpeed = speed; 
    this.framerate = framerate * speed;
    this.angle = random(TWO_PI); 
    this.moving = true; 
  }

  draw() {
    if (this.character !== spriteSheets[spriteSheetFilenames.indexOf("DeadBugFella.png")]) {
      this.u = this.currentFrame % this.animationLength;
      push();
      translate(this.dx, this.dy);
      scale(1, 1);

      // This portion of the code is for calcuating rotation whenever a sprite reaches the edge of the sketch border
      let rotation = atan2(this.dy - this.previous_dy, this.dx - this.previous_dx);
      rotate(rotation);

      image(this.character, 0, 0, this.sw, this.sh, this.u * this.sw, this.v * this.sh, this.sw, this.sh);
      pop();
      let proportionalFramerate = round(frameRate() / this.framerate);
      if (frameCount % proportionalFramerate == 0) {
        this.currentFrame++;
      }
    } else {
      
      image(this.character, this.dx, this.dy, this.sw, this.sh, 0, 0, this.sw, this.sh);
    }
  }


  move() {
    if (this.moving) {
      this.previous_dx = this.dx; 
      this.previous_dy = this.dy; 

      let velocity = p5.Vector.fromAngle(this.angle).mult(this.speed);
      let new_dx = this.dx + velocity.x;
      let new_dy = this.dy + velocity.y;

     
      if (
        new_dx > this.sw / 2 &&
        new_dx < width - this.sw / 2 &&
        new_dy > this.sh / 2 &&
        new_dy < height - this.sh / 2
      ) {
        this.dx = new_dx;
        this.dy = new_dy;
      } else {
        
        this.angle = random(TWO_PI);
      }
    }
  }


  contains(x, y) {
    let insideX = x >= this.dx - 26 && x <= this.dx + 25;
    let insideY = y >= this.dy - 35 && y <= this.dy + 35;
    return insideX && insideY;
  }

  stop() {
    // This portion is the logic for stopping the movement of the sprite once it has been squished
    this.moving = false;
    this.currentFrame = 0;
  }

  changeToDeadBug() {
    // Causes the sprites that are squished to have their sprite changed to the "DeadBugFella.png"
    this.character = spriteSheets[spriteSheetFilenames.indexOf("DeadBugFella.png")];
  }
  
  // This portion causes new sprites to spawn after the max number of squished sprites is reached, allowing for the player to get more points
  restart() {
    let randomIndex = Math.floor(random(spriteSheets.length - 1)); // Exclude DeadBugFella.png
    this.character = spriteSheets[randomIndex];
    this.dx = random(100, 300);
    this.dy = random(100, 300);
    this.angle = random(TWO_PI);
    this.currentFrame = 0;
    this.moving = true;
    this.speed = this.originalSpeed; 
  }
  
  // This portion makes the bugs slightly faster with each squish. not super noticable unless you get higher squish numbers.
  incrementSpeed(amount) {
    this.speed += amount;
  }
}

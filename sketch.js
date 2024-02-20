let character;
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

let spriteSheetFilenames = ["BugFella.png", "character1.png", "MeatGuy.png", "VikingFella.png"];
let spriteSheets = [];
let totalAnimations = 3;
let animations = [];



function preload() {
  for (let i=0; i < spriteSheetFilenames.length; i++) {
    spriteSheets[i] = loadImage("assets/" + spriteSheetFilenames[i]);
  }
  
}

function setup() {
  createCanvas(400, 400);
  imageMode(CENTER);

  for (let i=0; i < totalAnimations; i++) {
    animations[i] = walkingAnimation = new WalkingAnimation(random(spriteSheets),80,80,random(100,300),random(100,300),8);
  }
}

function draw() {
  background(220);

  for (let i=0; i < animations.length; i++) {
    animations[i].draw();
  }
  
}
function keyPressed() {
 walkingAnimation.keyPressed();

}

function keyReleased(){
  walkingAnimation.keyReleased();
  
}


class WalkingAnimation {
  constructor(character, sw, sh, dx, dy, animationLength){
    this.character = character;
    this.sw = sw;
    this.sh = sh;
    this.dx = dx;
    this.dy = dy;
    this.u = 0, v = 0;
    this.animationLength = animationLength;
    this.currentFrame = 0;
    this.moving = 0;
    this.xDirection = 1;
  }


  draw() {
      
     this.u = (this.moving != 0) ? this.currentFrame % this.animationLength : 0;
     push();
    translate(this.dx, this.dy);
    scale(this.xDirection,1);
    image(this.character,0,0,this.sw,this.sh,this.u*this.sw,this.v*this.sh,this.sw,this.sh);
    pop();
    if (frameCount % 7 == 0) {
      this.currentFrame++;
       }

      this.dx += this.moving;

      if (this.dx > width || this.dx < 0) {
        
      }
  }
  
  moveRight() {
    this.moving = 1;
    this.xDirection = 1;
  }

  moveLeft() {
    this.moving = -1;
    this.xDirection = -1;
  }


  keyPressed() {
    if (keyCode === RIGHT_ARROW) {

      this.currentFrame = 1;
    }
    else if (keyCode === LEFT_ARROW){
      
      this.currentFrame = 1;
    }
  }
  keyReleased(){
    if (keyCode === RIGHT_ARROW) {
      this.moving = 0;
    }
    else if (keyCode === LEFT_ARROW) {
      this.moving = 0;
    }
  }
}
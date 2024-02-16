let character;
let sx = 0;
let sy = 0;
let sw = 80;
let sh = 80;
let u = 0, v = 0;
let animationLength = 9;
let currentFrame = 0;
let x = 200;
let moving = 0;
let xDirection = 1;
let walkingAnimation;
let walkingAnimation2;
let walkingAnimation3


function preload() {
  character = loadImage('assets/character1.png'); 
  meatMan = loadImage('assets/MeatGuy.png');
  vikingMan = loadImage('assets/VikingFella.png');
}

function setup() {
  createCanvas(400, 400);
  imageMode(CENTER);

  walkingAnimation = new WalkingAnimation(character,80,80,150,200,9);
  walkingAnimation2 = new WalkingAnimation(meatMan,80,80,200,300,9);
  walkingAnimation3 = new WalkingAnimation(vikingMan,80,80,250,100,9);
}

function draw() {
  background(220);

  walkingAnimation.draw();
  walkingAnimation2.draw();
  walkingAnimation3.draw();
}
function keyPressed() {
 walkingAnimation.keyPressed();
 walkingAnimation2.keyPressed();
 walkingAnimation3.keyPressed();
}

function keyReleased(){
  walkingAnimation.keyReleased();
  walkingAnimation2.keyReleased();
  walkingAnimation3.keyReleased();
}


class WalkingAnimation {
  constructor(character, sw, sh, dx, dy){
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
    if (frameCount % 8 == 0) {
      this.currentFrame++;
       }
      this.dx += this.moving;
  }

  keyPressed() {
    if (keyCode === RIGHT_ARROW) {
      this.moving = 1;
      this.xDirection = 1;
      this.currentFrame = 1;
    }
    else if (keyCode === LEFT_ARROW){
      this.moving = -1;
      this.xDirection = -1;
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
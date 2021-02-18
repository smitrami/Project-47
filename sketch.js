var background_img;
var car, car_img;
var diamond, diamond_img;
var bluediamond;
var purplediamond;
var violetdiamond;
var diamond2;
var invisiblegr;
var bomb, bomb_img;
var life, life_img;
var ground;
var bombGroup;
var life1 = 5;
var gameState = "wait";
var gameOverImage;
function preload() {
  bluediamond = loadImage("images/blue_diamond.png");
  purplediamond = loadImage("images/purple_diamond.png");
  violetdiamond = loadImage("images/violetdiamond.png");
  car_img = loadAnimation("images/kid1.png", "images/kid2.png", "images/kid3.png");
  diamond2 = loadImage("images/diamond.png");
  background_img = loadImage("images/forest background.jpg");
  bomb_img = loadImage("images/bomb.png");
  life_img = loadImage("images/life.png");
  gameOverImage = loadImage("gameover.jpeg")
}


function setup() {
  createCanvas(displayWidth * 10, displayHeight - 200);

  car = createSprite(160, 300, 50, 50);
  car.addAnimation("car", car_img);
  car.scale = 0.5;
  //car.velocityX = 7;
  invisiblegr = createSprite(displayWidth * 3, 420, displayWidth * 8, 20);
  invisiblegr.visible = false;

  bombGroup = new Group();

  spawnDiamonds();
  spawnBombs();
}

function draw() {
  background(background_img);

  if (gameState === "wait") {
    //change canvas size 
    //add instruction for player
    //change background
    //background(background_img);
    //text command
    if (keyDown("Enter")) {
      gameState = "play";
    }
  }

  if (gameState === "play") {
    //change canvas size 
    background(background_img);
    if (keyIsDown(UP_ARROW)) {
      car.velocityY = -10;

    }
    //use right arrow to move the boy
    //change car sprite name to boy

    car.velocityX = 10;
    car.velocityY = car.velocityY + 0.3;
    //when boy collide with diamonds increase score and score as well
    bombGroup.collide(car, decLife);
    car.collide(invisiblegr);
    if (life1 === 0) {
      gameState = "end";
    }
  }

  if (gameState === "end") {
    resizeCanvas(500, 500)
    background(gameOverImage);

  }
  if (gameState != "wait" && gameState != "end") {

    drawSprites();
  }
}


function spawnDiamonds() {
  for (var i = 500; i < displayWidth * 10; i = i + 700) {
    diamond = createSprite(i, random(350, 400), 50, 40);
    diamond.scale = 0.2;
    var rand = Math.round(random(1, 4));
    switch (rand) {
      case 1: diamond.addImage("diamond", diamond2);
        diamond.scale = 0.2;
        break;
      case 2: diamond.addImage("diamond", bluediamond);
        diamond.scale = 0.1;
        break;
      case 3: diamond.addImage("diamond", purplediamond);
        diamond.scale = 0.2;
        break;
      case 4: diamond.addImage("diamond", violetdiamond);
        diamond.scale = 0.2;
        break;

    }

  }
}

function spawnBombs() {
  for (var i = 700; i < displayWidth * 10; i = i + 1000) {
    bomb = createSprite(i, 400, 50, 50);
    bomb.addImage("bomb", bomb_img);
    bomb.scale = 0.2;
    bombGroup.add(bomb);
  }


}

function decLife(bomb, car) {

  life1 = life1 - 1;
  for (var i = 1; i <= life1; i = i + 1) {
    life = createSprite(i * 50, 50, 50, 50);
    life.addImage("life", life_img);
    life.scale = 0.08;
  }
  life.remove();
  console.log(life1);
  if (life1 > 0) {
    //change gameState to play.
  }
  else {
    gameState = 'end';
  }
  bomb.remove();
}
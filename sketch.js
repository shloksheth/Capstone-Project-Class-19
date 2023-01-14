var boy, boyImg;
var reaper, reaperImg;
var rockImg, rock, rocksGroup;
var spookySound;
var forestImg, forest;
var gameState = "play"
var game_over, overImg;
var score = 0, scoreText;

function preload() {
  boyImg = loadImage("boy.gif");
  reaperImg = loadImage("Grim_Reaper.webp");
  rockImg = loadImage("the-rock-sus.png");
  forestImg = loadImage("background.jpg");
  overImg = loadImage("game_over.png");
  spookySound = loadSound("wrong-place-129242.mp3");
}

function setup() {
  createCanvas(windowWidth - 600, windowHeight - 1);

  forest = createSprite(windowWidth / 2, 350);
  forest.addImage("forest", forestImg);
  forest.velocityX = -8;
  forest.scale = 3

  boy = createSprite(450, 600, 50, 50);
  boy.addImage("boy", boyImg);
  boy.scale = 0.5;

  reaper = createSprite(150, 600, 50, 50);
  reaper.addImage("reaper", reaperImg);
  reaper.scale = 1.25;

  game_over = createSprite(475, 225, 50, 50);
  game_over.addImage("over", overImg);
  game_over.scale = 1.3;
  game_over.visible = false;

  rocksGroup = new Group();

}

function draw() {
  background(220);

  spookySound.play();

  scoreText = text("Score: " + score, 100, 100);
  scoreText.visible = true;
  scoreText.depth += 5


  if (forest.x < windowWidth / 2 - 600) {
    forest.x = windowWidth / 2
  }

  boy.velocityY = boy.velocityY + 0.8
  if (boy.y > 600) {
    boy.y = 600;
  }

  boy.collide(rocksGroup);
  boy.debug = false;
  boy.setCollider("rectangle", 0, 0, boy.width - 245, boy.height - 120);

  if (keyDown("space") || keyDown("up") && boy.y >= 500) {
    boy.velocityY = -5.4;
  }

  if (keyDown("right_arrow") && boy.x <= 550) {
    boy.x = boy.x + 35
  }

  if (reaper.isTouching(boy)) {
    gameOver();
    console.log("game over");
  }

  if (gameState == "play") {
    spawnRocks();
    score = 5
  }


  drawSprites();
}

function spawnRocks() {
  if (frameCount % 90 == 0 && gameState == "play") {
    rock = createSprite(500, 650, 50, 50);
    rock.scale = 0.34
    rock.addImage("rock", rockImg);
    rock.x = Math.round(random(750, 900));
    rock.velocityX = -5;
    rock.lifetime = 800;
    rocksGroup.add(rock)
    boy.depth = rock.depth
    boy.depth += 1;
    reaper.depth = rock.depth + 1;
  }
}
function gameOver() {
  console.log("g");
  gameState = "end";
  boy.destroy();
  forest.velocityX = 0;
  rocksGroup.velocityX = 0;
  game_over.visible = true;
}




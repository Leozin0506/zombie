var bg,bgImg;
var player, shooterImg, shooter_shooting;
var edges;
var heart1, heart2, heart3;
var hearts1,hearts2,hearts3;
var zombie, zombimg;
var zombieGp;

function preload(){
  
  shooterImg = loadImage("assets/shooter_2.png");
  shooter_shooting = loadImage("assets/shooter_3.png");

  bgImg = loadImage("assets/bg.jpeg");

  heart1 = loadImage("assets/heart_1.png");
  heart2 = loadImage("assets/heart_2.png");
  heart3 = loadImage("assets/heart_3.png");

  zombimg = loadImage("assets/zombie.png");
}

function setup() {
  createCanvas(windowWidth,windowHeight);

  bg = createSprite(displayWidth/2-20, displayHeight/2-40, 20, 20);
  bg.addImage(bgImg);
  bg.scale = 1.1;

  player = createSprite(displayWidth-1150, displayHeight-300,50,50);
  player.addImage(shooterImg);
  player.scale = 0.3;
  player.setCollider("rectangle",0,0,300,500);
  player.debug = true;
  
  hearts1 = createSprite(displayWidth-150,40,20,20);
  hearts1.addImage("1heart",heart1);
  hearts1.visible = false;
  hearts1.scale = 0.4;
  hearts2 = createSprite(displayWidth-100,40,20,20);
  hearts2.addImage("2heart",heart2);
  hearts2.visible = false;
  hearts2.scale = 0.4;
  hearts3 = createSprite(displayWidth-150,40,20,20);
  hearts3.addImage("3heart",heart3);
  hearts3.scale = 0.4;

  zombieGp = new Group();

  edges = createEdgeSprites();

}

function draw() {
  background(0); 


  if(keyDown("UP_ARROW") || touches.length>0){
    player.y = player.y-30;
  }
  if(keyDown("DOWN_ARROW") || touches.length>0){
    player.y = player.y+30;
  }

  if(keyWentDown("SPACE")){
    player.addImage(shooter_shooting)
  }
  if(keyWentUp("SPACE")){
    player.addImage(shooterImg)
  }

  player.collide(edges[2]);
  player.collide(edges[3]);

  if(zombieGp.isTouching(player)){
    for(var i = 0; i<zombieGp.length; i++){
      if(zombieGp[i].isTouching(player)){
        zombieGp[i].destroy();
      }
    }
  }

zombies();
drawSprites();

}

function zombies() {
  if(frameCount%60 === 0){
    zombie = createSprite(random(500,1100),random(100,500),40,40);
    zombie.addImage(zombimg);
    zombie.velocityX = -3;
    zombie.scale = 0.15;
    zombie.setCollider("rectangle",0,0,500,1000);
    zombie.debug = true;
    zombie.lifetime = 400;
    zombieGp.add(zombie);
  }
}
//gameStates
var PLAY = 1;
var END = 2;
var gameState = 1;

var sword,swordImage;
var fruit,r;
var fruitsGroup,enemiesGroup;
var monster,enemyImage;
var score;
var gameOver,gameoverImage;
var gameOverSound,knifeSwordSound;
var position;

function preload(){
  swordImage = loadImage("sword.png");
  
  fruit1 = loadImage("fruit1.png");
  fruit2 = loadImage("fruit2.png");
  fruit3 = loadImage("fruit3.png");
  fruit4 = loadImage("fruit4.png");
  
  enemyImage = loadAnimation("alien1.png","alien2.png");
  
  gameoverImage = loadImage("gameover.png");
  //load sounds
  gameOverSound = loadSound("gameover.mp3")
  knifeSwooshSound = loadSound("swooshKnife.mp3")
  
}
function setup() {
  createCanvas(400, 400);
  //creating sword
   sword=createSprite(40,200,20,20);
   sword.addImage(swordImage);
   sword.scale=0.7;
  
  //set collider for sword
  sword.setCollider("rectangle",0,0,40,40)
  
  fruitGroup=createGroup();
  enemyGroup=createGroup();
  
  score = 0;
}

function draw() {
  background("lightBlue");

  if(gameState==PLAY){
    //controlling sword with mouse
    sword.x = World.mouseX;
    sword.y = World.mouseY;
    
     //calling our functions 
fruits();
enemy();
  }
  knifeSwordSound.play();
  
  if(fruitsGroup.isTouching(sword)){
      fruitsGroup.destroyEach();
    //Adding sound
    knifeSwordSound.play();
      score=score+2;
    
    
  }
  else 
  // Go to end state if sword is touching enemiesGroup
      if(enemiesGroup.isTouching(sword)){
        gameState=END;
        
        fruitsGroup.destroyEach();
        enemiesGroup.destroyEach();
        fruitsGroup.setVelocityXEach(0);
        enemiesGroup.setVelocityXEach(0);
        
        //gameover sound
        gameoverSound.play();
        sword.addImage(gameOverImage);
        sword.x=200;
        sword.y=200;
      }
  
  //displaying the score:
  text("Score : "+ score,300,30);
 
  if(score>=4){
    fruitsGroup.setVelocityXEach(fruit.velocityX+2);
  } 
  
  if(score>=10){
    enemiesGroup.setVelocityXEach(monster.velocityX+5);
  }
  
  drawSprites();
}

function fruits(){
  if(World.frameCount%80===0){
     position = Math.round(random(1,2));
    fruit=createSprite(400,200,20,20);
    fruit.scale=0.2;
     //fruit.debug=true;
     r=Math.round(random(1,4));
    if (r == 1) {
      fruit.addImage(fruit1);
    } else if (r == 2) {
      fruit.addImage(fruit2);
    } else if (r == 3) {
      fruit.addImage(fruit3);
    } else {
      fruit.addImage(fruit4);
    }
    
    fruit.y=Math.round(random(50,340));
   
    fruit.velocityX=-7;
    fruit.setLifetime=100;
    fruit.scale=0.2;
    fruitsGroup.add(fruit);
  }
}

function enemy(){
  if(World.frameCount%200==0){
    monster = createSprite(400,200,20,20);
    monster.velocityX=-(8+(score/10));
    monster.addAnimation("moving",enemyImage);
    monster.y = Math.round(random(100,300));
    monster.velocityX = -8;
    monster.setLifetime = 50;
    
    enemiesGroup.add(monster);
  }
 
  if(position==1)
    {
    fruit.x=400;
    fruit.velocityX=-(7+(score/4));
    }
    else
    {
      if(position==2){
      fruit.x=0;
      
  //Increase the velocity of fruit after score 4 or 10
      fruit.velocityX= (7+(score/4));
        
      }
    }
    
    
     //fruit.debug=true;
     r=Math.round(random(1,4));
    if (r == 1) {
      fruit.addImage(fruit1);
    } else if (r == 2) {
      fruit.addImage(fruit2);
    } else if (r == 3) {
      fruit.addImage(fruit3);
    } else {
      fruit.addImage(fruit4);
    }
    
    fruit.y=Math.round(random(50,340));
   
    
    fruit.setLifetime=100;
    
    fruitGroup.add(fruit);
}

  

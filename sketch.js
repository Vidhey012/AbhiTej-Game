var human, humanImage;
var ground;
var healthyFood, healthyFoodImage1,healthyFoodImage2, healthyFoodGroup;
var junkFood, junkFoodImage1,junkFoodImage2,junkFoodGroup;
var score;

function preload(){
humanImage= loadImage("giphy.gif");
  
  healthyFoodImage1= loadImage("hlthyfood1.png");
  healthyFoodImage2= loadImage("hlthyfood2.png");
  
  junkFoodImage1= loadImage("junkfood1.png"); 
  junkFoodImage2= loadImage("junkfood2.png");
  document.body.style.overflow = 'hidden';

}

function setup() {
  createCanvas(3000,3000);
  
  human= createSprite(80,350,20,20);
  human.addImage("human", humanImage);
  human.scale= 0.2;
  
  ground= createSprite(400,385,1800,10);
  ground.velocityX= -4;
  ground.x= ground.width/2;
  
  healthyFoodGroup= createGroup();
  junkFoodGroup= createGroup();
  
  score=0;
  
  human.setCollider("rectangle",0,0,100,human.height);
  
}

function draw() {
  background(180);
  
  stroke("white")
  textSize(20);
  fill("white");
  text("score: "+ score,500,50);
  
  
  ground.velocityX= -(4+3* score/100);
  
  if(ground.x<0){
    ground.x= ground.width/2;
  }
  
  if(keyDown("space")&& human.y>=100){
    human.velocityY= -12;
  }
    
  human.velocityY= human.velocityY+ 0.8;
  
  spawnHealthyFood();
  spawnJunkFood();
  
  junkFoodGroup.depth= human.depth;
  human.depth= human.depth+1;
  
  if(healthyFoodGroup.isTouching(human)){
    score= score+2;
    healthyFoodGroup.destroyEach();
  }
  
  switch(score){
      case 10: human.scale= 0.3;
      break;
      case 20: human.scale= 0.4;
      break;
      case 30: human.scale= 0.5;
      break;
      case 40: human.scale= 0.6;
      break;
      case 50: human.scale= 0.7;
      break;
	  case 60: human.scale= 0.8;
      break;
      case 70: human.scale= 0.9;
      break;
      case 80: human.scale= 0.10;
      break;
      case 90: human.scale= 0.11;
      break;
      case 100: human.scale= 0.12;
      break;
      default: break;
  }
  
  if(score>=100){
	  swal({
    title:"GAME WON !",
	text:"you have been won the game :)",
	icon:"success",
	closeOnClickOutside: false,
    }).then((value) => {
		window.location.href='index.html';
	});
  }
  if(junkFoodGroup.isTouching(human)){
    human.scale-= 0.1;
	if(human.scale<0.2)
	{
	swal({
    title:"GAME LOOSE !",
	text:"you have been loosed the game :)",
	icon:"error",
	closeOnClickOutside: false,
    }).then((value) => {
		window.location.href='index.html';
	});
	}
    junkFoodGroup.destroyEach();
  }
  
  human.collide(ground);
  
 drawSprites();
  
  

}
function spawnJunkFood(){
  if(frameCount % 300===0){
    var junkFood= createSprite(300,328,10,40);
    junkFood.velocityX= -(4+ score/100);
    r= Math.round(random(1,2));
    if(r==1){
      junkFood.addImage("junkfood",junkFoodImage1);
    } else if(r==2){
      junkFood.addImage("junkfood", junkFoodImage2);
    }
    junkFood.scale= 0.3;
    junkFood.lifetime= 600;
    junkFoodGroup.add(junkFood);
  }
}

function spawnHealthyFood(){
  if(frameCount % 80===0){
    var healthyFood= createSprite(300,120,40,10);
    healthyFood.y= Math.round(random(80,200));
     r= Math.round(random(5,6));
    if(r==5){
 healthyFood.addImage("healthyfood",healthyFoodImage1);
    } else if(r==6){
      healthyFood.addImage("healthyfood", healthyFoodImage2);
    }
    healthyFood.scale= 0.2;
    healthyFood.velocityX= -(3+ score/100);
    healthyFood.lifetime= 600;
    healthyFoodGroup.add(healthyFood);
  }
}







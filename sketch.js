// Código e Inicio PRO C31 V2 Detección de Collisiones y Animación
const Engine = Matter.Engine;
const Render = Matter.Render;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;
const Body = Matter.Body;
const Composites = Matter.Composites;
const Composite = Matter.Composite;

let engine;
let world;
var rope,fruit,ground;
var fruit_con;

var bg_img;
var food;
var rabbit;

var button;
var bunny;

function preload()
{
  bg_img = loadImage('background.png');
  food = loadImage('melon.png');
  rabbit = loadImage('Rabbit-01.png');
 
  // A T) Carga los archivos de imagenes en la variable para tener las animaciones de blink, eat y sad del bunny
  blink = loadAnimation("blink_1.png","blink_2.png","blink_3.png");
  eat = loadAnimation("eat_0.png" , "eat_1.png","eat_2.png","eat_3.png","eat_4.png");
  sad = loadAnimation("sad_1.png","sad_2.png","sad_3.png");
  
  //B T) Establecemos como veradera las animaciones se habilite que ejecuten 
  blink.playing = true;
  eat.playing = true;
  sad.playing = true;

  //C T) Eat y Sad tendrán por default que no se ejecutan a menos le cambiemos a true.
  eat.looping = false;
  sad.looping= false;
}

function setup() 
{
  createCanvas(500,700);
  frameRate(80);

  engine = Engine.create();
  world = engine.world;

  //btn 1
  button = createImg('cut_btn.png');
  button.position(200,30);
  button.size(50,50);
  button.mouseClicked(drop);

  rope = new Rope(7,{x:220,y:30});
  ground = new Ground(200,690,600,20);

  //D T) Para que las animaciones no se ejecuten muy rápido. A Mayor frameDelay más lento pasan los cuadros
  //Probemos valores entre 5 y 40
  blink.frameDelay = 20;
  eat.frameDelay = 20;

  bunny = createSprite(200,620,100,100);
  bunny.addImage(rabbit);
  bunny.scale = 0.2;


  //E T) Agrega las animaciones al bunny. Primer parámetro es un string para identificar la animación, el segundo es la animación
  bunny.addAnimation('blinking',blink);
  bunny.addAnimation('eating',eat);
  bunny.addAnimation('crying',sad);
  // F T) Cambiaremos la animación para que parezca que el bunny está esperando su comida.
  bunny.changeAnimation('blinking');

  fruit = Bodies.circle(300,300,20);
  Matter.Composite.add(rope.body,fruit);

  fruit_con = new Link(rope,fruit);

  rectMode(CENTER);
  ellipseMode(RADIUS);
  textSize(50)
  imageMode(CENTER);
}

function draw() 
{
  background(51);
  image(bg_img,width/2,height/2,490,690);

  push();
  if(fruit!=null){
    image(food,fruit.position.x,fruit.position.y,70,90);
  }
  pop();

  rope.show();

  Engine.update(engine);
  ground.show();
  drawSprites();
   
}

function drop()
{
  rope.break();
  fruit_con.detach();
  fruit_con = null; 
}





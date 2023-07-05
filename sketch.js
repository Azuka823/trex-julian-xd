var Trex;
var running;
var piso, pisoImagen, pisoInvisible;
var nube, nubeImagen;
var ob1, ob2, ob3, ob4, ob5, ob6;
var grupoCactus, grupoNubes;
var gameOverImage, gameOver;
const PLAY = 1;
const END = 0;
var gameState = PLAY;
var trexCollide;
var reinicioimage, reinicioGameOver
var trexchoco;
var puntos = 0;


function preload() {//precarga

  running = loadAnimation("trex1.png", "trex3.png", "trex4.png");
  pisoImagen = loadImage("ground2.png");
  nubeImagen = loadImage("cloud.png");
  gameOverImage = loadImage("gameOver.png");
  trexCollide = loadImage("trex_collided.png");
  ob1 = loadImage("obstacle1.png");
  ob2 = loadImage("obstacle2.png");
  ob3 = loadImage("obstacle3.png");
  ob4 = loadImage("obstacle4.png");
  ob5 = loadImage("obstacle5.png");
  ob6 = loadImage("obstacle6.png");
  reinicioimage = loadImage("restart.png");
  trexchoco = loadImage("trex_collided.png")
}

function setup() {//configuración del juego
  createCanvas(600, 200);
  Trex = createSprite(50, 160, 10, 30);
  Trex.addAnimation("corriendo", running);
  Trex.addImage("chocado", trexchoco)
  Trex.scale = 0.5;

  piso = createSprite(300, 180, 600, 10);
  piso.shapeColor = "brown";
  piso.addImage(pisoImagen);
  piso.velocityX = -3;

  pisoInvisible = createSprite(300, 190, 600, 10);
  pisoInvisible.visible = false;

  var r = Math.round(random(1, 100));

  grupoNubes = new Group();
  grupoCactus = new Group();

  gameOver = createSprite(300, 100, 100, 70);
  gameOver.addImage(gameOverImage);
  gameOver.scale = 0.7;
  gameOver.visible = false;

  reinicio = createSprite(300, 145, 100, 100);
  reinicio.addImage(reinicioimage);
  reinicio.scale = 0.6;
  reinicio.visible = false;

  Trex.debug = false;
  Trex.setCollider("circle", 0, 0, 35)
}

function draw() {//Dibujar
  background("white");
  drawSprites();
  text("score " + puntos, 528, 30)
  //text(mouseX + "-"+ mouseY,mouseX,mouseY);

  if (gameState == PLAY) {
    if (frameCount % 7 === 0) {
      puntos = puntos + 1;
    }


    crearNubes();
    crearObstaculos();
    if (keyDown("space") && Trex.y > 155) {
      Trex.velocityY = -12;
    }

    if (piso.x < 0) {
      piso.x = piso.width / 2;

    }


    if (grupoCactus.isTouching(Trex)) {
      gameState = END
    }

  } else if (gameState == END) {
    piso.velocityX = 0;
    gameOver.visible = true
    reinicio.visible = true
    Trex.changeImage("chocado");
    grupoCactus.setVelocityXEach(0);
    grupoNubes.setVelocityXEach(0);
    grupoCactus.setLifetimeEach(-1);
    grupoNubes.setLifetimeEach(-1);

    if (mousePressedOver(reinicio)) {
      console.log("presionando el reinicio")
      reinciarJuego();
    }


  }


  //console.log(frameCount);

  Trex.velocityY = Trex.velocityY + 0.8;
  Trex.collide(pisoInvisible);
}

function crearNubes() {
  console.log(Trex.depth);
  if (frameCount % 40 === 0) {

    var altura = Math.round(random(80, 125));
    var velocidad = Math.round(random(-1, -5));
    var tam = Math.round(random(1.4, 0.1))

    nube = createSprite(600, altura, 30, 10);
    nube.shapeColor = "brown";
    nube.addImage(nubeImagen);
    nube.velocityX = velocidad;
    nube.scale = tam;
    Trex.depth = nube.depth + 1;
    nube.lifetime = 650
    grupoNubes.add(nube)

  }

}


function crearObstaculos() {
  if (frameCount % 50 === 0) {
    var cactus = createSprite(600, 170, 20, 70);
    cactus.velocityX = -6;
    var r = Math.round(random(1, 6));
    cactus.scale = 0.60;
    cactus.lifetime = 525
    grupoCactus.add(cactus);
    switch (r) {
      case 1:
        cactus.addImage(ob1);
        break;
      case 2:
        cactus.addImage(ob2);
        break;
      case 3:
        cactus.addImage(ob3);
        break;
      case 4:
        cactus.addImage(ob4);
        break;
      case 5:
        cactus.addImage(ob5);
        break;
      case 6:
        cactus.addImage(ob6);
        break;
    }

  }

}

function reinciarJuego() {
  gameState = PLAY;
  piso.velocityX = -(4 + 3 * puntos / 100);
  gameOver.visible = false;
  reinicio.visible = false;
  grupoCactus.destroyEach();
  grupoNubes.destroyEach();
  Trex.changeImage("corriendo");
  puntos = 0;

}
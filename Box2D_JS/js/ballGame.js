// Declare all the commonly used objects as variables for convenience
var b2Vec2 = Box2D.Common.Math.b2Vec2;
var b2BodyDef = Box2D.Dynamics.b2BodyDef;
var b2Body = Box2D.Dynamics.b2Body;
var b2FixtureDef = Box2D.Dynamics.b2FixtureDef;
var b2Fixture = Box2D.Dynamics.b2Fixture;
var b2World = Box2D.Dynamics.b2World;
var b2PolygonShape = Box2D.Collision.Shapes.b2PolygonShape;
var b2CircleShape = Box2D.Collision.Shapes.b2CircleShape;
var b2DebugDraw = Box2D.Dynamics.b2DebugDraw;
var b2RevoluteJointDef = Box2D.Dynamics.Joints.b2RevoluteJointDef;

var b2Listener = Box2D.Dynamics.b2ContactListener;

var listener = new b2Listener;

var canvas;
var canvasDibujado;
var ctx;
var stdConditions = [1.0, 0, 1];

var world;
var scale = 30; //30 pixels on our canvas correspond to 1 meter in the box2d world
var gravity = 9.8;

function init()
{
	canvas = document.getElementById('canvas');
	canvasDibujado = document.getElementById('canvasDibujado');
	ctx = canvasDibujado.getContext('2d');

	// Setup the box2d World that will do most of they physics calculation
	var gravity = new b2Vec2(0,9.8); //declare gravity as 9.8 m/s^2 downwards
	var allowSleep = false; //Allow objects that are at rest to fall asleep and be excluded from calculations
	world = new b2World(gravity,allowSleep);
	
	// pared izquierda 
	createNewBox(b2Body.b2_staticBody, 5, canvas.height/2, 5, canvas.height, false, [0, 0, 0], 'muro', false);
	// pared abajo
	createNewBox(b2Body.b2_staticBody, canvas.width/2, canvas.height - 200, canvas.width, 5, false, [0, 0, 0], 'suelo', false);
	// pared arriba
	createNewBox(b2Body.b2_staticBody, canvas.width/2, 5, canvas.width, 5, false, [0, 0, 0], 'muro', false);
	// pared derecha
	createNewBox(b2Body.b2_staticBody, canvas.width - 5, canvas.height/2, 5, canvas.height, false, [0, 0, 0], 'muro', false);

	// poste
	postfisk1 = createNewBox(b2Body.b2_staticBody, 170 - 75, canvas.height/2, 75, 10, false, [0, 0, 0], 'poste', false);
	postfisk2 = createNewBox(b2Body.b2_staticBody, canvas.width - (170 - 75), canvas.height/2, 75, 10, false, [0, 0, 0], 'poste', false);
	//porteria
	porteriafisk1 = createNewBox(b2Body.b2_staticBody, 75, canvas.height/2 + 100, 75, 75, false, stdConditions, 'porteria1', true);
	porteriafisk2 = createNewBox(b2Body.b2_staticBody, canvas.width - 75, canvas.height/2 + 100, 75, 75, false, stdConditions, 'porteria2', true);


	player01 = createNewBox(b2Body.b2_dynamicBody, canvas.width/2 - 200, canvas.height - 230, 30, 60, true, [0, 0, 0], 'player1', false);
	player02 = createNewBox(b2Body.b2_dynamicBody, canvas.width/2 + 200, canvas.height - 230, 30, 60, true, [0, 0, 0], 'player2', false);	
	ball = createNewCircle(b2Body.b2_dynamicBody, canvas.width/2, canvas.height /2, 30, [0.5, 0, 1], "ball");
	
	//console.log(player.GetFixture());
	
	playerVelocity1 = player01.GetLinearVelocity();
	playerVelocity2 = player02.GetLinearVelocity();
	/*
	ballVelocity = new b2Vec2(100,100);
	ballDir = new b2Vec2(ballVelocity.x, ballVelocity.y);

	ball.ApplyForce(ballDir, ball.GetPosition());
	*/

	//ballVelocity = ball.GetLinearVelocity();

	ballImage = setImage(ballImage, 'img/ball.png');

	background = setImage(background, 'img/nivel.png');
	
	playerImage01 = setImage(playerImage01, 'img/player1.png');
	playerImage02 = setImage(playerImage02, 'img/player2.png');
	
	poste1 = setImage(poste1, 'img/poste.png');
	poste2 = setImage(poste2, 'img/poste.png');

	porteria1 = setImage(porteria1, 'img/poste.png');
	porteria2 = setImage(porteria2, 'img/poste.png');

	setupDebugDraw();
	animate();
	repaint();
}

var poste1, poste2;
var postfisk1, postfisk2;

var porteriafisk1, porteriafisk2;
var porteria1, porteria2;

function setImage(imagen, src)
{
	imagen = new Image();
	imagen.src = src;
	return imagen;
}

function createNewCircle(type, x, y, radio, conditions, customTag)
{
	var bodyDef = new b2BodyDef;
	bodyDef.type = type;
	bodyDef.position.x = x/scale;
	bodyDef.position.y = y/scale;
	bodyDef.userData = {tag:customTag};

	var fixtureDef = new b2FixtureDef;
	fixtureDef.density = conditions[0];
	fixtureDef.friction = conditions[1];
	fixtureDef.restitution = conditions[2];

	fixtureDef.shape = new b2CircleShape(radio/scale);

	var body = world.CreateBody(bodyDef);
	var fixture = body.CreateFixture(fixtureDef);

	return body;
}

function createNewShape(type, x, y, vertices, vertexCount, conditions)
{
	var bodyDef = new b2BodyDef;
	bodyDef.type = type;
	bodyDef.position.x = x/scale;
	bodyDef.position.y = y/scale;

	var fixtureDef = new b2FixtureDef;
	fixtureDef.density = conditions[0];
	fixtureDef.friction = conditions[1];
	fixtureDef.restitution = conditions[2];

	fixtureDef.shape = new b2PolygonShape;
	fixtureDef.shape.SetAsArray(vertices, vertexCount);

	var body = world.CreateBody(bodyDef);
	var fixture = body.CreateFixture(fixtureDef);

	return body;
}

function createNewBox(type, x, y, w, h, rotation, conditions, customTag, sensor)
{
	var bodyDef = new b2BodyDef;
	bodyDef.type = type;
	bodyDef.position.x = x/scale;
	bodyDef.position.y = y/scale;
	bodyDef.fixedRotation = rotation;
	bodyDef.userData = {tag:customTag};

	var fixtureDef = new b2FixtureDef;
	fixtureDef.density = conditions[0];
	fixtureDef.friction = conditions[1];
	fixtureDef.restitution = conditions[2];
	fixtureDef.isSensor = sensor;

	fixtureDef.shape = new b2PolygonShape;
	fixtureDef.shape.SetAsBox(w/scale,h/scale);

	var body = world.CreateBody(bodyDef);
	var fixture = body.CreateFixture(fixtureDef);

	return body;
}

function repaint()
{
  	window.requestAnimationFrame(repaint);
  	paint();
}

function paint()
{
	switch(currentScene)
	{
		case 0:
			drawMenu();
		break;

		case 1:
			drawInstructions();
		break;

		case 10:
			drawGame();
		break;
	}
}

function drawGame()
{
	ctx.clearRect(0,0,canvasDibujado.width,canvasDibujado.height);
	ctx.drawImage(background,0,0,canvasDibujado.width,canvasDibujado.height);

	// jugadores
	ctx.drawImage(playerImage01, player01.GetPosition().x * scale - 32, player01.GetPosition().y * scale - 64, 64, 128);
	ctx.drawImage(playerImage02, player02.GetPosition().x * scale - 32, player02.GetPosition().y * scale - 64, 64, 128);

	// ball
	ctx.drawImage(ballImage, ball.GetPosition().x * scale - 32, ball.GetPosition().y * scale - 32, 64, 64);

	ctx.globalAlpha = 0.2;
	// postes
	ctx.drawImage(poste1, postfisk1.GetPosition().x * scale - 75, postfisk1.GetPosition().y * scale - 10, 150, 20);
	ctx.drawImage(poste2, postfisk2.GetPosition().x * scale - 75, postfisk2.GetPosition().y * scale - 10, 150, 20);

	// porterias
	ctx.drawImage(porteria1, porteriafisk1.GetPosition().x * scale - 75, porteriafisk1.GetPosition().y * scale - 75, 150, 150);
	ctx.drawImage(porteria2, porteriafisk2.GetPosition().x * scale - 75, porteriafisk2.GetPosition().y * scale - 75, 150, 150);
	ctx.globalAlpha = 1;

	ctx.font = '30px Arial';

	ctx.textAlign = 'center';
	ctx.fillText('Puntuación', canvasDibujado.width/2, canvasDibujado.height/2 - 150);
	ctx.fillText('Rojo: ' + score1 + ' -- Azul: ' + score2, canvasDibujado.width/2, canvasDibujado.height/2 - 75);
}

function drawMenu()
{
	ctx.clearRect(0,0,canvasDibujado.width,canvasDibujado.height);

	ctx.globalAlpha = 0.5;
	ctx.drawImage(background,0,0,canvasDibujado.width,canvasDibujado.height);
	ctx.globalAlpha = 1;

	ctx.font = '30px Arial';

	ctx.textAlign = 'center';
	ctx.fillText('JS - Cabezones Futbol', canvasDibujado.width/2, canvasDibujado.height/2 - 50);

	ctx.fillText('Pulsa I para Instrucciones', canvasDibujado.width/2, canvasDibujado.height/2);
	ctx.fillText('Pulsa Espacio para Jugar', canvasDibujado.width/2, canvasDibujado.height/2 + 50);
}

function drawInstructions()
{
	ctx.clearRect(0,0,canvasDibujado.width,canvasDibujado.height);

	ctx.globalAlpha = 0.5;
	ctx.drawImage(background,0,0,canvasDibujado.width,canvasDibujado.height);
	ctx.globalAlpha = 1;

	ctx.font = '30px Arial';

	ctx.textAlign = 'center';
	ctx.fillText('PJ 1', canvasDibujado.width/2 - 300, canvasDibujado.height/2 - 100);
	ctx.fillText('Movimiento', canvasDibujado.width/2 - 300, canvasDibujado.height/2 - 50);
	ctx.fillText('Derecha-> A - Izquierda-> D', canvasDibujado.width/2 - 300, canvasDibujado.height/2);
	ctx.fillText('Salto-> W o Space', canvasDibujado.width/2 - 300, canvasDibujado.height/2 + 50);

	ctx.fillText('PJ 2', canvasDibujado.width/2 + 300, canvasDibujado.height/2 - 100);	
	ctx.fillText('Movimiento', canvasDibujado.width/2 + 300, canvasDibujado.height/2 - 50);
	ctx.fillText('Derecha-> Flecha Derecha', canvasDibujado.width/2 + 300, canvasDibujado.height/2);
	ctx.fillText('Izquierda-> Flecha Izquierda', canvasDibujado.width/2 + 300, canvasDibujado.height/2 +50);
	ctx.fillText('Salto-> Control o Felcha Arriba', canvasDibujado.width/2 + 300, canvasDibujado.height/2 + 100);

	ctx.fillText('Marca goles en la porteria rival', canvasDibujado.width/2, canvasDibujado.height/2 + 200);
	ctx.fillText('Pulsa ESC para volver al menu', canvasDibujado.width/2, canvasDibujado.height/2 + 250);
}

var context;

function setupDebugDraw(){
	context = canvas.getContext('2d');

	var debugDraw = new b2DebugDraw();

	// Use this canvas context for drawing the debugging screen
	debugDraw.SetSprite(context);
	// Set the scale 
	debugDraw.SetDrawScale(scale);
	// Fill boxes with an alpha transparency of 0.3
	debugDraw.SetFillAlpha(1);
	// Draw lines with a thickness of 1
	debugDraw.SetLineThickness(1.0);
	// Display all shapes and joints
	debugDraw.SetFlags(b2DebugDraw.e_shapeBit | b2DebugDraw.e_jointBit);	

	// Start using debug draw in our world
	world.SetDebugDraw(debugDraw);

	// Set Colision Listeners
	world.SetContactListener(listener);
}

listener.BeginContact = function(contact)
{
	if(contact.GetFixtureA().GetBody().GetUserData().tag === 'porteria1' && contact.GetFixtureB().GetBody().GetUserData().tag === 'ball')
	{
		gol = true;
		score2++;
		//console.log('balon entra en porteria 1 - GOL para jugador 2')
	}

	if(contact.GetFixtureA().GetBody().GetUserData().tag === 'porteria2' && contact.GetFixtureB().GetBody().GetUserData().tag === 'ball')
	{
		gol = true;
		score1++;
		//console.log('balon entra en porteria 2 - GOL para jugador 1')
	}

	if(contact.GetFixtureA().GetBody().GetUserData().tag === 'player1' && contact.GetFixtureB().GetBody().GetUserData().tag === 'suelo')
	{
		//console.log("player 1 toca suelo");
		salto1 = true;
	}

	if(contact.GetFixtureA().GetBody().GetUserData().tag === 'player2' && contact.GetFixtureB().GetBody().GetUserData().tag === 'suelo')
	{
		//console.log("player 2 toca suelo");
		salto2 = true;
	}
}

var timeStep = 1/60;

//As per the Box2d manual, the suggested iteration count for Box2D is 8 for velocity and 3 for position. 
var velocityIterations = 8;
var positionIterations = 3;

function animate()
{
	world.Step(timeStep,velocityIterations,positionIterations);
	world.ClearForces();

	world.DrawDebugData();

	update();

	setTimeout(animate, timeStep);
}

function update()
{
	switch(currentScene)
	{
		case 0:
			sceneMenu();
		break;

		case 1:
			sceneInstructions();
		break;

		case 10:
			sceneGame();
		break;
	}
	
	teclaPulsada = null;
}

function sceneMenu()
{
	if(teclaPulsada === KEY.SPACE)
	{
		currentScene = 10;
	}
	if(teclaPulsada === KEY.I)
	{
		currentScene = 1;
	}
}

function sceneInstructions()
{
	if(teclaPulsada === KEY.ESC)
	{
		currentScene = 0;
	}
}

function sceneGame()
{
	if(gol)
	{
		resetGOL();
		gol = false;
	}

	if(teclaPulsada === KEY.R)
	{
		resetGame();
	}

	movimiento();
}

function movimiento()
{
	movimientoPlayer1();
	movimientoPlayer2();
}

function movimientoPlayer1()
{
	if(presionadas[KEY.D])
	{
		playerVelocity1.x = 10;
	}
	else if(presionadas[KEY.A])
	{
		playerVelocity1.x = -10;
	}
	else 
	{
		playerVelocity1.x = 0;
	}

	if((teclaPulsada === KEY.SPACE || teclaPulsada === KEY.W) && salto1)
	{
		playerVelocity1.y = -10;
		salto1 = false;
	}

	player01.SetLinearVelocity(playerVelocity1);
}

function movimientoPlayer2()
{
	if(presionadas[KEY.ARROW_RIGHT])
	{
		playerVelocity2.x = 10;
	}
	else if(presionadas[KEY.ARROW_LEFT])
	{
		playerVelocity2.x = -10;
	}
	else 
	{
		playerVelocity2.x = 0;
	}

	if((teclaPulsada === KEY.CONTROL || teclaPulsada === KEY.ARROW_UP) && salto2)
	{
		playerVelocity2.y = -10;
		salto2 = false;
	}	

	player02.SetLinearVelocity(playerVelocity2);
}

function resetGOL()
{
	ball.SetLinearVelocity(new b2Vec2(0,0));
	player01.SetLinearVelocity(new b2Vec2(0,0));
	player02.SetLinearVelocity(new b2Vec2(0,0));

	ball.SetPosition(new b2Vec2(canvas.width/2/scale, canvas.height/2/scale));
	player01.SetPosition(new b2Vec2((canvas.width/2 - 200)/scale, (canvas.height - 230)/scale));
	player02.SetPosition(new b2Vec2((canvas.width/2 + 200)/scale, (canvas.height - 230)/scale));
}

function resetGame()
{
	resetGOL();
	score1 = 0;
	score2 = 0;
}

var gol = false;

var background;

var score1 = 0, score2 = 0;

var ball;
var ballImage;
var ballVelocity;
var ballDir;

var player01;
var playerImage01;

var player02;
var playerImage02;

var playerVelocity1;
var playerVelocity2;

var salto1 = true, salto2 = true;

var currentScene = 0;
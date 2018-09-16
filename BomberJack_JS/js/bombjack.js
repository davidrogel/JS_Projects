function start()
{
	highScore = localStorage.score;
	timeToSpawn = second * 7;
	timeToSpawnPowa = second * 15;
	poweredTime = second * 3;

	logo = new Rectangle(canvas.width / 2 - 384 / 2, canvas.height / 2 - 160, 384, 160, "./img/bombjackX2.png", 0, 224, 384, 160); // w 384 h 160
	gameOverLogo = new Rectangle(canvas.width / 2 - 33, canvas.height / 2 - 128, w * 2, w * 2, "./img/bombjackX2.png", w * 4 - 1, w, w * 2, w * 2);

	// cargar fondos
	for(var i = 0; i < 5; i++)
	{
		backgrounds.push(new Rectangle(64 + 16, 64 + 16, 400, 528, "./img/backgrounds.png", 224 * i, 0, 224, 224));
	}
	loadMusic();
}

function loadMusic()
{
	musica = new Audio();
	musica.src = './mp3/music.mp3';
	musica.loop = true;

	title = new Audio();
	title.src = './mp3/title.mp3';
	title.loop = true;

	powerMusic = new Audio();
	powerMusic.src = './mp3/power.mp3';
	powerMusic.loop = false;

	end = new Audio();
	end.src = './mp3/end.mp3';
	end.loop = true;
}

function setMap(map)
{
	espacio = [];
	bloques = [];
	bombas = [];
	pj = null;
	enemigos = [];
	enemigosV2 = [];
	enemCount = 0;

	for(var i = 0; i < map.length; i++)
	{
		for(var j = 0; j < map[0].length; j++)
		{
		    switch(map[i][j])
		    {
		        case 0:
		        	espacio.push(new Rectangle(64 + j * w,64 + i * w, w, w));
		        break;

		        case 1: // Marco Horizontal Sup
		        	bloques.push(new Rectangle(64 + j * w, 64 + i * w, w, w, "./img/bombjackX2.png", 0, w * 6, w, w));
		        break;

                case 2: // Marco Vertical Izq
                    bloques.push(new Rectangle(64 + j * w, 64 + i * w, w, w, "./img/bombjackX2.png", w, w * 6, w, w));
                break;
                
                case 4: // Marco Vertical Der
                    bloques.push(new Rectangle(64 + j * w, 64 + i * w, w, w, "./img/bombjackX2.png", w * 7, w * 6, w, w));
                break;
                
                case 10: // Marco Horizontal Inf
                    bloques.push(new Rectangle(64 + j * w, 64 + i * w, w, w, "./img/bombjackX2.png", w * 6, w * 6, w, w));
                break;

                case 3: // Bombas
                  bombas.push(new Rectangle(64 + j * w,64 +  i * w, w, w, "./img/bombjackX2.png", w, w * 4, w, w));
                break;

				case 5: // Jack
					pj = new Rectangle(64 + j * w, 64 + i * w, w - 1, w - 1, "./img/bombjackX2.png", jackClipX, jackClipY, w, w);
					posReset = {x: 64 + j * w, y: 64 + i * w};
					pj.vx = 0;
					pj.vy = 0;
					pj.dir = {x:0, y:0};
					pj.powered = false;
				break;
                
                case 6: // Esquina Inferior Izq
                	bloques.push(new Rectangle(64 + j * w, 64 + i * w, w, w, "./img/bombjackX2.png", w * 2, w * 6, w, w));
                break;
                
                case 7: // Esquina Superior Izq
                	bloques.push(new Rectangle(64 + j * w, 64 + i * w, w, w, "./img/bombjackX2.png", w * 4, w * 6, w, w));
                break;
                
                case 8: // Esquina Superior Der
                	bloques.push(new Rectangle(64 + j * w, 64 + i * w, w, w, "./img/bombjackX2.png", w * 5, w * 6, w, w));
                break;
                
                case 9: // Esquina Inferior Der
                	bloques.push(new Rectangle(64 + j * w, 64 + i * w, w, w, "./img/bombjackX2.png", w * 3, w * 6, w, w));
                break;
            }
		}
	}

	for(var i = 0; i < bombas.length; i++)
	{
		bombas[i].explosion = false;
	}
}

function escenaGame()
{
	backgrounds[nivel - 1].draw(ctx);

	for(var i = 0; i < bloques.length; i++)
	{
		bloques[i].draw(ctx);
	}

	for(var i = 0; i < bombas.length; i++)
	{
		bombas[i].draw(ctx);
	}

	if(enemigos.length > 0)
	{
		for(var i = 0; i < enemigos.length; i++)
		{
			enemigos[i].draw(ctx);
		}
	}

	if(enemigosV2.length > 0)
	{
		for(var i = 0; i < enemigosV2.length; i++)
		{
			enemigosV2[i].draw(ctx);
		}
	}

	if(invulnerable)
	{
		tiempoInvulnerable += 1;

		if(tiempoInvulnerable % 2 == 0)
			pj.draw(ctx);

		if(tiempoInvulnerable > 100)
		{
			tiempoInvulnerable = 0;
			invulnerable = false;
		}
	}
	else
	{
		pj.draw(ctx);
	}

	if(powers.length > 0)
	{
		for(var i = 0; i < powers.length; i++)
		{
			powers[i].draw(ctx);
		}
	}

	puntuacion();
}

function escenaMenu()
{
	ctx.font = '16px Arial';
	ctx.fillStyle = 'white';
	ctx.textAlign = 'center';

	if(instrucciones)
	{
		ctx.fillStyle = 'lightgreen';
		ctx.fillText("A, D o Flecha Izquierda, Flecha Derecha - Mover Izquierda Derecha", canvas.width / 2, canvas.height / 2 + w * 2);
		ctx.fillText("W, Space o Flecha Arriba - Salto", canvas.width / 2, canvas.height / 2 + w * 3);
		ctx.fillText("S o Flecha Abajo - Caida En Picado", canvas.width / 2, canvas.height / 2 + w * 4);
		ctx.fillText("Bombas A Estallar - Mas Puntuacion", canvas.width / 2, canvas.height / 2 + w * 5);
		ctx.fillText("Power Rosa - Invulnerable -- Power B - Bonus -- Power E - Vida Extra", canvas.width / 2, canvas.height / 2 + w * 6);
		ctx.fillText("Enemigos Moneda - Suma Puntuacion", canvas.width / 2, canvas.height / 2 + w * 7);
		ctx.fillText("M - Silenciar Musica o Activar Musica", canvas.width / 2, canvas.height / 2 + w * 8);
		ctx.font = '20px Arial';
		ctx.fillStyle = 'white';
		ctx.fillText("Pulsa i Para Salir Info", canvas.width / 2, canvas.height / 2 + w * 10);
	}
	else
	{
		ctx.font = '20px Arial';
		ctx.fillText("Pulsa Enter Para Empezar", canvas.width / 2, canvas.height / 2 + 64);
		ctx.fillText("Pulsa i Para Info",  canvas.width / 2, canvas.height / 2 + w * 3);
	}

	logo.draw(ctx);
}

function escenaScore()
{
	ctx.font = '16px Arial';
	ctx.fillStyle = 'lightgreen';
	ctx.textAlign = 'center';

	ctx.fillText("Score: " + score, canvas.width / 2, canvas.height / 2 + w * 2);
	ctx.fillText("HighScore: " + highScore, canvas.width / 2, canvas.height / 2 + w * 3);

	ctx.font = '20px Arial';
	ctx.fillStyle = 'white';
	ctx.fillText("Pulsa Enter Para Ir A Menu", canvas.width / 2, canvas.height / 2 + w * 5);

	gameOverLogo.draw(ctx);
}

function draw()
{
  	ctx.fillStyle = 'black';
	ctx.fillRect(0,0,canvas.width,canvas.height);

	switch(currentScene)
	{
		case 0:
			escenaMenu();
		break;
		case 1:
			escenaGame();
		break;
		case 2:
			escenaScore();
		break;
	}
}

function puntuacion()
{
	ctx.font = '20px Arial';
	ctx.fillStyle = 'white';
	ctx.textAlign = 'left';
	ctx.fillText("Score: " + score, 332, 64);
	ctx.fillText("Lives: " + vidas, 70, 64);

	ctx.fillText("HighScore: " + highScore, 332, canvas.height - 64);
	ctx.fillText("Level: " + nivel, 70, canvas.height - 64);
}

function sceneGameUpdate()
{
	end.pause();
	title.pause();
	colisionesConEnemigo();
	colisionesConBomba();
	colisionConPower();
	powerJack();
	generarExplosion();
  	movimiento();
	animacionesJack();
	animacionesEnem();
	animacionesBombas();
	enemyBehaviour();
	powerBehaviour();
	updateHighScore();
	nextLevel();
	dead();
}

function sceneMenuUpdate()
{
	end.pause();

	if(instrucciones)
	{
		if(teclaPulsada === KEY.I) instrucciones = false;
	}
	else
	{
		if(teclaPulsada === KEY.I) instrucciones = true;
		if(teclaPulsada === KEY.ENTER)
		{
			setMap(map01);
		 	spawnDummy();
			currentScene = 1;
			vidas = 3;
			suena = true;
		}
	}

	teclaPulsada = null;
}

function sceneScoreUpdate()
{
	if(teclaPulsada === KEY.ENTER)
	{
		title.load();
		currentScene = 0;
	}
	teclaPulsada = null;
}

function update()
{
	if(teclaPulsada === KEY.M) suena = !suena;

	switch(currentScene)
	{
		case 0:
			sceneMenuUpdate();
			(!suena) ? title.play() : title.pause();
		break;

		case 1:
			sceneGameUpdate();
			(suena) ? musica.play() : musica.pause();
		break;

		case 2:
			sceneScoreUpdate();
			(!suena) ? end.play() : end.pause();
		break;
	}
}

function dead()
{
	if(vidas === 0)
	{
		currentScene = 2;
		if(suena) suena = false;
	}
}

function powerJack()
{
	if(pj.powered)
	{
		timerPowered ++;
		if(timerPowered > poweredTime)
		{
			timerPowered = 0;
			pj.powered = false;
		}
		if(enemigos.length > 0)
		for(var i = 0; i < enemigos.length; i++)
		{
			enemigos[i].hacked = true;
			enemigos[i].clipX = w * 5;
			enemigos[i].clipY = w * 4;
			if(pj.colision(enemigos[i]))
			{
				incrementarScore(2000);
				delete enemigos[i];
				enemigos.splice(i--, 1);
				enemCount--;
			}
		}
		if(enemigosV2.length > 0)
		for(var i = 0; i < enemigosV2.length; i++)
		{
			enemigosV2[i].hacked = true;

			if(pj.colision(enemigosV2[i]))
			{
				incrementarScore(1500);
				delete enemigosV2[i];
				enemigosV2.splice(i--, 1);
				enemCount--;
			}
		}
	}
	else
	{
		if(enemigos.length > 0)
		for(var i = 0; i < enemigos.length; i++)
		{
			enemigos[i].hacked = false;
			enemigos[i].clipX = 0;
			enemigos[i].clipY = w * 3;
		}
		if(enemigosV2.length > 0)
		for(var i = 0; i < enemigosV2.length; i++)
		{
			enemigosV2[i].hacked = false;
		}
	}
}

function nextLevel()
{
	if(bombas.length === 0)
	{
		nivel++;
		switch(nivel)
		{
			case 2:
				setMap(map02);
				spawnDummy();
			break;
			case 3:
				setMap(map03);
				spawnDummy();
			break;
			case 4:
				if(suena) suena = false;
				currentScene = 2;
			break;
		}
	}
}

function updateHighScore()
{
	if(score > highScore)
	{
		highScore = score;
		localStorage.score = highScore; // no se porq no va D:
	}
}

function powerBehaviour()
{
	timeSpawnPowa++;
	if(timeSpawnPowa > timeToSpawnPowa)
	{
		spawnPower();
	  	timeSpawnPowa = 0;
	}
}

function spawnPower()
{
	var rand = ~~(Math.random() * espacio.length);
	var tipo = Math.floor((Math.random() * 3) + 1);
	var power;
	switch(tipo)
	{
		case 1: // power
			power = new Rectangle(espacio[rand].x, espacio[rand].y, w, w, "./img/bombjackX2.png",  w * 6, w * 4, w, w);
		break;
		case 2: // vida +1
			power = new Rectangle(espacio[rand].x, espacio[rand].y, w, w, "./img/bombjackX2.png",  w * 7, w * 4, w, w);
		break;
		case 3: // bonus +1000 puntos
			power = new Rectangle(espacio[rand].x, espacio[rand].y, w, w, "./img/bombjackX2.png",  w * 8, w * 4, w, w);
		break;
	}
	power.type = tipo;
	powers.push(power);
}

function colisionConPower()
{
	if(powers.length > 0)
	{
		for(var i = 0; i < powers.length; i++)
		{
			if(pj.colision(powers[i]))
			{
				switch(powers[i].type)
				{
					case 1:
						pj.powered = true;
					break;
					case 2:
						vidas++;
					break;
					case 3:
						incrementarScore(1000);
					break;
				}
				delete powers[i];
				powers.splice(i--, 1);
			}
		}
	}
}

function colisionesConBomba()
{
	if(bombas.length > 0)
	{
		for(var i = 0; i < bombas.length; i++)
		{
			if(bombas[i].colision(pj))
			{
				(bombas[i].explosion) ? incrementarScore(200) : incrementarScore(100);
				delete bombas[i];
				bombas.splice(i--, 1);
			}
		}
	}
}

function incrementarScore(i)
{
	score += i;
}

function generarExplosion()
{
	explosionIncremento++;
	if(explosionIncremento === second * 5)
	{
		var rand = 0;
		if(bombas.length > 0)
		{
			for(var i = 0; i < 3; i++)
			{
				rand = Math.round(Math.random() * (bombas.length - 1));
				if(!bombas[rand].explosion)
				{
					bombas[rand].explosion = true;
				}
			}
		}
		explosionIncremento = 0;
	}
}

function animacionesBombas()
{
	if(bombas.length > 0)
  	{
	    for(var i = 0; i < bombas.length; i++)
	    {
			if(!bombas[i].explosion)
			{
				incrementBombaClip += 0.045;
				if(incrementBombaClip > 10)
				{
					bombaClipX += bombas[i].clipW;
					if(bombaClipX > bombas[i].clipW * 2)
					{
						bombaClipX = 0;
					}
					incrementBombaClip = 0;
				}
				bombas[i].clipX = bombaClipX;
			}
			else if(bombas[i].explosion)
			{
				incrementBombaClip += 0.045;
				if(incrementBombaClip > 10)
				{
					clipxbombaexplo += bombas[i].clipW;
					if(clipxbombaexplo > bombas[i].clipW * 4)
					{
						clipxbombaexplo = 96;
					}
					incrementBombaClip = 0;
				}
				bombas[i].clipX = clipxbombaexplo;
			}
    	}
  	}
}

function colisionesConEnemigo()
{
	if(enemigos.length > 0)
  	{
	    for(var i = 0; i < enemigos.length; i++)
	    {
			if(enemigos[i].colision(pj) && !pj.powered)
			{
				if(!invulnerable)
				{
					recibirDanho();
				}
			}
    	}
  	}

	if(enemigosV2.length > 0)
  	{
	    for(var i = 0; i < enemigosV2.length; i++)
	    {
			if(enemigosV2[i].colision(pj) && !pj.powered)
			{
				if(!invulnerable)
				{
					recibirDanho();
				}
			}
    	}
  	}
}

function recibirDanho()
{
	resetPosJack();
	vidas--;
	invulnerable = true;
}

function resetPosJack()
{
	pj.x = posReset.x;
	pj.y = posReset.y;
	pj.vx = 0;
	pj.vy = 0;
}

function movimiento()
{
  // movimiento en eje X
  	if((presionadas[KEY.D] || presionadas[KEY.ARROW_RIGHT]))
	{
    	pj.vx = velocidad;
		pj.dir.x = 1;
	}
	else if((presionadas[KEY.A] || presionadas[KEY.ARROW_LEFT]))
	{
    	pj.vx = -velocidad;
		pj.dir.x = -1;
	}
  	else
  	{
    	pj.vx = 0;
		pj.dir.x = 0;
  	}

  	pj.x += pj.vx;
  	collX(pj);

  	// movimiento en eje Y

  	// volar hacia abajo
  	if(!onGround && (presionadas[KEY.S] || presionadas[KEY.ARROW_DOWN]))
  	{
    	pj.vy = caidaPicado;
  	}
 	else
  	{
    	// gravedad
    	pj.vy += gravedad;
    	if(pj.vy >= maxG)
    	{
      		pj.vy = maxG;
    	}
  	}

  	// salto
  	if(onGround && (teclaPulsada === KEY.SPACE || teclaPulsada === KEY.W || presionadas[KEY.ARROW_UP]))
  	{
    	pj.vy = -jumpForce;
  	}

  	teclaPulsada = null;
  	onGround = false;

  	pj.y += pj.vy;
  	collY(pj);
}

function animacionesJack()
{
	if(pj.vy < 0) // sube
	{
		jackClipX = 32;
	}
	if(pj.vy > 0) // cae
	{
		jackClipX = 62;
	}
	if(pj.vy === caidaPicado) // caida en picado
	{
		jackClipX = 94;
	}
	if(onGround)
	{
		if(pj.vx > 0)
		{
			jackClipY = 32;
			leftRightClipJack();
		}
		else if(pj.vx < 0)
		{
			jackClipY = 64;
			leftRightClipJack();
		}
		else if(pj.vx === 0)
		{
			jackClipX = 0;
			jackClipY = 0;
		}
	}
	else 
	{
		jackClipY = 0;
	}

	pj.clipX = jackClipX;
	pj.clipY = jackClipY;
}

function leftRightClipJack()
{
	incrementJackClip += 2;
	if(incrementJackClip > 10)
	{
		jackClipX += pj.clipW;
		if(jackClipX > pj.clipW * 3)
		{
			jackClipX = 0;
		}
		incrementJackClip = 0;
	}
}

function animacionesEnem()
{
	if(enemigosV2.length > 0)
  	{
	    for(var i = 0; i < enemigosV2.length; i++)
	    {
			if(enemigosV2[i].hacked)
			{
				enemigosV2[i].clipX = w * 5;
				enemigosV2[i].clipY = w * 4;
			}
			else
			{
				enemigosV2[i].clipY = w * 3;
				incrementEvemV2Clip += 2;
				if(incrementEvemV2Clip > 10)
				{
					enemV2ClipX += enemigosV2[i].clipW;
					if(enemV2ClipX > enemigosV2[i].clipW * 9)
					{
						enemV2ClipX = 32;
					}
					incrementEvemV2Clip = 0;
				}
				enemigosV2[i].clipX = enemV2ClipX;
			}
    	}
  	}
}

function enemyBehaviour()
{
	timeSpawn++;
	if(timeSpawn >= timeToSpawn)
  	{
		if(!pj.powered) 
			spawnDummy();
    	timeSpawn = 0;
  	}

	dummyMovement();
}

function spawnDummy()
{
	if(enemCount <= maxEnem)
	{
		var rand = ~~(Math.random() * espacio.length);
		var enem = new Rectangle(espacio[rand].x, espacio[rand].y, w, w, "./img/bombjackX2.png", 0, w * 3, w, w);
		enem.vy = 0;
		enem.vx = 0;
		enem.hacked = false;
	  	enemigos.push(enem);
	  	enemCount++;
	}
}

function dummyMovement()
{
  	if(enemigos.length > 0)
  	{
    	for(var i = 0; i < enemigos.length; i++)
    	{
			enemigos[i].vy = 1;
    	}

	    for(var i = 0; i < enemigos.length; i++)
	    {
			if(!enemigos[i].hacked)
			{
				enemigos[i].y += enemigos[i].vy;
			}
	  		collY(enemigos[i]);
	    }
  	}

  	if(enemigosV2.length > 0)
  	{
    	for(var i = 0; i < enemigosV2.length; i++)
    	{
      		if(enemigosV2[i].dir.y != 0)
      		{
				if(!enemigosV2[i].hacked)
				{
					enemigosV2[i].y += enemigosV2[i].dir.y * enemigosV2[i].vy;
        		}
        		collY(enemigosV2[i]);
      		}
		    else if(enemigosV2[i].dir.x != 0)
		    {
				if(!enemigosV2[i].hacked)
				{
		      		enemigosV2[i].x += enemigosV2[i].dir.x * enemigosV2[i].vx;
				}
		      	collX(enemigosV2[i]);
		    }
    	}
  	}
}

function transform(enemigo, i)
{
  	var enemV2 = new Rectangle(enemigo.x,enemigo.y,w,w, "./img/bombjackX2.png", w, w * 3, w, w);
  	enemV2.vx = 0;
  	enemV2.vy = 0;

  	var x = Math.round(Math.random()); // Math.round(Math.random())
  	if(x === 1)
  	{
    	enemV2.vx = 3;
  	}

  	var y = 0;
  	if(x === 0)
  	{
    	var y = 1;
    	enemV2.vy = 3;
  	}

  	enemV2.dir = {x:x, y:y};
	enemV2.hacked = false;

  	delete enemigo;
  	enemigos.splice(i--, 1);

  	enemigosV2.push(enemV2);
}

function collX(char)
{
 	for(var i = 0; i < bloques.length; i++)
  	{
    	if(char.colision(bloques[i]))
    	{
      		if(char.vx > 0)
      		{
        		//char.right = bloques[i].x;
        		char.x = bloques[i].x - char.h; // si el personaje toca por la derecha
        		for(var i = 0; i < enemigosV2.length; i++)
        		{
          			if(char === enemigosV2[i])
            		char.vx *= -1;
        		}
      		}
      		else
      		{
        		char.x = bloques[i].right; // si el personaje toca por la izquierda
        		for(var i = 0; i < enemigosV2.length; i++)
        		{
          			if(char === enemigosV2[i])
            		char.vx *= -1;
        		}
      		}
      		// si es un enemigoV2 no usar el char.vx = 0;
      		if(enemigosV2.indexOf(char) === -1)
      		{
        		char.vx = 0;
      		}
    	}
  	}
}

function collY(char)
{
 	for(var i = 0; i < bloques.length; i++)
  	{
    	if(char.colision(bloques[i]))
    	{
      		if(char.vy > 0)
      		{
        		char.y = bloques[i].y - char.h; // si el personaje toca por abajo
        		for(var i = 0; i < enemigosV2.length; i++)
        		{
          			if(char === enemigosV2[i])
            			char.vy *= -1;
        		}
        		if(char === pj) onGround = true;
        		for(var i = 0; i < enemigos.length; i++)
        		{
          			if(char === enemigos[i])
          			{
            			transform(enemigos[i], i);
          			}
        		}
      		}
      		else
     		{
	        	//char.y = bloques[i].y + bloques[i].h;
	        	char.y = bloques[i].bottom; // si el personaje toca por arriba
	        	for(var i = 0; i < enemigosV2.length; i++)
		        {
	          		if(char === enemigosV2[i])
	            	char.vy *= -1;
	        	}
      		}

      		if(enemigosV2.indexOf(char) === -1)
      		{
        		char.vy = 0;
      		}
    	}
  	}
}

var pj;
var jackClipX = 0, jackClipY = 0, incrementJackClip = 0;
var onGround = false;
var gravedad = 1;
var maxG = 3;
var jumpForce = 20, caidaPicado = 7;
var velocidad = 5;
var vidas = 3;
var lose = false;
var posReset = undefined;
var invulnerable = false, tiempoInvulnerable = 0;
var poweredTime = 0, timerPowered = 0;
var bloques = [];
var zonas = [];
var bombas = [];
var espacio = [];

var maxEnem = 6;
var enemCount = 0;
var enemigos = [];
var enemigosV2 = [];

var backgrounds = [];

var powers = [];
var timeSpawnPowa = 0, timeToSpawnPowa = 0;

var timeSpawn = 0, timeToSpawn = 0; // 1800 -> 30s
var second = 60;

var enemV2ClipX = 32, incrementEvemV2Clip = 0;
var bombaClipX = 0, incrementBombaClip = 0;
var explosionIncremento = 0;
var clipxbombaexplo = 96;

var w = 32;
var nivel = 1;
var score = 0;
var highScore = 0;

var logo;
var gameOverLogo;
var instrucciones = false;
var currentScene = 0;

var musica;
var title;
var powerMusic;
var end;
var suena = false;

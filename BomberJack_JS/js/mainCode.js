var canvas;
var ctx;

window.addEventListener('load', load);

function load()
{
	canvas = document.getElementById('canvas');
	ctx = canvas.getContext('2d');
	
  	init();
}


function init()
{
	start();
  	run();
  	repaint();
}

function repaint()
{
  	window.requestAnimationFrame(repaint);
  	paint();
}

function paint()
{
	draw();
}

function run()
{
	update();
  	setTimeout(run, 33);
}

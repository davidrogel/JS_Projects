var KEY = {
  W: 87,
  A: 65,
  S: 83,
  D: 68,
  ARROW_UP: 38,
  ARROW_DOWN: 40,
  ARROW_RIGHT: 39,
  ARROW_LEFT: 37,
  SPACE: 32,
  ENTER: 13,
  ESC: 27,
  CONTROL: 17,
  ALT: 18,
  LEFT_SHIFT: 16,
  I: 73,
  M: 77,
  Q: 81,
  E: 69,
  R: 82,
  F: 70,
  G: 71,
  H: 72,
  MOUSE_ONE: 1,
  MOUSE_TWO: 2,
  MOUSE_THREE : 3
};

var presionadas = [];
var teclaPulsada = null;
var mouse = {x:0, y:0};

document.addEventListener('keydown', keyDown);
document.addEventListener('keyup', keyUp);
document.addEventListener('mousedown', mouseDown);
document.addEventListener('mouseup', mouseUp);
//document.addEventListener('click', mouseClick);
window.addEventListener("mousemove", mouseMove);


function mouseMove(e)
{
  mouse.x = e.clientX;
  mouse.y = e.clientY;
}

/*
function mouseClick(e)
{
  teclaPulsada = (e.keyCode || e.which);
}
*/

function mouseDown(e)
{
  presionadas[(e.keyCode || e.which)] = true;
}

function mouseUp(e)
{
  presionadas[(e.keyCode || e.which)] = false;
}

function keyDown(e)
{
  teclaPulsada = (e.keyCode || e.which);
  presionadas[(e.keyCode || e.which)] = true;
  e.preventDefault();
}

function keyUp(e)
{
  presionadas[(e.keyCode || e.which)] = false;
  e.preventDefault();
}

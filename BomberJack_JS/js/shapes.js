class Circle
{
  constructor(x, y, radio, imgSrc)
  {
    this.x = (x === null) ? 0 : x;
    this.y = (y === null) ? 0 : y;
    this.radio = (radio === null) ? 0 : radio;
    this.img = null;

    this.loadImg(imgSrc);
  }

  loadImg(imgSrc)
  {
    if(imgSrc !== null)
    {
      this.img = new Image();
      this.img.src = imgSrc;
    }
  }

  fill(ctx, start = 0, end = 2*Math.PI)
  {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radio, start, end);
    ctx.fill();
  }

  stroke(ctx, start = 0, end = 2*Math.PI)
  {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radio, start, end);
    ctx.stroke();
  }

  draw()
  {
    if(this.img.width)
    {
      ctx.drawImage(this.img, this.x - this.img.width/2, this.y - this.img.height/2, this.radio, this.radio);
    }
    else
    {
      ctx.beginPath();
      ctx.strokeStyle = 'red';
      ctx.arc(this.x, this.y, this.radio, 0, 2*Math.PI);
      ctx.stroke();
    }
  }
}

function Rectangle(x, y, w, h, imgSrc, clipX, clipY, clipW, clipH)
{
  this.x = (x === null) ? 0 : x;
  this.y = (y === null) ? 0 : y;
  this.w = (w === null) ? 0 : w;
  this.h = (h === null) ? 0 : h;

  this.clipX = (clipX === null) ? 0 : clipX;
  this.clipY = (clipY === null) ? 0 : clipY;
  this.clipW = (clipW === null) ? 0 : clipW;
  this.clipH = (clipH === null) ? 0 : clipH;
  this.img = null;

  this.loadImg(imgSrc);
}

Rectangle.prototype = {
  get right()
  {
    return this.x + this.w;
  },

  get bottom()
  {
    return this.y + this.h;
  }
}

Rectangle.prototype.loadImg = function(imgSrc)
{
  if(imgSrc != null)
  {
    this.img = new Image();
    this.img.src = imgSrc;
  }
}

Rectangle.prototype.fill = function(ctx, color)
{
  ctx.fillStyle = (color != undefined) ? color : 'red';
  ctx.fillRect(this.x, this.y, this.w, this.h);
}

Rectangle.prototype.stroke = function(ctx, color)
{
  ctx.strokeStyle = (color != undefined) ? color : 'red';
  ctx.strokeRect(this.x, this.y, this.w, this.h);
}

Rectangle.prototype.draw = function(ctx)
{
  if(this.img != null)
  {
    if(this.img.width)
    {
      if(this.clipX != null)
      {
        ctx.drawImage(this.img, this.clipX, this.clipY, this.clipW, this.clipH, this.x, this.y, this.w, this.h);
      }
      else
      {
        ctx.drawImage(this.img, this.x, this.y, this.w, this.h);
      }
    }
  }
  else
  {
    this.stroke(ctx, "red");
  }
}

Rectangle.prototype.colision = function(other)
{
  if(other != undefined)
  {
    return (this.x < other.x + other.w &&
            this.x + this.w > other.x &&
            this.y < other.y + other.h &&
            this.y + this.h > other.y);
  }
}

function consola(salida)
{
  if(salida != undefined)
  {
    console.log(salida);
  }
}

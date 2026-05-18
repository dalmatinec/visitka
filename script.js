const canvas = document.getElementById('snowCanvas');
const ctx = canvas.getContext('2d');

const cursor = document.querySelector('.cursor');
const coin = document.querySelector('.coin');

let width;
let height;

let snowflakes = [];

function resizeCanvas(){

  width = canvas.width = window.innerWidth;
  height = canvas.height = window.innerHeight;
}

class Snowflake{

  constructor(){
    this.reset();
  }

  reset(){

    this.x = Math.random() * width;
    this.y = Math.random() * height;

    this.size = Math.random() * 3 + 1;

    this.speedY = Math.random() * 0.5 + 0.15;
    this.speedX = Math.random() * 0.3 - 0.15;

    this.opacity = Math.random() * 0.5 + 0.3;

    this.rotation = Math.random() * Math.PI * 2;
    this.rotationSpeed = Math.random() * 0.01 - 0.005;
  }

  update(){

    this.y += this.speedY;
    this.x += this.speedX;

    this.rotation += this.rotationSpeed;

    if(this.y > height){

      this.y = -10;
      this.x = Math.random() * width;
    }

    if(this.x > width){
      this.x = 0;
    }

    if(this.x < 0){
      this.x = width;
    }
  }

  draw(){

    ctx.save();

    ctx.translate(this.x,this.y);
    ctx.rotate(this.rotation);

    ctx.globalAlpha = this.opacity;

    ctx.fillStyle = '#dff8ff';

    ctx.shadowBlur = 10;
    ctx.shadowColor = '#bfefff';

    ctx.beginPath();

    for(let i = 0; i < 6; i++){

      ctx.lineTo(
        Math.cos((Math.PI * 2 * i) / 6) * this.size,
        Math.sin((Math.PI * 2 * i) / 6) * this.size
      );

      ctx.lineTo(
        Math.cos((Math.PI * 2 * i + Math.PI / 6) / 6) * (this.size / 2),
        Math.sin((Math.PI * 2 * i + Math.PI / 6) / 6) * (this.size / 2)
      );
    }

    ctx.closePath();
    ctx.fill();

    ctx.restore();
  }
}

function createSnow(){

  snowflakes = [];

  const count = window.innerWidth < 768 ? 100 : 170;

  for(let i = 0; i < count; i++){

    snowflakes.push(new Snowflake());
  }
}

function animateSnow(){

  ctx.clearRect(0,0,width,height);

  snowflakes.forEach(flake => {

    flake.update();
    flake.draw();
  });

  requestAnimationFrame(animateSnow);
}

window.addEventListener('mousemove',(e)=>{

  cursor.style.left = e.clientX + 'px';
  cursor.style.top = e.clientY + 'px';
});

/* Анимация клика по лого */

coin.addEventListener('click',()=>{

  coin.classList.remove('coin-bounce');

  void coin.offsetWidth;

  coin.classList.add('coin-bounce');
});

window.addEventListener('resize',()=>{

  resizeCanvas();
  createSnow();
});

resizeCanvas();
createSnow();
animateSnow();
import Star from './Star.js';

class SpaceTravel {
  canvas = null;
  ctx = null;
  halfHeight = 0;
  halfWidth = 0;
  warpZ = 0;
  speed = 0.075;
  stars = [];
  maxStars = 10;
  constructor(canvas, stars) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');

    canvas.height = this.canvas.offsetHeight;
    canvas.width = this.canvas.offsetWidth;
    this.halfHeight = canvas.height / 2;
    this.halfWidth = canvas.width / 2;
    this.warpZ = 12;

    this.ctx.fillStyle = 'black';
    this.ctx.fillRect(0, 0, canvas.width, canvas.height);
    this.maxStars = stars > 0 ? stars : 10;
    this.createStars();
    window.addEventListener('resize', this.resize.bind(this));
  }

  draw() {
    this.ctx.translate(this.halfWidth, this.halfHeight);

    for (let i = 0; i < this.stars.length; i++) {
      this.stars[i].draw(this.ctx);
    }
  }

  start() {
    // Create a stable speed
    this.speed = 0.015;
    this.ctx.setTransform(1, 0, 0, 1, 0, 0);
    this.ctx.fillStyle = 'rgba(0, 0, 0, 0.3)';
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
    this.draw();
    window.requestAnimationFrame(this.start.bind(this));
  }

  createStars() {
    for (let i = 0; i < this.maxStars; i++) {
      this.stars.push(new Star(this));
    }
  }

  resize() {
    this.canvas.height = this.canvas.offsetHeight;
    this.canvas.width = this.canvas.offsetWidth;

    this.halfHeight = this.canvas.height / 2;
    this.halfWidth = this.canvas.width / 2;
  }

  getHalfHeight() {
    return this.halfHeight;
  }

  getHalfWidth() {
    return this.halfWidth;
  }

  getWarpZ() {
    return this.warpZ;
  }

  getSpeed() {
    return this.speed;
  }
}

export default SpaceTravel;
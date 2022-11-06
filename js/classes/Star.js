import * as THREE from 'three';

class Star {
  velocity = 0;
  color = null;
  v = null;
  space = null;
  constructor(space) {
    this.color = `hsla(200, 100%, ${this.randomize(80, 100)}%, 1)`;
    this.space = space;
    this.v = new THREE.Vector3(this.randomize(0 - this.space.getHalfWidth(), this.space.getHalfWidth()), this.randomize(0 - this.space.getHalfHeight(), this.space.getHalfHeight()), this.randomize(1, this.space.getWarpZ()));
  }

  draw(ctx) {
    this.velocity = this.calculate();
    this.v = this.v.add(this.velocity);
    const x = this.v.x / this.v.z;
    const y = this.v.y / this.v.z;
    const x2 = this.v.x / (this.v.z + this.space.getSpeed() * 0.5);
    const y2 = this.v.y / (this.v.z + this.space.getSpeed() * 0.5);

    ctx.strokeStyle = this.color;
    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.lineTo(x2, y2);
    ctx.stroke();

    if (x < 0 - this.space.getHalfWidth() || x > this.space.getHalfWidth() || y < 0 - this.space.getHalfHeight() || y > this.space.getHalfHeight()) {
      this.reset(ctx)
    }
  }

  reset() {
    this.v = new THREE.Vector3(this.randomize(0 - this.space.getHalfWidth(), this.space.getHalfWidth()), this.randomize(0 - this.space.getHalfHeight(), this.space.getHalfHeight()), this.randomize(1, this.space.getWarpZ()));
  }

  calculate() {
    return new THREE.Vector3(0, 0, 0 - this.space.getSpeed());
  }

  randomize(num1, num2) {
    return Math.floor(Math.random() * (num2 - num1 + 1)) + num1;
  }
}

export default Star;
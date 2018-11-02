import { SVG_NS } from '../settings';

export default class Ball {
  constructor(radius, boardWidth, boardHeight) {
    this.radius = radius;
    this.boardWidth = boardWidth;
    this.boardHeight = boardHeight;
    this.direction = -1;
    this.reset(); // reposition ball to center after each game
  } // end of constructor

  reset() {
    this.x = this.boardWidth / 2;
    this.y = this.boardHeight / 2;
    this.vy = 0;
    while (this.vy === 0) {
      this.vy = Math.floor(Math.random() * 10 - 5);
    }
    this.vx = this.direction * (6 - Math.abs(this.vy));
  } //end of reset

  wallCollision() {
    const hitLeft = this.x - this.radius <= 0;
    const hitRight = this.x + this.radius >= this.boardWidth;
    const hitTop = this.y - this.radius <= 0;
    const hitBottom = this.y + this.radius >= this.boardHeight;
    if (hitTop || hitBottom) {
      this.vy *= -1;
    } else if (hitRight || hitLeft) {
      this.vx *= -1;
    }
  }
  render(svg) {
    this.x += this.vx;
    this.y += this.vy;

    this.wallCollision();
    let circ = document.createElementNS(SVG_NS, 'circle');
    circ.setAttributeNS(null, 'r', this.radius);
    circ.setAttributeNS(null, 'fill', 'white');
    circ.setAttributeNS(null, 'cx', this.x);
    circ.setAttributeNS(null, 'cy', this.y);
    // circ.setAttributeNS(null, 'stroke', 'red');

    svg.appendChild(circ);
  }
}

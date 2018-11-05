import { SVG_NS } from '../settings';

export default class Ball {
  constructor(radius, boardWidth, boardHeight) {
    this.radius = radius;
    this.boardWidth = boardWidth;
    this.boardHeight = boardHeight;
    this.direction = -1;
    this.reset();
    this.ping = new Audio('public/sounds/pong-01.wav');
    this.success = new Audio('public/sounds/powerup-success.wav');
  } // end of constructor

  reset() {
    this.ax = 0.1;
    this.ay = 0.1;

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
      this.ay *= -1;
    } else if (hitRight || hitLeft) {
      this.vx *= -1;
      this.ay *= -1;
      this.success.play();
    }
  }

  paddleCollision(player1, player2) {
    if (this.vx > 0) {
      let paddle = player2.coordinates(
        player2.x,
        player2.y,
        player2.width,
        player2.height
      );
      let [leftX, rightX, topY, bottomY] = paddle;

      if (
        this.x + this.radius >= leftX &&
        this.x + this.radius <= rightX &&
        (this.y + this.radius >= topY && this.y - this.radius <= bottomY)
      ) {
        this.vx *= -1;
        this.ping.play();
      }
    } else {
      let paddle = player1.coordinates(
        player1.x,
        player1.y,
        player1.width,
        player1.height
      );
      let [leftX, rightX, topY, bottomY] = paddle;
      if (
        this.x - this.radius <= rightX &&
        this.x - this.radius >= leftX &&
        (this.y + this.radius >= topY && this.y - this.radius <= bottomY)
      ) {
        this.vx *= -1;
        this.ping.play();
      }
    }
  } //end of paddleCollision

  goal(player) {
    player.score++;
    this.reset();
  } //end of goal

  render(svg, player1, player2) {
    const leftGoal = this.x - this.radius <= 0;
    const rightGoal = this.x + this.radius >= this.boardWidth;

    if (rightGoal) {
      this.goal(player1);
      this.direction = 1;
    } else if (leftGoal) {
      this.goal(player2);
      this.direction = -1;
    }

    this.x += this.vx;
    this.y += this.vy;
    this.wallCollision();
    this.paddleCollision(player1, player2);
    let circ = document.createElementNS(SVG_NS, 'circle');
    circ.setAttributeNS(null, 'r', this.radius);
    circ.setAttributeNS(null, 'fill', '#ffd000');
    circ.setAttributeNS(null, 'cx', this.x);
    circ.setAttributeNS(null, 'cy', this.y);
    svg.appendChild(circ);
  }
}

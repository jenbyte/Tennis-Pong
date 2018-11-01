import { SVG_NS } from '../settings';

export default class Paddle {
  constructor(boardHeight, width, height, x, y, up, down) {
    this.boardHeight = boardHeight;
    this.width = width;
    this.height = height;
    this.x = x;
    this.y = y;
    this.speed = 10;
    this.score = 0;

    document.addEventListener('keydown', event => {
      switch (event.key) {
        case up:
          this.up();
          break;
        case down:
          this.down();
          break;
      }
    });
  } //end of constructor

  up() {
    this.y = this.y - this.speed;
  }

  down() {
    this.y = this.y + this.speed;
  }

  render(svg) {
    let rectPad = document.createElementNS(SVG_NS, 'rect');
    rectPad.setAttributeNS(null, 'width', this.width);
    rectPad.setAttributeNS(null, 'height', this.height);
    rectPad.setAttributeNS(null, 'fill', 'white');
    rectPad.setAttributeNS(null, 'x', this.x);
    rectPad.setAttributeNS(null, 'y', this.y);
    // rectPad.setAttributeNS(null, "speed", this.speed);
    // rectPad.setAttributeNS(null, "score", this.score);

    svg.appendChild(rectPad);
  }
}

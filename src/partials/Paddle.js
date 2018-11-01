import { SVG_NS } from '../settings';

export default class Paddle {
  constructor(
    boardHeight,
    boardWidth,
    width,
    height,
    x,
    y,
    up,
    down,
    left,
    right
  ) {
    this.boardHeight = boardHeight;
    this.boardWidth = boardWidth;
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
        case left:
          this.left();
          break;
        case right:
          this.right();
          break;
      }
    });
  } //end of constructor

  up() {
    // this.y = this.y - this.speed;
    this.y = Math.max(0, [this.y - this.speed]);
  }
  down() {
    // this.y = this.y + this.speed;
    this.y = Math.min([this.boardHeight - this.height], [this.y + this.speed]);
  }
  left() {
    this.x = Math.max(0, [this.x - this.speed]);
  }
  right() {
    this.x = Math.min([this.boardWidth - this.width], [this.x + this.speed]);
  }
  render(svg) {
    let rectPad = document.createElementNS(SVG_NS, 'rect');
    rectPad.setAttributeNS(null, 'width', this.width);
    rectPad.setAttributeNS(null, 'height', this.height);
    rectPad.setAttributeNS(null, 'fill', '#353535');
    rectPad.setAttributeNS(null, 'x', this.x);
    rectPad.setAttributeNS(null, 'y', this.y);

    svg.appendChild(rectPad);
  }
}

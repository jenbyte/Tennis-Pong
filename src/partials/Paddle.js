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
    right,
    playerName
  ) {
    this.boardHeight = boardHeight;
    this.boardWidth = boardWidth;
    this.width = width;
    this.height = height;
    this.x = x;
    this.y = y;
    this.speed = 10;
    this.score = 0;
    this.keyUp = up;
    this.keyDown = down;
    this.keyLeft = left;
    this.keyRight = right;
    this.playerName = playerName;
    this.keyState = {}; //use this to tell if key is down or up. Fixes problem of players not being able to move at the same time

    document.addEventListener(
      'keydown',
      event => {
        this.keyState[event.key || event.which] = true;
      },
      true
    );
    document.addEventListener(
      'keyup',
      event => {
        this.keyState[event.key || event.which] = false;
      },
      true
    );

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
    }); //end of EventListener
  } //end of constructor

  up() {
    this.y = Math.max(0, [this.y - this.speed]);
  }
  down() {
    this.y = Math.min([this.boardHeight - this.height], [this.y + this.speed]);
  }
  left() {
    if (this.playerName === 'player1') {
      this.x = Math.max(0, [this.x - this.speed]);
    } else if (this.playerName === 'player2') {
      this.x = Math.max([this.boardWidth / 2], [this.x - this.speed]);
    }
  }
  right() {
    this.x = Math.min([this.boardWidth - this.width], [this.x + this.speed]);
  }

  coordinates(x, y, width, height) {
    let leftX = x;
    let rightX = x + width;
    let topY = y;
    let bottomY = y + height;
    return [leftX, rightX, topY, bottomY];
  }

  render(svg) {
    if (this.keyState[this.keyUp] && this.playerName === 'player1') {
      this.up();
    }
    if (this.keyState[this.keyDown] && this.playerName === 'player1') {
      this.down();
    }
    if (this.keyState[this.keyLeft] && this.playerName === 'player1') {
      this.left();
    }
    if (this.keyState[this.keyRight] && this.playerName === 'player1') {
      this.right();
    }

    if (this.keyState[this.keyUp] && this.playerName === 'player2') {
      this.up();
    }
    if (this.keyState[this.keyDown] && this.playerName === 'player2') {
      this.down();
    }
    if (this.keyState[this.keyLeft] && this.playerName === 'player2') {
      this.left();
    }
    if (this.keyState[this.keyRight] && this.playerName === 'player2') {
      this.right();
    }

    let rectPad = document.createElementNS(SVG_NS, 'rect');
    rectPad.setAttributeNS(null, 'width', this.width);
    rectPad.setAttributeNS(null, 'height', this.height);
    rectPad.setAttributeNS(null, 'fill', '#353535');
    rectPad.setAttributeNS(null, 'x', this.x);
    rectPad.setAttributeNS(null, 'y', this.y);

    svg.appendChild(rectPad);
  }
}

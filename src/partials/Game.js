import { SVG_NS } from '../settings';
import Board from './Board';
import Paddle from './Paddle';
import Ball from './Ball';
import { SVG, KEYS } from '../settings';
import { runInThisContext } from 'vm';

export default class Game {
  constructor(element, width, height) {
    this.element = element;
    this.width = width;
    this.height = height;

    this.paddleWidth = 8;
    this.paddleHeight = 56;
    this.boardGap = 10;

    this.player1 = new Paddle(
      this.height,
      this.width / 2,
      this.paddleWidth,
      this.paddleHeight,
      this.boardGap,
      (this.height - this.paddleHeight) / 2,
      KEYS.w,
      KEYS.s,
      KEYS.a,
      KEYS.d,
      'player1'
    );
    // console.log(this.player1);

    this.player2 = new Paddle(
      this.height,
      this.width,
      this.paddleWidth,
      this.paddleHeight,
      this.width - this.boardGap - this.paddleWidth,
      (this.height - this.paddleHeight) / 2,
      KEYS.up,
      KEYS.down,
      KEYS.left,
      KEYS.right,
      'player2'
    );
    // console.log(this.player2);

    document.addEventListener('keydown', event => {
      switch (event.key) {
        case KEYS.spaceBar:
          this.pause = !this.pause; //flips value, if true it'll be false and vice versa
          break;
      }
    }); //end of addEventListener

    // Other code goes here...
    this.gameElement = document.getElementById(this.element);
    this.board = new Board(this.width, this.height);
    this.ball = new Ball(8, this.width, this.height);
    console.log(this.ball);
  } //end of constructor

  render() {
    if (this.pause) {
      return;
      console.log(this.pause);
    }
    // More code goes here...
    this.gameElement.innerHTML = ''; //empties out any html in this game element
    let svg = document.createElementNS(SVG_NS, 'svg'); // createElementNS means creating an element with that namespace
    svg.setAttributeNS(null, 'width', this.width);
    svg.setAttributeNS(null, 'height', this.height);
    svg.setAttributeNS(null, 'viewbox', `0 0 ${this.width} ${this.height}`);
    this.gameElement.appendChild(svg);

    this.board.render(svg);
    this.player1.render(svg);
    this.player2.render(svg);
    this.ball.render(svg, this.player1, this.player2);
  } //end of render
} //end of Game

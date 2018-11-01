import { SVG_NS } from "../settings";

export default class Game {
  constructor(element, width, height) {
    this.element = element;
    this.width = width;
    this.height = height;

    // Other code goes here...
    this.gameElement = document.getElementById(this.element);
  }

  render() {
    // More code goes here...
    this.gameElement.innerHTML = ""; //empties out any html in this game element
    let svg = document.createElementNS(SVG_NS, "svg"); // createElementNS means creating an element with that namespace
    svg.setAttributeNS(null, "width", this.width);
    svg.setAttributeNS(null, "height", this.height);
    svg.setAttributeNS(null, "viewbox", `0 0 ${this.width} ${this.height}`);
    this.gameElement.appendChild(svg);
  }
}

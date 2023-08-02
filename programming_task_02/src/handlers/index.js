const Counter = require("./counter");
const Newest = require("./newest");

export class Handler {
  static from(input) {
    if (input.rule === "COUNTER") return Counter;
    if (input.rule === "NEWEST") return Newest;
  }
}

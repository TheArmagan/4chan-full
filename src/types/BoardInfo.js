const {FourChanFull} = require("../FourChanFull");

class BoardInfo {
  constructor(fchf) {
    this.fchf = fchf;
  }

  /** @type {FourChanFull} */
  fchf;

  /** @type {String} */
  name;

  /** @type {String} */
  code;

  /** @type {Boolean} */
  worksafe;

  board(pageNumber=1) {
    return this.fchf.board(this.code, pageNumber);
  }
}

module.exports = {BoardInfo}
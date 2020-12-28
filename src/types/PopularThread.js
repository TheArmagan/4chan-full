const { PopularThreads } = require("./PopularThreads");
const { BoardInfo } = require("./BoardInfo");
const { FourChanFull } = require("../FourChanFull");


class PopularThread {

  constructor(fchf) {
    this.fchf = fchf;
  }

  /** @type {FourChanFull} */
  fchf;

  /** @type {BoardInfo} */
  boardInfo;

  /** @type {PopularThreads} */
  parent;

  /** @type {String} */
  id;

  /** @type {String} */
  teaser;

  /** @type {String} Thumbnail URL */
  thumbnail;

  /** @type {String} */
  url;

  thread() {
    this.fchf.thread(this.boardInfo.code, this.id);
  }
}

module.exports = { PopularThread };

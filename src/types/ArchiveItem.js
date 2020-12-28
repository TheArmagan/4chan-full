const { BoardInfo } = require("./BoardInfo");
const { FourChanFull } = require("../FourChanFull");

class ArchiveItem {
  constructor(fchf) {
    this.fchf = fchf;
  }

  /** @type {FourChanFull} */
  fchf;

  /** @type {BoardInfo} */
  boardInfo;

  /** @type {String} */
  id;

  /** @type {String} */
  excerpt;
}

module.exports = { ArchiveItem };
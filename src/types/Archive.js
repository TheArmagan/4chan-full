const { ArchiveItem } = require("./ArchiveItem");
const { BoardInfo } = require("./BoardInfo");

class Archive {

  /** @type {BoardInfo} */
  boardInfo;

  /** @type {String} */
  url;

  /** @type {Array<ArchiveItem>} */
  items;
}

module.exports = { Archive };
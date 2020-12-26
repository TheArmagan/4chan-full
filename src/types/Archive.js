const { ArchiveItem } = require("./ArchiveItem");

class Archive {
  /** @type {String} */
  boardCode;

  /** @type {String} */
  boardName;

  /** @type {String} Based on board name. (Not fully correct*) */
  worksafe;

  /** @type {String} */
  url;

  /** @type {Array<ArchiveItem>} */
  items;
}

module.exports = { Archive };
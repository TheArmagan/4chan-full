const { ArchiveItem } = require("./ArchiveItem");

class Archive {

  /** @type {String} */
  url;

  /** @type {Array<ArchiveItem>} */
  items;
}

module.exports = { Archive };
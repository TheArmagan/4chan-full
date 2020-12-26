class ArchiveItem {
  /** @type {String} */
  boardCode;

  /** @type {String} */
  boardName;

  /** @type {String} Based on board name. (Not fully correct*) */
  worksafe;

  /** @type {String} */
  threadId;

  /** @type {String} */
  excerpt
}

module.exports = { ArchiveItem };
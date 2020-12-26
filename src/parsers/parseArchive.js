const { Archive } = require("../types/Archive");
const { parseArchiveItem } = require("./parseArchiveItem");

/**
 * @param {HTMLElement} e archive document
 *
 * @returns {Archive}
 */
function parseArchive(e, { board, href }) {
  const _archive = new Archive();

  _archive.boardCode = board.code;
  _archive.boardName = board.name;
  _archive.worksafe = board.worksafe;

  _archive.url = href;

  _archive.items = Array.from(e.querySelectorAll("#arc-list tbody tr")).map(trElement => {
    return parseArchiveItem(trElement);
  });

  return _archive;
}

module.exports = { parseArchive };
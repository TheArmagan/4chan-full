const { ArchiveItem } = require("../types/ArchiveItem");

/**
 * @param {HTMLTableRowElement} e archive document > "#arc-list tbody tr" element
 *
 * @returns {ArchiveItem}
 */
function parseArchiveItem(e) {
  const _archiveItem = new ArchiveItem();

  _archiveItem.threadId = e.cells[0].textContent;
  _archiveItem.excerpt = e.cells[1].textContent;

  return _archiveItem;
}

module.exports = { parseArchiveItem };
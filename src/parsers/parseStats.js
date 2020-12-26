const { parseFileSize } = require("./parseFile");
const { Stats } = require("../types/Stats");

/**
 * @param {HTMLElement} e #site-stats element in the boards page.
 *
 * @returns {Stats}
 */

function parseStats(e) {
  const _stats = new Stats();

  const statCellTexts = Array.from(e.querySelectorAll(".stat-cell")).map(i => i.textContent);

  _stats.totalPosts = parseInt(statCellTexts[0].slice(13).replace(/,/gm, ""));

  _stats.currentUsers = parseInt(statCellTexts[1].slice(15).replace(/,/gm, ""));

  _stats.activeContent = parseInt(statCellTexts[2].slice(16).replace(/,/gm, ""));

  return _stats;
}

module.exports = { parseStats };
const { findBoard } = require("../utils/findBoard");
const { PopularThread } = require("../types/PopularThread");

/**
 * @param {HTMLElement} e element with c-thread class name :)
 *
 * @returns {PopularThread}
 */

function parsePopularThread(e) {

  const _popularThread = new PopularThread();

  const board = findBoard(e.querySelector(".c-board").textContent);

  _popularThread.boardInfo = board;

  _popularThread.url = e.querySelector(".boardlink").href;
  _popularThread.id = e.querySelector(".boardlink").href.split("/")[5];
  _popularThread.teaser = e.querySelector(".c-teaser").textContent;
  _popularThread.thumbnail = e.querySelector(".c-thumb").src;

  return _popularThread;
}

module.exports = { parsePopularThread };
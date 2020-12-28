const { findBoard } = require("../utils/findBoard");
const { PopularThread } = require("../types/PopularThread");
const { FourChanFull } = require("../FourChanFull");

/**
 * @param {FourChanFull} fchf
 * @param {HTMLElement} e element with c-thread class name :)
 *
 * @returns {PopularThread}
 */

function parsePopularThread(fchf, e) {

  const _popularThread = new PopularThread(fchf);


  const board = findBoard(e.querySelector(".c-board").textContent);
  console.log(e.querySelector(".c-board").textContent, board);

  _popularThread.boardInfo = board.code;
  _popularThread.boardName = board.name;
  _popularThread.worksafe = board.worksafe;

  _popularThread.url = e.querySelector(".boardlink").href;
  _popularThread.id = e.querySelector(".boardlink").href.split("/")[5];
  _popularThread.teaser = e.querySelector(".c-teaser").textContent;
  _popularThread.thumbnail = e.querySelector(".c-thumb").src;

  return _popularThread;
}

module.exports = { parsePopularThread };
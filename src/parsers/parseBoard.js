const { Board } = require("../types/Board");
const { parseSemiThread } = require("./parseThread.js");

/**
 * @param {HTMLElement} e
 * 
 * @returns {Board}
 */
function parseBoard(e, { board, pageNumber, href }) {
  const _board = new Board();

  _board.banner = `https://s.4cdn.org/image/title/${e.querySelector("#bannerCnt").getAttribute("data-src")}`;

  _board.name = board.name;
  _board.code = board.code;
  _board.worksafe = board.worksafe;
  _board.page = pageNumber;
  _board.url = href;

  _board.threads = Array.from(e.querySelectorAll(".thread")).map((threadElm) => {
    return parseSemiThread(threadElm, board);
  });

  return _board;

}

module.exports = { parseBoard }
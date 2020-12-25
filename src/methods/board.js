
const { JSDOM } = require("jsdom");
const { defaultRequest } = require("../utils/defaultRequest");
const { findBoard } = require("../utils/findBoard");
const { Board } = require("../types/Board");
const { Thread } = require("../types/Thread");

const { File } = require("../types/File");

/**
 * @param {String} boardCode Board code or name.
 * @param {Number} pageNumber 
 * @param {defaultRequest} request
 */
async function getBoard(boardCode, pageNumber = 1, request) {

  let board = findBoard(boardCode);

  if (!board) {
    throw "Invalid board."
  }

  if (pageNumber < 1) {
    throw "Page number can be minimum 1."
  }

  if (pageNumber > 10) {
    throw "Page number can be maximum 10."
  }

  const href = `https://boards.4chan.org/${boardCode}${(pageNumber != 1 ? `/${pageNumber}` : "")}`;

  const rawHTML = await request("GET", href);

  return parseBoard(rawHTML, href);

}

function parseBoard(rawHTML = "", href = "") {
  const { window: { document } } = new JSDOM(rawHTML, { url: href });

  const _board = new Board();

  _board.code = board.code;
  _board.name = board.name;
  _board.worksafe = board.worksafe;
  _board.page = pageNumber;
  _board.href = href;

  _board.banner = document.querySelector("#bannerCnt img")?.src;

  _board.threads = Array.from(document.querySelectorAll(".thread")).map((t) => {
    const _thread = new Thread();

    _thread.full = false;
    _thread.id = t.id.slice(1);

    if (t.querySelector(".opContainer .fileText")) {
      let f = t.querySelector(".opContainer .fileText");
      let _file = new File();

      _file.name = f.querySelector("a").hasAttribute("title") ? f.querySelector("a").title : f.querySelector("a").textContent;


    }
  })

  return _board;
}

module.exports = { parseBoard, getBoard };

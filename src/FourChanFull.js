const { JSDOM } = require("jsdom");

const { defaultRequest } = require("./utils/defaultRequest.js");
const { findBoard } = require("./utils/findBoard.js");

const { parseFile } = require("./parsers/parseFile.js");
const { parseReply } = require("./parsers/parseReply.js");
const { parseSemiThread, parseThread } = require("./parsers/parseThread.js");

const { Board } = require("./types/Board");
const { Thread } = require("./types/Thread");
const { SemiThread } = require("./types/SemiThread");

class FourChanFull {
  #request = defaultRequest;

  /**
   * @param {defaultRequest} request 
   */
  constructor(request) {
    if (typeof request == "function") {
      this.#request = request;
    }
  }

  async board(boardCode, pageNumber = 1) {
    const board = findBoard(boardCode);
    if (!board) throw "Invalid board.";
    const href = `https://boards.4chan.org/${boardCode}/${pageNumber == 1 ? "" : pageNumber}`;
    const document = new JSDOM(await this.#request("GET", href), { url: href }).window.document;

    const _board = new Board();

    _board.banner = `https://s.4cdn.org/image/title/${document.querySelector("#bannerCnt").getAttribute("data-src")}`;

    _board.name = board.name;
    _board.code = board.code;
    _board.worksafe = board.worksafe;
    _board.page = pageNumber;
    _board.url = href;

    _board.threads = Array.from(document.querySelectorAll(".thread")).map((threadElm) => {
      return parseSemiThread(threadElm, board);
    })

    return _board;
  }

  async thread(boardCode, threadId) {
    const board = findBoard(boardCode);
    if (!board) throw "Invalid board.";
    const href = `https://boards.4chan.org/${boardCode}/thread/${threadId}`;
    const document = new JSDOM(await this.#request("GET", href), { url: href }).window.document;
    return parseThread(document, board);
  }

  async stats() {
    const document = new JSDOM(await this.#request("https://www.4chan.org/"), { url: href }).window.document;
  }
}

module.exports = { FourChanFull };
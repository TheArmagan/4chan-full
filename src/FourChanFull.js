const { JSDOM } = require("jsdom");

const { defaultRequest } = require("./utils/defaultRequest.js");
const { findBoard } = require("./utils/findBoard.js");
const { parseFile } = require("./utils/parseFile.js");

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

    _board.banner = document.querySelector("#bannerCnt img").src;

    _board.name = board.name;
    _board.code = board.code;
    _board.worksafe = board.worksafe;

    _board.threads = Array.from(document.querySelectorAll(".thread")).map((threadElm) => {
      const _semiThread = new SemiThread();

      _semiThread.id = threadElm.id.replace(/[^0-9]/gm, "");
      _semiThread.date = new Date(threadElm.querySelector(".op .postInfo .dateTime").getAttribute("data-utc") * 1000);
      _semiThread.file = parseFile(threadElm.querySelector(".op .file"));

      _semiThread.subject = threadElm.querySelector(".op .postInfo .subject").textContent;
      _semiThread.message = threadElm.querySelector(".op .postInfo .postMessage").textContent;

    })

    return _board;
  }

  async thread(boardCode, threadId) {
    const board = findBoard(boardCode);

  }
}

module.exports = { FourChanFull };
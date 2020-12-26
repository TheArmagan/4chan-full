const { JSDOM } = require("jsdom");

const { defaultRequest } = require("./utils/defaultRequest.js");
const { findBoard } = require("./utils/findBoard.js");

const { parseFile } = require("./parsers/parseFile.js");
const { parseReply } = require("./parsers/parseReply.js");

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
    _board.href = href;

    _board.threads = Array.from(document.querySelectorAll(".thread")).map((threadElm) => {
      const _semiThread = new SemiThread();

      console.log(threadElm.childElementCount)

      _semiThread.id = threadElm.id.replace(/[^0-9]/gm, "");
      _semiThread.date = new Date(threadElm.querySelector(".opContainer .postInfo.desktop .dateTime").getAttribute("data-utc") * 1000);
      _semiThread.file = parseFile(threadElm.querySelector(".opContainer .file"));

      _semiThread.subject = threadElm.querySelector(".opContainer .postInfo.desktop .subject").textContent;
      _semiThread.message = threadElm.querySelector(".opContainer .postMessage").textContent;

      _semiThread.replies = Array.from(threadElm.querySelectorAll(".postContainer.replyContainer")).map((replyElement) => {
        return parseReply(replyElement);
      });

      return _semiThread;
    })

    return _board;
  }

  async thread(boardCode, threadId) {
    const board = findBoard(boardCode);

  }
}

module.exports = { FourChanFull };
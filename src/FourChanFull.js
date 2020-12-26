const { JSDOM } = require("jsdom");

const { defaultRequest } = require("./utils/defaultRequest.js");
const { findBoard } = require("./utils/findBoard.js");

const { parseStats } = require("./parsers/parseStats");
const { parseSemiThread, parseThread } = require("./parsers/parseThread.js");
const { parsePopularThread } = require("./parsers/parsePopularThread");

const { SafetyType } = require("./other/SafetyType");
const boards = require("./other/boards");

const { Board } = require("./types/Board");
const { PopularThread } = require("./types/PopularThread");

class FourChanFull {
  #request = defaultRequest;

  static boards = boards;

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
    const href = `https://boards.4chan.org/${boardCode}/${pageNumber == 1 ? "" : pageNumber
      }`;
    const document = new JSDOM(await this.#request("GET", href), { url: href })
      .window.document;

    const _board = new Board();

    _board.banner = `https://s.4cdn.org/image/title/${document
      .querySelector("#bannerCnt")
      .getAttribute("data-src")}`;

    _board.name = board.name;
    _board.code = board.code;
    _board.worksafe = board.worksafe;
    _board.page = pageNumber;
    _board.url = href;

    _board.threads = Array.from(document.querySelectorAll(".thread")).map((threadElm) => {
      return parseSemiThread(threadElm, board);
    });

    return _board;
  }

  async thread(boardCode, threadId) {
    const board = findBoard(boardCode);
    if (!board) throw "Invalid board.";
    const href = `https://boards.4chan.org/${boardCode}/thread/${threadId}`;
    const document = new JSDOM(await this.#request("GET", href), { url: href })
      .window.document;
    return parseThread(document, board);
  }

  /** 
   * @param {"WORKSAFE"|"NON_WORKSAFE"|"COMBINED"} safety
   * @returns {Promise<Array<PopularThread>>}
  */
  async popular(safety) {
    safety = SafetyType[safety];
    if (!safety) throw "Invalid safety type!";

    const document = new JSDOM(
      await this.#request("GET", "https://www.4chan.org/", { cookie: `fpc=${safety}` }),
      { url: "https://www.4chan.org/" }
    ).window.document;

    return Array.from(document.querySelectorAll(".c-thread")).map(popularThreadElm => {
      return parsePopularThread(popularThreadElm)
    })
  }

  async stats() {
    const document = new JSDOM(
      await this.#request("GET", "https://www.4chan.org/"),
      { url: "https://www.4chan.org/" }
    ).window.document;
    return parseStats(document.querySelector("#site-stats"));
  }

  async archive() {

  }
}

module.exports = { FourChanFull };

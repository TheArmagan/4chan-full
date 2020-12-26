const { JSDOM } = require("jsdom");
const { defaultRequest } = require("./utils/defaultRequest.js");
const { findBoard } = require("./utils/findBoard.js");
const { parseStats } = require("./parsers/parseStats");
const { parseThread } = require("./parsers/parseThread.js");
const { parsePopularThreads } = require("./parsers/parsePopularThreads.js");
const { parseBoard } = require("./parsers/parseBoard.js");
const { SafetyType } = require("./other/SafetyType");
const boards = require("./other/boards");
const { PopularThread } = require("./types/PopularThread");
const { parseArchive } = require("./parsers/parseArchive.js");



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
    const href = `https://boards.4chan.org/${board.code}/${pageNumber == 1 ? "" : pageNumber}`;
    const document = new JSDOM(await this.#request("GET", href), { url: href }).window.document;

    return parseBoard(document, { board, pageNumber, href });
  }

  async archive(boardCode) {
    const board = findBoard(boardCode);
    if (!board) throw "Invalid board.";

    const href = `https://boards.4chan.org/${board.code}/archive`;
    const document = new JSDOM(await this.#request("GET", href), { url: href })
      .window.document;

    return parseArchive(document, { board, href });
  }

  async thread(boardCode, threadId) {
    const board = findBoard(boardCode);
    if (!board) throw "Invalid board.";
    const href = `https://boards.4chan.org/${board.code}/thread/${threadId}`;
    const document = new JSDOM(await this.#request("GET", href), { url: href })
      .window.document;
    return parseThread(document, board);
  }

  /** 
   * @param {"WORKSAFE"|"NON_WORKSAFE"|"COMBINED"} safety
   * @returns {Promise<Array<PopularThread>>}
  */
  async popular(safety = "COMBINED") {
    safety = SafetyType[safety];
    if (!safety) throw "Invalid safety type!";

    const document = new JSDOM(
      await this.#request("GET", "https://www.4chan.org/", { cookie: `fpc=${safety}` }),
      { url: "https://www.4chan.org/" }
    ).window.document;

    return parsePopularThreads(document.querySelector("#popular-threads"), safety);
  }

  async stats() {
    const document = new JSDOM(
      await this.#request("GET", "https://www.4chan.org/"),
      { url: "https://www.4chan.org/" }
    ).window.document;
    return parseStats(document.querySelector("#site-stats"));
  }

}

module.exports = { FourChanFull };

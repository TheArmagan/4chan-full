const { JSDOM } = require("jsdom");
const { defaultRequest } = require("./utils/defaultRequest");
const { findBoard } = require("./utils/findBoard");
const { parseStats } = require("./parsers/parseStats");
const { parseThread } = require("./parsers/parseThread");
const { parsePopularThreads } = require("./parsers/parsePopularThreads");
const { parseBoard } = require("./parsers/parseBoard");
const { SafetyType } = require("./other/SafetyType");
const boards = require("./other/boards");
const { parseArchive } = require("./parsers/parseArchive");
const { ThreadWatcher } = require("./watchers/ThreadWatcher");



class FourChanFull {
  _request = defaultRequest;

  static boards = boards;

  /**
   * @param {defaultRequest} request
   */
  constructor(request) {
    if (typeof request == "function") {
      this._request = request;
    }
  }

  /**
   * @param {String} boardCode 
   * @param {String} threadId 
   */
  createThreadWatcher(boardCode, threadId) {
    let watcher = new ThreadWatcher(this, boardCode, threadId);
    return watcher;
  }

/**
* @param {String} boardCode
* @param {Number} pageNumber (1-10)
*/
  async board(boardCode, pageNumber = 1) {
    const board = findBoard(boardCode);
    if (!board) throw "Invalid board.";
    const href = `https://boards.4chan.org/${board.code}/${pageNumber == 1 ? "" : pageNumber}`;
    const document = new JSDOM(await this._request("GET", href), { url: href }).window.document;

    return parseBoard(document, { board, pageNumber, href });
  }

/**
* @param {String} boardCode
*/
  async archive(boardCode) {
    const board = findBoard(boardCode);
    if (!board) throw "Invalid board.";

    const href = `https://boards.4chan.org/${board.code}/archive`;
    const document = new JSDOM(await this._request("GET", href), { url: href })
      .window.document;

    return parseArchive(document, { board, href });
  }
  
/**
* @param {String} boardCode
* @param {String} threadId
*/
  async thread(boardCode, threadId) {
    const board = findBoard(boardCode);
    if (!board) throw "Invalid board.";
    const href = `https://boards.4chan.org/${board.code}/thread/${threadId}`;
    const document = new JSDOM(await this._request("GET", href), { url: href }).window.document;
    return parseThread(document, board);
  }

  /** 
   * @param {"WORKSAFE"|"NON_WORKSAFE"|"COMBINED"} safety
  */
  async popular(safety = "COMBINED") {
    safety = SafetyType[safety];
    if (!safety) throw "Invalid safety type!";

    const document = new JSDOM(
      await this._request("GET", "https://www.4chan.org/", { cookie: `fpc=${safety}` }),
      { url: "https://www.4chan.org/" }
    ).window.document;

    return parsePopularThreads(document.querySelector("#popular-threads"), safety);
  }

  async stats() {
    const document = new JSDOM(
      await this._request("GET", "https://www.4chan.org/"),
      { url: "https://www.4chan.org/" }
    ).window.document;
    return parseStats(document.querySelector("#site-stats"));
  }

}

module.exports = { FourChanFull };

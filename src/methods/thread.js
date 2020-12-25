const { JSDOM } = require("jsdom");
const { defaultRequest } = require("../utils/defaultRequest");
const { findBoard } = require("../utils/findBoard");
const { Board } = require("../types/Board");
const { Thread } = require("../types/Thread");

/**
 * @param {String} boardCode Board code or name.
 * @param {String} threadID
 * @param {defaultRequest} request
 */

function getThread(boardCode, threadID, request) {
  let board = findBoard(boardCode);

  if (!board) {
    throw "Invalid board."
  }

  const href = `https://boards.4chan.org/${boardCode}/thread/${threadID}`;

  const rawHTML = await request("GET", href);

  return parseFullThread(rawHTML, href);
}

function parseHalfThread(rawHTML = "", href = "") {
  const { window: { document } } = new JSDOM(rawHTML, { url: href });

  const _thread = new Thread();
  const t = document.querySelector(".thread");


  _thread.id = t.id.slice(1);

}

module.exports = { getThread, parsePageThread, parseHalfThread };
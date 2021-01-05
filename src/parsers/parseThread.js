const { parseFile } = require("./parseFile");
const { parseReply } = require("./parseReply");
const { findBoard } = require("../utils/findBoard");

const { Thread } = require("../types/Thread");
const { SemiThread } = require("../types/SemiThread");
const { parseMessageContent } = require("./parseMessageContent");

/**
 * @param {HTMLElement} e Full thread page
 * @param {{worksafe: Boolean, name: String, code: String}} board
 */
function parseThread(e, board) {
  const _thread = new Thread();

  _thread.archived = Boolean(e.querySelector(".closed"));

  _thread.id = e.querySelector(".opContainer").id.replace(/[^0-9]/gm, "");
  _thread.date = new Date(e.querySelector(".opContainer .postInfo.desktop .dateTime").getAttribute("data-utc") * 1000);
  _thread.file = parseFile(e.querySelector(".opContainer .file"));

  _thread.url = `https://boards.4chan.org/${board.code}/thread/${_thread.id}`;

  _thread.subject = e.querySelector(".opContainer .postInfo.desktop .subject").textContent;
  _thread.message = parseMessageContent(e.querySelector(".opContainer .postMessage"));

  _thread.boardInfo = board;

  _thread.replies = Array.from(e.querySelectorAll(".postContainer.replyContainer")).map((replyElement) => {
    return parseReply(replyElement);
  });

  return _thread;
}

/**
 * @param {HTMLElement} e Thread element
 * @param {{worksafe: Boolean, name: String, code: String}} board
 */
function parseSemiThread(e, board) {
  const _semiThread = new SemiThread();

  _semiThread.id = e.id.replace(/[^0-9]/gm, "");
  _semiThread.date = new Date(e.querySelector(".opContainer .postInfo.desktop .dateTime").getAttribute("data-utc") * 1000);
  _semiThread.file = parseFile(e.querySelector(".opContainer .file"));

  _semiThread.url = `https://boards.4chan.org/${board.code}/thread/${_semiThread.id}`;

  _semiThread.subject = e.querySelector(".opContainer .postInfo.desktop .subject").textContent;
  _semiThread.message = parseMessageContent(e.querySelector(".opContainer .postMessage"));

  _semiThread.replies = Array.from(e.querySelectorAll(".postContainer.replyContainer")).map((replyElement) => {
    return parseReply(replyElement);
  });

  return _semiThread;

}

module.exports = { parseSemiThread, parseThread };
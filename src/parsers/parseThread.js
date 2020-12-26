const { parseFile } = require("./parseFile");

const { Thread } = require("../types/Thread");
const { SemiThread } = require("../types/SemiThread");

/**
 * @param {HTMLElement} e Full thread page
 */
function parseThread(e) {
  const _thread = new Thread();

  return _thread;
}

/**
 * @param {HTMLElement} e Thread element
 */
function parseSemiThread(e) {
  const _semiThread = new SemiThread();

  _semiThread.id = e.id.replace(/[^0-9]/gm, "");
  _semiThread.date = new Date(e.querySelector(".opContainer .postInfo.desktop .dateTime").getAttribute("data-utc") * 1000);
  _semiThread.file = parseFile(e.querySelector(".opContainer .file"));

  _semiThread.subject = e.querySelector(".opContainer .postInfo.desktop .subject").textContent;
  _semiThread.message = e.querySelector(".opContainer .postMessage").textContent;

  _semiThread.replies = Array.from(e.querySelectorAll(".postContainer.replyContainer")).map((replyElement) => {
    return parseReply(replyElement);
  });

  return _semiThread;

}

module.exports = { parseSemiThread };
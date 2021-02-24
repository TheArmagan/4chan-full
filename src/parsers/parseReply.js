const { parseFile } = require("./parseFile");
const { Reply } = require("../types/Reply");
const { parseMessageContent } = require("./parseMessageContent");
const { parseCountry } = require("./parseCountry");

/**
 * @param {HTMLElement} e
 *
 * @returns {Reply}
 */
function parseReply(e) {
  const _reply = new Reply();

  _reply.id = e.id.replace(/[^0-9]/gm, "");
  _reply.date = new Date(e.querySelector(".postInfo .dateTime").getAttribute("data-utc") * 1000);

  _reply.file = parseFile(e.querySelector(".file"));
  _reply.message = parseMessageContent(e.querySelector(".postMessage"));
  _reply.country = parseCountry(e.querySelector(".postInfo.desktop .flag"));

  return _reply;
}

module.exports = { parseReply };
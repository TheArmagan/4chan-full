const { MessageContentPart } = require("../types/MessageContentPart");

/**
 * @param {HTMLElement} e example node postMessage.childNodes[0]
 *
 * @returns {MessageContentPart}
 */
function parseMessageContentPart(e) {

  const _messageContentPart = new MessageContentPart();

  if (e.nodeName == "#text") {
    _messageContentPart.text = e.wholeText;
    _messageContentPart.type = "plaintext";
  } else if (e.nodeName == "A" && e.classList.contains("quotelink")) {
    _messageContentPart.text = e.textContent;
    _messageContentPart.type = "quotelink";
    _messageContentPart.url = e.href;
  } else if (e.nodeName == "SPAN" && e.classList.contains("quote")) {
    _messageContentPart.text = e.textContent;
    _messageContentPart.type = "quote";
  } else if (e.nodeName == "BR") {
    _messageContentPart.text = "\n";
    _messageContentPart.type = "linebreak";
  } else {
    _messageContentPart.text = e.textContent;
    _messageContentPart.type = "other";
  }

  return _messageContentPart;
}

module.exports = { parseMessageContentPart };
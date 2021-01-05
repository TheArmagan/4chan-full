const { MessageContent } = require("../types/MessageContent");
const { parseMessageContentPart } = require("./parseMessageContentPart");

/**
 * @param {HTMLElement} e
 *
 * @returns {MessageContent}
 */
function parseMessageContent(e) {

  const _messageContent = new MessageContent();

  _messageContent.parts = Array.from(e.childNodes).map(node => {
    return parseMessageContentPart(node);
  });

  _messageContent.text = _messageContent.parts.map(i => i.text).join("");

  return _messageContent;
}

module.exports = { parseMessageContent };
const { MessageContentPart } = require("./MessageContentPart");

class MessageContent {
  /** @type {String} */
  text;

  /** @type {Array<MessageContentPart>} */
  parts;
}

module.exports = { MessageContent };
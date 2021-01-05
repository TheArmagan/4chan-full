const { MessageContentPart } = require("./MessageContentPart");

class MessageContent {
  text;

  /** @type {Array<MessageContentPart>} */
  parts;
}

module.exports = { MessageContent };
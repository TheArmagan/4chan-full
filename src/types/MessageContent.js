const { MessageContentPart } = require("./MessageContentPart");

class MessageContent {
  /** @type {String} */
  text;

  /** @type {Array<MessageContentPart>} */
  parts;

  toString() {
    return this.text;
  }
}

module.exports = { MessageContent };
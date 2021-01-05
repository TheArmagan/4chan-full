const { Reply } = require("./Reply");
const { File } = require("./File");
const { MessageContent } = require("./MessageContent");

class SemiThread {
  /** @type {String} */
  id;

  /** @type {String} */
  subject;

  /** @type {MessageContent} */
  message;

  /** @type {Date} */
  date;

  /** @type {Array<Reply>} */
  replies;

  /** @type {File?} */
  file;

  /** @type {String} */
  url;
}

module.exports = { SemiThread };

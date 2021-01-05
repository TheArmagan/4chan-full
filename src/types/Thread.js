const { Reply } = require("./Reply");
const { File } = require("./File");
const { BoardInfo } = require("./BoardInfo");
const { MessageContent } = require("./MessageContent");

class Thread {

  /** @type {BoardInfo} */
  boardInfo;

  /** @type {String} */
  id;

  /** @type {String} */
  url;

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

  /** @type {Boolean} */
  archived;
}

module.exports = { Thread };

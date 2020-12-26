const { Reply } = require("./Reply");
const { File } = require("./File");

class Thread {
  /** @type {String} */
  id;

  /** @type {String} */
  url;

  /** @type {String} */
  subject;

  /** @type {String} */
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

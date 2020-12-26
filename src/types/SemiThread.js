const { Reply } = require("./Reply");
const { File } = require("./File");

class SemiThread {

  /** @type {String} */
  id;

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

}

module.exports = { SemiThread };

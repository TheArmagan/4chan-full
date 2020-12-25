const { File } = require("./File");

class Reply {

  /**
 * 
 * @param {{id: String, message: String, date: Date, file: File}} param0
 */
  constructor({ id, message, date, file }) {
    this.id = id;
    this.message = message;
    this.date = date;
    this.file = file;
  }

  /** @type {String} */
  id;

  /** @type {String} */
  message;

  /** @type {Date} */
  date;

  /** @type {File} */
  file;
}

module.exports = { Reply };
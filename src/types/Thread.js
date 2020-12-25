const { Reply } = require("./Reply");
const { File } = require("./File");

class Thread {

  /**
   * 
   * @param {{id: String, subject: String, message: String, date: Date, replies: Array<Reply>, file: File, archived: Boolean }} param0 
   */
  constructor({ id, subject, message, date, replies, file, archived }) {
    this.id = id;
    this.subject = subject;
    this.message = message;
    this.date = date;
    this.replies = replies;
    this.file = file;
    this.archived = archived;
  }

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

  /** @type {Boolean} */
  archived;
}

module.exports = { Thread };

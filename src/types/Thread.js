const { Reply } = require("./Reply");
const { File } = require("./File");
const { defaultRequest } = require("../utils/defaultRequest");

class Thread {

  /** @type {defaultRequest} */
  request;

  /**
   * 
   * @param {{id: String, subject: String, message: String, date: Date, replies: Array<Reply>, file: File, archived: Boolean, full: Boolean, request: defaultRequest, href: String }} param0
   */
  constructor({ id, subject, message, date, replies, file, archived, full, request, href }) {
    this.id = id;
    this.subject = subject;
    this.message = message;
    this.date = date;
    this.replies = replies;
    this.file = file;
    this.archived = archived;
    this.full = full;
    this.request = defaultRequest;
    this.href = href;
  }

  /** @type {String} */
  id;

  /** @type {String} */
  href;

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

  /** @type {Boolean} */
  full;

  fetch() {

  }
}

module.exports = { Thread };

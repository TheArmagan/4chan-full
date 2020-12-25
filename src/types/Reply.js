const { File } = require("./File");

export class Reply {
  /** @type {String} */
  id;

  /** @type {String} */
  message;

  /** @type {Date} */
  date;

  /** @type {File} */
  file;
}

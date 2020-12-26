const { File } = require("./File");

class Reply {

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

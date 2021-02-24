const { Country } = require("./Country");
const { File } = require("./File");
const { MessageContent } = require("./MessageContent");

class Reply {
  /** @type {String} */
  id;

  /** @type {MessageContent} */
  message;

  /** @type {Date} */
  date;

  /** @type {File} */
  file;

  /** @type {Country?} */
  country;
}

module.exports = { Reply };

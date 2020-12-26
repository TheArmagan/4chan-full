const { Thread } = require("./Thread");

class Board {
  /** @type {String} */
  name;

  /** @type {String} */
  code;

  /** @type {Array<Thread>} */
  threads;

  /** @type {Number} */
  page;

  /** @type {Boolean} */
  worksafe;

  /** @type {String} Board Banner URL */
  banner;

  /** @type {String} */
  url;
}

module.exports = { Board };

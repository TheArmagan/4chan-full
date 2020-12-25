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
}

module.exports = { Board };

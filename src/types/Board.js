const { Thread } = require("./Thread");

class Board {

  /**
   * 
   * @param {{name: String, code: String, threads: Array<Thread>, page: Number}} param0
   */
  constructor({ name, code, threads, page }) {
    this.name = name;
    this.code = code;
    this.threads = threads;
    this.page = page;
  }

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

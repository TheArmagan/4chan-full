const { Thread } = require("./Thread");

class Board {

  /**
   * 
   * @param {{name: String, code: String, threads: Array<Thread>, page: Number, worksafe: Boolean, href: String}} param0
   */
  constructor({ name, code, threads, page, worksafe, href }) {
    this.name = name;
    this.code = code;
    this.threads = threads;
    this.page = page;
    this.worksafe = worksafe;
    this.href = href;
  }

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
  href;
}

module.exports = { Board };

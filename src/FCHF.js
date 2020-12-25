const { defaultRequest } = require("./utils/defaultRequest");
const boards = require("./other/boards");


class FCHF {

  /** @type { defaultRequest} */
  request;

  /**
   * @param {{request:  defaultRequest?}} param0
   */
  constructor({ request }) {
    if (typeof request == "function") {
      this.request = request;
    } else {
      this.request = defaultRequest;
    }
  }

  /**
   * @param {String} board Board Code or Board Name
   * @param {Number} page Page Number 1 to 10
   */
  getBoard(board, page) {

  }

}

let fchf = new FCHF();
module.exports = { FCHF, fchf, boards };
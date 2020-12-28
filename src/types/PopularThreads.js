const { PopularThread } = require("./PopularThread");
const { FourChanFull } = require("../FourChanFull");
class PopularThreads {

  constructor(fchf) {
    this.fchf = fchf;
  }

  /** @type {FourChanFull} */
  fchf;

  /** @type {"WORKSAFE"|"NON_WORKSAFE"|"COMBINED"} */
  safety;

  /** @type {Array<PopularThread>} */
  threads;
}

module.exports = { PopularThreads };
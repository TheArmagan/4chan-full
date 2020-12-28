const { PopularThread } = require("./PopularThread");

class PopularThreads {

  /** @type {"WORKSAFE"|"NON_WORKSAFE"|"COMBINED"} */
  safety;

  /** @type {Array<PopularThread>} */
  threads;
}

module.exports = { PopularThreads };
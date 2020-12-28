const { BoardInfo } = require("./BoardInfo");

class PopularThread {

  /** @type {BoardInfo} */
  boardInfo;

  /** @type {String} */
  id;

  /** @type {String} */
  teaser;

  /** @type {String} Thumbnail URL */
  thumbnail;

  /** @type {String} */
  url;
}

module.exports = { PopularThread };

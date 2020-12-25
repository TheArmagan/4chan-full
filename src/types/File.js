class File {

  /**
   * 
   * @param {{name: String, size: Number, width: Number, height: Number, url: String, spoiler: Boolean}} param0
   */
  constructor({ name, size, width, height, url, spoiler }) {
    this.name = name;
    this.size = size;
    this.width = width;
    this.height = height;
    this.url = url;
    this.spoiler = spoiler;
  }

  /** @type {String} */
  name;

  /** 
   * File size in kilobytes
   * @type {Number} 
   */
  size;

  /** @type {Number} */
  width;

  /** @type {Number} */
  height;

  /** @type {Boolean} */
  spoiler;

  /** @type {String} */
  url;
}

module.exports = { File };
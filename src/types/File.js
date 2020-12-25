class File {

  /**
   * 
   * @param {{name: String, size: Number, width: Number, height: Number}} param0
   */
  constructor({ name, size, width, height }) {
    this.name = name;
    this.size = size;
    this.width = width;
    this.height = height;
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

  /** @type {String} */
  spoiler;
}

module.exports = { File };
class MessageContentPart {

  constructor({ text, type, url } = { text: "", type: "", url: "" }) {
    this.text = text;
    this.type = type;
    this.url = url;
  }

  /** @type {String} */
  text;

  /** @type {"plaintext"|"linebreak"|"quote"|"quotelink"} */
  type;

  /** @type {String?} It only exists when type is "quotelink" */
  url;
}

module.exports = { MessageContentPart };
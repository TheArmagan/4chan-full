class MessageContentPart {

  /** @type {String} */
  text;

  /** @type {"plaintext"|"linebreak"|"quote"|"quotelink"|"other"} */
  type;

  /** @type {String?} It only exists when type is "quotelink" */
  url;
}

module.exports = { MessageContentPart };
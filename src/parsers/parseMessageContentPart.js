const { MessageContentPart } = require("../types/MessageContentPart");

/**
 * @param {HTMLElement} node example node postMessage.childNodes[0]
 *
 * @returns {MessageContentPart}
 */
function parseMessageContentPart(node) {

  switch (node.nodeName) {
    case "#text":
      return new MessageContentPart({
        name: node.nodeName,
        type: "plaintext"
      });
    case "BR":
      return new MessageContentPart({
        text: "\n",
        type: "linebreak"
      });
    case "SPAN":
      return new MessageContentPart({
        text: node.innerText,
        type: "quote"
      });
    case "A":
      return new MessageContentPart({
        text: node.innerText,
        type: "quotelink",
        url: node.href
      });
  }

}

module.exports = { parseMessageContentPart };
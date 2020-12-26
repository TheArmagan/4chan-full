const boards = require("../other/boards");

/**
 * @param {String} input
 * @returns {{worksafe: Boolean, name: String, code: String}}
 */
function findBoard(input = "") {
  return boards.find((i) => {
    const lowerName = i.name.toLowerCase();
    const lowerInput = input.toLowerCase();
    return (
      i.code == input ||
      lowerName.replace(/[^a-zA-Z0-9]+/gm, "") == lowerInput.replace(/[^a-zA-Z0-9]+/gm, "")
    );
  });
}

module.exports = { findBoard };

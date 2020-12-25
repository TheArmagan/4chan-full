const boards = require("../other/boards");

function findBoardCode(input = "") {
  boards.find(i => {
    const lowerName = i.name.toLowerCase();
    const lowerInput = input.toLowerCase();
    return (
      i.code == input ||
      lowerName == input.toLowerCase() ||
      lowerName.startsWith(lowerInput) ||
      lowerName.endsWith(lowerInput)
    )
  })
}

module.exports = { findBoardCode };
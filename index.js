const { FourChanFull } = require("./src/FourChanFull");
const fchf = new FourChanFull();
const boards = require("./src/other/boards");
const { defaultRequest } = require("./src/utils/defaultRequest");
const { findBoard } = require("./src/utils/findBoard");

module.exports = { FourChanFull, fchf, boards, defaultRequest, findBoard };
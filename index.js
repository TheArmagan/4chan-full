let getBoard = require("./getBoard");
let getThread = require("./getThread");
let getPopularThreads = require("./getPopularThreads");
let getArchive = require("./getArchive");
let boards = require("./_boards.min");

let FCHF = {
    getBoard,
    getThread,
    getPopularThreads,
    getArchive,
    boards
}

module.exports = FCHF;

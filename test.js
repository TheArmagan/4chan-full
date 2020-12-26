let { FourChanFull } = require("./src/FourChanFull");

let FCHF = new FourChanFull();

FCHF.board("wg").then(board => {
    console.log(board)
})
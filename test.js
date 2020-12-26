let { FourChanFull, FCHF, boards } = require("./index");

// FCHF.board("wg").then(boards => {
//   console.log(boards)
// })

FCHF.archive("wg").then(boards => {
  console.log(boards)
})
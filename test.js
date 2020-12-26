let { FourChanFull } = require("./src/FourChanFull");

let FCHF = new FourChanFull();


// FCHF.thread("wg", "6872254").then(thread => {
//     console.log(thread);
// })

FCHF.stats().then((stats) => {
    console.log(stats);
})
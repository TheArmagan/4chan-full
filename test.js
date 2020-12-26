let { FourChanFull, FCHF } = require("./index");

FCHF.stats().then((stats) => {
    console.log(stats);
})
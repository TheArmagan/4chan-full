let FCHF = require("./index");
let util = require("util");

FCHF.getBoard("jp", 1, "https://kao-datapipe-2.herokuapp.com/").then(board => {
    console.log(util.inspect(board, false, 30, true));
})
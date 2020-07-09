let FCHF = require("./index");

FCHF.getBoard("w",1,"https://kao-datapipe-2.herokuapp.com/").then(data=>{
    console.log(JSON.stringify(data,null,2));
})
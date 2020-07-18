let FCHF = require("./index");

FCHF.getBoard("w",1,"https://kao-datapipe-2.herokuapp.com/").then(async data=>{
    let thread = await data.threads[0].thread("https://kao-datapipe-1.herokuapp.com/");
    console.log(thread.posts);
})
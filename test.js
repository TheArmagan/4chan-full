let FCHF = require("./index");

// FCHF.getBoard("jp",1,"https://kao-datapipe-2.herokuapp.com/").then(async data=>{
//     let thread = await data.threads[0].thread("https://kao-datapipe-1.herokuapp.com/");
//     console.log(thread)
// })

FCHF.getThread("jp",26175111,"https://kao-datapipe-2.herokuapp.com/").then(thread=>{
    console.log(thread.posts.map(f=>f.file))
})
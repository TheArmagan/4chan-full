let FCHF = require("./index");
let download = require("download");

// URL Prefix -------------------+
// Thread Code -------+          |
// Board Code --+     |          |
//              |     |          |
FCHF.getThread("w","2148861", "https://kao-datapipe-2.herokuapp.com/").then(thread=>{
    console.log("subject", thread.subject)
    console.log("isArchived", thread.isArchived)
    thread.posts.forEach((post, index)=>{
        console.log(index, "", post.message)
        if (post.file.exists) {
            //                                              Size in KB
            console.log(post.file.url, post.file.name, post.file.size.size, post.file.size.width, post.file.size.height);
            setTimeout(()=>{
                download("https://kao-datapipe-1.herokuapp.com/"+post.file.url, "wallpapers", {
                    filename: post.file.name
                })
            }, (index*(Math.random()*1000))+1)
        }
    });
});
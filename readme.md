> # 4CHAN-FULL 🎉
> www.4chan.org non-official read only api.

---

## Installation
```diff
npm install 4chan-full
```

---

### Possibilities
- [Get Thread](https://example.com/ "Example Result") (`.getThread(boardCode, threadId)`)
- [Get Board](https://example.com/ "Example Result") (`.getBoard(boardCode, page)`)
- [Get Archive](https://example.com/ "Example Result") (`.getArchive(boardCode)`)
- [Get Popular Threads](https://example.com/ "Example Result") (`.getPopularThreads(safetyType)`)
- [Get Stats](https://example.com/ "Example Result") (`.getStats()`)
- [Board List](https://example.com/ "Example Result") (`.boards`);

---

### Example `Basic Thread Files Downloader Example`
```js
// To be honest there is no good examples to use. :D
let FCHF = require("4chan-full");
let download = require("download");

// URL Prefix -------------------+--> https://github.com/Armagann/data-pipe
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

```

--- 

### Update 1.0.7

In file object changed property `exists` to `isExists`
Added file object to `isSpoiler` property
Now you can get board's archive directly form getBoard

### Update 1.0.6

You can get thread directly from getBoard response or getPopularThreads response. **Example:**
```js
FCHF.getBoard().then(async board=>{
    let firstThread = await board.threads[0].thread();
    console.log(firstThread);
})
```


    






> # 4CHAN-FULL 🎉
>
> www.4chan.org non-official read only api.

---

## Installation

```diff
npm install 4chan-full
```

---

### Possibilities

- [Get Thread](https://example.com/ "Example Result") (`.thread(boardCode, threadId)`)
- [Get Board](https://example.com/ "Example Result") (`.board(boardCode, page)`)
- [Get Archive](https://example.com/ "Example Result") (`.archive(boardCode)`)
- [Get Popular Threads](https://example.com/ "Example Result") (`.popular(safetyType)`)
- [Get Stats](https://example.com/ "Example Result") (`.stats()`)
- [Board List](https://example.com/ "Example Result") (`.boards`)

### Example Code

That small script lists all files of the thread..

```js
const {fchf} = require("4chan-full");

(async ()=>{

  const thread = await fchf.thread("wg", "7694540");

  // thread.file -> Thread owner (OP) file.
  // thread.replies[?].file -> reply file.

  const files = [thread.file, ...thread.replies.map(i => i?.file)].filter(i => i != null);
  
  console.log(files);

})();
```

## TODO
- [x] Full Code REWRITE
- [ ] Parse Message Contents (Quotes etc.)
- [ ] Thread Update Watcher
- [ ] Board Update Watcher

## HUGE Update 1.1.0

- Full Rewrite API
- Update README MD

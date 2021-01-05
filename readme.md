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

- [Custom Request Handler](https://example.com/) (`new FourChanFull(yourHandler)`);

- [Get Thread](https://example.com/ "Example Result") (`.thread(boardCode, threadId)`)
- [Get Board](https://example.com/ "Example Result") (`.board(boardCode, page)`)
- [Get Archive](https://example.com/ "Example Result") (`.archive(boardCode)`)
- [Get Popular Threads](https://example.com/ "Example Result") (`.popular(safetyType)`)
- [Get Stats](https://example.com/ "Example Result") (`.stats()`)
- [Board List](https://example.com/ "Example Result") (`.boards`)

### Example Code

That small script lists all files of the thread..

```js
const { fchf } = require("4chan-full");

(async () => {
  const thread = await fchf.thread("wg", "7694540");

  // thread.file -> Thread owner (OP) file.
  // thread.replies[?].file -> reply file.

  const files = [thread.file, ...thread.replies.map((i) => i?.file)].filter(
    (i) => i != null
  );

  console.log(files);
})();
```

## TODO

- [x] Full Code REWRITE
- [x] Parse Message Contents (Quotes etc.)
- [ ] Thread Update Watcher
- [ ] Board Update Watcher

## Type List

- [Archive](https://github.com/TheArmagan/4chan-full/tree/master/src/types/Archive.js)
- [ArchiveItem](https://github.com/TheArmagan/4chan-full/tree/master/src/types/ArchiveItem.js)
- [Board](https://github.com/TheArmagan/4chan-full/tree/master/src/types/Board.js)
- [BoardInfo](https://github.com/TheArmagan/4chan-full/tree/master/src/types/BoardInfo.js)
- [File](https://github.com/TheArmagan/4chan-full/tree/master/src/types/File.js)
- [MessageContent](https://github.com/TheArmagan/4chan-full/tree/master/src/types/MessageContent.js)
- [MessageContentPart](https://github.com/TheArmagan/4chan-full/tree/master/src/types/MessageContentPart.js)
- [PopularThreadPart](https://github.com/TheArmagan/4chan-full/tree/master/src/types/PopularThreadPart.js)
- [PopularThread](https://github.com/TheArmagan/4chan-full/tree/master/src/types/PopularThread.js)
- [PopularThreads](https://github.com/TheArmagan/4chan-full/tree/master/src/types/PopularThreads.js)
- [Reply](https://github.com/TheArmagan/4chan-full/tree/master/src/types/Reply.js)
- [SemiThread](https://github.com/TheArmagan/4chan-full/tree/master/src/types/SemiThread.js)
- [Stats](https://github.com/TheArmagan/4chan-full/tree/master/src/types/Stats.js)
- [Thread](https://github.com/TheArmagan/4chan-full/tree/master/src/types/Thread.js)

### Update 1.1.1

- Parse Message Contents
- Add Type List To README MD

## HUGE Update 1.1.0

- Full Rewrite API
- Update README MD

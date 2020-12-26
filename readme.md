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

- [Get Thread](https://example.com/ "Example Result") (`.getThread(boardCode, threadId)`)
- [Get Board](https://example.com/ "Example Result") (`.getBoard(boardCode, page)`)
- [Get Archive](https://example.com/ "Example Result") (`.getArchive(boardCode)`)
- [Get Popular Threads](https://example.com/ "Example Result") (`.getPopularThreads(safetyType)`)
- [Get Stats](https://example.com/ "Example Result") (`.getStats()`)
- [Board List](https://example.com/ "Example Result") (`.boards`);

## HUGE Update 1.1.0

- Full Rewrite API
- Update README MD

### Update 1.0.8

- Thread's `message` property is changed is no longer a string its a Object that object contains full raw message and quotes of the message if exists. The new message format:

```js
{
  content: "hey bro! >>46831",
  quotes: [
    {
      id: "46831",
      index: 9
    }
  ]
}
```

### Update 1.0.7

- In file object changed property `exists` to `isExists`
- Added file object to `isSpoiler` property
- Now you can get board's archive directly form getBoard

### Update 1.0.6

You can get thread directly from getBoard response or getPopularThreads response. **Example:**

```js
FCHF.getBoard().then(async (board) => {
  let firstThread = await board.threads[0].thread();
  console.log(firstThread);
});
```

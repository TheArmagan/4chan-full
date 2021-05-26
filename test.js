const sleep = require("stuffs/lib/sleep");
let { fchf } = require(".");
let fs = require("fs");

(async () => {
  let watcher = fchf.threadWatcher("vg", "337012489");

  watcher.on("updated", (oldThread, newThread) => {
    console.log({ oldThread, newThread });
  });

  watcher.on("notUpdated", () => {
    console.log("there is no new replies.. Checking for", Date.now()-watcher.startTime, "miliseconds..");
  });

  watcher.on("checked", (oldThread, newThread) => {
    console.log("checked new checkInterval:", watcher.checkInterval);
  });

  watcher.start();
})();
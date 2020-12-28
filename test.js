let {fchf} = require("./index");

(async () => {
  const thread = await fchf.thread("wg", "7694540");
  const files = [thread.file, ...thread.replies.map(i => i?.file)].filter(i => i != null);
  console.log(files);
})();
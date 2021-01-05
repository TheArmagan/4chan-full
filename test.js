let { fchf } = require("./index");

(async () => {
  const thread = await fchf.thread("gd", "401824");
  console.log(require("util").inspect(thread, false, 16, true));
})();
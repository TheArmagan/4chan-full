const { SafetyTypeReverse } = require("../other/SafetyType");
const { PopularThreads } = require("../types/PopularThreads");
const { parsePopularThread } = require("./parsePopularThread");

function parsePopularThreads(e, safety) {

  const _popularThreads = new PopularThreads();

  _popularThreads.safety = SafetyTypeReverse[safety];

  _popularThreads.threads = Array.from(e.querySelectorAll(".c-thread")).map(popularThreadElm => {
    return parsePopularThread(popularThreadElm)
  });

  return _popularThreads;
}

module.exports = { parsePopularThreads };
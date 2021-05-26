const { File } = require("../types/File");

const sizeRegex = /\((\d+(?:\.\d+)* (?:KB|MB|GB)), (?:(\d+)x(\d+))\)/i;

/**
 * @param {HTMLElement} e
 *
 * @returns {File?}
 */
function parseFile(e) {
  if (!e) return null;

  const _file = new File();

  const isSpoiler = Boolean(e.querySelector(".imgspoiler"));
  
  const fileText = e.querySelector(".fileText");
  const fileTextA = e.querySelector(".fileText a");

  _file.spoiler = isSpoiler;
  _file.name = isSpoiler
    ? fileText.getAttribute("title")
    : fileTextA.hasAttribute("title")
      ? fileTextA.getAttribute("title")
      : fileTextA.textContent;

  _file.url = fileTextA.href;

  const sizeRegexMatch = fileText.textContent.match(sizeRegex);

  _file.size = parseFileSize(sizeRegexMatch[1]);
  _file.width = parseInt(sizeRegexMatch[2]);
  _file.height = parseInt(sizeRegexMatch[3]);

  return _file;
}

/** 
 * @returns {number} Eg. 1.23 GB or 12 kb
 */
function parseFileSize(fileSizeText = "0 GB") {
  let splitted = fileSizeText.split(" ");
  let factor = NaN;

  switch ((splitted[1] || "").toLowerCase()) {
    case "kb":
      factor = 1;
      break;
    case "mb":
      factor = 1000;
      break;
    case "gb":
      factor = 1000000;
      break;
  }

  let sizeInKB = parseFloat(splitted[0]) * factor;

  return sizeInKB;
}

module.exports = { parseFile, parseFileSize };

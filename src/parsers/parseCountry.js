const { Country } = require("../types/Country");

/**
 * @param {HTMLSpanElement} e
 *
 * @returns {Country}
 */
function parseCountry(e) {
  if (!e) return null;

  const _country = new Country();

  _country.title = e.title;
  _country.code = e.className.split(" ")[1].split("-")[1];

  return _country;
}

module.exports = { parseCountry };
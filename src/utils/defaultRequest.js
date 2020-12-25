const got = require("got").default;

/**
 * @param {"GET"|"POST"} method 
 * @param {String} url 
 * @param {Object} headers
 * 
 * @returns {Promise<String>}
 */
async function defaultRequest(method, url, headers) {
  let response = await got(url, { method, headers, responseType: "text" });
  return response.body;
}

module.exports = { defaultRequest };
const got = require("got").default;

/**
 * @param {"GET"|"POST"} method
 * @param {String} url
 * @param {Object} headers
 *
 * @returns {Promise<String>}
 */
async function defaultRequest(method, url, headers) {
  console.log(url)
  let response = await got(url, { method, headers, responseType: "text", throwHttpErrors: false });
  return response.body;
}

module.exports = { defaultRequest };

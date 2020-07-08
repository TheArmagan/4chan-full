let { JSDOM } = require("jsdom");
let got = require("got").default;
let { convertSafetyType } = require("./utils");

/**
 * @typedef {"ws"|"WORKSAFE"|0|"nws"|"nsfw"|"NOTSAFE"|"NOTWORKSAFE"|1|"all"|"ALL"|"COMBINED"|2} SafetyType
 */

function parseBody(siteBodyHTML="") {

    let dom = new JSDOM(siteBodyHTML);
    let document = dom.window.document;

    let result = Array.from(document.querySelectorAll(".c-thread")).map(e => {
        return {
            board: {
                code: e.querySelector("a").getAttribute("href").split("/")[3],
                name: e.querySelector(".c-board").textContent
            },
            thread: parseInt(e.querySelector("a").getAttribute("href").split("/")[5]),
            thumbnail: "https:"+e.querySelector(".c-thumb").getAttribute("src"),
            teaser: e.querySelector(".c-teaser").textContent
        }
    })

    dom = 0;

    return result;
}

/**
 * @param {SafetyType} type
 */
async function getBody(type="WORKSAFE", dataPipe="") {
    let convertedType = convertSafetyType(type);
    let bodyHTML = await got.get(dataPipe+"https://www.4chan.org/", {resolveBodyOnly: true, cookieJar: {fpc: convertedType}});
    return bodyHTML;
}

/**
 * @param {SafetyType} type
 */
async function getPopularThreads(type="WORKSAFE", dataPipe="") {
    let bodyHTML = await getBody(type, dataPipe);
    let parsedBody = parseBody(bodyHTML);
    return parsedBody;
}

module.exports = getPopularThreads;
module.exports.getBody = getBody;
module.exports.parseBody = parseBody

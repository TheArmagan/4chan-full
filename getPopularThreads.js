let { JSDOM } = require("jsdom");
let got = require("got").default;
let { convertSafetyType } = require("./utils");
let getThread = require("./getThread");

/**
 * @typedef {"ws"|"WORKSAFE"|0|"nws"|"nsfw"|"NOTSAFE"|"NOTWORKSAFE"|1|"all"|"ALL"|"COMBINED"|2} SafetyType
 */

function parseBody(siteBodyHTML = "") {

    let dom = new JSDOM(siteBodyHTML);
    let doc = dom.window.document;

    let result = Array.from(doc.querySelectorAll(".c-thread")).map(e => {
        let id = parseInt(e.querySelector("a").getAttribute("href").split("/")[5]);
        let boardName = e.querySelector(".c-board").textContent;
        return {
            board: {
                code: e.querySelector("a").getAttribute("href").split("/")[3],
                name: boardName
            },
            id,
            thread(dataPipe = "") {
                return getThread(boardName, id, dataPipe);
            },
            thumbnail: "https:" + e.querySelector(".c-thumb").getAttribute("src"),
            teaser: e.querySelector(".c-teaser").textContent
        }
    })

    dom = 0;

    return result;
}

/**
 * @param {SafetyType} type
 */
async function getBody(type = "WORKSAFE", dataPipe = "") {
    let convertedType = convertSafetyType(type);
    let bodyHTML = await got.get(dataPipe + "https://www.4chan.org/", {
        resolveBodyOnly: true,
        headers: {
            "cookie": `fpc=${convertedType}`,
            "dp-cookie": `fpc=${convertedType}` // For datapipe
        }
    });
    return bodyHTML;
}

/**
 * @param {SafetyType} type Safety Type
 * @param {String} dataPipe DataPipe URL
 */
async function getPopularThreads(type = "WORKSAFE", dataPipe = "") {
    let bodyHTML = await getBody(type, dataPipe);
    let parsedBody = parseBody(bodyHTML);
    return parsedBody;
}

module.exports = getPopularThreads;
module.exports.getBody = getBody;
module.exports.parseBody = parseBody;
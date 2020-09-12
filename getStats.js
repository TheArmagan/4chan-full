let { JSDOM } = require("jsdom");
const { reverseFormatFileSizeKB } = require("./utils");
let got = require("got").default;

function parseBody(siteBodyHTML="") {
    let dom = new JSDOM(siteBodyHTML);
    let document = dom.window.document;

    let statsArray = Array.from(document.querySelectorAll("#site-stats .stat-cell")).map(i=>i.childNodes[1].textContent.trim());

    let result = {
        totalPosts: parseInt(statsArray[0].replace(/\,/g,"")),
        currentUsers: parseInt(statsArray[1].replace(/\,/g,"")),
        activeContent: reverseFormatFileSizeKB(statsArray[2])
    };

    statsArray = 0;
    dom = 0;

    return result;
}


async function getBody(dataPipe="") {
    let bodyHTML = await got.get(dataPipe+"https://www.4chan.org/", {resolveBodyOnly: true});
    return bodyHTML;
}

/**
 * @param {String} dataPipe DataPipe URL
 */
async function getStats(dataPipe="") {
    let bodyHTML = await getBody(dataPipe);
    let parsedBody = parseBody(bodyHTML);
    return parsedBody;
}

module.exports = getStats;
module.exports.getBody = getBody;
module.exports.parseBody = parseBody;
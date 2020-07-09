let { JSDOM } = require("jsdom");
let got = require("got").default;
let { boardTitleToBoardNameInfo } = require("./utils");

function parseBody(siteBodyHTML="") {

    let dom = new JSDOM(siteBodyHTML);
    let document = dom.window.document;

    let trs = Array.from(document.querySelectorAll("#arc-list tr"));
    trs.shift();

    let result = {
        board: boardTitleToBoardNameInfo(document.querySelector(".boardTitle").textContent),
        threads: trs.map(e=>{
            return {
                id: parseInt(e.cells[0].textContent),
                teaser: e.cells[1].textContent
            }
        })
    };

    trs = 0;
    dom = 0;

    return result;
}

async function getBody(board="", dataPipe="") {
    let archiveURL = `https://boards.4channel.org/${board}/archive`;
    let bodyHTML = await got.get(dataPipe+archiveURL, {resolveBodyOnly: true});
    return bodyHTML;
}

async function getArchive(board="", dataPipe="") {
    let bodyHTML = await getBody(board, dataPipe);
    let parsedBody = parseBody(bodyHTML);
    return parsedBody;
}

module.exports = getArchive;
module.exports.getBody = getBody;
module.exports.parseBody = parseBody;
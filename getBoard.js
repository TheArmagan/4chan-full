let { JSDOM } = require("jsdom");
let got = require("got").default;
let { fileTextToSizeInfo, boardTitleToBoardNameInfo } = require("./utils");

function parseBody(siteBodyHTML="") {

    let dom = new JSDOM(siteBodyHTML);
    let document = dom.window.document;

    let result = { 
        board: boardTitleToBoardNameInfo(document.querySelector(".boardTitle").textContent),
        threads: Array.from(document.querySelectorAll(".thread")).map(e=>{
            return {
                id: parseInt(e.id.replace(/[^0-9]/g,"")),
                subject: e.querySelector(".op .desktop .subject").textContent,
                message: e.querySelector(".postMessage") ? e.querySelector(".postMessage").textContent.replace(/(>>\d+)/gm, " [$1] ") : "",
                date: parseInt(e.querySelector(".dateTime").getAttribute("data-utc")),
                file: e.querySelector(".file") ? {
                    exists: true,
                    url: "https:"+e.querySelector(".fileText a").getAttribute("href"),
                    name: e.querySelector(".fileText a").title ? e.querySelector(".fileText a").title : e.querySelector(".fileText a").textContent,
                    size: fileTextToSizeInfo(e.querySelector(".fileText").textContent)
                } : {exists: false}
            }
        }),
        page: parseInt(document.querySelector(".pages strong").textContent),
        hasNextPage: Boolean(document.querySelector(".next .pageSwitcherForm"))
    }

    dom = 0;

    return result;
}

async function getBody(board="", page=1, dataPipe="") {
    let threadURL = `https://boards.4channel.org/${board}/${page <= 1 ? "" : page}`;
    let bodyHTML = await got.get(dataPipe+threadURL, {resolveBodyOnly: true});
    return bodyHTML;
}

/**
 * 
 * @param {String} board 
 * @param {Number} page 
 * @param {String} dataPipe 
 */
async function getBoard(board="", page=1, dataPipe="") {
    let bodyHTML = await getBody(board, page, dataPipe);
    let bodyJSON = parseBody(bodyHTML);
    return bodyJSON;
}

module.exports = getBoard;
module.exports.getBody = getBody;
module.exports.parseBody = parseBody

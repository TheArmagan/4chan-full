let { JSDOM } = require("jsdom");
let got = require("got").default;
let { fileTextToSizeInfo, boardTitleToBoardNameInfo, fileElementToFileObject } = require("./utils");
let getThread = require("./getThread");
let getArchive = require("./getArchive");

function parseBody(siteBodyHTML="") {

    let dom = new JSDOM(siteBodyHTML);
    let document = dom.window.document;

    let board = boardTitleToBoardNameInfo(document.querySelector(".boardTitle").textContent);

    let result = { 
        board,
        threads: Array.from(document.querySelectorAll(".thread")).map(e=>{
            let id = parseInt(e.id.replace(/[^0-9]/g,""));
            return {
                id,
                thread(dataPipe="") {
                    return getThread(board.name, id, dataPipe);
                },
                subject: e.querySelector(".op .desktop .subject").textContent,
                message: e.querySelector(".postMessage") ? e.querySelector(".postMessage").textContent.replace(/(>>\d+)/gm, " [$1] ") : "",
                date: parseInt(e.querySelector(".dateTime").getAttribute("data-utc")),
                file: fileElementToFileObject(e.querySelector(".file"))
            }
        }),
        page: parseInt(document.querySelector(".pages strong").textContent),
        hasNextPage: Boolean(document.querySelector(".next .pageSwitcherForm")),
        archive(dataPipe="") {
            return getArchive(board.code, dataPipe);
        }
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
 * @param {String} board Board code
 * @param {Number} page Page number
 * @param {String} dataPipe DataPipe url
 */
async function getBoard(board="", page=1, dataPipe="") {
    let bodyHTML = await getBody(board, page, dataPipe);
    let bodyJSON = parseBody(bodyHTML);
    return bodyJSON;
}

module.exports = getBoard;
module.exports.getBody = getBody;
module.exports.parseBody = parseBody

let { JSDOM } = require("jsdom");
let got = require("got").default;
let { fileTextToSizeInfo, boardTitleToBoardNameInfo, fileElementToFileObject, parsePostMessage } = require("./utils");
let getThread = require("./getThread");
let getArchive = require("./getArchive");

function parseBody(siteBodyHTML = "") {

    let dom = new JSDOM(siteBodyHTML);
    let doc = dom.window.document;

    let board = boardTitleToBoardNameInfo(doc.querySelector(".boardTitle").textContent);

    let result = {
        board,
        threads: Array.from(doc.querySelectorAll(".thread")).map(e => {
            let id = parseInt(e.id.replace(/[^0-9]/g, ""));
            return {
                id,
                thread(dataPipe = "") {
                    return getThread(board.name, id, dataPipe);
                },
                subject: e.querySelector(".op .desktop .subject").textContent,
                message: e.querySelector(".postMessage") ? parsePostMessage(e.querySelector(".postMessage").textContent) : "",
                date: parseInt(e.querySelector(".dateTime").getAttribute("data-utc")),
                file: fileElementToFileObject(e.querySelector(".file"))
            }
        }),
        page: parseInt(doc.querySelector(".pages strong").textContent),
        hasNextPage: Boolean(doc.querySelector(".next .pageSwitcherForm")),
        archive(dataPipe = "") {
            return getArchive(board.code, dataPipe);
        }
    }

    dom = 0;

    return result;
}

async function getBody(board = "", page = 1, dataPipe = "") {
    let threadURL = `https://boards.4channel.org/${board}/${page <= 1 ? "" : page}`;
    let bodyHTML = await got.get(dataPipe + threadURL, { resolveBodyOnly: true });
    return bodyHTML;
}

/**
 * @param {String} board Board code
 * @param {Number} page Page number
 * @param {String} dataPipe DataPipe url
 */
async function getBoard(board = "", page = 1, dataPipe = "") {
    let bodyHTML = await getBody(board, page, dataPipe);
    let bodyJSON = parseBody(bodyHTML);
    return bodyJSON;
}

module.exports = getBoard;
module.exports.getBody = getBody;
module.exports.parseBody = parseBody

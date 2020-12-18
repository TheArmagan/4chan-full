let { JSDOM } = require("jsdom");
let got = require("got").default;
let { fileTextToSizeInfo, boardTitleToBoardNameInfo, fileElementToFileObject, parsePostMessage } = require("./utils");

function parseBody(siteBodyHTML = "") {
    let dom = new JSDOM(siteBodyHTML);
    let doc = dom.window.document;

    let result = {
        subject: doc.querySelector(".subject").textContent,
        board: boardTitleToBoardNameInfo(doc.querySelector(".boardTitle").textContent),
        posts: Array.from(doc.querySelectorAll(".postContainer")).map(e => {
            let fileSizeInfo = [];
            if (e.querySelector(".file")) fileSizeInfo = fileTextToSizeInfo(e.querySelector(".fileText").textContent);
            return {
                id: parseInt(e.id.replace(/[^0-9]/g, "")),
                message: e.querySelector(".postMessage") ? parsePostMessage(e.querySelector(".postMessage").textContent) : "",
                file: fileElementToFileObject(e.querySelector(".file")),
                date: parseInt(e.querySelector(".dateTime").getAttribute("data-utc"))
            }
        }),
        isArchived: Boolean(doc.querySelector(".closed"))
    };

    dom = 0;

    return result;
}

async function getBody(board = "", threadId = 0, dataPipe = "") {
    let threadURL = `https://boards.4channel.org/${board}/thread/${threadId}`;
    let bodyHTML = await got.get(dataPipe + threadURL, { resolveBodyOnly: true });
    return bodyHTML;
}

/**
 * @param {String} board Board code
 * @param {Number} threadId Thread id
 * @param {String} dataPipe DataPipe URL
 */
async function getThread(board = "", threadId = 0, dataPipe = "") {
    let bodyHTML = await getBody(board, threadId, dataPipe);
    let bodyJSON = parseBody(bodyHTML);
    return bodyJSON;
}

module.exports = getThread;
module.exports.getBody = getBody;
module.exports.parseBody = parseBody


let { JSDOM } = require("jsdom");
let got = require("got").default;
let { boardTitleToBoardNameInfo } = require("./utils");
let getThread = require("./getThread");

function parseBody(siteBodyHTML = "") {

    let dom = new JSDOM(siteBodyHTML);
    let doc = dom.window.document;

    let trs = Array.from(doc.querySelectorAll("#arc-list tr"));
    trs.shift();

    let board = boardTitleToBoardNameInfo(doc.querySelector(".boardTitle").textContent);

    let result = {
        board,
        threads: trs.map(e => {
            let id = parseInt(e.cells[0].textContent);
            return {
                id,
                teaser: e.cells[1].textContent,
                thread(dataPipe = "") {
                    return getThread(board.name, id, dataPipe);
                }
            }
        })
    };

    trs = 0;
    dom = 0;

    return result;
}

async function getBody(board = "", dataPipe = "") {
    let archiveURL = `https://boards.4channel.org/${board}/archive`;
    let bodyHTML = await got.get(dataPipe + archiveURL, { resolveBodyOnly: true });
    return bodyHTML;
}

/**
 * @param {String} board Board code
 * @param {String} dataPipe DataPipe url
 */
async function getArchive(board = "", dataPipe = "") {
    let bodyHTML = await getBody(board, dataPipe);
    let parsedBody = parseBody(bodyHTML);
    return parsedBody;
}

module.exports = getArchive;
module.exports.getBody = getBody;
module.exports.parseBody = parseBody;
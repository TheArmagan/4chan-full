let { JSDOM } = require("jsdom");
let got = require("got").default;
let { fileTextToSizeInfo, boardTitleToBoardNameInfo } = require("./utils");

function parseBody(siteBodyHTML="") {
    let dom = new JSDOM(siteBodyHTML);
    let document = dom.window.document;

    let result = {
        subject: document.querySelector(".subject").textContent,
        board: boardTitleToBoardNameInfo(document.querySelector(".boardTitle").textContent),
        posts: Array.from(document.querySelectorAll(".postContainer")).map(e => {
            let fileSizeInfo = [];
            if (e.querySelector(".file")) fileSizeInfo = fileTextToSizeInfo(e.querySelector(".fileText").textContent);
            return {
                id: parseInt(e.id.replace(/[^0-9]/g, "")),
                message: e.querySelector(".postMessage") ? e.querySelector(".postMessage").textContent.replace(/(>>\d+)/gm, " [$1] ") : "",
                file: e.querySelector(".file") ? {
                    name: e.querySelector(".fileText a").getAttribute("title") ? e.querySelector(".fileText a").getAttribute("title") : e.querySelector(".fileText a").textContent,
                    url: "https:" + e.querySelector(".fileText a").getAttribute("href"),
                    exists: true,
                    size: fileTextToSizeInfo(e.querySelector(".fileText").textContent)
                } : { exists: false },
                date: parseInt(e.querySelector(".dateTime").getAttribute("data-utc"))
            }
        }),
        isArchived: Boolean(document.querySelector(".closed"))
    };

    dom = 0;

    return result;
}

async function getBody(board="", threadId=0, dataPipe="") {
    let threadURL = `https://boards.4channel.org/${board}/thread/${threadId}`;
    let bodyHTML = await got.get(dataPipe+threadURL, {resolveBodyOnly: true});
    return bodyHTML;
}

async function getThread(board="", threadId=0, dataPipe="") {
    let bodyHTML = await getBody(board, threadId, dataPipe);
    let bodyJSON = parseBody(bodyHTML);
    return bodyJSON;
}

module.exports = getThread;
module.exports.getBody = getBody;
module.exports.parseBody = parseBody


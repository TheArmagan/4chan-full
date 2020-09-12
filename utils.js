let safetyKeyValues = [{
        keys: ["ws", "WORKSAFE", 0],
        value: "ws"
    },
    {
        keys: ["nws", "nsfw", "NOTSAFE", "NOTWORKSAFE", 1],
        value: "nws"
    },
    {
        keys: ["all", "ALL", "COMBINED", 2],
        value: "all"
    }
];

/**
 * @typedef {"ws"|"WORKSAFE"|0|"nws"|"nsfw"|"NOTSAFE"|"NOTWORKSAFE"|1|"all"|"ALL"|"COMBINED"|2} SafetyType
 */


/**
 * @param {SafetyType} type 
 */
function convertSafetyType(type) {
    let based = safetyKeyValues.find(i => i.keys.some(i => i == type));
    if (!based) throw new Error(`Invalid safety type. (Only possible: ${safetyKeyValues.map(i=>i.keys).join(", ")})`);
    return based.value;
}

function boardTitleToBoardNameInfo(boardTitle = "") {
    let boardTitleSplitted = boardTitle.split("-").map(i => i.trim());
    return {
        code: boardTitleSplitted[0].replace(/\//g, ""),
        name: boardTitleSplitted[0]
    };
}

function reverseFormatFileSizeKB(fileSizeText="0 GB") {
    let splitted = fileSizeText.split(" ");
    let factor = NaN;

    switch ((splitted[1] || "").toLowerCase()) {
        case "kb":
            factor = 1;
            break;
        case "mb":
            factor = 1000;
            break
        case "gb":
            factor = 1000000;
            break;
    }

    let sizeInKB = parseFloat(splitted[0]) * factor;

    return sizeInKB;
}

function fileTextToSizeInfo(ft = "") {
    let info = ft.slice(ft.lastIndexOf("(") + 1, ft.lastIndexOf(")")).split(", ");
    let fileSizeInKB = reverseFormatFileSizeKB(info[0]);
    let wh = info[1].split("x").map(i => parseInt(i));
    return {
        size: fileSizeInKB,
        width: wh[0],
        height: wh[1]
    };
}

function fileElementToFileObject(e) {
    if (!e) return { isExists: false };
    let isSpoiler = Boolean(e.querySelector(".imgspoiler"));
    return {
        name: isSpoiler ? e.querySelector(".fileText").getAttribute("title") : (e.querySelector(".fileText a").getAttribute("title") ? e.querySelector(".fileText a").getAttribute("title") : e.querySelector(".fileText a").textContent),
        url: "https:" + e.querySelector(".fileText a").getAttribute("href"),
        isExists: true,
        size: fileTextToSizeInfo(e.querySelector(".fileText").textContent),
        isSpoiler
    }
}

let utils = {
    fileTextToSizeInfo,
    boardTitleToBoardNameInfo,
    convertSafetyType,
    reverseFormatFileSizeKB,
    fileElementToFileObject
}

module.exports = utils;
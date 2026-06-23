
const MENTION_RE = /@\[(\d+):([^\]]+)\]/g;

export function parseMentions(content = "") {
    const mentions = [];
    let match;
    const re = new RegExp(MENTION_RE.source, "g");
    while ((match = re.exec(content)) !== null) {
        mentions.push({ id: Number(match[1]), name: match[2] });
    }
    return mentions;
}

export function buildToken(user) {
    return `@[${user.id}:${user.name}]`;
}


export function toPlainText(content = "") {
    return content.replace(new RegExp(MENTION_RE.source, "g"), "@$2");
}


export function splitForRender(content = "") {
    const parts = [];
    let lastIndex = 0;
    let match;
    const re = new RegExp(MENTION_RE.source, "g");

    while ((match = re.exec(content)) !== null) {
        if (match.index > lastIndex) {
            parts.push(content.slice(lastIndex, match.index));
        }
        parts.push({ id: Number(match[1]), name: match[2] });
        lastIndex = re.lastIndex;
    }

    if (lastIndex < content.length) {
        parts.push(content.slice(lastIndex));
    }

    return parts;
}
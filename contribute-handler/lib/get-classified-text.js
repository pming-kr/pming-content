function getUrl(text) {
  // 마크다운 일 경우
  const markDownURLRegex = /\[([^\[]+)\](\(.*\))/gm;
  const mdMatches = text.match(markDownURLRegex);
  if (mdMatches && mdMatches.length > 0) {
    const singleMatch = /\[([^\[]+)\]\((.*)\)/;
    let res = singleMatch.exec(mdMatches[0]);
    return res[2];
  }

  // 일반 링크일 경우
  const urlRegex = /(https?:\/\/[^\s]+)/g;
  const urlList = text.match(urlRegex);
  if (urlList && urlList.length > 0) {
    let content_url = urlList[0];

    if (content_url.includes("["))
      if (content_url[content_url.length - 1] === ")") {
        content_url = content_url.slice(0, -1);
      }

    return content_url;
  } else {
    return "";
  }
}

function getDescript(text) {
  const splitedText = text.split("TL;DR");
  if (splitedText.length > 0) {
    return splitedText[1];
  } else {
    return "";
  }
}

export default function getClassifiedText(text) {
  return {
    content_url: getUrl(text),
    descript: getDescript(text),
  };
}

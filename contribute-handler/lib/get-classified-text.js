function getUrl(text) {
  const urlRegex = /(https?:\/\/[^\s]+)/g;
  const urlList = text.match(urlRegex);
  if (urlList.length > 0) {
    let content_url = urlList[0];
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

function getUrl(text) {
  const urlRegex = /(https?:\/\/[^\s]+)/g;
  const urlList = text.match(urlRegex);
  if (urlList.length > 0) {
    return urlList[0];
  } else {
    return null;
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

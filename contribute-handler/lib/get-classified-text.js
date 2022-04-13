function getUrl(text) {
  const urlRegex = /(https?:\/\/[^\s]+)/g;
  return text.match(urlRegex)[0];
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
    url: getUrl(text),
    descript: getDescript(text),
  };
}

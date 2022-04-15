import og from "open-graph";

function extractOpengraph(url) {
  return new Promise((resolve, reject) => {
    og(url, (err, meta) => {
      resolve(meta);
    });
  });
}

function convertValidUrl(url) {
  if (url.includes("http://")) {
    return `http://${url.split("http://")[1]}`;
  } else if (url.includes("https://")) {
    return `http://${url.split("https://")[1]}`;
  } else {
    return `http://${url}`;
  }
}

function buildThumbnail(url) {
  if (typeof url === "string") {
    return convertValidUrl(url);
  } else if (Array.isArray(url)) {
    return convertValidUrl(url[0]);
  } else {
    return "https://repository-images.githubusercontent.com/478819701/96595a41-1f34-47c7-a35f-915c014525da";
  }
}

export default async function getOpengraph(url) {
  if (!url) {
    return {
      url: url,
      thumbnail_url:
        "https://user-images.githubusercontent.com/46296754/163114733-f29bea0a-3b19-4922-b02d-be22132b9df4.png",
      url_descript: "\b",
    };
  }
  const res = await extractOpengraph(url);
  const thumbnail_url = buildThumbnail(res.image.url);
  return {
    url: url,
    title: res.title,
    thumbnail_url: thumbnail_url,
    url_descript: res.description,
  };
}

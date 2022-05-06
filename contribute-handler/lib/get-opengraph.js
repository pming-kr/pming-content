import og from "open-graph";

function extractOpengraph(url) {
  return new Promise((resolve, reject) => {
    og(encodeURI(url), (err, meta) => {
      if (err) {
        reject(err);
      }
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

function buildThumbnail(image) {
  const default_image =
    "https://repository-images.githubusercontent.com/478819701/96595a41-1f34-47c7-a35f-915c014525da";
  if (!image) {
    return default_image;
  }

  const url = image.url;
  if (typeof url === "string") {
    return convertValidUrl(url);
  } else if (Array.isArray(url)) {
    return convertValidUrl(url[0]);
  } else {
    return default_image;
  }
}

export default async function getOpengraph(url) {
  if (!url) {
    return {
      url: url,
      thumbnail_url:
        "https://repository-images.githubusercontent.com/478819701/96595a41-1f34-47c7-a35f-915c014525da",
      url_descript: "\b",
    };
  }
  const res = await extractOpengraph(url)
    .then((res) => res)
    .catch(() => "ERR");
  if (res === "ERR") {
    return {
      url: url,
      thumbnail_url:
        "https://repository-images.githubusercontent.com/478819701/96595a41-1f34-47c7-a35f-915c014525da",
      url_descript: "\b",
    };
  }

  const thumbnail_url = buildThumbnail(res.image);
  return {
    url: url,
    title: res.title,
    thumbnail_url: thumbnail_url,
    url_descript: res.description,
  };
}

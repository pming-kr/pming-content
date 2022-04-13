import og from "open-graph";

function extractOpengraph(url) {
  return new Promise((resolve, reject) => {
    og(url, (err, meta) => {
      resolve(meta);
    });
  });
}

export default async function getOpengraph(url) {
  const res = await extractOpengraph(url);
  return {
    url: url,
    title: res.title,
    thumbnail_url: res.image.url,
    descript: res.description,
  };
}

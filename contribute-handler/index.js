import getDiscussionData from "./lib/get-discussion-data.js";
import getOpengraph from "./lib/get-opengraph.js";
import dotenv from "dotenv";
dotenv.config();

async function run() {
  const discussion = getDiscussionData();
  console.log(discussion);

  //   const url = "https://www.youtube.com/watch?v=9hrL_RyrrZs";
  //   const res = await getOpengraph(url);
  //   console.log(res);
}

run();

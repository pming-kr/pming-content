import getDiscussionData from "./lib/get-discussion-data.js";
import getOpengraph from "./lib/get-opengraph.js";
import getClassifiedText from "./lib/get-classified-text.js";
import postSlack from "./lib/post-slack.js";
import dotenv from "dotenv";
dotenv.config();

async function run() {
  console.log("🌱 1. get discussion data");
  const discussionData = getDiscussionData();
  console.log(JSON.stringify(discussionData, null, 2), +"\n\n");

  console.log("🌱 2. classifiy contennt data");
  const contentData = getClassifiedText(discussionData.body);
  console.log(JSON.stringify(contentData, null, 2), +"\n\n");

  console.log("🌱 3. get opengraph data by url");
  const ogData = await getOpengraph(contentData.content_url);
  console.log(JSON.stringify(ogData, null, 2), +"\n\n");

  console.log("🌱 4. post slack");
  const res = await postSlack(discussionData, contentData, ogData);
  console.log(JSON.stringify(res, null, 2), +"\n\n");
}

run();

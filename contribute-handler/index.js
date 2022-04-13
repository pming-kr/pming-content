import getDiscussionData from "./lib/get-discussion-data.js";
import getOpengraph from "./lib/get-opengraph.js";
import getClassifiedText from "./lib/get-classified-text.js";
import postSlack from "./lib/post-slack.js";
import dotenv from "dotenv";
dotenv.config();

async function run() {
  console.log("🌱 1. get discussion data");
  const discussionData = getDiscussionData();
  console.log(discussionData + "\n\n");

  console.log("🌱 2. classifiy contennt data");
  const contentData = getClassifiedText(discussionData.body);
  console.log(contentData + "\n\n");

  console.log("🌱 3. get opengraph data by url");
  const ogData = await getOpengraph(contentData.content_url);
  console.log(ogData + "\n\n");

  console.log("🌱 4. post slack");
  const res = await postSlack(discussionData, contentData, ogData);
  console.log(res + "\n\n");
}

run();

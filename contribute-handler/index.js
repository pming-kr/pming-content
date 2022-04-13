import getDiscussionData from "./lib/get-discussion-data.js";
import getOpengraph from "./lib/get-opengraph.js";
import getClassifiedText from "./lib/get-classified-text.js";
import postSlack from "./lib/post-slack.js";
import dotenv from "dotenv";
dotenv.config();

async function run() {
  const discussionData = getDiscussionData();
  const contentData = getClassifiedText(discussionData.body);

  const ogData = await getOpengraph(contentData.content_url);
  const res = await postSlack(discussionData, contentData, ogData);
  console.log(res);
}

run();

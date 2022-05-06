import getDiscussionData from "./lib/get-discussion-data.js";
import getClassifiedText from "./lib/get-classified-text.js";
import getOpengraph from "./lib/get-opengraph.js";
import postSlack from "./lib/post-slack.js";
import postTweet from "./lib/post-tweet.js";
import dotenv from "dotenv";
import postSlackForZapier from "./lib/post-slack-for-zapier.js";
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

  console.log("🌱 4. post community channels");
  const [slack_res, tweet_res, slack_zapier_res] = await Promise.allSettled([
    postSlack(discussionData, contentData, ogData),
    postTweet(discussionData, contentData),
    postSlackForZapier(discussionData, contentData),
  ]);

  console.log(
    JSON.stringify({ channel: "slack", result: slack_res }, null, 2),
    +"\n\n"
  );
  console.log(
    JSON.stringify({ channel: "twitter", result: tweet_res }, null, 2),
    +"\n\n"
  );
  console.log(
    JSON.stringify(
      { channel: "slack_zapier", result: slack_zapier_res },
      null,
      2
    ),
    +"\n\n"
  );
}

run();

import getDiscussionByPeriod from "./lib/get-discussion-by-period.js";
import dotenv from "dotenv";
import postSlack from "./post/post-slack.js";
import moment from "moment-timezone";
dotenv.config();

async function getDailyContent() {
  const dailyDiscussion = await getDiscussionByPeriod("daily");
  dailyDiscussion.sort((a, b) => {
    a.upvoteCount - b.upvoteCount;
  });
  return dailyDiscussion.slice(0, 5);
}

async function run() {
  const dailyContent = await getDailyContent();
  if (dailyContent.length < 1) {
    return;
  }
  const curMoment = moment.tz("Asia/Seoul").format("MM/DD (ddd) dddd");
  const AGGREGATE_SLACK_WEBHOOK_URL = process.env.AGGREGATE_SLACK_WEBHOOK_URL;
  await postSlack(
    `🌱 데일리 컨텐츠 - ${curMoment}`,
    dailyContent,
    AGGREGATE_SLACK_WEBHOOK_URL
  );
}

run();

import getDiscussionByPeriod from "./lib/get-discussion-by-period.js";
import dotenv from "dotenv";
import postSlack from "./post/post-slack.js";
import moment from "moment-timezone";
dotenv.config();

async function getWeeklyContent() {
  const weeklyDiscussion = await getDiscussionByPeriod("weekly");
  const weeklyTopDiscussion = weeklyDiscussion.filter(
    (it) => it.upvoteCount >= 1
  );
  weeklyTopDiscussion.sort((a, b) => {
    a.upvoteCount - b.upvoteCount;
  });
  return weeklyTopDiscussion.slice(0, 5);
}

async function run() {
  const weeklyContent = await getWeeklyContent();
  if (weeklyContent.length < 1) {
    return;
  }

  const curMoment = moment.tz("Asia/Seoul").format("MM/DD (ddd) dddd");
  const AGGREGATE_SLACK_WEBHOOK_URL = process.env.AGGREGATE_SLACK_WEBHOOK_URL;
  await postSlack(
    `🌳 위클리 컨텐츠 - ${curMoment}`,
    weeklyContent,
    AGGREGATE_SLACK_WEBHOOK_URL
  );
}

run();

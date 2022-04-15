import getDiscussionByPeriod from "./lib/get-discussion-by-period.js";
import updateTopDiscussion from "./lib/update-top-discussion.js";
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
    if (b.upvoteCount > a.upvoteCount) {
      return 1;
    } else if (b.upvoteCount < a.upvoteCount) {
      return -1;
    } else {
      return 0;
    }
  });
  return weeklyTopDiscussion.slice(0, 5);
}

async function run() {
  const weeklyContent = await getWeeklyContent();
  if (weeklyContent.length < 1) {
    return;
  }

  const curMoment = moment.tz("Asia/Seoul").format("MM/DD (ddd) dddd");

  const AGGREGATE_SLACK_WEBHOOK_URL =
    process.env.OPS_ENV === "local"
      ? process.env.TEST_AGGREGATE_SLACK_WEBHOOK_URL
      : process.env.AGGREGATE_SLACK_WEBHOOK_URL;

  const total_res = Promise.allSettled([
    postSlack(
      `🌳 위클리 컨텐츠 - ${curMoment}`,
      weeklyContent,
      AGGREGATE_SLACK_WEBHOOK_URL
    ),
    updateTopDiscussion(weeklyContent, "weekly", curMoment),
  ])
    .then((res) => console.log(res))
    .catch((err) => console.log(err));

  console.log(total_res);
  return total_res;
}

run();

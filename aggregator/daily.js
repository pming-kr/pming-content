import getDiscussionByPeriod from "./lib/get-discussion-by-period.js";
import updateTopDiscussion from "./lib/update-top-discussion.js";
import dotenv from "dotenv";
import postSlack from "./post/post-slack.js";
import moment from "moment-timezone";
dotenv.config();

async function getDailyContent() {
  const dailyDiscussion = await getDiscussionByPeriod("daily");
  dailyDiscussion.sort((a, b) => {
    if (b.upvoteCount > a.upvoteCount) {
      return 1;
    } else if (b.upvoteCount < a.upvoteCount) {
      return -1;
    } else {
      return 0;
    }
  });
  return dailyDiscussion.slice(0, 5);
}

async function run() {
  const dailyContent = await getDailyContent();
  if (dailyContent.length < 1) {
    return;
  }

  const curMoment = moment.tz("Asia/Seoul").format("MM/DD (ddd) dddd");

  const AGGREGATE_SLACK_WEBHOOK_URL =
    process.env.OPS_ENV === "local"
      ? process.env.TEST_AGGREGATE_SLACK_WEBHOOK_URL
      : process.env.AGGREGATE_SLACK_WEBHOOK_URL;

  const total_res = Promise.allSettled([
    postSlack(
      `🌱 데일리 컨텐츠 - ${curMoment}`,
      dailyContent,
      AGGREGATE_SLACK_WEBHOOK_URL
    ),
    updateTopDiscussion(dailyContent, "daily", curMoment),
  ])
    .then((res) => console.log(res))
    .catch((err) => console.log(err));

  console.log(total_res);
  return total_res;
}

run();

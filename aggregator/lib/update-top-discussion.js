import fetchOneDiscussion from "./../fetcher/fetch-one-discussion.js";
import postTopDiscussion from "./../post/post-top-discussion.js";

const TARGET_DISCUSSION_ID = "D_kwDOHIo1dc4APOrU";

export default async function run(contentList, period, curMoment) {
  const topContentDiscussion = await fetchOneDiscussion(TARGET_DISCUSSION_ID);
  const topDisucssionNode = topContentDiscussion.data.data.node;

  const splitedBody = topDisucssionNode.body.split("&nbsp;");
  const commonBody = splitedBody[0];
  const dailyBody = splitedBody[1];
  const weeklyBody = splitedBody[2];

  // build common body
  const newCommonBody = `> 마지막 업데이트 : ${curMoment}\nDaily는 매일 오전 8시 ~ 10시\nWeekly는 매주 월요일 오전 8시 ~ 10시에 업데이트 됩니다\n[Top 컨텐츠는 어떻게 선정되나요?](https://github.com/pming-kr/pming-content/discussions/27)`;

  // build contents
  const newContentList = contentList
    .map(
      (it, idx) =>
        `| ${idx + 1}등 | ${it.upvoteCount} |  <img src='${
          it.thumbnail_url
        }' width='120px' height='70px' />  | [${it.title}](${
          it.url
        })<br/> ${new Date(
          it.createdAt
        ).toLocaleDateString()} 작성 |  <img src='${
          it.author.avatarUrl
        }' width='30px' /><br/> @${it.author.login} |`
    )
    .join("\n");

  let newBody = ``;
  const commonTableHead = `| Rank | 👍 | Thumbnail | Title | Contributor |\n|--|--|--|--|--|`;
  if (period === "daily") {
    let newDailyBody = `## 🌱 Daily Content\n${commonTableHead}\n${newContentList}<br/><br/>`;
    newBody = [newCommonBody, newDailyBody, weeklyBody].join("&nbsp;\n");
  } else {
    let newWeeklyBody = `## 🌳 Weekly Content\n${commonTableHead}\n${newContentList}<br/><br/>`;
    newBody = [newCommonBody, dailyBody, newWeeklyBody].join("&nbsp;\n");
  }

  const res = await postTopDiscussion(
    TARGET_DISCUSSION_ID,
    newBody,
    `TOP 컨텐츠 - ${curMoment}`
  );
}

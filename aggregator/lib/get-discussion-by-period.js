import fetchAllDiscussion from "../fetcher/fetch-all-discussion.js";
import getClassifiedText from "./get-classified-text.js";
import getOpengraph from "./get-opengraph.js";

export default async function getDiscussionByPeriod(period) {
  const res = await fetchAllDiscussion();
  const discussionList = res.data.data.repository.discussions.edges.map(
    (it) => it.node
  );
  const periodDate = period === "daily" ? 2 : period === "week" ? 7 : 21;

  const filteredDiscussionList = discussionList.reduce((acc, it) => {
    const createDate = new Date(it.createdAt);
    const nowDate = new Date();
    const diff =
      (nowDate.getTime() - createDate.getTime()) / (1000 * 60 * 60 * 24);

    const { content_url, descript } = getClassifiedText(it.body);

    if (diff.toFixed() <= periodDate) {
      acc.push({
        ...it,
        content_url,
        descript,
        dateDiff: diff.toFixed(),
      });
    }
    return acc;
  }, []);

  const result = await Promise.all(
    filteredDiscussionList.map(async (it) => {
      const { url, title, thumbnail_url } = await getOpengraph(it.content_url);
      return {
        ...it,
        thumbnail_url,
      };
    })
  );
  return result;
}

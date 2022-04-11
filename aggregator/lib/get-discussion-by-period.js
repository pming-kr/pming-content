import fetchDiscussion from "./../fetcher/fetch-discussion.js";

export default async function getDiscussionByPeriod(period) {
  const res = await fetchDiscussion();
  const discussionList = res.data.data.repository.discussions.edges.map(
    (it) => it.node
  );
  const periodDate = period === "daily" ? 1 : period === "week" ? 7 : 31;

  return discussionList.reduce((acc, it) => {
    const createDate = new Date(it.createdAt);
    const nowDate = new Date();
    const diff =
      (nowDate.getTime() - createDate.getTime()) / (1000 * 60 * 60 * 24);

    if (diff.toFixed() <= periodDate) {
      acc.push({
        ...it,
        dateDiff: diff.toFixed(),
      });
    }
    return acc;
  }, []);
}

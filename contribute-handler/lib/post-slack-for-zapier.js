import axios from "axios";

export default async function postSlackForZapier(discussionData, contentData) {
  const SLACK_WEBHOOK_URL = process.env.JAPIER_ALARM_WEBHOOK_URL;

  const { id, number, title, user } = discussionData;
  const { descript } = contentData;

  const pming_url = `https://www.pming.kr/c/${id}?utm_source=fb_pming`;

  try {
    const postDescript =
      `[ 요약 ]` +
      descript
        .replaceAll("#", "")
        .replaceAll("TL;DR", "\nTL;DR\n")
        .replaceAll("RECOMMEND", "\n[ 추천 대상 ]\n")
        .replaceAll("EARN", "\n[ 느낀점 ]\n");

    const data = {
      text: `${number}번째 '핸드픽'\n${title}\n\n${pming_url}\n\n${postDescript}\n\n[ 핸드 피커 ]\n${user.url}`,
    };
    const res = await axios
      .post(SLACK_WEBHOOK_URL, data)
      .then((res) => res.data)
      .catch((err) => err);
    return res;
  } catch (err) {
    return err;
  }
}

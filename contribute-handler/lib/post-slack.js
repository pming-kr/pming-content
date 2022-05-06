import axios from "axios";

export default async function postSlack(
  discussionData,
  contentData,
  openGraphData
) {
  const SLACK_WEBHOOK_URL =
    process.env.OPS_ENV === "local"
      ? process.env.TEST_SLACK_WEBHOOK_URL
      : process.env.SLACK_WEBHOOK_URL;
  const { id, number, category_name, url, title, created_at, user } =
    discussionData;
  const { content_url, descript } = contentData;
  const { thumbnail_url, url_descript } = openGraphData;

  const pming_url = `https://pming.kr/c/${id}?utm_source=slack_pming`;

  const data = {
    blocks: [
      {
        type: "divider",
      },
      {
        type: "header",
        text: {
          type: "plain_text",
          text: `#${number} ${title}`,
          emoji: true,
        },
      },
      {
        type: "context",
        elements: [
          {
            type: "image",
            image_url: user.avatar_url,
            alt_text: "Contributor",
          },
          {
            type: "mrkdwn",
            text: `<${user.url}|${user.name}> 기고`,
          },
          {
            type: "mrkdwn",
            text: new Date(created_at).toLocaleDateString(),
          },
        ],
      },
      {
        type: "section",
        text: {
          type: "mrkdwn",
          text:
            descript.replaceAll("\\n", "").replaceAll("\n", "").slice(0, 100) +
            "...",
        },
        accessory: {
          type: "image",
          image_url: thumbnail_url,
          alt_text: "content thumbnail",
        },
      },
      {
        type: "actions",
        elements: [
          {
            type: "button",
            style: "primary",
            text: {
              type: "plain_text",
              text: "컨텐츠 보러가기",
              emoji: true,
            },
            value: "click_me_123",
            url: pming_url,
            action_id: "actionId-0",
          },
          {
            type: "button",
            text: {
              type: "plain_text",
              text: "기고자 GitHub",
              emoji: true,
            },
            value: "click_me_123",
            url: user.url,
            action_id: "actionId-1",
          },
        ],
      },
      {
        type: "context",
        elements: [
          {
            type: "mrkdwn",
            text: "⭐️ 커뮤니티의 발전을 위해 요약이나 추천을 남겨주세요",
          },
        ],
      },
      {
        type: "divider",
      },
    ],
  };

  const res = await axios
    .post(SLACK_WEBHOOK_URL, data)
    .then((res) => res.data)
    .catch((err) => console.log(err));

  return res;
}

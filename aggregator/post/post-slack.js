import axios from "axios";

export default async function postSlack(headerText, contentList, webhook_url) {
  const contentBlockList = contentList.map((it, idx) => {
    return [
      {
        type: "section",
        text: {
          type: "mrkdwn",
          text: `*<${it.url}|[${idx + 1}등] ${it.title}>*`,
        },
        accessory: {
          type: "button",
          style: "primary",
          text: {
            type: "plain_text",
            text: "보러가기",
            emoji: true,
          },
          value: "click_me_123",
          url: `${it.url}`,
          action_id: "button-action",
        },
      },
      {
        type: "context",
        elements: [
          {
            type: "mrkdwn",
            text: `${it.upvoteCount}개의 좋아요`,
          },
          {
            type: "mrkdwn",
            text: `${new Date(it.createdAt).toLocaleDateString()} 작성`,
          },
        ],
      },
      {
        type: "context",
        elements: [
          {
            type: "image",
            image_url: it.author.avatarUrl,
            alt_text: "Contributor",
          },
          {
            type: "mrkdwn",
            text: `<${it.author.url}|${it.author.login}>`,
          },
        ],
      },
      {
        type: "divider",
      },
    ];
  });

  const data = {
    blocks: [
      {
        type: "header",
        text: {
          type: "plain_text",
          text: headerText,
          emoji: true,
        },
      },
      {
        type: "divider",
      },
      ...contentBlockList.flat(2),
      {
        type: "section",
        text: {
          type: "mrkdwn",
          text: `*<https://github.com/pming-kr/pming-content/discussions|누구나 기고할 수 있습니다 - 깃허브 계정으로 기고하기>*`,
        },
      },
    ],
  };
  const res = await axios
    .post(webhook_url, data)
    .then((res) => res.data)
    .catch((err) => console.log(err));

  return res;
}

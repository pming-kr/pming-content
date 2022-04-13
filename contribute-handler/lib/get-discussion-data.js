export default function getDiscussionData() {
  return {
    number: process.env.DISCUSSION_NUMBER,
    category_name: process.env.DISCUSSION_CATEGORY_NAME,
    url: process.env.DISCUSSION_URL,
    title: process.env.DISCUSSION_TITLE,
    body: process.env.DISCUSSION_BODY,
    created_at: process.env.DISCUSSION_CREATED_AT,
    user: {
      url: process.env.DISCUSSION_USER_URL,
      name: process.env.DISCUSSION_USER_NAME,
      avatar_url: process.env.DISCUSSION_USER_AVATAR_URL,
    },
  };
}

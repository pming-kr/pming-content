import Twitter from "twitter";

export default async function postTweet(discussionData) {
  const { id, number, category_name, url, title, created_at, user } =
    discussionData;

  const text = `
  #개발자 #개발컨텐츠 #프로그래머

  ${number}번째 기고

  ${title}

  https://pming.kr/c/${id}
`;

  const client = new Twitter({
    consumer_key: process.env.TWITTER_CONSUMER_API_KEY,
    consumer_secret: process.env.TWITTER_CONSUMER_API_KEY_SECRET,
    access_token_key: process.env.TWITTER_PMING_ACCESS_TOKEN,
    access_token_secret: process.env.TWITTER_PMING_ACCESS_TOKEN_SECRET,
  });

  return new Promise((resovle, reject) =>
    client.post(
      "statuses/update",
      {
        status: text,
      },
      function (error, tweet) {
        if (!error) {
          console.log("🟢 TWEET SUCCESS");
          console.log(`https://twitter.com/pming_kr/status/${tweet.id}`);
          resovle();
        } else {
          console.log("🔴 TWEET FAIL");
          console.log(error);
          reject();
        }
      }
    )
  );
}

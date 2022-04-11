import axios from "axios";

function buildBody() {
  return `#graphql
    query {
      repository(owner: "pming-kr", name: "pming-content") {
        discussionCategories(first:10){
          nodes{
            id
            name
          }
        }
      }
    }
  `;
}

export default async function run() {
  const access_token = process.env.GH_ACCESS_TOKEN;
  const data = buildBody();
  const res = await axios({
    url: "https://api.github.com/graphql",
    method: "post",
    headers: {
      Authorization: `token ${access_token}`,
    },
    data: {
      query: data,
    },
  });
  return res;
}

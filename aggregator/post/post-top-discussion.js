import axios from "axios";

function buildBody(discussion_id, body, title) {
  return `#graphql
    mutation {
        updateDiscussion(input:{discussionId:"${discussion_id}", body:"${body}", title:"${title}", categoryId:"DIC_kwDOHIo1dc4COdC0", clientMutationId:"winterlood" }){
            discussion{
                id
            }
        }
    }
  `;
}

export default async function run(discussion_id, body, title) {
  const access_token = process.env.GH_ACCESS_TOKEN;
  const data = buildBody(discussion_id, body, title);
  const res = await axios({
    url: "https://api.github.com/graphql",
    method: "post",
    headers: {
      Authorization: access_token ? `token ${access_token}` : null,
    },
    data: {
      query: data,
    },
  });
  return res;
}

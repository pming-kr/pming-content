import axios from "axios";

const DiscussionFragment = `#graphql
fragment DiscussionFragment on Discussion{
  id
  title
  url
  upvoteCount
  author {
    login
    avatarUrl
    url
  }
  body
  category {
    id
    name
  }
  createdAt
  reactions {
    totalCount
  }
}
`;

function buildBody(discussion_id) {
  return `#graphql
    ${DiscussionFragment}
    query {
      node(id:"${discussion_id}") {
        ...DiscussionFragment
      }
    }
  `;
}

export default async function run(discussion_id) {
  const access_token = process.env.GH_ACCESS_TOKEN;
  const data = buildBody(discussion_id);
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

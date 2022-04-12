import axios from "axios";

const PageInfo = `#graphql
fragment PageInfo on PageInfo{
  startCursor
  endCursor
  hasNextPage
  hasPreviousPage
}
`;

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

function buildBody() {
  return `#graphql
    ${PageInfo}
    ${DiscussionFragment}
    query {
      repository(owner: "pming-kr", name: "pming-content") {
        discussions (first:100, categoryId:"DIC_kwDOHIo1dc4COdC1", orderBy: {field: UPDATED_AT, direction: DESC} ) {
          totalCount
          pageInfo {
            ...PageInfo
          }
          edges {
            cursor
            node {
              ...DiscussionFragment
            }
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
      Authorization: access_token ? `token ${access_token}` : null,
    },
    data: {
      query: data,
    },
  });
  return res;
}

// src/routes/blog/[uri]/+page.server.js
import { error } from "@sveltejs/kit";

export async function load({ params }) {
  const GRAPHQL_ENDPOINT = import.meta.env.VITE_GRAPHQL_ENDPOINT;

  async function fetchGraphQL(query, variables = {}) {
    const response = await fetch(GRAPHQL_ENDPOINT, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({ query, variables }),
    });

    if (!response.ok) {
      throw new Error(`Network error: ${response.statusText}`);
    }

    return response.json();
  }

  const GET_POST_BY_URI_QUERY = `
    query GetPostByUri($uri: ID!) {
      post(id: $uri, idType: URI) {
        title
        content
        date
      }
    }
  `;

  const { data, errors } = await fetchGraphQL(GET_POST_BY_URI_QUERY, {
    uri: params.uri,
  });

  if (errors) {
    console.error("Errors returned from GraphQL:", errors);
    throw error(500, "Error fetching post.");
  }

  if (!data || !data.post) {
    console.error("No post found for URI:", params.uri);
    throw error(404, "Not found");
  }
  // Inside your load function in +page.server.js
  console.log("Post object:", data.post);
  return {
    props: {
      post: data.post,
    },
  };
}

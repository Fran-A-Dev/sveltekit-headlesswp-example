<script>
  import { onMount } from 'svelte';
  
  let posts = [];
  let loading = true;

  async function fetchGraphQL(query = {}) {
    const queryParams = new URLSearchParams({ query }).toString();
    const response = await fetch(`${import.meta.env.VITE_GRAPHQL_ENDPOINT}?${queryParams}`, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`Network error: ${response.statusText}`);
    }
    return response.json();
  }

  const GET_POSTS_QUERY = `
    query GetPosts {
      posts(first: 5) {
        nodes {
          id
          title
          slug
          uri
          date
        }
      }
    }
  `;

  onMount(async () => {
    try {
      const { data, errors } = await fetchGraphQL(GET_POSTS_QUERY);
      if (errors) {
        console.error('Errors returned from server:', errors);
      } else {
        posts = data.posts.nodes;
      }
    } catch (error) {
      console.error('An error occurred:', error);
    } finally {
      loading = false;
    }
  });
</script>

{#if loading}
  <div class="flex justify-center items-center min-h-screen">
    <p>Loading...</p>
  </div>
{:else}
  <div class="bg-custom-dark min-h-screen text-hot-pink p-8">
    <h1 class="text-4xl mb-8 font-bold text-center">Fran's Headless WP with SvelteKit Blog Example</h1>
    <ul class="space-y-4">
      {#each posts as post}
        <li class="text-center">
          <a href={`/blog${post.uri}`} class="text-2xl hover:text-pink-600">{post.title}</a>
          {#if post.date}
            <p class="text-gray-500 text-sm">{new Date(post.date).toLocaleDateString()}</p>
          {:else}
            <p class="text-gray-500 text-sm">No date available</p>
          {/if}
        </li>
      {/each}
    </ul>
  </div>
{/if}

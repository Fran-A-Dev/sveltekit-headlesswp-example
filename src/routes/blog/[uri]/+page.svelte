
<script>
  export let post;
</script>

{#if post}
  <article>
    <h1>{post.title}</h1>
    {#if post.date}
      <p>{new Date(post.date).toLocaleDateString()}</p>
    {/if}
    <div>{@html post.content}</div>
  </article>
{:else}
  <p>Loading post...</p>
{/if}

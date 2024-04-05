
<script>
  export let data;
</script>

{#if data.post}
  <article class="bg-custom-dark min-h-screen text-hot-pink px-4 lg:px-8 text-center flex flex-col items-center justify-center">
    <div class="max-w-prose">
      <h1 class="text-4xl mb-4 font-bold">{data.post.title}</h1>
      {#if data.post.date}
        <p class="mb-8">{new Date(data.post.date).toLocaleDateString()}</p>
      {/if}
      <div class="prose prose-pink">{@html data.post.content}</div>
    </div>
  </article>
{:else}
  <p>Loading post...</p>
{/if}


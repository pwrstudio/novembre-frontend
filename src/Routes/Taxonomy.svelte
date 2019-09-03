<script>
  import Preview from "../Components/Preview.svelte";

  export let tag;

  let fetchedPosts = [];
  let activePosts = [];

  let count = 0;
  let index = 0;

  function counter() {
    if (count >= 5) {
      index += 1;
      loadData(index);
      count = 0;
    } else {
      count += 1;
    }
  }

  function loadData(index) {
    fetch("http://3.221.158.133/filter.json/tag:" + tag)
      .then(r => r.json())
      .then(arr => {
        fetchedPosts = [...fetchedPosts, ...arr];
      });
  }

  loadData(index);
</script>

<style lang="scss">
  @import "../variables.scss";

  .landing {
    width: 100%;
    // background: red;
    margin-top: 80px;
  }
</style>

TAXONOMY TAXONOMY TAXONOMY TAXONOMY TAXONOMY
<svelte:head>
  <title>NOVEMBRE</title>
</svelte:head>

<div class="landing">
  {#each fetchedPosts as post}
    <Preview {post} on:active={counter} />
  {/each}
</div>

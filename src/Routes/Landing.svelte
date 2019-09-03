<script>
  import Preview from "../Components/Preview.svelte";

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
    fetch("http://3.221.158.133/landing.json/index:" + index)
      .then(r => r.json())
      .then(arr => {
        console.log(fetchedPosts);
        fetchedPosts = [...fetchedPosts, ...arr.posts];
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

<svelte:head>
  <title>NOVEMBRE</title>
</svelte:head>

<div class="landing">
  {#each fetchedPosts as post}
    <Preview {post} on:active={counter} />
  {/each}
</div>

<script>
  import Preview from "../Components/Preview.svelte";
  import ScrollList from "../Components/ScrollList.svelte";
  import Footer from "../Components/Footer.svelte";

  let fetchedPosts = [];
  let activePosts = [];
  let taxlist = [];

  let count = 0;
  let index = 0;

  let loadedTax = false;

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
    fetch("http://3.221.158.133/magazine.json/index:" + index)
      .then(r => r.json())
      .then(arr => {
        fetchedPosts = [...fetchedPosts, ...arr.posts];
        taxlist = arr.taxlist;
        // console.log(taxlist);
        loadedTax = true;
      });
  }

  loadData(index);
</script>

<style lang="scss">
  @import "../variables.scss";

  .magazine {
    width: 100%;
    // background: red;
    margin-top: 80px;
  }
</style>

<svelte:head>
  <title>MAGAZINE | NOVEMBRE</title>
</svelte:head>

<div class="magazine">
  {#if loadedTax}
    <ScrollList taxname="magazine" {taxlist} />
  {/if}
  {#each fetchedPosts as post}
    <Preview {post} on:active={counter} />
  {/each}
</div>

<Footer />

<script>
  import Preview from "../Components/Preview.svelte";
  import VirtualList from "@sveltejs/svelte-virtual-list";
  import ScrollList from "../Components/ScrollList.svelte";
  import Footer from "../Components/Footer.svelte";

  let fetchedPosts = [];

  let count = 0;
  let index = 0;
  let items = [];
  let taxlist = [];
  let loadedTax = false;


  export let title;
  export let endpoint;
  export let showTaxonomyScroller;
  export let showFooter = true;
  export let isQuery = false;

  console.log('in linsting')

  console.log(title)
  console.log(endpoint)

  function counter() {
    if (count >= 5) {
      index += 1;
      loadData(index);
      count = 0;
    } else {
      count += 1;
    }
  }

  // const items = [1, 3, 4, 5, 6, 7, 3, 5];

  function loadData(index) {
    fetch(endpoint + "/index:" + index)
      .then(r => r.json())
      .then(arr => {
        console.log("load data");
        // fetchedPosts = [...fetchedPosts, ...arr.posts];
        items= [...items, ...arr.posts];
        taxlist = arr.taxlist;
        loadedTax = true
        console.log(items);
      });
  }

  loadData(index);

  // let start;
  // let end;
</script>

<style lang="scss">
  @import "../variables.scss";

  .listing {
    width: 100%;
    margin-top: 80px;
    // height: calc(100vh - 80px);
    // background: red;
  }
</style>

<svelte:head>
  <!-- <title>{start}-{end} of {items.length}</title> -->
  <title>NOVEMBRE | {title}</title>
</svelte:head>

<!-- <div class="landing">
  <VirtualList {items} bind:start bind:end let:item>
    <Preview post={item} on:active={counter} />
  </VirtualList>
</div> -->

<div class="listing">

  {#if showTaxonomyScroller && loadedTax}
    <ScrollList taxname="entertainment" {taxlist} />
  {/if}

  {#each items as post}
    <Preview {post} on:active={counter} />
  {/each}

</div>

{#if showFooter}
  <Footer />
{/if}


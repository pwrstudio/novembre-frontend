<script>
  import Preview from "../Components/Preview.svelte";
  import ScrollList from "../Components/ScrollList.svelte";
  import Footer from "../Components/Footer.svelte";
  import { onMount } from "svelte";
  import { fade } from "svelte/transition";

  let fetchedPosts = [];

  let count = 0;
  let index = 0;
  let items = [];
  let taxlist = [];
  let loadedTax = false;
  let firstLoad = false;
  let url = "";
  let loadTrigger;
  let meta = {};
  let finishedLoading = false;

  export let title = "";
  export let endpoint = "";
  export let showTaxonomyScroller = false;
  export let showFooter = true;
  export let isQuery = false;
  export let query = false;

  let currentQuery = query;

  const observer = new IntersectionObserver(
    entries => {
      console.log("LOAD TRIGGERD");
      entries.forEach(entry => {
        if (entry.intersectionRatio > 0 && firstLoad) {
          // dispatch("active");
          console.log(entry.intersectionRatio);
          console.log(meta.nextindex);
          console.log(meta.lastindex);
          if (meta.nextindex < meta.lastindex) {
            loadData(meta.nextindex);
          } else {
            observer.disconnect();
            finishedLoading = true;
            console.log("FFFinished");
          }
        } else {
          console.log("case 2");
        }
      });
    },
    { treshhold: 0.5 }
  );

  // Listen for changes to query
  $: {
    if (query !== currentQuery) {
      items = [];
      firstLoad = false;
      currentQuery = query;
      loadData(1);
    }
  }

  function loadData(index) {
    if (isQuery) {
      url = endpoint + query;
    } else {
      url = endpoint + "/index:" + index;
    }
    fetch(url)
      .then(r => r.json())
      .then(arr => {
        // console.dir(arr);
        items = [...items, ...arr.posts];
        meta = arr.meta;
        taxlist = arr.taxlist;
        firstLoad = true;
        // console.log(items);
      });
  }

  loadData(index);

  onMount(async () => {
    window.scrollTo(0, 0);
    console.log("list mount");
    observer.observe(loadTrigger);
  });
</script>

<style lang="scss">
  @import "../variables.scss";

  .load-trigger {
    width: 100%;
    height: 10px;
    background: transparent;
  }

  .listing {
    width: 100%;
    min-height: 200vh;
    margin-top: 80px;
    // background: red;
  }

  .top-block {
    font-family: $sans-stack;
    font-size: $large;
    font-weight: 300;
    text-transform: uppercase;
    padding-bottom: 20px;
    padding-top: 20px;
    background: black;
    color: white;
  }

  .message {
    font-family: $sans-stack;
    font-size: $large;
    font-weight: 300;
    text-transform: uppercase;
    padding-top: 80px;
    background: white;
    color: black;
    margin-left: $small-margin;
    min-height: 100vh;
  }

  .query-bar {
    padding-left: $small-margin;
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

  {#if showTaxonomyScroller && firstLoad}
    <div class="top-block" transition:fade>
      <ScrollList taxname="entertainment" {taxlist} />
    </div>
  {/if}

  {#if isQuery && firstLoad}
    {#if items.length == 0}
      <div class="message">No results for “{query}”</div>
    {:else}
      <div class="top-block">
        <span class="query-bar">{title}: {query}</span>
      </div>
    {/if}
  {/if}

  {#each items as post}
    <Preview {post} />
  {/each}

  {#if !finishedLoading}
    <div class="load-trigger" bind:this={loadTrigger} />
  {/if}

</div>

<!-- {#if showFooter} -->
<Footer />
<!-- {/if} -->

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

  console.log("query", query);

  let currentQuery = query;
  let activeCategory = window.location.hash.substr(1);

  // if (activeCategory) {
  //   isQuery = true;
  //   endpoint = entertainment.json;
  // }

  function changeCategory(e) {
    console.dir(e.detail.newCategory);
    activeCategory = e.detail.newCategory;
    history.replaceState(null, null, "#" + activeCategory);
    items = [];
    loadData(0, activeCategory);
  }

  const observer = new IntersectionObserver(
    entries => {
      // console.log("LOAD TRIGGERD");
      entries.forEach(entry => {
        if (entry.intersectionRatio > 0 && firstLoad) {
          // console.log(entry.intersectionRatio);
          // console.log(meta.nextindex);
          // console.log(meta.lastindex);
          if (meta.nextindex < meta.lastindex) {
            loadData(meta.nextindex);
          } else {
            observer.disconnect();
            finishedLoading = true;
          }
        } else {
          // console.log("case 2");
        }
      });
    },
    { treshhold: 0.5 }
  );

  // window.onpopstate = function(event) {
  //   console.dir(event);
  // };

  // Listen for changes to query
  $: {
    if (query !== currentQuery) {
      window.alert = "query change";
      items = [];
      firstLoad = false;
      currentQuery = query;
      loadData(0);
    }
  }

  // window.addEventListener("hashchange", e => {
  //   console.dir(e);
  // });

  function loadData(index, query) {
    url = endpoint + "/index:" + index + (query ? "/query:" + query : "");
    console.dir(url);
    fetch(url)
      .then(r => r.json())
      .then(arr => {
        items = [...items, ...arr.posts];
        meta = arr.meta;
        taxlist = arr.taxlist;
        firstLoad = true;
      });
  }

  loadData(index, query);

  onMount(async () => {
    window.scrollTo(0, 0);
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
    margin-top: 80px;
  }

  .top-block {
    font-family: $sans-stack;
    font-size: $large;
    font-weight: 300;
    text-transform: uppercase;
    background: black;
    color: white;

    @include screen-size("small") {
      font-size: $mobile_large;
      padding-bottom: 5px;
      padding-top: 5px;
    }
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

    @include screen-size("small") {
      font-size: $mobile_large;
      // background: red;
      // padding-bottom: 5px;
      // padding-top: 5px;
    }
  }

  .query-bar {
    padding-left: $small-margin;
  }
</style>

<svelte:head>
  {#if title === 'Landing'}
    <title>NOVEMBRE</title>
  {:else}
    <title>NOVEMBRE | {title}</title>
  {/if}
</svelte:head>

<div class="listing">

  {#if showTaxonomyScroller && firstLoad}
    <div class="top-block" in:fade>
      <ScrollList
        taxname={title.toLowerCase()}
        {taxlist}
        {activeCategory}
        on:changeCategory={changeCategory} />
    </div>
  {/if}

  {#if isQuery && firstLoad}
    {#if items.length == 0}
      <div class="message" in:fade>No results for “{query}”</div>
    {:else}
      <div class="top-block">
        <span class="query-bar" in:fade>{title}: {query}</span>
      </div>
    {/if}
  {/if}
  <!-- {currentHash} -->
  {#each items as post}
    <Preview {post} />
  {/each}

  {#if !finishedLoading}
    <div class="load-trigger" bind:this={loadTrigger} />
  {/if}

</div>

<Footer active={finishedLoading} />

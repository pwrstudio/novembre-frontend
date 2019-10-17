<script>
  // # # # # # # # # # # # # #
  //
  //  Listing
  //
  // # # # # # # # # # # # # #

  // *** IMPORTS
  import { onMount, onDestroy } from "svelte";
  import { fade, slide } from "svelte/transition";
  import { quintOut } from "svelte/easing";

  // *** COMPONENTS
  import Preview from "../Components/Preview.svelte";
  import ScrollList from "../Components/ScrollList.svelte";
  import Footer from "../Components/Footer.svelte";

  // *** STORES
  import { pageLocation, menuActiveGlobal } from "../stores.js";

  // *** PROPS
  export let title = "";
  export let endpoint = "";
  export let showTaxonomyScroller = false;
  export let showFooter = true;
  export let isQuery = false;
  export let query = false;
  export let location = {};

  // *** DOM REFERENCES
  let sentinel = {};
  let postsContainerEl = {};

  // *** VARIABLES
  let fetchedPosts = [];
  let count = 0;
  let index = 0;
  let items = [];
  let taxlist = [];
  let loadedTax = false;
  let firstLoad = false;
  let url = "";
  let meta = {};
  let finishedLoading = false;
  let currentQuery = query;
  let activeCategory = window.location.hash.substr(1);

  // *** REACTIVE
  $: {
    // Listen for changes to query
    if (query !== currentQuery) {
      items = [];
      firstLoad = false;
      currentQuery = query;
      loadData(0, currentQuery);
    }
  }

  // *** FUNCTIONS
  function changeCategory(newCategory) {
    activeCategory = newCategory;
    history.replaceState(null, null, "#" + activeCategory);
    observer.disconnect();
    items = [];
    finishedLoading = false;
    loadData(0, newCategory, title.toLowerCase());
  }
  const observer = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (entry.intersectionRatio > 0 && firstLoad) {
          if (meta.nextindex < meta.lastindex) {
            loadData(meta.nextindex);
          } else {
            observer.disconnect();
            finishedLoading = true;
          }
        } else {
        }
      });
    },
    { threshold: 0.5 }
  );

  function repositionSentinel() {
    if (postsContainerEl && sentinel) {
      let fourthElementFromEnd = postsContainerEl.querySelector(
        ".preview:nth-last-child(4)"
      );
      if (fourthElementFromEnd) {
        postsContainerEl.insertBefore(sentinel, fourthElementFromEnd);
      }
    }
  }

  if (location.hash) {
    loadData(0, location.hash.substr(1), title.toLowerCase());
  }

  loadData(index, query);

  function loadData(i, q, tax) {
    if (tax) {
      url =
        "https://testing.novembre.global/filter.json" +
        "/index:" +
        i +
        "/query:" +
        q +
        "/tax:" +
        tax;
    } else {
      url = endpoint + "/index:" + i + (q ? "/query:" + q : "");
    }
    fetch(url)
      .then(r => r.json())
      .then(arr => {
        items = [...items, ...arr.posts];
        meta = arr.meta;
        taxlist = arr.taxlist;
        firstLoad = true;
        setTimeout(repositionSentinel, 300);
      })
      .catch(err => {
        Sentry.captureException(err);
      });
  }

  // *** ON MOUNT
  onMount(async () => {
    pageLocation.set(title);
    try {
      window.scrollTo(0, 0);
      observer.observe(sentinel);
    } catch (err) {
      Sentry.captureException(err);
    }
  });

  // *** ON DESTROY
  onDestroy(async () => {
    pageLocation.set("");
  });
</script>

<style lang="scss">
  @import "../variables.scss";

  .sentinel {
    width: 100%;
    height: 1px;
    background: black;
  }

  .listing {
    width: 100%;
    // padding-top: 80px;
    min-height: 80vh;
    overflow: hidden;
  }

  .landing {
    padding-top: 0;
  }

  .top-block {
    font-family: $sans-stack;
    font-size: $large;
    font-weight: 300;
    text-transform: uppercase;
    background: black;
    color: white;
    line-height: 0.8em;
    padding-bottom: $small-margin;
    padding-top: $small-margin;
    position: absolute;
    top: 80px;
    width: 100%;
    left: 0;
    z-index: 99;

    @include screen-size("small") {
      font-size: $mobile_large;
      padding-bottom: $small-margin;
      padding-top: $small-margin;
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
    }
  }

  .query-bar {
    padding-left: $small-margin;
    position: relative;
    top: 2px;
  }
</style>

<svelte:head>
  {#if title === 'Landing'}
    <title>NOVEMBRE</title>
  {:else}
    <title>{title} / NOVEMBRE</title>
  {/if}
</svelte:head>

<div class="listing" class:landing={title === 'Landing'}>

  {#if !$menuActiveGlobal}
    {#if showTaxonomyScroller && firstLoad}
      <div class="top-block">
        <ScrollList
          taxname={title.toLowerCase()}
          {taxlist}
          {activeCategory}
          on:changeCategory={e => {
            changeCategory(e.detail.newCategory, e.detail.newCategoryName);
          }} />
      </div>
    {/if}

    {#if isQuery && firstLoad}
      {#if items.length == 0}
        <div class="top-block">
          <div class="query-bar">No results for “{query}”</div>
        </div>
      {:else}
        <div class="top-block">
          <span class="query-bar">{title}: {query}</span>
        </div>
      {/if}
    {/if}
  {/if}

  <!-- {currentHash} -->
  <div class="listing__posts" bind:this={postsContainerEl}>
    {#each items as post, i}
      <Preview {post} first={i == 0 ? true : false} />
    {/each}
  </div>

  {#if !finishedLoading}
    <div class="sentinel" bind:this={sentinel} />
  {/if}

</div>

<Footer active={finishedLoading} />

<script>
  // # # # # # # # # # # # # #
  //
  //  Listing
  //
  // # # # # # # # # # # # # #

  // *** IMPORTS
  import { onMount } from "svelte";
  import { fade } from "svelte/transition";

  // *** COMPONENTS
  import Preview from "../Components/Preview.svelte";
  import ScrollList from "../Components/ScrollList.svelte";
  import Footer from "../Components/Footer.svelte";

  // *** STORES
  import { pageLocation } from "../stores.js";

  // *** PROPS
  export let title = "";
  export let endpoint = "";
  export let showTaxonomyScroller = false;
  export let showFooter = true;
  export let isQuery = false;
  export let query = false;

  // *** DOM REFERENCES
  let sentinel;
  let postsContainerEl;

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
  function changeCategory(e) {
    // console.dir(e.detail.newCategory);
    // console.dir(e.detail.newCategoryName);
    activeCategory = e.detail.newCategory;
    history.replaceState(null, null, "#" + activeCategory);
    observer.disconnect();
    items = [];
    finishedLoading = false;
    loadData(0, e.detail.newCategoryName, title.toLowerCase());
    setTimeout(() => {
      finishedLoading = true;
    }, 1000);
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
    { threshold: 0.5 }
  );

  function repositionSentinel() {
    // console.log("moving sentinel....");
    // console.dir(postsContainerEl);
    // console.dir(sentinel);
    if (postsContainerEl && sentinel) {
      let fourthElementFromEnd = postsContainerEl.querySelector(
        ".preview:nth-last-child(4)"
      );
      // console.dir(fourthElementFromEnd);
      if (fourthElementFromEnd) {
        postsContainerEl.insertBefore(sentinel, fourthElementFromEnd);
      }
    }
  }

  // window.onpopstate = function(event) {
  //   console.dir(event);
  // };

  // window.addEventListener("hashchange", e => {
  //   console.dir(e);
  // });

  function loadData(i, q, tax) {
    // console.log("q", q);
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
    // console.dir(url);
    fetch(url)
      .then(r => r.json())
      .then(arr => {
        // console.dir(arr);
        items = [...items, ...arr.posts];
        meta = arr.meta;
        taxlist = arr.taxlist;
        firstLoad = true;
        setTimeout(repositionSentinel, 500);
      });
  }

  loadData(index, query);

  // *** ON MOUNT
  onMount(async () => {
    console.log("mounted");
    pageLocation.set(title);
    window.scrollTo(0, 0);
    observer.observe(sentinel);
  });
</script>

<style lang="scss">
  @import "../variables.scss";

  .sentinel {
    width: 100%;
    height: 10px;
    background: transparent;
  }

  .listing {
    width: 100%;
    padding-top: 80px;
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
      <div class="top-block">
        <div class="query-bar" in:fade>No results for “{query}”</div>
      </div>
    {:else}
      <div class="top-block">
        <span class="query-bar" in:fade>{title}: {query}</span>
      </div>
    {/if}
  {/if}

  <!-- {currentHash} -->
  <div class="listing__posts" bind:this={postsContainerEl}>
    {#each items as post}
      <Preview {post} />
    {/each}
  </div>

  {#if !finishedLoading}
    <div class="sentinel" bind:this={sentinel} />
  {/if}

</div>

<Footer active={finishedLoading} />

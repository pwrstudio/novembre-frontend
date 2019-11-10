<script>
  // # # # # # # # # # # # # #
  //
  //  LISTING
  //
  // # # # # # # # # # # # # #

  // *** IMPORTS
  import { onMount } from "svelte";
  import { fade, slide, fly } from "svelte/transition";
  import { navigate } from "svelte-routing";
  import isEmpty from "lodash/isEmpty";
  import { urlFor } from "../sanity.js";

  // *** COMPONENTS
  import Preview from "../Components/Preview.svelte";
  import Footer from "../Components/Footer.svelte";
  import SplashText from "../Components/SplashText.svelte";
  import MetaData from "../Components/MetaData.svelte";
  import TagBar from "../Components/TagBar.svelte";

  // *** STORES
  import {
    feedBanners,
    navigationColor,
    activeQuery,
    activeCategory,
    scrollListActive
  } from "../stores.js";
  import { loadFeed } from "../sanity.js";

  // *** PROPS
  export let title = "";
  export let showFooter = true;
  export let isQuery = false;
  export let query = false;
  export let location = {};

  // *** DOM REFERENCES
  let sentinel = {};
  let postsContainerEl = {};

  // *** VARIABLES
  let count = 0;
  let index = 0;
  let finishedLoading = false;
  let currentQuery = query;
  let sanityQuery = "";
  let sanityParams = {};

  const doLoad = () => {
    if (title === "Landing") {
      sanityQuery =
        '*[_type == "article" && editorialState == "live" && defined(preview)] | order(publicationDate desc){title, "slug": slug.current, taxonomy, "preview": preview[0], "previewVideoUrl": preview[0].video.asset->url, previewColors}';
    } else if (title === "Magazine") {
      sanityQuery =
        '*[_type == "article" && editorialState == "live" && defined(preview) && taxonomy.category == "magazine" ] | order(publicationDate desc){title, "slug": slug.current, taxonomy, "preview": preview[0], "previewVideoUrl": preview[0].video.asset->url, previewColors}';
    } else if (title === "Bureau") {
      sanityQuery =
        '*[_type == "article" && editorialState == "live" && defined(preview) && taxonomy.category == "bureau"] | order(publicationDate desc){title, "slug": slug.current, taxonomy, "preview": preview[0], "previewVideoUrl": preview[0].video.asset->url, previewColors}';
    } else if (title === "Tag") {
      sanityQuery =
        '*[_type == "article" && editorialState == "live" && defined(preview) && $tag in taxonomy.tags ] | order(publicationDate desc){title, "slug": slug.current, taxonomy, "preview": preview[0], "previewVideoUrl": preview[0].video.asset->url, previewColors}';
      sanityParams = { tag: query };
    } else if (title === "Search") {
      sanityQuery =
        '*[_type == "article" && editorialState == "live" && defined(preview) && title match $term || $term in taxonomy.tags ] | order(publicationDate desc){title, "slug": slug.current, taxonomy, "preview": preview[0], "previewVideoUrl": preview[0].video.asset->url, previewColors}';
      sanityParams = { term: query };
    } else if (title === "magsub") {
      sanityQuery =
        '*[_type == "article" && editorialState == "live" && defined(preview) && taxonomy.category == "magazine" && taxonomy.subCategory == $subcat ] | order(publicationDate desc){title, "slug": slug.current, taxonomy, "preview": preview[0], "previewVideoUrl": preview[0].video.asset->url, previewColors}';
      sanityParams = { subcat: query };
    } else if (title === "bursub") {
      sanityQuery =
        '*[_type == "article" && editorialState == "live" && defined(preview) && taxonomy.category == "bureau" && taxonomy.subCategory == $subcat ] | order(publicationDate desc){title, "slug": slug.current, taxonomy, "preview": preview[0], "previewVideoUrl": preview[0].video.asset->url, previewColors}';
      sanityParams = { subcat: query };
    } else {
      navigate("/404");
    }
    return loadFeed(sanityQuery, sanityParams, index);
  };

  let feed = doLoad();

  // *** REACTIVE
  $: {
    if (query !== currentQuery) {
      currentQuery = query;
      feed = doLoad();
    }
  }

  $: activeQuery.set(query);

  $: title === "bursub" ||
  title === "magsub" ||
  title === "Magazine" ||
  title === "Bureau"
    ? scrollListActive.set(true)
    : scrollListActive.set(false);

  $: title === "bursub" || title === "Bureau"
    ? activeCategory.set("bureau")
    : activeCategory.set("magazine");

  navigationColor.set("white");

  // const observer = new IntersectionObserver(
  //   entries => {
  //     entries.forEach(entry => {
  //       if (entry.intersectionRatio > 0 && firstLoad) {
  //         if (meta.nextindex < meta.lastindex) {
  //           loadData(meta.nextindex);
  //         } else {
  //           observer.disconnect();
  //           finishedLoading = true;
  //         }
  //       } else {
  //       }
  //     });
  //   },
  //   { threshold: 0.5 }
  // );

  // const repositionSentinel = () => {
  //   if (postsContainerEl && sentinel) {
  //     let fourthElementFromEnd = postsContainerEl.querySelector(
  //       ".preview:nth-last-child(4)"
  //     );
  //     if (fourthElementFromEnd) {
  //       postsContainerEl.insertBefore(sentinel, fourthElementFromEnd);
  //     }
  //   }
  // };

  // *** ON MOUNT
  onMount(async () => {
    try {
      window.scrollTo(0, 0);
      // observer.observe(sentinel);
    } catch (err) {
      Sentry.captureException(err);
    }
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
    min-height: 80vh;
    overflow: hidden;
  }

  .landing {
    padding-top: 0;
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

  .no-results {
    padding-left: $small-margin;
    font-size: $large;
    font-family: $sans-stack;
    color: white;
    background: $hotpink;
    height: 100vh;
    width: 100vw;
    padding-top: 200px;
    text-transform: uppercase;

    @include screen-size("small") {
      padding-top: 160px;
      font-size: $mobile_large;
    }
  }

  .feed-banner {
    display: block;
    width: 100vw;
    margin: 0;
    line-height: 0;

    img {
      width: 100%;
      height: auto;
    }
  }
</style>

{#if title === 'Tag' || title === 'Search'}
  <TagBar text={$activeQuery} />
{/if}

<div class="listing" class:landing={title === 'Landing'}>

  {#await $feedBanners then feedBanners}

    {#await feed then feed}

      <div class="listing__posts" bind:this={postsContainerEl}>

        {#if isQuery && feed.length == 0}
          <div class="no-results">No results for “{query}”</div>
        {/if}

        {#each feed as post, i}
          {#if i === 0 && (title === 'Magazine' || title === 'Bureau')}
            <SplashText section={title.toLowerCase()} />
          {/if}
          {#if !isEmpty(feedBanners) && feedBanners.find(b => b.positionInFeed == i)}
            <a
              href={feedBanners.find(b => b.positionInFeed == i).link}
              target="_blank"
              rel="noreferrer"
              class="feed-banner">
              <img
                src={urlFor(feedBanners.find(b => b.positionInFeed == i).image)
                  .width(1400)
                  .quality(90)
                  .auto('format')
                  .url()} />
            </a>
          {/if}
          <Preview {post} isFirst={i === 0 ? true : false} />
        {/each}
      </div>

      {#if !finishedLoading && !isQuery}
        <div class="sentinel" bind:this={sentinel} />
      {/if}

    {/await}
  {/await}

</div>

<Footer active={true} />

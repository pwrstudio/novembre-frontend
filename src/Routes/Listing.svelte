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
  import isArray from "lodash/isArray";
  import get from "lodash/get";
  import { urlFor, loadFeed } from "../sanity.js";
  import { zonedTimeToUtc } from "date-fns-tz";

  // *** COMPONENTS
  import Preview from "../Components/Preview.svelte";
  import Footer from "../Components/Footer.svelte";
  import SplashText from "../Components/SplashText.svelte";
  import MetaData from "../Components/MetaData.svelte";
  import TagBar from "../Components/TagBar.svelte";
  import Ellipse from "../Components/Ellipse.svelte";

  // *** STORES
  import {
    feedBanners,
    navigationColor,
    activeQuery,
    activeCategory,
    scrollListActive
  } from "../stores.js";

  // *** PROPS
  export let title = "";
  export let query = false;
  export let location = {};

  // *** DOM REFERENCES
  let sentinel = {};
  let postsContainerEl = {};

  // *** CONSTANTS
  const BATCH_SIZE = 5;

  // *** VARIABLES
  let index = 0;
  let currentQuery = query;
  let sanityQuery = "";
  let sanityParams = {};
  let postsArray = [];
  let loadingCompleted = false;

  const logSitemap = posts => {
    posts.forEach(p => {
      console.log(
        "https://novembre.global/" + p.taxonomy.category + "/" + p.slug
      );
    });
  };

  const doLoad = () => {
    const tz = Intl.DateTimeFormat().resolvedOptions().timeZone;
    console.log(tz);
    // Get current time as UTC
    const currentTime = zonedTimeToUtc(new Date()).toISOString();
    console.log("currentTime", currentTime);

    if (title === "Landing") {
      sanityQuery =
        '*[_type == "article" && editorialState == "live" && $currentTime > publicationDate] | order(publicationDate desc){publicationDate, "totalPosts": count(*[_type == "article" && editorialState == "live" && $currentTime > publicationDate]), title, "slug": slug.current, taxonomy, "preview": preview[0], "previewVideoUrl": preview[0].video.asset->url, previewColors}[$start...$end]';
      sanityParams = {
        start: index * BATCH_SIZE,
        end: (index + 1) * BATCH_SIZE,
        currentTime: currentTime
      };
    } else if (title === "Magazine") {
      sanityQuery =
        '*[_type == "article" && editorialState == "live" && taxonomy.category == "magazine" && $currentTime > publicationDate] | order(publicationDate desc){publicationDate, "totalPosts": count(*[_type == "article" && editorialState == "live" && taxonomy.category == "magazine" && $currentTime > publicationDate]), title, "slug": slug.current, taxonomy, "preview": preview[0], "previewVideoUrl": preview[0].video.asset->url, previewColors}[$start...$end]';
      sanityParams = {
        start: index * BATCH_SIZE,
        end: (index + 1) * BATCH_SIZE,
        currentTime: currentTime
      };
    } else if (title === "Bureau") {
      sanityQuery =
        '*[_type == "article" && editorialState == "live" && taxonomy.category == "bureau" && $currentTime > publicationDate] | order(publicationDate desc){publicationDate, "totalPosts": count(*[_type == "article" && editorialState == "live" && taxonomy.category == "bureau" && $currentTime > publicationDate]), title, "slug": slug.current, taxonomy, "preview": preview[0], "previewVideoUrl": preview[0].video.asset->url, previewColors}[$start...$end]';
      sanityParams = {
        start: index * BATCH_SIZE,
        end: (index + 1) * BATCH_SIZE,
        currentTime: currentTime
      };
    } else if (title === "Tag") {
      sanityQuery =
        '*[_type == "article" && editorialState == "live" && $tag in taxonomy.tags && $currentTime > publicationDate] | order(publicationDate desc){publicationDate, "totalPosts": count(*[_type == "article" && editorialState == "live" && $tag in taxonomy.tags && $currentTime > publicationDate]), title, "slug": slug.current, taxonomy, "preview": preview[0], "previewVideoUrl": preview[0].video.asset->url, previewColors}[$start...$end]';
      sanityParams = {
        tag: query,
        start: index * BATCH_SIZE,
        end: (index + 1) * BATCH_SIZE,
        currentTime: currentTime
      };
    } else if (title === "Search") {
      sanityQuery =
        '*[_type == "article" && editorialState == "live" && title match $term || $term in taxonomy.tags && $currentTime > publicationDate] | order(publicationDate desc){publicationDate, "totalPosts": count(*[_type == "article" && editorialState == "live" && title match $term || $term in taxonomy.tags && $currentTime > publicationDate]), title, "slug": slug.current, taxonomy, "preview": preview[0], "previewVideoUrl": preview[0].video.asset->url, previewColors}[$start...$end]';
      sanityParams = {
        term: query,
        start: index * BATCH_SIZE,
        end: (index + 1) * BATCH_SIZE,
        currentTime: currentTime
      };
    } else if (title === "magsub") {
      sanityQuery =
        '*[_type == "article" && editorialState == "live" && taxonomy.category == "magazine" && taxonomy.subCategory == $subcat && $currentTime > publicationDate] | order(publicationDate desc){publicationDate, "totalPosts": count(*[_type == "article" && editorialState == "live" && taxonomy.category == "magazine" && taxonomy.subCategory == $subcat && $currentTime > publicationDate]), title, "slug": slug.current, taxonomy, "preview": preview[0], "previewVideoUrl": preview[0].video.asset->url, previewColors}[$start...$end]';
      sanityParams = {
        subcat: query,
        start: index * BATCH_SIZE,
        end: (index + 1) * BATCH_SIZE,
        currentTime: currentTime
      };
    } else if (title === "bursub") {
      sanityQuery =
        '*[_type == "article" && editorialState == "live" && taxonomy.category == "bureau" && taxonomy.subCategory == $subcat && $currentTime > publicationDate] | order(publicationDate desc){publicationDate, "totalPosts": count(*[_type == "article" && editorialState == "live" && taxonomy.category == "bureau" && taxonomy.subCategory == $subcat && $currentTime > publicationDate]), title, "slug": slug.current, taxonomy, "preview": preview[0], "previewVideoUrl": preview[0].video.asset->url, previewColors}[$start...$end]';
      sanityParams = {
        subcat: query,
        start: index * BATCH_SIZE,
        end: (index + 1) * BATCH_SIZE,
        currentTime: currentTime
      };
    } else {
      navigate("/404");
    }
    loadFeed(sanityQuery, sanityParams, index).then(posts => {
      postsArray = [...postsArray, ...posts];
      setTimeout(() => {
        if (index === 0) {
          window.scrollTo(0, 0);
          console.log("Connecting observer");
          observer.observe(sentinel);
        }
        console.log(get(postsArray, "[0].totalPosts", 100));
        console.log((index + 1) * BATCH_SIZE);
        if (
          (index + 1) * BATCH_SIZE >=
          get(postsArray, "[0].totalPosts", 100)
        ) {
          console.log("Disconnecting observer");
          loadingCompleted = true;
          observer.disconnect();
        }
      }, 100);
    });
  };

  // Re-load if query changes
  $: {
    if (query !== currentQuery) {
      currentQuery = query;
      postsArray = [];
      index = 0;
      doLoad();
    }
  }

  // Enable scroll list for selected listings
  $: title === "bursub" ||
  title === "magsub" ||
  title === "Magazine" ||
  title === "Bureau"
    ? scrollListActive.set(true)
    : scrollListActive.set(false);

  $: activeQuery.set(query);

  $: title === "bursub" || title === "Bureau"
    ? activeCategory.set("bureau")
    : activeCategory.set("magazine");

  navigationColor.set("white");

  const observer = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (entry.intersectionRatio > 0) {
          console.log("SENTINEL HIT");
          index += 1;
          doLoad();
        }
      });
    },
    { threshold: 0.5 }
  );

  const repositionSentinel = () => {
    if (postsContainerEl && sentinel) {
      let fourthElementFromEnd = postsContainerEl.querySelector(
        ".preview:nth-last-child(4)"
      );
      if (fourthElementFromEnd)
        postsContainerEl.insertBefore(sentinel, fourthElementFromEnd);
    }
  };

  // *** ON MOUNT
  onMount(async () => {
    window.scrollTo(0, 0);
    doLoad();
  });
</script>

<style lang="scss">
  @import "../variables.scss";

  .sentinel {
    width: 100%;
    height: 300px;
    text-align: center;
    line-height: 300px;
    font-size: $large;
    font-family: $sans-stack;
    display: block;
    background: $grey;
    color: $darkgrey;

    @include screen-size("small") {
      font-size: $mobile_large;
    }
  }

  .listing {
    width: 100%;
    min-height: 80vh;
    overflow: hidden;
  }

  .landing {
    padding-top: 0;
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
    color: black;
    background: #f6f6f6;
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

    img,
    video {
      width: 100%;
      height: auto;
    }
  }
</style>

<MetaData />

{#if title === 'Tag' || title === 'Search'}
  <TagBar text={$activeQuery} />
{/if}

{#await $feedBanners then feedBanners}

  {#if isArray(postsArray)}
    <div class="listing" class:landing={title === 'Landing'}>

      <div class="listing__posts" bind:this={postsContainerEl}>

        {#if query && postsArray.length === 0}
          <div class="no-results">No results for “{query}”</div>
        {/if}

        {#each postsArray as post, i}
          {#if i === 0 && (title === 'Magazine' || title === 'Bureau' || title === 'Landing')}
            <SplashText section={title.toLowerCase()} />
          {/if}

          {#if !isEmpty(feedBanners) && feedBanners.find(b => b.positionInFeed == i)}
            <a
              href={feedBanners.find(b => b.positionInFeed == i).link}
              target="_blank"
              rel="noreferrer"
              class="feed-banner">

              {#if feedBanners.find(b => b.positionInFeed == i).video}
                <video
                  src={'https://cdn.sanity.io/files/gj963qwj/production/' + feedBanners
                      .find(b => b.positionInFeed == i)
                      .video.asset._ref.replace('file-', '')
                      .replace('-mp4', '.mp4')}
                  autoplay
                  muted
                  loop />
              {/if}

              {#if feedBanners.find(b => b.positionInFeed == i).image}
                <img
                  alt="novembre.global"
                  src={urlFor(feedBanners.find(b => b.positionInFeed == i).image)
                    .width(1400)
                    .quality(90)
                    .auto('format')
                    .url()} />
              {/if}

            </a>
          {/if}
          <Preview {post} isFirst={i === 0 ? true : false} />
        {/each}
      </div>

      {#if !loadingCompleted}
        <div class="sentinel" bind:this={sentinel}>
          LOADING
          <Ellipse />
        </div>
      {/if}

    </div>

    <Footer active={true} />
  {/if}
{/await}

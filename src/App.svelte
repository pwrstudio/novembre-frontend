<script>
  // # # # # # # # # # # # # #
  //
  //  NOVEMBRE.GLOBAL
  //
  // # # # # # # # # # # # # #

  // IMPORTS
  import "intersection-observer";
  import { Router, Route } from "svelte-routing";
  import Navigation from "./Components/Navigation.svelte";
  import { loadPages } from "./sanity.js";
  import isEmpty from "lodash/isEmpty";
  import { urlFor } from "./sanity.js";
  import { fade } from "svelte/transition";

  // COMPONENTS
  import ScrollList from "./Components/ScrollList.svelte";

  // STORES
  import {
    pages,
    menuBanners,
    feedBanners,
    overlayBanners,
    scrollListActive,
    activeCategory
  } from "./stores.js";

  // ROUTES
  import Listing from "./Routes/Listing.svelte";
  import Article from "./Routes/Article.svelte";
  import About from "./Routes/About.svelte";
  import Contact from "./Routes/Contact.svelte";
  import Stockists from "./Routes/Stockists.svelte";
  import Error404 from "./Routes/Error404.svelte";

  pages.set(loadPages('*[_id == "global-config"][0]'));
  menuBanners.set(
    loadPages('*[_type == "banner" && editorialState == "live" && placeInMenu]')
  );
  feedBanners.set(
    loadPages('*[_type == "banner" && editorialState == "live" && placeInFeed]')
  );
  overlayBanners.set(
    loadPages(
      '*[_type == "banner" && editorialState == "live" && placeAsOverlay]'
    )
  );

  const listingRouteParams = {
    landing: {
      title: "Landing",
      showFooter: false
    },
    magazine: {
      title: "Magazine"
    },
    bureau: {
      title: "Bureau"
    },
    magazineSub: {
      title: "magsub",
      isQuery: true
    },
    bureauSub: {
      title: "bursub",
      isQuery: true
    },
    taxonomy: {
      title: "Tag",
      isQuery: true
    },
    search: {
      title: "Search",
      isQuery: true
    }
  };

  const magazineTags = [
    { title: "Reportage", slug: "reportage" },
    { title: "Motion", slug: "motion" },
    { title: "Words", slug: "words" },
    { title: "Features", slug: "features" },
    { title: "Guest Features", slug: "guest-features" },
    { title: "Sounds", slug: "sounds" }
  ];

  const bureauTags = [
    { title: "Creative Direction", slug: "creative-direction" },
    { title: "Workshop", slug: "workshop" },
    { title: "Entertainment", slug: "entertainment" },
    { title: "Creative Direction", slug: "creative-direction" },
    { title: "Workshop", slug: "workshop" },
    { title: "Entertainment", slug: "entertainment" }
  ];
</script>

<style lang="scss" global>
  @import "./variables.scss";

  html {
    padding: 0;
    margin: 0;

    &.bureau {
      background-color: $grey;
    }
  }

  body {
    background: white;
    padding: 0;
    margin: 0;
    width: 100vw;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;

    &.no-scroll {
      overflow: hidden;
    }
  }

  * {
    box-sizing: border-box;
    -webkit-tap-highlight-color: rgba(255, 255, 255, 0);
  }

  ::selection {
    background: #e4e4e4;
  }

  ::-moz-selection {
    background: #e4e4e4;
  }

  a {
    color: currentColor;
    text-decoration: none;
  }

  strong {
    font-weight: normal;
    text-transform: uppercase;
    font-family: $sans-stack;
  }

  .body-text {
    a {
      border-bottom: 1px solid black;
      transition: border 0.3s ease-out;
      &:hover {
        border-bottom: 1px solid transparent;
      }
    }

    em {
      font-family: "Adobe Caslon Pro", "Caslon", "Times new roman", Times, serif;
      font-style: italic;
    }

    strong {
      font-weight: normal;
      text-transform: none;
      font-family: $sans-stack;
      font-size: 21px;
    }
  }

  em {
    font-family: $serif-stack;
    font-style: italic;
    padding-right: 2px;
  }

  .splash-header {
    color: white;
    padding-right: 4px;
    position: relative;
    top: -1px;
  }

  // .marker {
  //   background: $hotpink;
  //   height: 10px;
  //   width: 10px;
  //   border-radius: 10px;
  // }

  blockquote {
    display: block;
    font-family: $serif-stack;
    font-size: $large;
    line-height: 1em;
    font-style: italic;
    margin: 0;
    margin-left: auto;
    margin-right: auto;
    max-width: 90vw;
    margin-bottom: 1.2rem;

    @include screen-size("small") {
      font-size: $mobile_large;
      max-width: 95vw;
    }
  }

  .content {
    p {
      display: block;
      width: 800px;
      max-width: 95vw;
      font-family: $serif-stack;
      font-size: $body;
      line-height: 1.2em;
      margin-left: auto;
      margin-right: auto;
      margin-top: 0;
      margin-bottom: 1.2em;

      &.small {
        font-family: $sans-stack;
        font-size: $small;

        a {
          color: currentColor;
          text-decoration: none;
          border-bottom: 1px solid $black;
          transition: border 0.3s $transition;

          &:hover {
            border-bottom: 1px solid transparent;
          }
        }

        @include screen-size("small") {
          font-size: $mobile_small;
        }
      }

      &.interview-question {
        font-family: $sans-stack;
        font-size: 21px;
        margin-bottom: 0.8em;
      }

      &.introduction {
        font-family: $serif-stack;
        font-style: italic;
        font-size: $intro;

        @include screen-size("small") {
          font-size: $mobile_intro;
        }
      }
    }

    @include screen-size("small") {
      font-size: $mobile_body;
      margin-bottom: 0px;
    }

    a {
      color: currentColor;
      text-decoration: none;
      border-bottom: 1px solid $black;
      transition: border 0.3s $transition;

      &:hover {
        border-bottom: 1px solid transparent;
      }
    }
  }

  .splash-text {
    div {
      p {
        margin: 0;
      }
    }
  }

  .carousel {
    opacity: 0;
    transition: opacity 0.4s;
  }

  .carousel.hidden {
    display: none;
  }

  .carousel.flickity-enabled {
    opacity: 1;
  }

  .mapboxgl-canvas {
    outline: none;
  }

  /*! Flickity v2.2.1 ------------------- */

  .flickity-enabled {
    position: relative;

    &:focus {
      outline: none;
    }
  }

  .flickity-enabled .flickity-viewport {
    overflow: hidden;
    position: relative;
    height: 100%;
  }

  .flickity-slider {
    position: absolute;
    width: 100%;
    height: 100%;
  }

  /* draggable */

  .flickity-enabled.is-draggable {
    -webkit-tap-highlight-color: transparent;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
  }

  .flickity-enabled.is-draggable .flickity-viewport {
    cursor: move;
    cursor: -webkit-grab;
    cursor: grab;
  }

  .flickity-enabled.is-draggable .flickity-viewport.is-pointer-down {
    cursor: -webkit-grabbing;
    cursor: grabbing;
  }

  /*! Flickity v2.2.1 ------------------- */

  .overlay-banner {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    width: 100vw;
    height: 100vh;
    background: rgba(255, 255, 255, 0.9);
    z-index: 1000;
    display: flex;
    justify-content: center;
    align-items: center;

    .inner {
      display: block;
      max-width: 90vw;
      max-height: 90vh;
    }
  }
</style>

<Navigation />

{#await $overlayBanners then overlayBanners}
  {#if !isEmpty(overlayBanners)}
    <div class="overlay-banner">
      <a
        href={overlayBanners[0].link}
        target="_blank"
        rel="noreferrer"
        class="inner">
        <img
          src={urlFor(overlayBanners[0].image)
            .width(500)
            .quality(90)
            .auto('format')
            .url()} />
      </a>
    </div>
  {/if}
{/await}

{#if $scrollListActive && $activeCategory === 'magazine'}
  <ScrollList tagArray={magazineTags} />
{/if}

{#if $scrollListActive && $activeCategory === 'bureau'}
  <ScrollList tagArray={bureauTags} />
{/if}

<Router>
  <Route path="/" component={Listing} {...listingRouteParams.landing} />
  <Route
    path="magazine/"
    component={Listing}
    {...listingRouteParams.magazine} />
  <Route path="bureau" component={Listing} {...listingRouteParams.bureau} />
  <Route
    <Route
    path="magazine/category/:query"
    component={Listing}
    {...listingRouteParams.magazineSub} />
  <Route
    path="bureau/category/:query"
    component={Listing}
    {...listingRouteParams.bureauSub} />
  <Route
    path="taxonomy/:query"
    component={Listing}
    {...listingRouteParams.taxonomy} />
  <Route
    path="taxonomy/"
    component={Listing}
    {...listingRouteParams.taxonomy} />
  <Route
    path="search/:query"
    component={Listing}
    {...listingRouteParams.search} />
  <Route path="search/" component={Listing} {...listingRouteParams.search} />
  <Route path="magazine/:slug" component={Article} />
  <Route path="bureau/:slug" component={Article} />
  <Route path="about" component={About} />
  <Route path="contact" component={Contact} />
  <Route path="stockists" component={Stockists} />
  <Route path="404" component={Error404} title="404" />
  <Route component={Error404} title="404" />
</Router>

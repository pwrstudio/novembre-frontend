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
  import isEmpty from "lodash/isEmpty";
  import { urlFor, loadPages } from "./sanity.js";
  import Cookies from "js-cookie";
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

  let overlayActive = false;

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

  if (!Cookies.get("nov_seen-banner")) {
    setTimeout(() => {
      overlayActive = true;
    }, 3000);
    Cookies.set("nov_seen-banner", "true", {
      expires: 1 / 24
    });
  }
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

  .splash-text {
    em {
      color: white;
      padding-right: 4px;
      position: relative;
      top: -1px;
    }
  }

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
      margin-bottom: $large-vertical-margin;

      @include screen-size("small") {
        max-width: unset;
        width: calc(100% - 10px);
        margin-left: $small-margin;
        margin-right: $small-margin;
      }

      &.small {
        font-family: $sans-stack;
        font-size: $small;

        a {
          color: currentColor;
          text-decoration: underline;
          border-bottom: none;
          transition: border 0.3s $transition;

          &:hover {
            text-decoration: none;
            border-bottom: none;
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
    background: rgba(255, 255, 255, 0.8);
    z-index: 1000;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;

    .inner {
      display: block;
      img {
        max-width: 80vw;
        max-height: 75vh;
      }
    }

    .close {
      position: fixed;
      top: 30px;
      right: 30px;
      z-index: 1000;
      width: 50px;
      transform: scale(1);
      transition: transform 0.25s ease-out;
      cursor: pointer;

      @include screen-size("small") {
        width: 50px;
      }

      &:hover {
        transform: scale(1.1);
      }
    }
  }

  .about-text {
    p {
      margin-top: 0;
      margin-left: $small-margin;
    }
  }

  .contact {
    p {
      margin-top: 0;
    }
  }

  .stockists-placeholder {
    a {
      border-bottom: 2px solid black;
      @include screen-size("small") {
        border-bottom: 1px solid black;
      }

      &:hover {
        border-bottom: 2px solid transparent;
        @include screen-size("small") {
          border-bottom: 1px solid transparent;
        }
      }
    }
  }

  .about-text,
  .contact {
    a {
      border-bottom: 3px solid black;

      @include screen-size("small") {
        border-bottom: 1px solid black;
      }

      &:hover {
        border-bottom: 3px solid transparent;

        @include screen-size("small") {
          border-bottom: 1px solid transparent;
        }
      }
    }
  }
</style>

<Navigation />

{#await $overlayBanners then overlayBanners}
  {#if !isEmpty(overlayBanners) && overlayActive}
    <div
      class="overlay-banner"
      on:click={e => {
        overlayActive = false;
      }}
      in:fade>
      <a
        href={overlayBanners[0].link}
        target="_blank"
        rel="noreferrer"
        class="inner">
        <img
          src={urlFor(overlayBanners[0].image)
            .width(1000)
            .quality(90)
            .auto('format')
            .url()} />
      </a>

      <svg
        on:click={e => {
          overlayActive = false;
        }}
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
        xmlns:xlink="http://www.w3.org/1999/xlink"
        x="0px"
        y="0px"
        class="close"
        viewBox="0 0 1000 1000"
        enable-background="new 0 0 1000 1000"
        xml:space="preserve">
        <g>
          <g
            transform="translate(0.000000,511.000000) scale(0.100000,-0.100000)">
            <path
              d="M146.3,4961c-27.2-27.2-46.3-73.5-46.3-103.5c0-32.7,876.6-928.3,2346.6-2398.3L4795.8,110L2446.6-2239.3C840.4-3845.4,100-4604.9,100-4643c0-68.1,81.7-147,152.4-147c32.7,0,928.3,876.6,2398.3,2346.6L5000-94.2l2349.3-2349.3C8955.4-4049.6,9714.9-4790,9753-4790c68.1,0,147,81.7,147,152.4c0,32.7-876.6,928.3-2346.6,2398.3L5204.2,110l2349.3,2349.3C9159.5,4065.4,9900,4824.9,9900,4863c0,68.1-81.7,147-152.4,147c-32.7,0-928.3-876.6-2398.3-2346.6L5000,314.2L2650.7,2663.4C1044.6,4269.6,285.1,5010,247,5010C214.3,5010,170.8,4988.2,146.3,4961z" />
          </g>
        </g>
      </svg>
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

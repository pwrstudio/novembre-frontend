<script>
  import { Router, Link, Route } from "svelte-routing";
  import Navigation from "./Components/Navigation.svelte";
  import intersectionObserver from "intersection-observer";

  // ROUTES
  import Listing from "./Routes/Listing.svelte";
  import Article from "./Routes/Article.svelte";
  import Page from "./Routes/Page.svelte";
  import Error404 from "./Routes/Error404.svelte";

  // const baseURL = "http://3.221.158.13/3/";
  const baseURL = "https://testing.novembre.global/";

  const listingRouteParams = {
    landing: {
      title: "Landing",
      endpoint: baseURL + "landing.json",
      showTaxonomyScroller: false,
      showFooter: false
    },
    magazine: {
      title: "Magazine",
      endpoint: baseURL + "magazine.json",
      showTaxonomyScroller: true
    },
    entertainment: {
      title: "Entertainment",
      endpoint: baseURL + "entertainment.json",
      showTaxonomyScroller: true
    },
    taxonomy: {
      title: "Tag",
      endpoint: baseURL + "filter.json",
      showTaxonomyScroller: false,
      isQuery: true
    },
    search: {
      title: "Search",
      endpoint: baseURL + "search.json",
      showTaxonomyScroller: false,
      isQuery: true
    }
  };

  const articleRouteParams = {
    magazine: {
      endpoint: baseURL + "magazine/"
    },
    entertainment: {
      endpoint: baseURL + "entertainment/",
      isEntertainment: true
    }
  };

  const pageRouteParams = {
    about: {
      endpoint: baseURL + "about.json"
    },
    contact: {
      endpoint: baseURL + "contact.json"
    },
    stockists: {
      endpoint: baseURL + "stockists.json"
    }
  };
</script>

<style lang="scss" global>
  @import "./variables.scss";

  body,
  html {
    padding: 0;
    margin: 0;
    width: 100vw;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  html {
    background: black;
  }

  body {
    background: white;
  }

  * {
    box-sizing: border-box;
    -webkit-tap-highlight-color: rgba(255, 255, 255, 0);
  }

  ::selection {
    background: #e4e4e4;
    /* WebKit/Blink Browsers */
  }

  ::-moz-selection {
    background: #e4e4e4;
    /* Gecko Browsers */
  }

  a {
    color: currentColor;
    text-decoration: none;
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
  }

  em {
    font-family: $serif-stack;
    font-style: italic;
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

  .entertainment {
    p {
      // min-height: 400px;
      column-count: 2;
      column-fill: auto;
      // min-height: 300px;

      @include screen-size("small") {
        column-count: unset;
      }
    }
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

  /* Flickity fullscreen v1.0.1
------------------------- */

  .flickity-enabled.is-fullscreen {
    position: fixed;
    left: 0;
    top: 0;
    width: 100vw !important;
    height: 100vh !important;
    max-height: unset !important;
    background: hsla(0, 0%, 0%, 1);
    padding-bottom: 45px;
    padding-top: 45px;
    z-index: 10000;
  }

  .flickity-enabled.is-fullscreen .flickity-page-dots {
    bottom: 10px;
  }

  .flickity-enabled.is-fullscreen .flickity-page-dots .dot {
    background: white;
  }

  /* prevent page scrolling when flickity is fullscreen */
  html.is-flickity-fullscreen {
    overflow: hidden;
  }

  /* ---- flickity-fullscreen-button ---- */

  .flickity-fullscreen-button {
    position: absolute;
    display: block;
    right: $small-margin;
    top: $small-margin;
    width: 40px;
    height: 40px;
    color: white;
    border: none;
    outline: 0;
    // background: url("data:image/svg+xml;utf8,<svg width='24' height='24' viewBox='002424' fill='none' stroke='white' stroke-width='2' class='featherfeather-maximize'><path d='M83h5a22000-22v3m180v5a22000-2-2h-3m018h3a220002-2v-3m316v3a2200022h3'></path></svg>");
  }

  // .flickity-button-icon {
  //   display: none;
  // }
  /* right-to-left */
  .flickity-rtl .flickity-fullscreen-button {
    right: auto;
    left: 10px;
  }

  .flickity-fullscreen-button-exit {
    display: none;
    // background: url("data:image/svg+xml;utf8,<svg width='24' height='24' viewBox='002424' fill='none' stroke='white' stroke-width='2' class='featherfeather-minimize'><path d='M83v3a22001-22h3m180h-3a22001-2-2v3m018v-3a220012-2h3m316h3a2200122v3'></path></svg>");
  }

  .flickity-enabled.is-fullscreen .flickity-fullscreen-button-exit {
    display: block;
  }

  .flickity-enabled.is-fullscreen .flickity-fullscreen-button-view {
    display: none;
  }

  .flickity-fullscreen-button .flickity-button-icon {
    position: absolute;
    width: 16px;
    height: 16px;
    left: 4px;
    top: 4px;
  }
</style>

<Navigation />
<Router>
  <Route path="/" component={Listing} {...listingRouteParams.landing} />
  <Route
    path="magazine/"
    component={Listing}
    {...listingRouteParams.magazine} />
  <Route
    <Route
    path="magazine/category/:query"
    component={Listing}
    {...listingRouteParams.magazine} />
  <Route
    path="entertainment"
    component={Listing}
    {...listingRouteParams.entertainment} />
  <Route
    path="entertainment/category/:query"
    component={Listing}
    {...listingRouteParams.entertainment} />
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
  <Route
    path="magazine/:slug"
    component={Article}
    {...articleRouteParams.magazine} />
  <Route
    path="entertainment/:slug"
    component={Article}
    {...articleRouteParams.entertainment} />
  <Route path="about" component={Page} {...pageRouteParams.about} />
  <Route path="contact" component={Page} {...pageRouteParams.contact} />
  <Route path="stockists" component={Page} {...pageRouteParams.stockists} />
  <Route component={Error404} title="404" />
</Router>

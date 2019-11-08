<script>
  // # # # # # # # # # # # # #
  //
  //  NOVEMBRE.GLOBAL
  //
  // # # # # # # # # # # # # #

  // IMPORTS
  import "intersection-observer";
  import { Router, Link, Route } from "svelte-routing";
  import Navigation from "./Components/Navigation.svelte";
  import { loadPages } from "./sanity.js";

  // STORES
  import { pages } from "./stores.js";

  // ROUTES
  import Listing from "./Routes/Listing.svelte";
  import Article from "./Routes/Article.svelte";
  import About from "./Routes/About.svelte";
  import Contact from "./Routes/Contact.svelte";
  import Stockists from "./Routes/Stockists.svelte";
  import Error404 from "./Routes/Error404.svelte";

  pages.set(loadPages('*[_id == "global-config"][0]'));

  const listingRouteParams = {
    landing: {
      title: "Landing",
      showTaxonomyScroller: false,
      showFooter: false
    },
    magazine: {
      title: "Magazine",
      showTaxonomyScroller: true
    },
    bureau: {
      title: "Bureau",
      showTaxonomyScroller: true
    },
    taxonomy: {
      title: "Tag",
      showTaxonomyScroller: false,
      isQuery: true
    },
    search: {
      title: "Search",
      showTaxonomyScroller: false,
      isQuery: true
    }
  };

  const articleRouteParams = {
    bureau: {
      isBureau: true
    }
  };
</script>

<style lang="scss" global>
  @import "./variables.scss";

  html {
    background: $grey;
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

  .marker {
    background: $hotpink;
    height: 10px;
    width: 10px;
    border-radius: 10px;
  }

  blockquote {
    font-size: $large;
    line-height: 1em;
    font-style: italic;
    margin: 0;
  }

  .small {
    height: auto;
    width: 800px;
    margin-left: auto;
    margin-right: auto;
    max-width: 95vw;
    margin-bottom: $large-vertical-margin;
    font-family: $sans-stack;
    font-size: $small;
    line-height: 1.4em;
    overflow: hidden;
    a {
      color: currentColor;
      text-decoration: none;
      border-bottom: 1px solid $black;
      transition: border 0.3s $transition;

      &:hover {
        border-bottom: 1px solid transparent;
      }
    }

    p {
      margin-bottom: $small-vertical-margin;
    }

    @include screen-size("small") {
      font-size: $mobile_small;
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

    transition: opacity $transition;
  }

  .introduction {
    height: auto;
    width: 800px;
    margin-left: auto;
    margin-right: auto;
    max-width: 95vw;
    font-family: $serif-stack;
    font-style: italic;
    line-height: 1.2em;
    font-size: $intro;
    margin-bottom: $large-vertical-margin;
    line-height: 1.2em;
    transition: opacity $transition;

    @include screen-size("small") {
      font-size: $mobile_intro;
    }
  }

  .content {
    p {
      display: block;
      width: 800px;
      margin-left: auto;
      margin-right: auto;
      max-width: 95vw;
      margin-bottom: $large-vertical-margin;
      font-family: $serif-stack;
      font-size: $body;
      line-height: 1.2em;
      overflow: hidden;
      margin-bottom: $small-vertical-margin;
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

    // &.hide-text {
    //   opacity: 0;
    // }
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

  .bureau {
    p {
      column-count: 2;
      column-fill: auto;

      @include screen-size("small") {
        column-count: unset;
      }
    }
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
  <Route path="bureau" component={Listing} {...listingRouteParams.bureau} />
  <Route
    path="bureau/category/:query"
    component={Listing}
    {...listingRouteParams.bureau} />
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
  <Route
    path="bureau/:slug"
    component={Article}
    {...articleRouteParams.bureau} />
  <Route path="about" component={About} />
  <Route path="contact" component={Contact} />
  <Route path="stockists" component={Stockists} />
  <Route component={Error404} title="404" />
</Router>

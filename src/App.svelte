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

  // ROUTES
  import Listing from "./Routes/Listing.svelte";
  import Article from "./Routes/Article.svelte";
  import About from "./Routes/About.svelte";
  import Contact from "./Routes/Contact.svelte";
  import Calendar from "./Routes/Calendar.svelte";
  import Stockists from "./Routes/Stockists.svelte";
  import Error404 from "./Routes/Error404.svelte";

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
    bureau: {
      title: "Bureau",
      endpoint: baseURL + "bureau.json",
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
    bureau: {
      endpoint: baseURL + "bureau/",
      isBureau: true
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
  }

  em {
    font-family: $serif-stack;
    font-style: italic;
  }

  .credits-text {
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
  <Route
    path="magazine/:slug"
    component={Article}
    {...articleRouteParams.magazine} />
  <Route
    path="bureau/:slug"
    component={Article}
    {...articleRouteParams.bureau} />
  <Route path="about" component={About} {...pageRouteParams.about} />
  <Route path="contact" component={Contact} {...pageRouteParams.contact} />
  <Route path="calendar" component={Calendar} {...pageRouteParams.calendar} />
  <Route
    path="stockists"
    component={Stockists}
    {...pageRouteParams.stockists} />
  <Route component={Error404} title="404" />
</Router>

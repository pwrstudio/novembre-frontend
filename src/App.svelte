<script>
  import { Router, Link, Route } from "svelte-routing";

  import Navigation from "./Components/Navigation.svelte";

  // ROUTES
  import Listing from "./Routes/Listing.svelte";
  import Article from "./Routes/Article.svelte";
  import Page from "./Routes/Page.svelte";

  // const baseURL = "http://3.221.158.13/3/";
  const baseURL = "http://localhost:8888/novembre/";

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
      endpoint: baseURL + "filter.json/tag:",
      showTaxonomyScroller: false,
      isQuery: true
    },
    search: {
      title: "Search",
      endpoint: baseURL + "search.json/query:",
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
</script>

<style lang="scss" global>
  @import "./variables.scss";

  /*! Fonts ------------------- */

  @font-face {
    font-family: "Haas Grot Disp 45";
    src: url("/fonts/HaasGrotDisp-45Light.woff2") format("woff2"),
      url("/fonts/HaasGrotDisp-45Light.woff") format("woff");
    font-weight: 300;
    font-style: normal;
  }

  @font-face {
    font-family: "Adobe Caslon Pro";
    src: url("/fonts/ACaslonPro-Regular.woff2") format("woff2"),
      url("/fonts/ACaslonPro-Regular.woff") format("woff");
    font-weight: normal;
    font-style: normal;
  }

  @font-face {
    font-family: "Adobe Caslon Pro";
    src: url("/fonts/ACaslonPro-Italic.woff2") format("woff2"),
      url("/fonts/ACaslonPro-Italic.woff") format("woff");
    font-weight: normal;
    font-style: italic;
  }

  /*! Fonts ------------------- */

  body,
  html {
    padding: 0;
    margin: 0;
    width: 100vw;
    overflow-x: hidden;
    background: white;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  * {
    box-sizing: border-box;
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

  .navigation__menu span {
    display: inline;
    position: relative;
    font-size: 63px;
    color: white;
    text-decoration: none;
    font-weight: 300;
    line-height: 1em;
    cursor: pointer;
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
  <Route path="magazine" component={Listing} {...listingRouteParams.magazine} />
  <Route
    path="magazine/category/:category"
    component={Listing}
    {...listingRouteParams.magazine} />
  <Route
    path="entertainment"
    component={Listing}
    {...listingRouteParams.entertainment} />
  <Route
    path="entertainment/category/:category"
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
  <Route path="about" component={Page} title="ABOUTTT" />
  <Route path="contact" component={Page} title="CONTACT" />
  <!-- TODO: add 404 -->
</Router>

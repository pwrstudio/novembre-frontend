<script>
  // # # # # # # # # # # # # #
  //
  //  Introduction Text
  //
  // # # # # # # # # # # # # #

  // *** IMPORTS
  import { onMount, onDestroy } from "svelte";
  import { Router, links } from "svelte-routing";
  import { tick } from "svelte";
  import { fade } from "svelte/transition";

  import MediaQuery from "svelte-media-query";
  import imagesLoaded from "imagesloaded";

  // *** COMPONENTS

  // *** MODULES

  // *** PROPS
  export let bgColor = "#00ff00";

  // *** DOM REFERENCE
  let introTextEl = {};

  // *** CONSTANTS
  let VIDEO_ROOT = "https://res.cloudinary.com/pwr/video/upload/";
  let REMOTE_FOLDER = "novembre";

  // *** VARIABLES
  let active = false;
  // let elementHeight = 0;
  // let lastScrollY = 0;
  let loaded = true;
  let videoUrl = "";
  let videoSrc = "";
  let elementStyles = "background-color:" + bgColor;

  // *** ON MOUNT
  onMount(async () => {
    // imagesLoaded(previewEl, instance => {
    //   loaded = true;
    // });
    // await tick();
    // var waypointTop = new Waypoint({
    //   element: previewEl,
    //   handler: function(direction) {
    //     if (direction === "down") {
    //       navigationColor.set(!post.header.previewColor);
    //     }
    //   }
    // });
    // var waypointBottom = new Waypoint({
    //   element: previewEl,
    //   handler: function(direction) {
    //     if (direction === "up") {
    //       navigationColor.set(!post.header.previewColor);
    //     }
    //   },
    //   offset: function() {
    //     return -this.element.clientHeight;
    //   }
    // });
    // if (first) {
    //   navigationColor.set(!post.header.previewColor);
    // }
  });
</script>

<style lang="scss">
  @import "../variables.scss";

  .intro-text {
    $block: &;

    position: relative;
    user-select: none;
    color: black;
    opacity: 0;
    overflow: hidden;
    height: auto;
    min-height: 100vh;
    width: 100vw;
    font-size: $large;
    padding: $small-margin;

    &__title {
      font-size: $large;
      font-weight: 300;
      line-height: 0.85em;
      //   text-transform: uppercase;
      max-width: 95%;
      //   position: absolute;
      //   bottom: $small-margin;
      //   left: $small-margin;
      text-decoration: none;
      z-index: 1;
      font-family: $sans-stack;
      pointer-events: none;
      transition: opacity 0.3 $transition;
      margin-bottom: 8 * $small-margin;
    }
  }

  .loaded {
    opacity: 1;
  }
</style>

<div
  class="intro-text"
  class:loaded
  style={elementStyles}
  bind:this={introTextEl}
  use:links>

  <Router>

    <a href="/magazine">
      <div class="intro-text__title intro-text__title--free">
        <em>NOVEMBRE MAGAZINE</em>
        is a printed magazine published biannually, devoted to the vertiginous
        excitement of contemporary urban life.
      </div>
    </a>

    <a href="/bureau">
      <div class="intro-text__title intro-text__title--free">
        <em>NOVEMBRE BUREAU</em>
        serves as an inter-disciplinary creative agency that harnesses the
        cultural capital of Novembre Global to provide tailor-made and bespoke
        creative services for media outlets, independent labels, institutions,
        and international luxury brand.
      </div>
    </a>

  </Router>

</div>

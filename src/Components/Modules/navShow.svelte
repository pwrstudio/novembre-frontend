<script>
  // # # # # # # # # # # # # #
  //
  //  Navigation Slideshow
  //
  // # # # # # # # # # # # # #

  // *** IMPORTS
  import { onMount } from "svelte";
  import Flickity from "flickity-as-nav-for";
  import imagesLoaded from "imagesloaded";

  // *** COMPONENTS
  import Ellipse from "../Ellipse.svelte";

  // *** PROPS
  export let slides = [];
  export let navTarget = {};

  // *** STORES
  import { navigationStyle, menuActiveGlobal } from "../../stores.js";

  // *** DOM REFERENCES
  let slideShowEl = {};

  // *** CONSTANTS
  const IMGIX_PARAMS = "&auto=format";

  // *** VARIABLES
  let flkty = {};
  let loaded = false;

  // *** LOGIC
  slides.forEach(s => {
    s.url =
      s.url && s.url.length > 0
        ? s.url.replace(
            "https://testing.novembre.global",
            "https://novtest.imgix.net"
          )
        : "";
    s.thumb = s.url + "?h=140&fit=crop" + IMGIX_PARAMS;
  });

  // *** ON MOUNT
  onMount(async () => {
    let options = {
      prevNextButtons: false,
      pageDots: false,
      asNavFor: navTarget,
      freeScroll: true,
      freeScrollFriction: 0.03,
      contain: true
    };

    try {
      flkty = new Flickity(slideShowEl, options);
    } catch (err) {
      Sentry.captureException(err);
    }

    imagesLoaded(slideShowEl, instance => {
      try {
        if (flkty && "resize" in flkty) {
          flkty.resize();
        }
      } catch (err) {
        Sentry.captureException(err);
      }
      loaded = true;
    });
  });
</script>

<style lang="scss">
  @import "../../variables.scss";

  .container {
    position: relative;
    height: 140px;

    @include screen-size("small") {
      height: 120px;
    }
  }

  .loading {
    text-align: center;
    line-height: 140px;
    font-size: $body;
    font-family: $sans-stack;
    display: block;
    background: $grey;

    @include screen-size("small") {
      line-height: 120px;
      font-size: $mobile_body;
      height: 120px;
    }
  }

  .loading {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 140px;
    text-align: center;
    line-height: 140px;
    font-size: $body;
    font-family: $sans-stack;
    display: block;
    background: $grey;

    @include screen-size("small") {
      line-height: 120px;
      font-size: $mobile_body;
      height: 120px;
    }
  }

  .slideshow {
    width: 100%;
    height: 140px;

    opacity: 0;

    @include screen-size("small") {
      height: 120px;
    }

    &__slideshow {
      height: 100%;
    }

    &__slide {
      height: auto;
      margin-left: $small-margin;
      margin-right: $small-margin;
      cursor: pointer !important;

      @include screen-size("small") {
        height: 120px;
      }
      &:hover {
        opacity: 0.8;
      }
    }

    &__slide-image {
      height: 100%;
    }

    &.loaded {
      opacity: 1;
    }
  }
</style>

<div class="container">
  <div class="carousel slideshow" class:loaded bind:this={slideShowEl}>
    {#each slides as slide}
      <div class="carousel-cell slideshow__slide">
        <img
          class="slideshow__slide-image"
          src={slide.thumb}
          alt={slide.caption} />
      </div>
    {/each}
  </div>

  {#if !loaded}
    <div class="loading">
      LOADING
      <Ellipse />
    </div>
  {/if}
</div>

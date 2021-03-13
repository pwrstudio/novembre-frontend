<script>
  // # # # # # # # # # # # # #
  //
  //  MINI-SLIDESHOW
  //
  // # # # # # # # # # # # # #

  // *** IMPORTS
  import { onMount } from "svelte";
  import Flickity from "flickity-as-nav-for";
  import imagesLoaded from "imagesloaded";
  import { urlFor } from "../../sanity.js";

  // *** COMPONENTS
  import Ellipse from "../Ellipse.svelte";

  // *** PROPS
  export let imageArray = [];
  export let navTarget = {};

  // *** DOM REFERENCES
  let slideShowEl = {};

  // *** VARIABLES
  let flkty = {};
  let loaded = false;

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
    height: 120px;

    @include screen-size("small") {
      height: 100px;
    }
  }

  .loading {
    text-align: center;
    line-height: 120px;
    font-size: $body;
    font-family: $sans-stack;
    display: block;
    background: $grey;

    @include screen-size("small") {
      line-height: 120px;
      font-size: $mobile_body;
      height: 100px;
    }
  }

  .loading {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 120px;
    text-align: center;
    line-height: 120px;
    font-size: $body;
    font-family: $sans-stack;
    display: block;
    background: $grey;

    @include screen-size("small") {
      line-height: 100px;
      font-size: $mobile_body;
      height: 100px;
    }
  }

  .slideshow {
    width: 100%;
    height: 100px;

    opacity: 0;

    @include screen-size("small") {
      height: 100px;
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
        height: 100px;
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
    {#each imageArray as slide}
      <div class="carousel-cell slideshow__slide">
        <img
          alt="novembre.global"
          class="slideshow__slide-image"
          src={urlFor(slide)
            .height(140)
            .quality(80)
            .auto('format')
            .url()} />
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

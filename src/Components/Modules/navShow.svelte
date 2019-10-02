<script>
  // # # # # # # # # # # # # #
  //
  //  Navigation Slideshow module
  //
  // # # # # # # # # # # # # #

  // *** IMPORTS
  import { onMount } from "svelte";
  import { Router, links } from "svelte-routing";
  import Flickity from "flickity-as-nav-for";
  import imagesLoaded from "imagesloaded";

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

  //   console.log(slides);
  //   console.log(slides.length);
  //   console.log(slides.length == 1);

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
    console.log("target", navTarget);
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
      console.log(err);
      Sentry.captureException(err);
    }

    console.log("NAV", flkty);

    imagesLoaded(slideShowEl, instance => {
      console.dir(instance);
      console.log("NAV images-loaded");
      flkty.resize();
      loaded = true;
    });
  });
</script>

<style lang="scss">
  @import "../../variables.scss";

  .slideshow {
    width: 100%;
    height: 140px;
    margin-top: 10px;
    margin-bottom: 60px;

    &__slideshow {
      height: 100%;
    }

    &__slide {
      height: auto;
      margin-left: $small-margin;
      margin-right: $small-margin;
      cursor: pointer !important;

      &:hover {
        opacity: 0.8;
      }
    }

    &__slide-image {
      height: 100%;
    }

    opacity: 0;

    &.loaded {
      opacity: 1;
    }
  }
</style>

<Router>

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

</Router>

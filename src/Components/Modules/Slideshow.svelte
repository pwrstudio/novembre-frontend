<script>
  // # # # # # # # # # # # # #
  //
  //  Slideshow module
  //
  // # # # # # # # # # # # # #

  // *** IMPORTS
  import { onMount } from "svelte";
  import { Router, links } from "svelte-routing";
  import Flickity from "flickity-imagesloaded";

  // *** PROPS
  export let slides = [];
  export let isRelated = false;
  export let isPreview = false;
  export let first = false;

  // *** DOM REFERENCES
  let slideShowEl = {};

  // *** CONSTANTS
  const IMGIX_PARAMS = "&auto=format";

  // *** VARIABLES
  let flkty = {};
  let options = {
    wrapAround: true,
    prevNextButtons: false,
    pageDots: false,
    freeScroll: true,
    autoPlay: 5000,
    imagesLoaded: true,
    freeScrollFriction: 0.03
    // lazyLoad: 3
  };

  // *** FUNCTIONS

  // --- Build urls
  slides.forEach(s => {
    s.url = s.url.replace(
      "https://testing.novembre.global",
      "https://novtest.imgix.net"
    );
    s.src = s.url + "?w=800" + IMGIX_PARAMS;
    s.srcset = ["", 200, 400, 600, 800, 1000, 1200, 1400].reduce(
      (result, size) => {
        return (
          result + s.url + "?w=" + size + IMGIX_PARAMS + " " + size + "w, "
        );
      }
    );
    s.sizes = "(max-width: 500px) 100vw, (max-width: 800px) 50vw, 33vw";
  });

  // *** ON MOUNT
  onMount(async () => {
    try {
      flkty = new Flickity(slideShowEl, options);
    } catch (err) {
      Sentry.captureException(err);
    }
  });
</script>

<style lang="scss">
  @import "../../variables.scss";

  .slideshow {
    width: 100%;
    height: $full-height;
    max-height: 600px;

    &--related {
      max-height: unset;
    }

    @include screen-size("small") {
      height: unset;
    }

    &__slideshow {
      cursor: ew-resize;
      height: 100%;
    }

    &__slide {
      height: 100%;

      &--related {
        width: 50%;
        height: 600px;

        @include screen-size("small") {
          width: 80%;
          height: 400px;
        }
      }
    }

    &__slide-image {
      height: 100%;

      &--related {
        width: 100%;
        object-fit: cover;
      }
    }

    &__slide-video {
      height: 100%;
    }

    &__title {
      font-family: $sans-stack;
      font-size: $large;
      font-weight: 300;
      line-height: 1em;
      text-transform: uppercase;
      line-height: 0.9em;
      position: absolute;
      bottom: $small-margin;
      left: $small-margin;
      max-width: 95%;

      em {
        font-family: $serif-stack;
        font-style: italic;
      }

      @include screen-size("small") {
        font-size: $mobile_large;
      }

      &--white {
        color: white;
      }
    }

    &.first {
      max-height: unset;
    }
  }

  .hidden {
    opacity: 0;
  }
</style>

<Router>
  <div
    class="carousel slideshow"
    bind:this={slideShowEl}
    class:slideshow--related={isRelated}
    class:first
    use:links>
    {#each slides as slide}
      {#if isRelated}
        <div class="carousel-cell slideshow__slide slideshow__slide--related">
          <a href="/{slide.parent}/{slide.slug}">
            <img
              class="slideshow__slide-image slideshow__slide-image--related"
              srcset={slide.srcset}
              sizes={slide.sizes}
              src={slide.src}
              alt={slide.caption} />
            <div
              class="slideshow__title"
              class:slideshow__title--white={slide.header.previewColor}>
              {#if slide}{slide.title}{/if}
            </div>
          </a>
        </div>
      {:else}
        <div class="carousel-cell slideshow__slide">
          <img
            class="slideshow__slide-image"
            srcset={slide.srcset}
            sizes={slide.sizes}
            src={slide.src}
            alt={slide.caption} />
        </div>
      {/if}
    {/each}
  </div>
</Router>

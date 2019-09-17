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
  import "flickity-fullscreen";

  // *** PROPS
  export let slides;
  export let isRelated = false;
  export let isPreview = false;

  // *** VARIABLES
  let hidden = false;
  let paddedSlides = [];
  let imgixParams = "&auto=format";
  let options = {
    wrapAround: true,
    prevNextButtons: false,
    pageDots: false,
    freeScroll: true,
    // autoPlay: 5000,
    // groupCells: 1,
    imagesLoaded: true,
    // selectedAttraction: 0.028,
    // friction: 0.28,
    fullscreen: false,
    freeScrollFriction: 0.05,
    lazyLoad: 3
  };

  // *** DOM REFERENCES
  let slideShowEl;

  // *** FUNCTIONS
  slides.forEach(s => {
    s.url = s.url.replace(
      "https://testing.novembre.global",
      "https://novmag.imgix.net"
    );
    s.src = s.url + "?w=800" + imgixParams;
    s.srcset = ["", 200, 400, 600, 800, 1000, 1200, 1400].reduce(
      (result, size) => {
        return result + s.url + "?w=" + size + imgixParams + " " + size + "w, ";
      }
    );
    s.sizes = "(max-width: 500px) 100vw, (max-width: 800px) 50vw, 33vw";
  });

  if (slides.length < 8) {
    const arrayLength = slides.length - 1;
    let arrayIndex = 0;
    for (let i = 0; i < 8; i++) {
      paddedSlides.push(slides[arrayIndex]);
      if (arrayIndex == arrayLength) {
        arrayIndex = 0;
      } else {
        arrayIndex++;
      }
    }
  } else {
    paddedSlides = slides;
  }

  // *** ON MOUNT
  onMount(async () => {
    if (slideShowEl) {
      if (!isPreview && !isRelated) {
        options.fullscreen = true;
      }
      // if (window.matchMedia("(max-width: 800px)").matches) {
      //   console.log("mopbile");
      //   options.groupCells = 1;
      // }

      let flkty = new Flickity(slideShowEl, options);
    }
  });
</script>

<style lang="scss">
  @import "../../variables.scss";

  .slideshow {
    width: 100%;
    height: $full-height;
    max-height: 600px;

    // &--related {
    //   height: 500px;
    // }

    @include screen-size("small") {
      height: 100vh;
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

      // @include screen-size("small") {
      //   width: 50%;
      // }
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
  }

  .hidden {
    opacity: 0;
  }

  .flickity-enabled.is-fullscreen {
    position: fixed;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background: hsla(0, 0%, 0%, 0.9);
    padding-bottom: 35px;
    z-index: 1;
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
</style>

<div
  class="carousel slideshow"
  bind:this={slideShowEl}
  class:slideshow--related={isRelated}
  use:links>
  {#each paddedSlides as slide}
    {#if isRelated}
      <div class="carousel-cell slideshow__slide slideshow__slide--related">
        <a href="/{slide.parent}/{slide.slug}">
          <img
            class="slideshow__slide-image slideshow__slide-image--related"
            data-flickity-lazyload-srcset={slide.srcset}
            sizes={slide.sizes}
            data-flickity-lazyload-src={slide.src}
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
          data-flickity-lazyload-srcset={slide.srcset}
          sizes={slide.sizes}
          data-flickity-lazyload-src={slide.src}
          alt={slide.caption} />
      </div>
    {/if}
  {/each}
</div>

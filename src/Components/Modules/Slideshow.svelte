<script>
  import { onMount } from "svelte";
  import Flickity from "flickity-imagesloaded";
  import { Router, links } from "svelte-routing";

  export let slides;
  export let isRelated = false;

  let paddedSlides = [];
  let slideShowEl;

  let hidden = false;

  console.log("is related: ", isRelated);
  console.log(slides);

  // TEMP SOLUTION

  slides.forEach(s => {
    if (s.url) {
      s.url =
        s.url.replace("http://3.221.158.133", "https://novmag.imgix.net") +
        "?w=600&auto=compress&auto=format";
    }
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

  onMount(async () => {
    if (slideShowEl) {
      let options = {
        wrapAround: true,
        prevNextButtons: false,
        pageDots: false,
        autoPlay: 5000,
        groupCells: 1,
        imagesLoaded: true,
        selectedAttraction: 0.028,
        friction: 0.28,
        fullscreen: true
      };
      // if (window.matchMedia("(max-width: 800px)").matches) {
      //   console.log("mopbile");
      //   options.groupCells = 1;
      // }

      hidden = false;

      // trigger redraw for transition
      slideShowEl.offsetHeight;

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

    @include screen-size("small") {
      max-height: 500px;
    }

    &__slideshow {
      cursor: ew-resize;
      height: 100%;
    }

    &__slide {
      height: 100%;

      &--related {
        width: 33.333%;

        @include screen-size("small") {
          width: 66.666%;
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
      bottom: 15px;
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
</style>

<div class="carousel slideshow" bind:this={slideShowEl} use:links>
  {#each paddedSlides as slide}
    {#if isRelated}
      <div class="carousel-cell slideshow__slide slideshow__slide--related">
        <a href="/{slide.parent}/{slide.slug}">
          <img
            class="slideshow__slide-image slideshow__slide-image--related"
            src={slide.url}
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
          src={slide.url}
          alt={slide.caption} />
      </div>
    {/if}
  {/each}
</div>

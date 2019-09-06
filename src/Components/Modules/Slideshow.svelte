<script>
  import { onMount } from "svelte";
  import Flickity from "flickity-imagesloaded";
  // import { Router, links } from "svelte-routing";

  export let slides;
  export let isRelated = false;

  let paddedSlides = [];
  let slideShowEl;

  let hidden = false;

  // console.log("is related: ", isRelated);
  // console.log(slides);

  // TEMP SOLUTION

  slides.forEach(s => {
    if (s.url) {
      s.url =
        s.url.replace(
          "http://localhost:8888/novembre",
          "https://novmag.imgix.net"
        ) + "?w=600&auto=compress&auto=format";
    }
  });

  if (slides.length < 8) {
    const arrayLength = slides.length - 1;
    let arrayIndex = 0;
    // console.log("length", arrayLength);
    for (let i = 0; i < 8; i++) {
      // console.log("i", i);
      // console.log("arrayIndex", arrayIndex);
      // console.log(slides[arrayIndex]);
      paddedSlides.push(slides[arrayIndex]);
      // console.log(slides);
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
        groupCells: 2,
        imagesLoaded: true,
        selectedAttraction: 0.028,
        friction: 0.28,
        fullscreen: true
      };

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

    &__slideshow {
      cursor: ew-resize;
      height: 100%;
    }

    &__slide {
      height: 100%;
    }

    &__slide-image {
      height: 600px;
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
        font-size: $mobile_xlarge;
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

<div class="carousel slideshow" bind:this={slideShowEl}>
  {#each paddedSlides as slide}
    <div class="carousel-cell slideshow__slide">

      {#if isRelated}
        <a href="/{slide.parent}/{slide.slug}">
          <img
            class="slideshow__slide-image"
            src={slide.url}
            alt={slide.caption} />
          <div
            class="slideshow__title"
            class:slideshow__title--white={slide.header.previewColor}>
            {slide.title}
          </div>
        </a>
      {:else}
        <img
          class="slideshow__slide-image"
          src={slide.url}
          alt={slide.caption} />
      {/if}

    </div>
  {/each}
</div>

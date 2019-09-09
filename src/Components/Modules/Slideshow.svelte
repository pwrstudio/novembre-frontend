<script>
  import { onMount } from "svelte";
  import Flickity from "flickity-imagesloaded";
  import { Router, links } from "svelte-routing";

  export let slides;
  export let isRelated = false;

  let paddedSlides = [];
  let slideShowEl;
  let imgixParams = "&auto=format";

  let hidden = false;

  // console.log("is related: ", isRelated);
  // console.log(slides);

  // TEMP SOLUTION

  slides.forEach(s => {
    s.url = s.url.replace("https://testing.novembre.global", "https://novmag.imgix.net");
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
          width: 80%;
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

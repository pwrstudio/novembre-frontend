<script>
  import { onMount } from "svelte";
  import Flickity from "flickity-imagesloaded";

  export let related;
  let paddedRelated = [];
  let slideShowEl;

  console.log(related);

  console.log(typeof related);

  // TEMP SOLUTION

  related.forEach(s => {
    s.previewImage =
      s.previewImage.replace(
        "http://3.221.158.133",
        "https://novmag.imgix.net"
      ) + "?w=600&auto=compress&auto=format";
  });

  if (related.length < 8) {
    const arrayLength = related.length - 1;
    let arrayIndex = 0;
    console.log("length", arrayLength);
    for (let i = 0; i < 8; i++) {
      console.log("i", i);
      console.log("arrayLength", arrayLength);
      console.log("arrayIndex", arrayIndex);
      console.log(related[arrayIndex]);
      paddedRelated.push(related[arrayIndex]);
      if (arrayIndex == arrayLength) {
        arrayIndex = 0;
      } else {
        arrayIndex++;
      }
    }
  } else {
    paddedRelated = related;
  }

  console.log(paddedRelated);

  onMount(async () => {
    if (slideShowEl) {
      console.log("::::: RELATED INIT");

      let options = {
        wrapAround: true,
        prevNextButtons: false,
        pageDots: false,
        autoPlay: 5000,
        imagesLoaded: true,
        groupCells: 2,
        selectedAttraction: 0.028,
        friction: 0.28,
        fullscreen: true
      };

      // trigger redraw for transition
      slideShowEl.offsetHeight;

      // init Flickity
      new Flickity(slideShowEl, options);
    }
  });
</script>

<style lang="scss">
  @import "../variables.scss";

  .related {
    width: 100%;
    // height: 600px;

    font-family: $sans-stack;
    font-size: $large;

    &__header {
      font-weight: 300;
      line-height: 1em;
      text-transform: uppercase;
      margin-bottom: 0px;
      line-height: 0.9em;

      @include screen-size("small") {
        font-size: $mobile_xlarge;
      }
    }

    &__title {
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
    }

    &__slideshow {
      height: $full-height;
    }

    a {
      color: currentColor;
    }

    &__slide-image {
      height: 100%;
      max-width: 40vw;
      object-fit: cover;
    }

    &__slide-video {
      height: 100%;
      max-width: 40vw;
      object-fit: cover;
    }
  }

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

      &--white {
        color: white;
      }
    }

    &__slide-image {
      height: 600px;
    }

    &__slide-video {
      height: 100%;
    }
  }

  .hidden {
    opacity: 0;
  }
</style>

<div class="related">

  <div class="related__header">RELATED ARTICLES</div>

  <div class="carousel slideshow" bind:this={slideShowEl}>
    {#each paddedRelated as slide}
      <div
        class="carousel-cell slideshow__slide"
        class:slideshow__slide--white={!slide.header.previewColor}>
        <a href="/{slide.parent}/{slide.slug}">
          <img
            class="slideshow__slide-image"
            alt={slide.title}
            src={slide.previewImage} />
          <div class="related__title">{slide.title}</div>
        </a>
      </div>
    {/each}
  </div>

</div>

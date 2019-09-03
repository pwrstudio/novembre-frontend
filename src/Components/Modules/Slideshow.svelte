<script>
  import { onMount } from "svelte";
  import Flickity from "flickity-imagesloaded";

  export let slides;
  let paddedSlides = [];
  let slideShowEl;

  let hidden = false;

  // TEMP SOLUTION

  slides.forEach(s => {
    s.url =
      s.url.replace("http://3.221.158.133", "https://novmag.imgix.net") +
      "?w=600&auto=compress&auto=format";
    // console.log(s.url);
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

  // console.dir(paddedSlides);

  onMount(async () => {
    if (slideShowEl) {
      // setTimeout(() => {
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

      // init Flickity
      let flkty = new Flickity(slideShowEl, options);
      // flkty.reposition();
      // }, 2000);
      // console.log("::::: SLIDESHOW INIT");
    }
  });
</script>

<style lang="scss">
  @import "../variables.scss";
  @import "../flickity.scss";

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
  }

  .hidden {
    opacity: 0;
  }
</style>

<div class="carousel slideshow" bind:this={slideShowEl}>
  {#each paddedSlides as slide}
    <div class="carousel-cell slideshow__slide">
      <img class="slideshow__slide-image" src={slide.url} alt={slide.caption} />
    </div>
  {/each}
</div>

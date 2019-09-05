<script>
  import { onMount } from "svelte";
  import { Router, links } from "svelte-routing";
  import Slideshow from "./Modules/Slideshow.svelte";

  export let related;
  let slideShowEl;

  console.log(related);

  console.log(typeof related);

  // TEMP SOLUTION
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

<Router>
  <div class="related">

    <div class="related__header">RELATED ARTICLES</div>

      <Slideshow slides={related} />

<!-- 
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
    </div> -->

  </div>
</Router>

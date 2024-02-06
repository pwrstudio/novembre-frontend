<script>
  // # # # # # # # # # # # # #
  //
  //  FLIPSHOW
  // *
  // # # # # # # # # # # # # #

  // *** IMPORTS
  import { onMount } from "svelte"
  import { Router, links } from "svelte-routing"
  import imagesLoaded from "imagesloaded"
  import get from "lodash/get"
  import { urlFor } from "../../sanity.js"
  import { Swiper, SwiperSlide } from "swiper/svelte"

  // *** COMPONENTS
  import Ellipse from "../Ellipse.svelte"

  // *** PROPS
  export let imageArray = []

  // *** DOM REFERENCES
  let slideShowEl = {}

  // *** VARIABLES
  let hovered = true

  // *** ON MOUNT
  // onMount(async () => {})
</script>

<Router>
  <div
    class="container"
    on:mouseenter={() => {
      hovered = true
    }}
    on:mouseleave={() => {
      hovered = false
    }}
  >
    <!-- MAIN -->
    <div class="carousel slideshow" bind:this={slideShowEl} use:links>
      <Swiper centeredSlides={true} loop={true} slidesPerView={2}>
        {#each imageArray as slide}
          <SwiperSlide>
            <img
              class="slideshow__slide-image"
              src={urlFor(slide).width(1200).quality(100).auto("format").url()}
            />
          </SwiperSlide>
        {/each}
      </Swiper>
      <!-- </div> -->
    </div>
  </div>
</Router>

<style lang="scss">
  @import "../../variables.scss";

  .container {
    position: relative;

    @include screen-size("small") {
      height: 400px;
    }
  }

  .slideshow {
    width: 100vw;
    height: 100vh;
    opacity: 1;
    overflow: hidden;

    @include screen-size("small") {
      height: 400px;
    }

    &__slideshow {
      height: 100%;
    }

    &__slide-image {
      height: 100%;
      width: 100%;
      object-fit: cover;

      @include screen-size("small") {
        height: 400px;
      }

      &--related {
        width: 100%;
        object-fit: cover;
      }
    }

    &__slide {
      height: 100%;
      position: relative;

      @include screen-size("small") {
        height: 400px;
      }

      &:hover {
        .slideshow__slide-caption {
          opacity: 1;
          transition-delay: 0.85s;
        }
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
      color: $white;

      em {
        font-family: $serif-stack;
        font-style: italic;
      }

      @include screen-size("small") {
        font-size: $mobile_large;
      }

      &.double {
        @include screen-size("small") {
          font-size: $mobile_intro;
        }
      }
    }

    &.first {
      max-height: unset;
    }
  }

  .hidden {
    opacity: 0;
  }

  .navigation {
    opacity: 0;
    position: absolute;
    top: 50%;
    height: 60px;
    margin-top: -50px;
    z-index: 99;
    cursor: pointer;
    transition:
      transform 0.3s $transition,
      opacity 0.5s $transition;

    @include screen-size("small") {
      display: none;
    }

    &:hover {
      transform: scale(1.2);
    }

    &.hovered {
      opacity: 1;
    }
  }

  .previous {
    height: 100px;
    left: 10px;
  }

  .next {
    height: 100px;
    right: 10px;
  }

  .arrow {
    height: 100px;
  }

  :global(.swiper-slide) {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  :global(.swiper-wrapper) {
    height: 100vh !important;
  }
</style>

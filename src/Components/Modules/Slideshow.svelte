<script>
  // # # # # # # # # # # # # #
  //
  //  SLIDESHOW
  //
  // # # # # # # # # # # # # #

  // *** IMPORTS
  import { onMount } from "svelte";
  import { Router, links } from "svelte-routing";
  import Flickity from "flickity";
  import imagesLoaded from "imagesloaded";
  import get from "lodash/get";

  import { urlFor } from "../../sanity.js";

  // *** COMPONENTS
  import Ellipse from "../Ellipse.svelte";

  // *** PROPS
  export let imageArray = [];
  export let isRelated = false;
  export let isListing = false;
  export let autoplay = false;

  import NavShow from "./navShow.svelte";

  // *** STORES
  import { navigationColor, menuActiveGlobal } from "../../stores.js";

  // *** DOM REFERENCES
  let slideShowEl = {};
  let navSlideShowEl = {};

  // *** VARIABLES
  let flkty = {};
  let navFlkty = {};
  const tickerSpeed = 0.4;
  let isPaused = true;
  let loaded = false;
  let hovered = true;

  console.log("slids");
  console.dir(imageArray);

  const pauseSlideshow = () => {
    isPaused = true;
  };

  const playSlideshow = () => {
    if (isPaused) {
      isPaused = false;
      window.requestAnimationFrame(update);
    }
  };

  const update = () => {
    if (isPaused) return;
    if (flkty.slides) {
      flkty.x = (flkty.x - tickerSpeed) % flkty.slideableWidth;
      flkty.selectedIndex = flkty.dragEndRestingSelect();
      flkty.updateSelectedSlide();
      flkty.settle(flkty.x);
    }
    window.requestAnimationFrame(update);
  };

  const startTicker = function() {
    let options = {
      wrapAround: true,
      autoPlay: false,
      draggable: true,
      prevNextButtons: false,
      pageDots: false,
      imagesLoaded: true,
      freeScrollFriction: 0.03
    };

    try {
      flkty = new Flickity(slideShowEl, options);
    } catch (err) {
      Sentry.captureException(err);
    }
    flkty.x = 0;

    flkty.on("dragStart", () => {
      isPaused = true;
    });

    playSlideshow();

    imagesLoaded(slideShowEl, instance => {
      try {
        if (flkty && "resize" in flkty) {
          flkty.resize();
        }
      } catch (err) {
        Sentry.captureException(err);
      }
      loaded = true;
    });
  };

  // *** ON MOUNT
  onMount(async () => {
    if (imageArray.length > 2) {
      if ((autoplay == true || autoplay == 1) && !isRelated) {
        startTicker();
      } else {
        let options = {
          wrapAround: true,
          prevNextButtons: false,
          pageDots: false,
          freeScroll: true,
          imagesLoaded: true,
          freeScrollFriction: 0.03,
          lazyLoad: 3
        };

        try {
          flkty = new Flickity(slideShowEl, options);
        } catch (err) {
          Sentry.captureException(err);
        }
      }
    }

    imagesLoaded(slideShowEl, instance => {
      try {
        if (flkty && "resize" in flkty) {
          flkty.resize();
        }
      } catch (err) {
        Sentry.captureException(err);
      }
      loaded = true;
    });
  });
</script>

<style lang="scss">
  @import "../../variables.scss";

  .container {
    position: relative;

    @include screen-size("small") {
      height: 400px;
    }
  }

  .nav-container {
    height: 140px;
    width: 100%;
    margin-top: $small-vertical-margin;
    margin-bottom: $large-vertical-margin;

    @include screen-size("small") {
      height: 120px;
    }
  }

  .loading {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 600px;
    text-align: center;
    line-height: 600px;
    font-size: $body;
    font-family: $sans-stack;
    display: block;
    background: rgba(0, 0, 0, 0.05);
    background: $grey;

    @include screen-size("small") {
      line-height: 400px;
      font-size: $mobile_body;
      height: 400px;
    }
  }

  .slideshow {
    width: 100%;
    height: 600px;
    opacity: 0;

    @include screen-size("small") {
      height: 400px;
    }

    &--related {
      max-height: unset;
    }

    &--preview {
      cursor: pointer;
    }

    &__slideshow {
      height: 100%;
    }

    &__slide-image {
      height: 100%;

      @include screen-size("small") {
        height: 400px;
      }

      &--related {
        width: 100%;
        object-fit: cover;
      }
    }

    &__slide-caption {
      color: white;
      position: absolute;
      bottom: 0;
      left: 0;
      padding: 10px;
      font-family: $sans-stack;
      font-size: $small;
      width: 100%;
      opacity: 0;
      transition-delay: 0s;
      transition: opacity 0.5s $transition;
    }

    &__slide {
      height: 100%;
      position: relative;

      @include screen-size("small") {
        height: 400px;
      }

      &--related {
        width: 50%;
        height: 600px;

        @include screen-size("small") {
          width: 100%;
          height: 400px;
        }
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
      color: white;

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

    &.loaded {
      opacity: 1;
    }
  }

  .hidden {
    opacity: 0;
  }

  .static-related {
    width: 100%;
    height: 600px;

    &.single {
      a {
        position: relative;
        width: 100%;
        height: 100%;

        img {
          height: 100%;
          object-fit: cover;
          width: 100%;
        }
      }
    }

    &.double {
      a {
        position: relative;
        float: left;
        width: 50%;
        height: 100%;

        img {
          height: 100%;
          object-fit: cover;
          width: 100%;
        }
      }
    }
  }

  .navigation {
    opacity: 0;
    position: absolute;
    top: 50%;
    height: 60px;
    margin-top: -50px;
    z-index: 99;
    cursor: pointer;
    transition: transform 0.3s $transition, opacity 0.5s $transition;

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
</style>

<Router>
  {#if imageArray.length > 2}
    <div
      class="container"
      on:mouseenter={() => {
        hovered = true;
        if ((autoplay == true || autoplay == 1) && !isRelated && !isListing) {
          pauseSlideshow();
        }
      }}
      on:mouseleave={() => {
        hovered = false;
        if ((autoplay == true || autoplay == 1) && !isRelated && !isListing) {
          playSlideshow();
        }
      }}>

      {#if !loaded}
        <div class="loading">
          LOADING
          <Ellipse />
        </div>
      {/if}

      <!-- MAIN -->
      <div
        class="carousel slideshow"
        bind:this={slideShowEl}
        class:slideshow--related={isRelated}
        class:slideshow--preview={isListing}
        class:loaded
        use:links>
        {#each imageArray as slide}
          {#if isRelated}
            <div
              class="carousel-cell slideshow__slide slideshow__slide--related">
              <a href="/{slide.category}/{slide.slug}">
                <img
                  class="slideshow__slide-image slideshow__slide-image--related"
                  src={urlFor(get(slide, 'relatedSlideshow.image', slide.mainImage))
                    .height(600)
                    .quality(80)
                    .auto('format')
                    .url()}
                  alt={slide.title} />
                <div
                  class="slideshow__title"
                  style="color: {get(slide, 'relatedSlideshow.textColor.hex', 'white')};">
                  {@html slide.title}
                </div>
              </a>
            </div>
          {:else}
            <div class="carousel-cell slideshow__slide">
              <img
                class="slideshow__slide-image"
                src={urlFor(slide)
                  .height(600)
                  .quality(80)
                  .auto('format')
                  .url()}
                alt={slide.caption} />
              {#if slide.caption}
                <div class="slideshow__slide-caption">{slide.caption}</div>
              {/if}
            </div>
          {/if}
        {/each}
      </div>

      <div
        class="navigation previous"
        class:hovered
        type="button"
        aria-label="Previous"
        on:click={e => {
          e.stopPropagation();
          e.preventDefault();
          flkty.next(true);
        }}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="80"
          height="120"
          viewBox="0 0 24 24"
          fill="none"
          stroke="white"
          stroke-width="0.5"
          class="feather feather-chevron-left arrow">
          <polyline points="15 18 9 12 15 6" />
        </svg>
      </div>

      <div
        class="navigation next"
        class:hovered
        type="button"
        aria-label="Previous"
        on:click={e => {
          e.stopPropagation();
          e.preventDefault();
          flkty.previous(true);
        }}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="80"
          height="120"
          viewBox="0 0 24 24"
          fill="none"
          stroke="white"
          stroke-width="0.5"
          class="feather feather-chevron-left arrow">
          <polyline points="9 18 15 12 9 6" />
        </svg>
      </div>
    </div>
    {#if !isListing && !isRelated}
      <div
        class="nav-container"
        on:mouseenter={() => {
          hovered = true;
          if (autoplay == true || autoplay == 1) {
            pauseSlideshow();
          }
        }}
        on:mouseleave={() => {
          hovered = false;
          if (autoplay == true || autoplay == 1) {
            playSlideshow();
          }
        }}>
        {#if loaded && !isListing && !isRelated}
          <NavShow {imageArray} navTarget={slideShowEl} />
        {/if}
      </div>
    {/if}
  {:else if imageArray.length === 2}
    <div class="static-related double">
      {#if isRelated}
        <a href="/{imageArray[0].category}/{imageArray[0].slug}">
          <img
            src={urlFor(get(imageArray[0], 'relatedSlideshow.image', imageArray[0].mainImage))
              .height(600)
              .quality(80)
              .auto('format')
              .url()}
            alt={imageArray[0].title} />
          <div
            class="slideshow__title double"
            style="color: {get(imageArray[0], 'relatedSlideshow.textColor.hex', 'white')};">
            {@html imageArray[0].title}
          </div>
        </a>
        <a href="/{imageArray[1].category}/{imageArray[1].slug}">
          <img
            src={urlFor(get(imageArray[1], 'relatedSlideshow.image', imageArray[1].mainImage))
              .height(600)
              .quality(80)
              .auto('format')
              .url()}
            alt={imageArray[1].title} />
          <div
            class="slideshow__title double"
            style="color: {get(imageArray[1], 'relatedSlideshow.textColor.hex', 'white')};">
            {@html imageArray[1].title}
          </div>
        </a>
      {:else}
        <img
          src={urlFor(imageArray[0].mainImage)
            .height(600)
            .quality(90)
            .auto('format')
            .url()}
          alt={imageArray[0].title} />
        <img
          src={urlFor(imageArray[1].mainImage)
            .height(600)
            .quality(90)
            .auto('format')
            .url()}
          alt={imageArray[1].title} />
      {/if}
    </div>
  {:else if imageArray.length === 1}
    <div class="static-related single">
      {#if isRelated}
        <a href="/{imageArray[0].category}/{imageArray[0].slug}">
          <img
            src={urlFor(get(imageArray[0], 'relatedSlideshow.image', imageArray[0].mainImage))
              .width(1200)
              .quality(90)
              .auto('format')
              .url()}
            alt={imageArray[0].title} />
          <div
            class="slideshow__title"
            style="color: {get(imageArray[0], 'relatedSlideshow.textColor.hex', 'white')};">
            {@html imageArray[0].title}
          </div>
        </a>
      {:else}
        <img
          src={urlFor(imageArray[0].mainImage)
            .width(1200)
            .quality(90)
            .auto('format')
            .url()}
          alt={imageArray[0].title} />
      {/if}
    </div>
  {/if}
</Router>

<script>
  // # # # # # # # # # # # # #
  //
  //  Slideshow module
  //
  // # # # # # # # # # # # # #

  // *** IMPORTS
  import { onMount } from "svelte";
  import { Router, links } from "svelte-routing";
  import Flickity from "flickity";
  import imagesLoaded from "imagesloaded";
  import throttle from "just-throttle";

  // *** COMPONENTS
  import Ellipse from "../Ellipse.svelte";

  // *** PROPS
  export let slides = [];
  export let isRelated = false;
  export let isPreview = false;
  export let first = false;
  export let autoplay = false;

  import NavShow from "./navShow.svelte";

  // *** STORES
  import { navigationStyle, menuActiveGlobal } from "../../stores.js";

  // *** DOM REFERENCES
  let slideShowEl = {};
  let navSlideShowEl = {};
  let slideShowNavEl = {};

  // console.log("autoplay", autoplay);

  // *** CONSTANTS
  const IMGIX_PARAMS = "&auto=format&q=90";

  // *** VARIABLES
  let flkty = {};
  let navFlkty = {};
  let tickerSpeed = 0.4;
  let isPaused = false;
  let loaded = false;
  let hovered = true;

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
  };

  // *** LOGIC

  // --- Build urls
  if (slides.length == 1) {
    slides[0].url =
      slides[0].url && slides[0].url.length > 0
        ? slides[0].url.replace(
            "https://testing.novembre.global",
            "https://novtest.imgix.net"
          )
        : "";
    slides[0].src =
      slides[0].url +
      "?w=1400" +
      "&ar=16:9&max-h=600&fit=crop&crop=faces&auto=format";
  } else {
    slides.forEach(s => {
      s.url =
        s.url && s.url.length > 0
          ? s.url.replace(
              "https://testing.novembre.global",
              "https://novtest.imgix.net"
            )
          : "";
      s.src = s.url + "?h=800" + IMGIX_PARAMS;
    });
  }

  const observer = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (entry.intersectionRatio > 0.1) {
          playSlideshow();
        }
        if (entry.intersectionRatio < 0.1) {
          pauseSlideshow();
        }
      });
    },
    { threshold: [0, 0.2, 0.3, 1] }
  );

  // *** ON MOUNT
  onMount(async () => {
    if (slides.length > 2) {
      if ((autoplay == true || autoplay == 1) && !isRelated) {
        startTicker();
        observer.observe(slideShowEl);
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
      flkty.resize();
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
    // background: $grey;
    margin-top: 10px;
    margin-bottom: 60px;

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

    &__slide {
      height: 100%;

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

<svelte:window
  on:resize={throttle(e => {
    flkty.reposition();
  }, 500)} />

<Router>
  {#if slides.length > 2}
    <div
      class="container"
      on:mouseenter={() => {
        hovered = true;
        if (autoplay) {
          pauseSlideshow();
        }
      }}
      on:mouseleave={() => {
        hovered = false;
        if (autoplay) {
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
        class:slideshow--preview={isPreview}
        class:first
        class:loaded
        use:links>
        {#each slides as slide}
          {#if isRelated}
            <div
              class="carousel-cell slideshow__slide slideshow__slide--related">
              <a href="/{slide.parent}/{slide.slug}">
                <img
                  class="slideshow__slide-image slideshow__slide-image--related"
                  src={slide.src}
                  alt={slide.title} />
                <div
                  class="slideshow__title"
                  class:hide-text={$menuActiveGlobal}
                  class:slideshow__title--white={!slide.header.previewColor}>
                  {#if slide}{slide.title}{/if}
                </div>
              </a>
            </div>
          {:else}
            <div class="carousel-cell slideshow__slide">
              <img
                class="slideshow__slide-image"
                src={slide.src}
                alt={slide.caption} />
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
    {#if !isPreview && !isRelated}
      <div
        class="nav-container"
        on:mouseenter={() => {
          hovered = true;
          pauseSlideshow();
        }}
        on:mouseleave={() => {
          hovered = false;
          playSlideshow();
        }}>
        {#if loaded && !isPreview && !isRelated}
          <NavShow {slides} navTarget={slideShowEl} />
        {/if}
      </div>
    {/if}
  {:else if slides.length === 2}
    <div class="static-related double">
      {#if isRelated}
        <a href="/{slides[0].parent}/{slides[0].slug}">
          <img src={slides[0].src} alt={slides[0].title} />
          <div
            class="slideshow__title"
            class:hide-text={$menuActiveGlobal}
            class:slideshow__title--white={slides[0].header.previewColor}>
            {slides[0].title}
          </div>
        </a>
        <a href="/{slides[1].parent}/{slides[1].slug}">
          <img src={slides[1].src} alt={slides[1].title} />
          <div
            class="slideshow__title"
            class:hide-text={$menuActiveGlobal}
            class:slideshow__title--white={slides[1].header.previewColor}>
            {slides[1].title}
          </div>
        </a>
      {:else}
        <img src={slides[0].src} alt={slides[0].title} />
        <img src={slides[1].src} alt={slides[1].title} />
      {/if}
    </div>
  {:else if slides.length === 1}
    <div class="static-related single">
      {#if isRelated}
        <a href="/{slides[0].parent}/{slides[0].slug}">
          <img src={slides[0].src} alt={slides[0].title} />
          <div
            class="slideshow__title"
            class:hide-text={$menuActiveGlobal}
            class:slideshow__title--white={slides[0].header.previewColor}>
            {slides[0].title}
          </div>
        </a>
      {:else}
        <img src={slides[0].src} alt={slides[0].title} />
      {/if}
    </div>
  {/if}
</Router>

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

  // *** PROPS
  export let slides = [];
  export let isRelated = false;
  export let isPreview = false;
  export let first = false;
  export let autoplay = false;

  import NavShow from "./navShow.svelte";

  // *** STORES
  import { navigationStyle, menuActiveGlobal } from "../../stores.js";

  import Ellipse from "../Ellipse.svelte";

  // *** DOM REFERENCES
  let slideShowEl = {};
  let navSlideShowEl = {};
  let slideShowNavEl = {};

  console.log("autoplay", autoplay);

  // *** CONSTANTS
  const IMGIX_PARAMS = "&auto=format";

  // *** VARIABLES
  let flkty = {};
  let navFlkty = {};
  let tickerSpeed = 0.4;
  let isPaused = false;
  let loaded = false;
  let hovered = true;

  // console.log("autoplay", autoplay);

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
    // console.log("in update");

    // console.log(flkty.slides);
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
    console.log("start ticker");

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
      console.log(err);
      Sentry.captureException(err);
    }
    flkty.x = 0;

    // slideShowEl.addEventListener("mouseenter", pauseSlideshow, false);
    // slideShowEl.addEventListener("focusin", pauseSlideshow, false);
    // slideShowEl.addEventListener("mouseleave", playSlideshow, false);
    // slideShowEl.addEventListener("focusout", playSlideshow, false);

    flkty.on("dragStart", () => {
      isPaused = true;
    });

    // flkty.on("staticClick", function(event, pointer, cellElement, cellIndex) {
    //   dispatch("changeCategory", {
    //     newCategory: slugify(cellElement.dataset.tag),
    //     newCategoryName: cellElement.dataset.tag
    //   });
    // });
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
    slides[0].srcset = ["", 200, 400, 600, 800, 1000, 1200, 1400].reduce(
      (result, size) => {
        return (
          result +
          slides[0].url +
          "?w=" +
          size +
          "&ar=16:9&max-h=600&fit=crop&crop=faces&auto=format" +
          " " +
          size +
          "w, "
        );
      }
    );
    slides[0].sizes = "(max-width: 500px) 100vw, (max-width: 800px) 50vw, 33vw";
  } else {
    slides.forEach(s => {
      s.url =
        s.url && s.url.length > 0
          ? s.url.replace(
              "https://testing.novembre.global",
              "https://novtest.imgix.net"
            )
          : "";
      s.src = s.url + "?w=800" + IMGIX_PARAMS;
      s.thumb = s.url + "?h=140&fit=crop" + IMGIX_PARAMS;
      s.srcset = ["", 200, 400, 600, 800, 1000, 1200, 1400].reduce(
        (result, size) => {
          return (
            result + s.url + "?w=" + size + IMGIX_PARAMS + " " + size + "w, "
          );
        }
      );
      s.sizes = "(max-width: 500px) 100vw, (max-width: 800px) 50vw, 33vw";
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
          console.log(err);
          Sentry.captureException(err);
        }

        // setTimeout(() => {
        // flkty.resize();
        // update();

        console.log("MAIN", flkty);

        // loaded = true;
      }
    }

    imagesLoaded(slideShowEl, instance => {
      console.dir(instance);
      console.log("images-loaded");
      flkty.resize();
      loaded = true;
    });
  });
</script>

<style lang="scss">
  @import "../../variables.scss";

  .container {
    position: relative;
  }

  .loading {
    text-align: center;
    line-height: 600px;
    font-size: $large;
    font-family: $sans-stack;
    display: block;
  }

  .slideshow {
    width: 100%;
    height: 600px;

    &--related {
      max-height: unset;
    }

    &--preview {
      cursor: pointer;
    }

    @include screen-size("small") {
      height: unset;
    }

    &__slideshow {
      height: 100%;
    }

    &__slide {
      height: 100%;

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

    opacity: 0;

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
      height: 40px;
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
  {#if slides.length > 2}
    <div
      class="container"
      on:mouseenter={() => {
        hovered = true;
        pauseSlideshow();
      }}
      on:mouseleave={() => {
        hovered = false;
        playSlideshow();
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
                  srcset={slide.srcset}
                  sizes={slide.sizes}
                  src={slide.src}
                  alt={slide.title} />
                <div
                  class="slideshow__title"
                  class:hide-text={$menuActiveGlobal}
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
    {#if loaded && !isPreview && !isRelated}
      <div
        on:mouseenter={() => {
          hovered = true;
          pauseSlideshow();
        }}
        on:mouseleave={() => {
          hovered = false;
          playSlideshow();
        }}>
        <NavShow {slides} navTarget={slideShowEl} />
      </div>
    {/if}
  {:else if slides.length === 2}
    <div class="static-related double">
      {#if isRelated}
        <a href="/{slides[0].parent}/{slides[0].slug}">
          <img
            src={slides[0].src}
            srcset={slides[0].srcset}
            alt={slides[0].title}
            sizes={slides[0].sizes} />
          <div
            class="slideshow__title"
            class:hide-text={$menuActiveGlobal}
            class:slideshow__title--white={slides[0].header.previewColor}>
            {slides[0].title}
          </div>
        </a>
        <a href="/{slides[1].parent}/{slides[1].slug}">
          <img
            src={slides[1].src}
            srcset={slides[1].srcset}
            alt={slides[1].title}
            sizes={slides[1].sizes} />
          <div
            class="slideshow__title"
            class:hide-text={$menuActiveGlobal}
            class:slideshow__title--white={slides[1].header.previewColor}>
            {slides[1].title}
          </div>
        </a>
      {:else}
        <img
          src={slides[0].src}
          srcset={slides[0].srcset}
          alt={slides[0].title}
          sizes={slides[0].sizes} />
        <img
          src={slides[1].src}
          srcset={slides[1].srcset}
          alt={slides[1].title}
          sizes={slides[1].sizes} />
      {/if}
    </div>
  {:else if slides.length === 1}
    <div class="static-related single">
      {#if isRelated}
        <a href="/{slides[0].parent}/{slides[0].slug}">
          <img
            src={slides[0].src}
            srcset={slides[0].srcset}
            alt={slides[0].title}
            sizes={slides[0].sizes} />
          <div
            class="slideshow__title"
            class:hide-text={$menuActiveGlobal}
            class:slideshow__title--white={slides[0].header.previewColor}>
            {slides[0].title}
          </div>
        </a>
      {:else}
        <img
          src={slides[0].src}
          srcset={slides[0].srcset}
          alt={slides[0].title}
          sizes={slides[0].sizes} />
      {/if}
    </div>
  {/if}
</Router>

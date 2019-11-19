<script>
  // # # # # # # # # # # # # #
  //
  //  SCROLL-LIST
  //
  // # # # # # # # # # # # # #

  // *** IMPORTS
  import { onMount } from "svelte";
  import { tick } from "svelte/internal";
  import { scale } from "svelte/transition";

  import Flickity from "flickity";
  import { navigate } from "svelte-routing";

  // *** DOM STORES
  import { activeQuery, activeCategory } from "../stores.js";

  // *** PROPS
  export let tagArray = [];

  // *** DOM REFERENCES
  let scrollListEl;

  let loaded = false;

  // TODO: change speed for mobile
  const startTicker = function() {
    // Play with this value to change the speed
    let tickerSpeed = 0.7;

    let flickity = null;
    let isPaused = true;

    const update = () => {
      if (isPaused) return;
      if (flickity.slides) {
        flickity.x = (flickity.x - tickerSpeed) % flickity.slideableWidth;
        flickity.selectedIndex = flickity.dragEndRestingSelect();
        flickity.updateSelectedSlide();
        flickity.settle(flickity.x);
      }
      window.requestAnimationFrame(update);
    };

    const pause = () => {
      isPaused = true;
    };

    const play = () => {
      if (isPaused) {
        isPaused = false;
        window.requestAnimationFrame(update);
      }
    };

    let options = {
      wrapAround: true,
      autoPlay: false,
      draggable: true,
      prevNextButtons: false,
      pageDots: false,
      // selectedAttraction: 0.025,
      freeScrollFriction: 0.03
      // friction: 0.85
    };

    try {
      flickity = new Flickity(scrollListEl, options);
    } catch (err) {
      Sentry.captureException(err);
    }
    flickity.x = 0;

    scrollListEl.addEventListener("mouseenter", pause, false);
    scrollListEl.addEventListener("focusin", pause, false);
    scrollListEl.addEventListener("mouseleave", play, false);
    scrollListEl.addEventListener("focusout", play, false);

    flickity.on("dragStart", () => {
      isPaused = true;
    });

    flickity.on("staticClick", function(
      event,
      pointer,
      cellElement,
      cellIndex
    ) {
      navigate("/" + $activeCategory + "/category/" + cellElement.dataset.tag);
    });

    play();

    setTimeout(() => {
      loaded = true;
    }, 500);
  };

  // *** ON MOUNT
  onMount(async () => {
    await tick();
    startTicker();
  });
</script>

<style lang="scss">
  @import "../variables.scss";

  .taxonomy-scroller {
    height: 96px;
    font-family: $sans-stack;
    font-size: $large;
    font-weight: 300;
    text-transform: uppercase;
    line-height: 0.8em;
    padding-bottom: $small-margin;
    padding-top: $small-margin;
    position: fixed;
    top: 75px;
    width: 100%;
    left: 0;
    overflow: hidden;
    z-index: 99;

    @include screen-size("small") {
      font-size: $mobile_large;
      padding-bottom: $small-margin;
      padding-top: $small-margin;
      height: 67px;
    }

    width: 100%;
    background: black;
    color: $white;
    opacity: 1;
    transition: opacity 0.3s ease-out, transform 0.3s ease-out;

    &__slide {
      display: inline-block;
      margin-right: 30px;
      white-space: nowrap;
      height: auto;
      overflow: visible;
      padding-top: 3px;

      span {
        cursor: pointer;
        border-bottom: 2px solid transparent;
      }

      span:hover,
      span:active,
      span.active {
        border-bottom: 2px solid white;
      }

      @include screen-size("small") {
        margin-right: 20px;
      }
    }

    &__slideshow {
      height: 96px;
      width: 100%;
      font-family: $sans-stack;
      font-size: $large;
      font-weight: 300;
      line-height: 1.4em;
      opacity: 0;

      &.loaded {
        opacity: 1;
      }

      @include screen-size("small") {
        font-size: $mobile_large;
        padding-bottom: 3px;
      }
    }
  }
</style>

<div class="taxonomy-scroller">
  <div
    class:loaded
    class="main-carousel taxonomy-scroller__slideshow
    taxonomy-scroller__slideshow--large"
    bind:this={scrollListEl}>
    {#each tagArray as t}
      <div data-tag={t.slug} class="carousel-cell taxonomy-scroller__slide">
        <span
          class:active={t.slug === $activeQuery}
          class="taxonomy__item taxonomy-scroller__link">
          {t.title}
        </span>
      </div>
    {/each}
  </div>
</div>

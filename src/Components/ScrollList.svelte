<script>
  // # # # # # # # # # # # # #
  //
  //  Scroll list / ticker
  //
  // # # # # # # # # # # # # #

  // *** IMPORTS
  import { onMount } from "svelte";
  import Flickity from "flickity";

  // *** COMPONENTS
  import { createEventDispatcher } from "svelte";

  // *** PROPS
  export let taxlist;
  export let taxname;
  export let size = "large";
  export let activeCategory = "";

  let loaded = false;

  // *** STORES
  import { menuActiveGlobal } from "../stores.js";

  // *** VARIABLES
  let scrollListEl;
  const dispatch = createEventDispatcher();
  let taxArray = [];

  try {
    taxArray = Array.from(Object.keys(taxlist[taxname]));
    taxArray = [...taxArray, ...taxArray];
  } catch (err) {
    Sentry.captureException(err);
  }

  // *** FUNCTIONS
  function slugify(string) {
    const a =
      "àáäâãåăæąçćčđďèéěėëêęğǵḧìíïîįłḿǹńňñòóöôœøṕŕřßşśšșťțùúüûǘůűūųẃẍÿýźžż·/_,:;";
    const b =
      "aaaaaaaaacccddeeeeeeegghiiiiilmnnnnooooooprrsssssttuuuuuuuuuwxyyzzz------";
    const p = new RegExp(a.split("").join("|"), "g");

    return string
      .toString()
      .toLowerCase()
      .replace(/\s+/g, "-") // Replace spaces with -
      .replace(p, c => b.charAt(a.indexOf(c))) // Replace special characters
      .replace(/&/g, "-and-") // Replace & with 'and'
      .replace(/[^\w\-]+/g, "") // Remove all non-word characters
      .replace(/\-\-+/g, "-") // Replace multiple - with single -
      .replace(/^-+/, "") // Trim - from start of text
      .replace(/-+$/, ""); // Trim - from end of text
  }

  // TODO: change speed for mobile
  const startTicker = function() {
    // Play with this value to change the speed
    let tickerSpeed = 0.7;

    let flickity = null;
    let isPaused = false;

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
      dispatch("changeCategory", {
        newCategory: slugify(cellElement.dataset.tag),
        newCategoryName: cellElement.dataset.tag
      });
    });

    setTimeout(() => {
      update();
      loaded = true;
    }, 500);
  };

  // *** ON MOUNT
  onMount(async () => {
    startTicker();
  });
</script>

<style lang="scss">
  @import "../variables.scss";

  .taxonomy-scroller {
    $block: &;

    width: 100%;
    height: 100%;

    background: black;
    color: white;
    opacity: 0;
    transition: opacity 0.5s ease-out;

    &.loaded {
      opacity: 1;
    }

    &.hide {
      visibility: hidden;
    }

    &__slide {
      display: inline-block;
      margin-right: 30px;
      white-space: nowrap;
      height: auto;
      // background: red;
      overflow: visible;
      padding-top: 3px;

      span {
        // height: 1em;
        cursor: pointer;
      }

      span:hover,
      span:active,
      span.active {
        text-decoration: underline;
      }

      span.active {
        // background: pink;
      }

      @include screen-size("small") {
        margin-right: 20px;
      }
    }

    &__slideshow {
      &--small {
        font-style: italic;
        font-size: $body;
        line-height: 45px;
        height: 50px;
      }

      &--large {
        position: relative;
        top: 2px;
        font-family: $sans-stack;
        font-size: $large;
        font-weight: 300;
        text-transform: uppercase;
        line-height: 0.8em;

        @include screen-size("small") {
          font-size: $mobile_large;
          // top: 0;
          padding-bottom: 3px;
        }
      }
    }
  }
</style>

<div class="taxonomy-scroller" class:hide={$menuActiveGlobal} class:loaded>
  <div
    class="main-carousel taxonomy-scroller__slideshow
    taxonomy-scroller__slideshow--large"
    bind:this={scrollListEl}>
    {#each taxArray as t}
      <div data-tag={t} class="carousel-cell taxonomy-scroller__slide">
        <span
          class:active={activeCategory === slugify(t)}
          class="taxonomy__item taxonomy-scroller__link">
          {t}
        </span>
      </div>
    {/each}
  </div>
</div>

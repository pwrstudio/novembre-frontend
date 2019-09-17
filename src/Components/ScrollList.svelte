<script>
  // # # # # # # # # # # # # #
  //
  //  Scroll list / ticker
  //
  // # # # # # # # # # # # # #

  // *** IMPORTS
  import { onMount } from "svelte";
  import { fade } from "svelte/transition";
  import { Router, links } from "svelte-routing";
  import Flickity from "flickity";

  // *** COMPONENTS
  import { createEventDispatcher } from "svelte";

  // *** PROPS
  export let taxlist;
  export let taxname;
  export let size = "large";
  export let activeCategory = "";

  // *** VARIABLES
  let scrollListEl;
  const dispatch = createEventDispatcher();
  let taxArray = Array.from(Object.keys(taxlist[taxname]));
  let options = {
    wrapAround: true,
    prevNextButtons: false,
    pageDots: false,
    draggable: true,
    autoPlay: false,
    selectedAttraction: 0.028,
    friction: 0.28
  };

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
    // console.log("starting ticker");

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
      selectedAttraction: 0.015,
      friction: 0.25
    };

    flickity = new Flickity(scrollListEl, options);
    flickity.x = 0;

    scrollListEl.addEventListener("mouseenter", pause, false);
    scrollListEl.addEventListener("focusin", pause, false);
    scrollListEl.addEventListener("mouseleave", play, false);
    scrollListEl.addEventListener("focusout", play, false);

    flickity.on("dragStart", () => {
      isPaused = true;
    });

    update();
  };

  // TODO: improve padding algo...
  if (taxArray.length < 20) {
    taxArray = [...taxArray, ...taxArray, ...taxArray, ...taxArray];
  }

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

    &__slide {
      display: inline-block;
      margin-right: 30px;
      white-space: nowrap;
      height: auto;

      span {
        // height: 1em;
        cursor: pointer;
      }

      span:hover,
      span:active,
      span.active {
        border-bottom: 1px solid white;
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
        height: 45px;
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
          // padding-bottom: 10px;
          // padding-top: 10px;
        }
      }
    }
  }
</style>

<div class="taxonomy-scroller">
  <div
    class="main-carousel taxonomy-scroller__slideshow
    taxonomy-scroller__slideshow--large"
    bind:this={scrollListEl}>
    {#each taxArray as t}
      <div class="carousel-cell taxonomy-scroller__slide">
        <span
          class:active={activeCategory === slugify(t)}
          on:click={e => {
            dispatch('changeCategory', {
              newCategory: slugify(t),
              newCategoryName: t
            });
          }}
          class="taxonomy__item taxonomy-scroller__link">
          {t}
        </span>
      </div>
    {/each}
  </div>
</div>
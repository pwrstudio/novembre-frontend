<script>
  import Flickity from "flickity";
  import { onMount } from "svelte";

  export let taxlist;
  export let taxname;
  export let size = "large";

  let scrollListEl;

  console.log(taxname);

  const startTicker = function() {
    console.log("starting ticker");

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

  let taxArray = Array.from(Object.keys(taxlist[taxname]));
  // console.log(taxArray);
  // console.log(typeof taxArray);

  if (taxArray.length < 20) {
    taxArray = [...taxArray, ...taxArray, ...taxArray, ...taxArray];
  }

  // console.log(taxArray);

  onMount(async () => {
    console.log("::::: SCROLL INIT");

    let options = {
      wrapAround: true,
      prevNextButtons: false,
      pageDots: false,
      draggable: true,
      autoPlay: false,
      selectedAttraction: 0.028,
      friction: 0.28
    };

    // trigger redraw for transition
    scrollListEl.offsetHeight;

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
      margin-right: 1ch;
      white-space: nowrap;

      a:hover {
        border-bottom: 1px solid white;
      }
    }

    &__slideshow {
      &--small {
        // font-family: $serif-stack;
        font-style: italic;
        font-size: $body;
        line-height: 65px;
        height: 60px;
      }

      &--large {
        font-family: $sans-stack;
        font-size: $large;
        font-weight: 300;
        text-transform: uppercase;
      }
    }
  }
</style>

<div class="taxonomy-scroller">
  <div class="top-block">
    <div
      class="main-carousel taxonomy-scroller__slideshow
      taxonomy-scroller__slideshow--large"
      bind:this={scrollListEl}>
      {#each taxArray as t}
        <div class="carousel-cell taxonomy-scroller__slide">
          <a
            href={'/magazine/category/' + t.toLowerCase()}
            class="taxonomy__item taxonomy-scroller__link js-ajax-link">
            {t}
          </a>
        </div>
      {/each}
    </div>
  </div>
</div>

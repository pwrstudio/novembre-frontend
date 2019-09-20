<script>
  // # # # # # # # # # # # # #
  //
  //  Preview element
  //
  // # # # # # # # # # # # # #

  // *** IMPORTS
  import { onMount, onDestroy } from "svelte";
  import { Router, links } from "svelte-routing";
  import MediaQuery from "svelte-media-query";
  import imagesLoaded from "imagesloaded";

  // *** COMPONENTS
  import TaxList from "./TaxList.svelte";

  // *** MODULES
  import Video from "./Modules/Video.svelte";
  import Image from "./Modules/Image.svelte";
  import Slideshow from "./Modules/Slideshow.svelte";

  // *** STORES
  import { navigationStyle, menuActiveGlobal } from "../stores.js";

  // *** PROPS
  export let post = {};
  export let isHeader = false;

  // *** VARIABLES
  let previewEl = {};
  let active = false;
  let topOffset = 0;
  let elementHeight = 0;
  let lastScrollY = 0;
  let loaded = false;

  // *** FUNCTIONS
  const observer = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        topOffset = previewEl.getBoundingClientRect().top;

        // console.log(
        //   post.header.htmlTitle.title.substring(0, 6),
        //   topOffset,
        //   entry.intersectionRatio
        // );

        if (entry.intersectionRatio > 0.9) {
          // console.log(
          //   "+++++",
          //   "TITLE:",
          //   post.header.htmlTitle.title.substring(0, 6),
          //   "RATIO:",
          //   entry.intersectionRatio,
          //   "TOP OFFSET:",
          //   previewEl.getBoundingClientRect().top,
          //   "WINDOW HEIGHT:",
          //   window.innerHeight,
          //   "ELEMENT HEIGHT:",
          //   previewEl.offsetHeight,
          //   "SCROLL Y:",
          //   window.scrollY,
          //   "LAST SCROLL:",
          //   lastScrollY,
          //   "PAGE OFFSET:",
          //   window.pageYOffset
          //   // Math.round(previewEl.getBoundingClientRect().top) <
          //   //   previewEl.offsetHeight / 2
          // );

          // HIT TOP GOING DOWN
          if (topOffset < 0) {
            // console.warn(
            //   post.header.htmlTitle.title.substring(0, 6),
            //   "HIT TOP GOING DOWN",
            //   isInView
            // );
            navigationStyle.set(!post.header.previewColor);
          }
        }

        if (entry.intersectionRatio < 0.1 && topOffset < window.innerHeight) {
          // console.log(
          //   "-------",
          //   "TITLE:",
          //   post.header.htmlTitle.title.substring(0, 6),
          //   "RATIO:",
          //   entry.intersectionRatio,
          //   "TOP OFFSET:",
          //   Math.round(previewEl.getBoundingClientRect().top),
          //   "WINDOW HEIGHT:",
          //   window.innerHeight,
          //   "ELEMENT HEIGHT:",
          //   previewEl.offsetHeight,
          //   "SCROLL Y:",
          //   window.scrollY,
          //   "LAST SCROLL:",
          //   lastScrollY,
          //   "PAGE OFFSET:",
          //   window.pageYOffset
          //   // Math.round(previewEl.getBoundingClientRect().top) <
          //   //   previewEl.offsetHeight / 2
          // );

          if (window.scrollY < lastScrollY) {
            // console.warn(
            //   post.header.htmlTitle.title.substring(0, 6),
            //   "HIT BOTTOM GOING UP"
            // );
            navigationStyle.set(!post.header.previewColor);
          }
        }

        lastScrollY = window.scrollY;
      });
    },
    { threshold: [0, 1] }
  );

  // *** ON MOUNT
  onMount(async () => {
    // elementHeight = previewEl.offsetHeight;
    // console.log(elementHeight);
    console.log(post);
    imagesLoaded(previewEl, instance => {
      // console.log(instance);
      loaded = true;
      // previewEl.classList.add("loaded");
    });
    observer.observe(previewEl);
  });

  // *** ON DESTROY
  onDestroy(() => {
    observer.disconnect();
  });
</script>

<style lang="scss">
  @import "../variables.scss";

  .preview {
    $block: &;

    position: relative;
    user-select: none;
    color: black;
    opacity: 0;
    overflow: hidden;

    max-height: $full-height;
    // transition: opacity 0.5s $transition;

    &__tags {
      position: absolute;
      top: 0;
      left: 0;
      margin-left: $small-margin;
      margin-top: $small-margin;
      z-index: 10;
      max-width: 90vw;
      overflow: hidden;
      opacity: 1;

      transition: opacity 0.3 $transition;
    }

    &__title {
      font-size: $large;
      font-weight: 300;
      line-height: 0.85em;
      text-transform: uppercase;
      max-width: 95%;
      position: absolute;
      bottom: $small-margin;
      left: $small-margin;
      text-decoration: none;
      z-index: 1;
      font-family: $sans-stack;
      overflow: hidden;
      pointer-events: none;

      transition: opacity 0.3 $transition;

      &--free {
        position: static;
        left: unset;
        bottom: unset;
        margin-left: $small-margin;
        margin-top: $small-margin;

        // background: yellow;
      }

      &--large-text {
        font-size: $xlarge;
        position: static;
        left: unset;
        bottom: unset;
        // background: purple;
        margin-top: 80px;
        margin-bottom: 80px;
        margin-left: $small-margin;
      }

      p {
        margin: 0;

        em {
          font-family: $serif-stack;
          font-style: italic;
        }
      }

      em {
        font-family: $serif-stack;
        font-style: italic;
        // background: pink;
      }

      @include screen-size("small") {
        font-size: $mobile_large;
        hyphens: auto;
      }
    }

    &__quote {
      font-size: $xlarge;
      font-weight: 300;
      line-height: 0.85em;
      text-transform: uppercase;
      height: 400px;

      p {
        margin: 0;
      }

      em {
        font-family: $serif-stack;
        font-style: italic;
      }

      @include screen-size("small") {
        font-size: $mobile_large;
      }
    }

    &--white {
      color: white;
    }

    &.hide-text {
      mix-blend-mode: multiply;
      .preview__title,
      .preview__tags {
        transition: opacity 0.3 $transition;
        opacity: 0;
      }

      // transition: filter 0.3 $transition;
    }
  }

  .loaded {
    opacity: 1;
  }

  .preview__slide {
    height: calc(100vh - 80px);
    overflow: hidden;
  }
</style>

<Router>
  <div
    class="preview preview--{post.header.previewType}"
    class:loaded
    class:preview--white={!post.header.previewColor}
    class:hide-text={$menuActiveGlobal}
    style="background-color: {post.header.backgroundColor}"
    bind:this={previewEl}
    use:links>

    <!-- TAGS: ON TOP
    {#if post.header.taxonomy && post.header.previewType != 'text'}
      <MediaQuery query="(min-width: 800px)" let:matches>
        {#if matches}
          <div class="preview__tags">
            <TaxList
              taxonomy={post.header.taxonomy}
              white={post.header.previewColor} />
          </div>
        {/if}
      </MediaQuery>
    {/if} -->

    <a href="/{post.header.parent}/{post.header.slug}">

      <!-- IMAGE -->
      {#if post.header.previewType == 'image'}
        <Image
          size={post.header.previewSize}
          url={post.header.previewImage.url}
          multiFiles={post.header.previewSlideshow}
          caption={post.header.htmlTitle.fullTitle}
          {loaded}
          isListing={true} />
      {/if}

      <!-- VIDEO -->
      {#if post.header.previewType == 'video'}
        <Video
          file={post.header.previewVideo.file}
          url={post.header.previewVideo.url}
          caption={post.header.title}
          autoplay={true}
          loop={true}
          muted={true} />
      {/if}

      <!-- SLIDESHOW -->
      {#if post.header.previewType == 'slideshow'}
        <Slideshow slides={post.header.previewSlideshow} isPreview={true} />
      {/if}

      <!-- TEXT -->
      {#if post.header.previewType == 'text' && !isHeader}
        <!-- <div class="preview__text"> -->
        <!-- <blockquote class="preview__quote">
            {post.header.previewText}
          </blockquote> -->
        <!-- </div> -->
      {/if}

      <!-- TAGS -->
      {#if post.header.taxonomy && !isHeader}
        <MediaQuery query="(min-width: 800px)" let:matches>
          {#if matches}
            <div class="preview__tags">
              <TaxList
                taxonomy={post.header.taxonomy}
                white={post.header.previewColor} />
            </div>
          {/if}
        </MediaQuery>
      {/if}

      {#if !isHeader}
        <div
          class="preview__title preview__title--free"
          class:preview__title--free={post.header.previewType == 'image' && !post.header.previewSize}
          class:preview__title--large-text={post.header.previewType == 'text'}>
          {@html post.header.htmlTitle.fullTitle}
        </div>
      {/if}

    </a>

  </div>
</Router>

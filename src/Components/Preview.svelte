<script>
  // # # # # # # # # # # # # #
  //
  //  Preview element
  //
  // # # # # # # # # # # # # #

  // *** IMPORTS
  import { onMount, onDestroy } from "svelte";
  import { Router, links } from "svelte-routing";
  import { tick } from "svelte";
  import { fade } from "svelte/transition";

  import MediaQuery from "svelte-media-query";
  import imagesLoaded from "imagesloaded";

  // *** COMPONENTS
  import TaxList from "./TaxList.svelte";

  // *** MODULES
  import Video from "./Modules/Video.svelte";
  import Embed from "./Modules/Embed.svelte";
  import Multi from "./Modules/Multi.svelte";
  import Image from "./Modules/Image.svelte";
  import Slideshow from "./Modules/Slideshow.svelte";

  // *** STORES
  import { navigationStyle, menuActiveGlobal } from "../stores.js";

  // *** PROPS
  export let post = {};
  export let isHeader = false;
  export let first = false;

  // console.log(JSON.parse(JSON.stringify(post)));

  // *** DOM REFERENCE
  let previewEl = {};

  // *** CONSTANTS
  let VIDEO_ROOT = "https://res.cloudinary.com/pwr/video/upload/";
  let REMOTE_FOLDER = "novembre";

  // *** VARIABLES
  let active = false;
  let elementHeight = 0;
  let lastScrollY = 0;
  let loaded = false;
  let videoUrl = "";
  let videoSrc = "";
  let elementStyles =
    (post.header.backgroundColor
      ? "background-color:" + post.header.backgroundColor
      : "") +
    (post.header.customTextColor ? "color:" + post.header.customTextColor : "");

  // *** ON MOUNT
  onMount(async () => {
    imagesLoaded(previewEl, instance => {
      loaded = true;
    });

    await tick();

    var waypointTop = new Waypoint({
      element: previewEl,
      handler: function(direction) {
        if (direction === "down") {
          // console.log(
          //   "1111 - Top",
          //   post.header.htmlTitle.title.substring(0, 12),
          //   direction
          // );
          // console.error("CHANGE TOP");
          navigationStyle.set(!post.header.previewColor);
        }
      }
    });

    var waypointBottom = new Waypoint({
      element: previewEl,
      handler: function(direction) {
        if (direction === "up") {
          // console.log(
          //   "2222 - BOTTOM",
          //   post.header.htmlTitle.title.substring(0, 12),
          //   direction
          // );
          // console.warn("CHANGE BOTTOM");
          navigationStyle.set(!post.header.previewColor);
        }
      },
      offset: function() {
        return -this.element.clientHeight;
      }
    });

    if (first) {
      navigationStyle.set(!post.header.previewColor);
    }
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

    &__tags {
      position: absolute;
      top: 0;
      left: 0;
      margin-left: 8px;
      margin-top: 8px;
      z-index: 10;
      max-width: 90vw;
      overflow: hidden;
      opacity: 1;

      transition: opacity 0.3 $transition;

      &.bottom-tags {
        position: static;
      }
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
      pointer-events: none;

      transition: opacity 0.3 $transition;

      &--free {
        position: static;
        left: unset;
        bottom: unset;
        margin-left: $small-margin;
        margin-top: $small-margin;
      }

      @include screen-size("small") {
        font-size: $mobile_large;
        // hyphens: auto;
      }

      &--large-text {
        font-size: $xlarge;
        position: static;
        left: unset;
        bottom: unset;
        margin-left: $small-margin;
        margin-top: $small-margin;

        @include screen-size("small") {
          font-size: $large;
          // hyphens: auto;
          padding-bottom: 20px;
        }
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
      .preview__title,
      .preview__tags {
        transition: opacity 0.3 $transition;
        opacity: 0;
      }
    }

    &--multi {
      &.first {
        padding-top: 60px;
        // min-height: 100vh;
      }
      &.header {
        padding-top: 70px;
        padding-bottom: 40px;

        // height: 100vh;
      }
    }
    &--text {
      &.first {
        padding-top: 155px;
      }
    }

    &.header {
      a {
        cursor: default;
      }
    }
  }

  .loaded {
    opacity: 1;
  }

  // .preview__slide {
  //   height: $
  //   overflow: hidden;
  // }
</style>

<div
  class="preview preview--{post.header.previewType}"
  class:loaded
  class:preview--white={!post.header.previewColor}
  class:hide-text={$menuActiveGlobal}
  class:first
  class:header={isHeader}
  style={elementStyles}
  bind:this={previewEl}
  use:links>

  <!-- TAGS -->
  {#if post.header.taxonomy && !isHeader && !first}
    <!-- <MediaQuery query="(min-width: 800px)" let:matches> -->
    <!-- {#if matches} -->
    <div
      class="preview__tags"
      class:bottom-tags={post.header.previewType == 'multi' || post.header.previewType == 'text'}>
      <TaxList
        taxonomy={post.header.taxonomy}
        white={post.header.previewColor}
        isPreview={true} />
    </div>
    <!-- {/if} -->
    <!-- </MediaQuery> -->
  {/if}

  <Router>

    <!-- IMAGE -->
    {#if post.header.previewType == 'image' && post.header.previewImage && post.header.previewImage.url}
      <a href="/{post.header.parent}/{post.header.slug}">
        <Image
          size={post.header.previewSize}
          url={post.header.previewImage.url}
          caption={post.header.htmlTitle.fullTitle}
          {loaded}
          isListing={true} />
      </a>
      <!-- MULTI IMAGE -->
    {:else if post.header.previewType == 'multi'}
      <a href="/{post.header.parent}/{post.header.slug}">
        <Multi files={post.header.previewMulti} {loaded} />
      </a>
      <!-- VIDEO -->
    {:else if post.header.previewType == 'video'}
      <a href="/{post.header.parent}/{post.header.slug}">
        <Video
          url={post.header.previewVideo.url}
          caption={post.header.title}
          autoplay={true}
          loop={true}
          muted={true} />
      </a>
      <!-- Embed -->
    {:else if post.header.previewType == 'embed'}
      <a href="/{post.header.parent}/{post.header.slug}">
        <Embed url={post.header.previewEmbed.url} caption={post.header.title} />
      </a>
      <!-- SLIDESHOW -->
    {:else if post.header.previewType == 'slideshow'}
      <a href="/{post.header.parent}/{post.header.slug}">
        <!-- {post.header.previewSlideshowAutoplay}
        {post.header.previewSlideshowAutoplay || post.header.previewSlideshowAutoplay == 1} -->
        <Slideshow
          autoplay={post.header.previewSlideshowAutoplay || post.header.previewSlideshowAutoplay == 1 ? true : false}
          slides={post.header.previewSlideshow}
          isPreview={true}
          {first} />
      </a>

      <!-- TEXT -->
    {:else if post.header.previewType == 'text' && !isHeader}{/if}

    {#if !isHeader}
      <a href="/{post.header.parent}/{post.header.slug}">
        <div
          class="preview__title preview__title--free"
          class:preview__title--free={post.header.previewType == 'multi'}
          class:preview__title--large-text={post.header.previewType == 'text'}>
          {@html post.header.htmlTitle.fullTitle}
        </div>
      </a>
    {/if}
  </Router>

</div>

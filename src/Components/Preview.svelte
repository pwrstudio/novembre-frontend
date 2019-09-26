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

    var inview = new Waypoint.Inview({
      element: previewEl,
      enter: function(direction) {
        navigationStyle.set(!post.header.previewColor);
        console.log(
          "ENTER",
          post.header.htmlTitle.title.substring(0, 12),
          direction
        );
      },
      exit: function(direction) {
        console.log(
          "EXIT",
          post.header.htmlTitle.title.substring(0, 12),
          direction
        );
        navigationStyle.set(!post.header.previewColor);
      }
    });
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
      margin-left: $small-margin;
      margin-top: $small-margin;
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
        // margin-top: 80px;
        // margin-bottom: 80px;
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
      .preview__title,
      .preview__tags {
        transition: opacity 0.3 $transition;
        opacity: 0;
      }
    }

    &--multi {
      &.first {
        padding-top: 80px;
      }
      &.header {
        height: 100vh;
      }
    }
    &--text {
      &.first {
        padding-top: 80px;
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

<Router>
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
          white={post.header.previewColor} />
      </div>
      <!-- {/if} -->
      <!-- </MediaQuery> -->
    {/if}

    <a href="/{post.header.parent}/{post.header.slug}">

      <!-- IMAGE -->
      {#if post.header.previewType == 'image' && post.header.previewImage && post.header.previewImage.url}
        <Image
          size={post.header.previewSize}
          url={post.header.previewImage.url}
          caption={post.header.htmlTitle.fullTitle}
          {loaded}
          isListing={true} />

        <!-- MULTI IMAGE -->
      {:else if post.header.previewType == 'multi'}
        <Multi files={post.header.previewMulti} {loaded} />

        <!-- VIDEO -->
      {:else if post.header.previewType == 'video'}
        <Video
          url={post.header.previewVideo.url}
          caption={post.header.title}
          autoplay={true}
          loop={true}
          muted={true} />

        <!-- VIDEO -->
      {:else if post.header.previewType == 'embed'}
        <Embed url={post.header.previewEmbed.url} caption={post.header.title} />

        <!-- SLIDESHOW -->
      {:else if post.header.previewType == 'slideshow'}
        <Slideshow
          slides={post.header.previewSlideshow}
          isPreview={true}
          {first} />

        <!-- TEXT -->
      {:else if post.header.previewType == 'text' && !isHeader}{/if}

      {#if !isHeader}
        <div
          class="preview__title preview__title--free"
          class:preview__title--free={post.header.previewType == 'multi'}
          class:preview__title--large-text={post.header.previewType == 'text'}>
          {@html post.header.htmlTitle.fullTitle}
        </div>
      {/if}

    </a>

  </div>
</Router>

<script>
  // # # # # # # # # # # # # #
  //
  //  Image module
  //
  // # # # # # # # # # # # # #

  // *** IMPORTS
  import { onMount } from "svelte";
  import MediaQuery from "svelte-media-query";
  import { fade } from "svelte/transition";
  import imagesLoaded from "imagesloaded";
  // import buildURL from "imagesloaded";

  // *** PROPS
  export let url = "";
  export let caption = "";
  export let size = false;
  export let isListing = false;
  export let loaded = false;
  export let height = false;
  export let width = false;
  export let file = false;

  // *** DOM REFERENCES
  let imageEl = {};

  // *** VARIABLES
  let src = "";
  let srcset = "";
  let srcPortrait = "";
  let srcsetPortrait = "";
  let sizes = "";

  // *** CONSTANTS
  let IMGIX_PARAMS = "&auto=format";
  let FULLWIDTH_PARAMS = "&ar=16:9&fit=crop&crop=faces&auto=format";
  let PORTRAIT_PARAMS = "&ar=9:16&fit=crop&crop=faces&auto=format";

  // Set base image size
  url = url.replace(
    "https://testing.novembre.global",
    "https://novtest.imgix.net"
  );

  // console.log("size", size, size === "fullWidth");
  src =
    url + "?w=1200" + (size === "fullWidth" ? FULLWIDTH_PARAMS : IMGIX_PARAMS);
  srcPortrait = url + "?w=1000" + PORTRAIT_PARAMS;

  // Generate srcset
  if (size === "fullWidth") {
    srcset = ["", 600, 800, 1000, 1200, 1400, 1600, 2000].reduce(
      (result, size) => {
        return (
          result + url + "?w=" + size + FULLWIDTH_PARAMS + " " + size + "w, "
        );
      }
    );

    srcsetPortrait = ["", 600, 800, 1000, 1200, 1400, 1600, 2000].reduce(
      (result, size) => {
        return (
          result + url + "?w=" + size + PORTRAIT_PARAMS + " " + size + "w, "
        );
      }
    );
  } else {
    srcset = ["", 600, 800, 1000, 1200, 1400, 1600, 2000].reduce(
      (result, size) => {
        return result + url + "?w=" + size + IMGIX_PARAMS + " " + size + "w, ";
      }
    );

    srcsetPortrait = ["", 600, 800, 1000, 1200, 1400, 1600, 2000].reduce(
      (result, size) => {
        return result + url + "?w=" + size + IMGIX_PARAMS + " " + size + "w, ";
      }
    );
  }

  if (size === true || size === "fullWidth") {
    sizes = "80vw";
  } else {
    sizes = "70vw";
  }

  // *** ON MOUNT
  onMount(async () => {
    imagesLoaded(imageEl, instance => {
      loaded = true;
    });
  });
</script>

<style lang="scss">
  @import "../../variables.scss";

  .image {
    width: 100%;
    height: auto;
    // pointer-events: none;

    $block: &;

    // margin-top: 20px;
    margin-bottom: 20px;

    &.listing {
      margin-top: 0px;
      margin-bottom: 0px;

      .image--free {
        margin-bottom: $small-margin;
      }
    }

    &--full {
      height: $full-height;
      width: 100vw;
      margin-bottom: 60px;

      img,
      video {
        height: 100%;
        width: 100%;
        object-fit: cover;
      }

      .caption {
        height: auto;
        width: 800px;
        margin-left: auto;
        margin-right: auto;
        max-width: 95vw;
        margin-bottom: 40px;
      }
    }

    &__image {
      opacity: 0;
      transition: opacity 0.2s $transition;

      &.loaded {
        opacity: 1;
      }
    }

    &--inline {
      height: auto;
      width: 800px;
      margin-left: auto;
      margin-right: auto;
      max-width: 95vw;
      margin-bottom: 40px;

      img,
      video {
        width: 100%;
      }
    }
  }

  .caption {
    font-family: $sans-stack;
    font-size: $small;
    font-weight: 300;
  }
</style>

<div
  class="image"
  class:image--full={size == true || size == 'fullWidth'}
  class:image--inline={size == 'proportional' || size == 'inline'}
  class:listing={isListing}
  bind:this={imageEl}>

  <MediaQuery query="(min-width: 800px)" let:matches>
    <img
      class="image__image"
      class:loaded
      srcset={matches ? srcset : srcsetPortrait}
      {sizes}
      src={matches ? src : srcPortrait}
      alt={caption} />
    {#if !isListing}
      <div class="caption">{caption}</div>
    {/if}
  </MediaQuery>

</div>

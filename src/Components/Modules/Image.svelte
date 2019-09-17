<script>
  // # # # # # # # # # # # # #
  //
  //  Image module
  //
  // # # # # # # # # # # # # #

  // *** IMPORTS
  import imagesLoaded from "imagesloaded";
  import { onMount } from "svelte";
  import MediaQuery from "svelte-media-query";

  // *** PROPS
  export let file = "";
  export let url = "";
  export let multiFiles = false;
  export let caption = "Novembre";
  export let size = true;
  export let isListing = false;

  // *** VARIABLES
  let srcset;
  let srcsetPortrait;
  let sizes;
  let src;
  let srcPortrait;
  let imageEl;
  let loaded = false;
  let imgixParams = "&auto=format";
  let fullWidthParams = "&ar=16:9&fit=crop&crop=faces&auto=format";
  let portraitParams = "&ar=9:16&fit=crop&crop=faces&auto=format";

  // *********
  if (multiFiles) {
    // Size depending on layout
    if (multiFiles.length === 1) {
      // FULL WIDTH
      sizes = "50vw";
    } else if (multiFiles.length === 2) {
      // PROPORTIONAL or inline
      sizes = "30vw";
    } else if (multiFiles.length === 3) {
      sizes = "25vw";
    } else if (multiFiles.length === 4) {
      sizes = "20vw";
    }

    multiFiles.forEach(f => {
      f.url = f.url.replace(
        "https://testing.novembre.global",
        "https://novmag.imgix.net"
      );
      f.src = f.url + "?w=800" + imgixParams;
      f.srcset = ["", 200, 400, 600, 800, 1000, 1200, 1400].reduce(
        (result, size) => {
          return (
            result + f.url + "?w=" + size + imgixParams + " " + size + "w, "
          );
        }
      );
      f.sizes = sizes;
    });
  } else {
    // Set base image size
    url = url.replace(
      "https://testing.novembre.global",
      "https://novmag.imgix.net"
    );

    src = url + "?w=1200" + fullWidthParams;
    srcPortrait = url + "?w=1000" + portraitParams;

    // Generate srcset
    srcset = ["", 600, 800, 1000, 1200, 1400, 1600, 2000].reduce(
      (result, size) => {
        return (
          result + url + "?w=" + size + fullWidthParams + " " + size + "w, "
        );
      }
    );

    srcsetPortrait = ["", 600, 800, 1000, 1200, 1400, 1600, 2000].reduce(
      (result, size) => {
        return (
          result + url + "?w=" + size + portraitParams + " " + size + "w, "
        );
      }
    );

    if (size === true || size === "fullWidth") {
      // FULL WIDTH
      sizes = "80vw";
    } else {
      // PROPORTIONAL or inline
      sizes = "70vw";
    }
  }

  // *** ON MOUNT
  onMount(async () => {
    let images = imageEl.querySelectorAll(".image__image");
    // console.log(images);
    if (images) {
      images.forEach(i => {
        imagesLoaded(i, instance => {
          // console.log(instance);
          i.classList.add("loaded");
        });
      });
    }
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
    }

    &__image {
      opacity: 0;
      transition: opacity 2s $transition;

      &.loaded {
        opacity: 1;
      }
    }

    &--full {
      height: $full-height;
      width: 100vw;

      img,
      video {
        height: 100%;
        width: 100%;
        object-fit: cover;
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

    &--free {
      cursor: pointer;

      display: inline-block;

      #{ $block }__image {
        max-height: 500px;
        float: left;
        margin-left: $small-margin;
        margin-top: $small-margin;
        height: auto;
      }

      &--free-1 {
        #{ $block }__image {
          max-width: 100vw;
          // background: red;
        }
      }

      #{ $block }__title {
        width: 100%;
        font-size: $large;
        font-weight: 300;
        line-height: 0.85em;
        text-transform: uppercase;
        margin-bottom: $small-margin;
        margin-left: $small-margin;
        margin-top: $small-margin;
        text-decoration: none;
        position: static;
        display: inline-block;

        @include screen-size("small") {
          font-size: $mobile_large;
        }
      }
    }

    &--free-1 {
      #{ $block }__image {
        max-width: 45vw;
        // background: red;
      }
    }

    &--free-2 {
      #{ $block }__image {
        max-width: 40vw;
        // background: red;
      }
    }

    &--free-3 {
      #{ $block }__image {
        max-width: 30vw;
        // background: red;
      }
    }

    &--free-4 {
      #{ $block }__image {
        max-width: 23vw;
        // background: red;
      }
    }
  }

  .caption {
    margin-left: $small-margin;
    font-family: $sans-stack;
    font-size: $small;
    font-weight: 300;
  }
</style>

<div
  class="image"
  class:image--full={size == true || size == 'fullWidth' || multiFiles.length === 0}
  class:image--inline={size == 'proportional' || size == 'inline'}
  class:image--free={!size && multiFiles && multiFiles.length > 0}
  class:listing={isListing}
  class:image--free-1={!size && multiFiles && multiFiles.length === 1}
  class:image--free-2={!size && multiFiles && multiFiles.length === 2}
  class:image--free-3={!size && multiFiles && multiFiles.length === 3}
  class:image--free-4={!size && multiFiles && multiFiles.length === 4}
  bind:this={imageEl}>

  {#if size || multiFiles.length === 0}
    <MediaQuery query="(min-width: 800px)" let:matches>
      <!-- {#if matches} -->
      <!-- Desktop -->
      <!-- <img
          class="image__image"
          {srcset}
          {sizes}
          {src}
          alt={caption}
          class:loaded />
      {:else} -->
      <!-- Phone -->
      <img
        class="image__image"
        srcset={matches ? srcset : srcsetPortrait}
        {sizes}
        src={matches ? src : srcPortrait}
        alt={caption}
        class:loaded />
      <!-- {/if} -->
    </MediaQuery>
    {#if !isListing}
      <div class="caption">{caption}</div>
    {/if}
  {:else}
    {#each multiFiles as slide}
      <img
        class="image__image image__image--multi"
        alt="Novembre"
        srcset={slide.srcset}
        sizes={slide.sizes}
        src={slide.src}
        class:loaded />
    {/each}
  {/if}

</div>

<script>
  // # # # # # # # # # # # # #
  //
  //  Multi image module
  //
  // # # # # # # # # # # # # #

  // *** IMPORTS
  import imagesLoaded from "imagesloaded";
  import { onMount } from "svelte";

  // *** PROPS
  export let files = [];
  export let size = true;
  export let loaded = false;

  // *** VARIABLES
  let src = "";
  let srcset = "";
  let srcsetPortrait = "";
  let sizes = "";
  let imageEl = {};
  let imgixParams = "&auto=format";

  // Size depending on layout
  if (files.length === 1) {
    // FULL WIDTH
    sizes = "50vw";
  } else if (files.length === 2) {
    // PROPORTIONAL or inline
    sizes = "35vw";
  } else if (files.length === 3) {
    sizes = "30vw";
  } else if (files.length === 4) {
    sizes = "20vw";
  }

  files.forEach(f => {
    f.url = f.url.replace(
      "https://testing.novembre.global",
      "https://novtest.imgix.net"
    );
    f.src = f.url + "?w=800" + imgixParams;
    f.srcset = ["", 200, 400, 600, 800, 1000, 1200, 1400].reduce(
      (result, size) => {
        return result + f.url + "?w=" + size + imgixParams + " " + size + "w, ";
      }
    );
    f.sizes = sizes;
  });

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
    &.loaded {
      opacity: 1;
    }

    $block: &;

    margin-bottom: $large-vertical-margin;

    &.listing {
      margin-top: 0px;
      margin-bottom: 0px;

      .image--free {
        margin-bottom: $small-margin;
      }
    }

    &__image {
      opacity: 1;
      transition: opacity 0.5s $transition;
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
      margin-bottom: $large-vertical-margin;

      img,
      video {
        width: 100%;
      }
    }

    &--free {
      // cursor: pointer;
      display: inline-block;
      margin-bottom: $small-margin;

      @include screen-size("small") {
        width: 10000px;
      }

      #{ $block }__image {
        max-height: 440px;
        float: left;
        margin-left: $small-margin;
        margin-top: $small-margin;
        height: auto;
        @include screen-size("small") {
          float: unset;
          max-height: unset;
        }
      }

      &--free-1 {
        #{ $block }__image {
          max-width: 100vw;
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

        @include screen-size("small") {
          max-width: unset;
          width: 75vw;
        }
      }
    }

    &--free-2 {
      #{ $block }__image {
        max-width: 40vw;
        @include screen-size("small") {
          max-width: unset;
          width: 46vw;
        }
      }
    }

    &--free-3 {
      #{ $block }__image {
        max-width: 30vw;

        @include screen-size("small") {
          max-width: unset;
          width: 42vw;
        }
      }
    }

    &--free-4 {
      #{ $block }__image {
        max-width: 23vw;
        @include screen-size("small") {
          max-width: unset;
          width: 38vw;
        }
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
  class="image image--free"
  class:image--free-1={files && files.length === 1}
  class:image--free-2={files && files.length === 2}
  class:image--free-3={files && files.length === 3}
  class:image--free-4={files && files.length === 4}
  class:loaded
  bind:this={imageEl}>

  {#each files as slide}
    <img
      class="image__image image__image--multi"
      alt="Novembre"
      srcset={slide.srcset}
      sizes={slide.sizes}
      src={slide.src} />
  {/each}

</div>

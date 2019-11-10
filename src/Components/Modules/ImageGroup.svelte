<script>
  // # # # # # # # # # # # # #
  //
  //  IMAGE GROUP
  //  *
  //  _ caption
  //  _ maxHeigth
  //  _ alignment
  //  _ inlineDisplay
  //  _ backgroundColor
  //  *
  //
  // # # # # # # # # # # # # #

  // *** IMPORTS
  import MediaQuery from "svelte-media-query";
  import { fade } from "svelte/transition";
  import { urlFor } from "../../sanity.js";

  // *** PROPS
  export let imageArray = [];
  export let caption = false;
  export let isListing = false;
  export let backgroundColor = false;
  export let alignment = "";
  export let maxHeight = false;
  export let inlineDisplay = false;

  const customStyles =
    (maxHeight ? "height:" + maxHeight + "vh; " : "") +
    (backgroundColor ? "background:" + backgroundColor.hex + ";" : "");

  let loaded = false;
</script>

<style lang="scss">
  @import "../../variables.scss";

  .image-group {
    width: 100%;
    height: auto;
    display: inline-block;
    padding-bottom: 40px;

    &.listing {
      margin-top: 0px;
      margin-bottom: 0px;
      padding-bottom: 0;

      img {
        margin-bottom: $small-margin;
      }
    }

    img {
      opacity: 0;
      transition: opacity 0.25s $transition;
      max-height: 440px;
      float: left;
      margin-left: $small-margin;
      margin-top: $small-margin;
      height: auto;

      @include screen-size("small") {
        float: unset;
        max-height: unset;
      }

      &.loaded {
        opacity: 1;
      }
    }
  }

  .group-size-1 {
    img {
      max-width: 45vw;

      @include screen-size("small") {
        max-width: unset;
        width: 75vw;
      }
    }
  }

  .group-size-2 {
    img {
      max-width: 40vw;
      @include screen-size("small") {
        max-width: unset;
        width: 46vw;
      }
    }
  }

  .group-size-3 {
    img {
      max-width: 30vw;

      @include screen-size("small") {
        max-width: unset;
        width: 42vw;
      }
    }
  }

  .group-size-4 {
    img {
      max-width: 23vw;
      @include screen-size("small") {
        max-width: unset;
        width: 38vw;
      }
    }
  }

  .caption {
    font-family: $sans-stack;
    font-size: $small;
    font-weight: 300;
    width: 100%;
    margin-left: auto;
    margin-right: auto;
    text-align: center;
    margin-bottom: $large-vertical-margin;
  }
</style>

<div
  class="image-group"
  class:listing={isListing}
  class:group-size-1={imageArray.length === 1}
  class:group-size-2={imageArray.length === 2}
  class:group-size-3={imageArray.length === 3}
  class:group-size-4={imageArray.length === 4}
  style={customStyles}>
  {#each imageArray as image}
    <img
      class:loaded
      src={urlFor(image)
        .width(1000)
        .quality(90)
        .auto('format')
        .url()}
      alt={caption ? caption : 'novembre.global'}
      on:load={e => (loaded = true)} />
  {/each}

</div>

{#if caption}
  <div class="caption">{caption}</div>
{/if}

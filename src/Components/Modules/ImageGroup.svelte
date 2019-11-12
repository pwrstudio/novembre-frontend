<script>
  // # # # # # # # # # # # # #
  //
  //  MEDIA GROUP
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
  export let isHeader = false;
  export let backgroundColor = false;
  export let alignment = "";
  export let fullwidth = false;
  export let maxHeight = false;
  export let inlineDisplay = false;

  const customStyles =
    (maxHeight ? "height:" + maxHeight + "vh; " : "") +
    (backgroundColor ? "background:" + backgroundColor.hex + ";" : "");

  const customStylesPhone = backgroundColor
    ? "background:" + backgroundColor.hex + ";"
    : "";

  let loaded = false;
</script>

<style lang="scss">
  @import "../../variables.scss";

  .image-group {
    width: 100%;
    height: 100vh;
    display: inline-flex;
    padding-bottom: 2 * $small-margin;
    margin-bottom: $large-vertical-margin;
    align-items: flex-start;

    @include screen-size("small") {
      height: auto;
    }

    img {
      opacity: 0;
      transition: opacity 0.25s $transition;
      object-fit: contain;
      margin-left: $small-margin;
      margin-top: $small-margin;
      height: 100%;

      @include screen-size("small") {
        max-height: unset;
        object-fit: unset;
        height: auto;
      }

      &.loaded {
        opacity: 1;
      }
    }
  }

  .group-size-1 {
    img {
      height: 100%;

      @include screen-size("small") {
        max-width: unset;
        width: 95vw;
      }
    }
  }

  .group-size-2 {
    img {
      max-width: 40vw;
      @include screen-size("small") {
        max-width: unset;
        width: 40vw;
      }
    }
  }

  .group-size-3 {
    img {
      max-width: 30vw;

      @include screen-size("small") {
        max-width: unset;
        width: 30vw;
      }
    }
  }

  .group-size-4 {
    img {
      max-width: 23vw;
      @include screen-size("small") {
        max-width: unset;
        width: 23vw;
      }
    }
  }

  .caption {
    font-family: $sans-stack;
    font-size: $xsmall;
    font-weight: 300;
    width: 100%;
    margin-left: auto;
    margin-right: auto;
    text-align: center;
    margin-bottom: $large-vertical-margin;
  }

  .left {
    justify-content: flex-start;
  }

  .right {
    justify-content: flex-end;
  }

  .center {
    justify-content: center;
  }

  .fullwidth {
    height: $full-height;
    width: 100vw;
    padding: 0;

    img {
      height: 100%;
      width: 100%;
      object-fit: cover;
      max-width: unset;
      padding: 0;
      margin: 0;
    }
  }

  .image-group {
    &.listing {
      margin-top: 0px;
      margin-bottom: 0px;
      padding-bottom: 0;
      display: inline-block;
      max-height: 440px;
      @include screen-size("small") {
        height: auto;
        width: 10000px;
      }

      img {
        margin-bottom: $small-margin;
        float: left;
        object-position: top;
        max-height: 435px;
        @include screen-size("small") {
          float: unset;
        }
      }
    }
  }

  .image-group {
    &.header {
      margin-top: 0px;
      margin-bottom: 0px;
      padding-bottom: 0;
      display: inline-block;
      max-height: 580px;
      @include screen-size("small") {
        height: auto;
        width: 10000px;
      }

      img {
        margin-bottom: $small-margin;
        float: left;
        object-position: top;
        max-height: 575px;
        @include screen-size("small") {
          float: unset;
        }
      }
    }
  }
</style>

<MediaQuery query="(min-width: 800px)" let:matches>

  <div
    class="image-group {alignment}"
    class:listing={isListing}
    class:header={isHeader}
    class:fullwidth
    class:group-size-1={imageArray.length === 1}
    class:group-size-2={imageArray.length === 2}
    class:group-size-3={imageArray.length === 3}
    class:group-size-4={imageArray.length === 4}
    style={matches ? customStyles : customStylesPhone}>
    {#each imageArray as image}
      <img
        class:loaded
        src={fullwidth ? urlFor(image)
              .width(1800)
              .height(1200)
              .quality(90)
              .auto('format')
              .url() : urlFor(image)
              .width(1200 / imageArray.length)
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

</MediaQuery>

<script>
  // # # # # # # # # # # # # #
  //
  //  SINGLE IMAGE
  //  *
  //  _ caption
  //  _ maxHeigth
  //  _ alignment
  //  _ inlineDisplay
  //  _ fullWidth
  //  _ backgroundColor
  //  *
  //
  // # # # # # # # # # # # # #

  // *** IMPORTS
  import MediaQuery from "svelte-media-query";
  import { urlFor } from "../../sanity.js";

  // *** PROPS
  export let imageObject = {};
  export let caption = false;
  export let backgroundColor = false;
  export let alignment = "";
  export let maxHeight = false;
  export let fullwidth = false;
  export let isListing = false;
  export let inlineDisplay = false;

  const customStyles =
    (maxHeight ? "height:" + maxHeight + "vh; " : "") +
    (backgroundColor ? "background:" + backgroundColor.hex + ";" : "");

  // *** VARIABLES
  const src = fullwidth
    ? urlFor(imageObject)
        .width(1800)
        .height(1200)
        .quality(100)
        .auto("format")
        .url()
    : urlFor(imageObject)
        .width(800)
        .quality(90)
        .auto("format")
        .url();

  const srcPortrait = urlFor(imageObject)
    .width(800)
    .quality(90)
    .auto("format")
    .url();

  let loaded = false;
</script>

<style lang="scss">
  @import "../../variables.scss";

  .single-image {
    height: 100vh;
    width: 100%;

    @include screen-size("small") {
      height: auto;
      width: 100%;
    }
  }

  .bottom-space {
    margin-bottom: 1.2em;
  }

  img {
    opacity: 0;
    transition: opacity 0.25s $transition;
    height: 100%;
    width: 800px;
    object-fit: contain;
    max-width: 95vw;
    display: block;

    @include screen-size("small") {
      height: auto;
      width: 100%;
    }

    &.loaded {
      opacity: 1;
    }
  }

  figure {
    display: inline-block;
    height: 100%;
    margin: 0;
  }

  figcaption {
    font-family: $sans-stack;
    font-size: $small;
    font-weight: 300;
    width: 100%;
    text-align: center;
  }

  .center {
    text-align: center;
    figure {
      margin-left: auto;
      margin-right: auto;
    }
  }

  .left {
    text-align: left;
    @include screen-size("small") {
      text-align: center;
    }

    figure {
      margin-left: $small-margin;
      margin-right: auto;

      @include screen-size("small") {
        margin-left: auto;
        margin-right: auto;
      }
    }
  }

  .right {
    text-align: right;

    @include screen-size("small") {
      text-align: center;
    }

    figure {
      margin-left: auto;
      margin-right: $small-margin;

      @include screen-size("small") {
        margin-left: auto;
        margin-right: auto;
      }
    }
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
    }

    figure {
      height: $full-height;
      width: 100vw;
      display: block;
    }

    figcaption {
      height: auto;
      width: 800px;
      margin-left: auto;
      margin-right: auto;
      max-width: 95vw;
      margin-bottom: $large-vertical-margin;
    }
  }

  .listing {
    margin-top: 0px;
    margin-bottom: 0px;

    img {
      margin-bottom: $small-margin;
    }
  }
</style>

<div
  class="single-image {alignment}"
  class:fullwidth
  class:bottom-space={inlineDisplay}
  style={customStyles}>
  <MediaQuery query="(min-width: 800px)" let:matches>
    <figure>
      <img
        class:loaded
        src={matches ? src : srcPortrait}
        alt={caption ? caption : 'novembre.global'}
        on:load={e => (loaded = true)} />
      {#if caption}
        <figcaption>{caption}</figcaption>
      {/if}
    </figure>
  </MediaQuery>
</div>

<script>
  // # # # # # # # # # # # # #
  //
  //  SINGLE IMAGE
  //
  // # # # # # # # # # # # # #

  // *** IMPORTS
  import MediaQuery from "svelte-media-query";
  import { urlFor } from "../../sanity.js";

  // *** PROPS
  export let imageObject = {};
  export let caption = false;
  export let alignment = "";
  export let maxHeight = false;
  export let fullwidth = false;
  export let inlineDisplay = false;

  // *** VARIABLES
  const src = urlFor(imageObject)
    .width(1400)
    .height(1000)
    .quality(90)
    .auto("format")
    .url();

  const srcPortrait = urlFor(imageObject)
    .width(600)
    .height(1000)
    .quality(90)
    .auto("format")
    .url();

  let loaded = false;
</script>

<style lang="scss">
  @import "../../variables.scss";

  .single-image {
    height: 600px;
  }

  .bottom-space {
    margin-bottom: $large-vertical-margin;
  }

  img {
    opacity: 0;
    transition: opacity 0.25s $transition;
    height: 100%;
    display: block;

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
    figure {
      margin-left: $small-margin;
      margin-right: auto;
    }
  }

  .right {
    text-align: right;
    figure {
      margin-left: auto;
      margin-right: $small-margin;
    }
  }

  .fullwidth {
    height: $full-height;
    width: 100vw;

    img {
      height: 100%;
      width: 100%;
      object-fit: cover;
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
  class:bottom-space={inlineDisplay}>
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

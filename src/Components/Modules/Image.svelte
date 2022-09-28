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
  import MediaQuery from "svelte-media-query"
  import { urlFor } from "../../sanity.js"

  // *** PROPS
  export let imageObject = {}
  export let caption = false
  export let backgroundColor = false
  export let alignment = ""
  export let maxHeight = false
  export let fullwidth = false
  export let isListing = false
  export let inlineDisplay = false
  export let linkUrl = false

  const customStyles =
    (maxHeight ? "max-height:" + maxHeight + "vh; " : "") +
    (backgroundColor ? "background:" + backgroundColor.hex + ";" : "")

  // *** VARIABLES
  const src = fullwidth
    ? urlFor(imageObject)
        .width(1600)
        .height(1100)
        .quality(90)
        .auto("format")
        .url()
    : urlFor(imageObject).width(800).quality(90).auto("format").url()

  const srcPortrait = urlFor(imageObject)
    .width(800)
    .quality(90)
    .auto("format")
    .url()

  let loaded = false
</script>

{#if linkUrl}
  <a
    href={linkUrl}
    target="_blank"
    class="single-image {alignment}"
    class:fullwidth
    class:listing={isListing}
    class:bottom-space={inlineDisplay}
    style={customStyles}
  >
    <MediaQuery query="(min-width: 800px)" let:matches>
      <figure>
        <img
          class:loaded
          src={matches ? src : srcPortrait}
          alt={caption ? caption : "novembre.global"}
          on:load={e => (loaded = true)}
        />
        {#if caption}
          <figcaption>{caption}</figcaption>
        {/if}
      </figure>
    </MediaQuery>
  </a>
{:else}
  <div
    class="single-image {alignment}"
    class:fullwidth
    class:listing={isListing}
    class:bottom-space={inlineDisplay}
    style={customStyles}
  >
    <MediaQuery query="(min-width: 800px)" let:matches>
      <figure>
        <img
          class:loaded
          src={matches ? src : srcPortrait}
          alt={caption ? caption : "novembre.global"}
          on:load={e => (loaded = true)}
        />
        {#if caption}
          <figcaption>{caption}</figcaption>
        {/if}
      </figure>
    </MediaQuery>
  </div>
{/if}

<style lang="scss">
  @import "../../variables.scss";

  .single-image {
    height: 100vh;
    width: 100%;
    display: block;
    border-bottom: unset;

    @include screen-size("small") {
      height: auto;
      width: 100%;
    }
  }

  .bottom-space {
    margin-bottom: $large-vertical-margin;
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
      max-height: 100%;
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
    letter-spacing: 0.1em;
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

    @include screen-size("small") {
      height: auto;
      padding-top: 100px;
      padding-bottom: 40px;
    }

    img {
      height: 100%;
      width: 100%;
      object-fit: cover;
      max-width: unset;

      @include screen-size("small") {
        object-fit: contain;
      }
    }

    figure {
      height: $full-height;
      width: 100vw;
      display: block;

      @include screen-size("small") {
        height: auto;
      }
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
    img {
      object-fit: cover;
      @include screen-size("small") {
        object-fit: contain;
      }
    }
  }
</style>

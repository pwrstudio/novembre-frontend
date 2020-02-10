<script>
  // # # # # # # # # # # # # #
  //
  //  Product
  //
  // # # # # # # # # # # # # #

  // *** IMPORTS
  import { onMount } from "svelte";
  import { fade, slide } from "svelte/transition";
  import { quintOut } from "svelte/easing";
  import get from "lodash/get";
  import isEmpty from "lodash/isEmpty";
  import {
    urlFor,
    loadProduct,
    toPlainText,
    renderBlockText
  } from "../sanity.js";

  // *** COMPONENTS
  //   import TaxList from "../Components/TaxList.svelte";
  import Footer from "../Components/Footer.svelte";
  //   import Preview from "../Components/Preview.svelte";
  //   import MetaData from "../Components/MetaData.svelte";

  // *** STORES
  import { navigationColor, scrollListActive } from "../stores.js";

  // *** MODULES
  //   import Image from "../Components/Modules/Image.svelte";
  //   import ImageGroup from "../Components/Modules/ImageGroup.svelte";
  //   import VideoEmbed from "../Components/Modules/VideoEmbed.svelte";
  //   import Audio from "../Components/Modules/Audio.svelte";
  //   import Slideshow from "../Components/Modules/Slideshow.svelte";
  //   import VideoLoop from "../Components/Modules/Video.svelte";

  // *** PROPS
  export let slug = "";
  export let location = {};

  // ** CONSTANTS
  const query = "*[_type == 'product' && slug.current == $slug][0]";

  // *** VARIABLES
  let currentSlug = slug;
  let title = "";
  let bannerActive = false;

  navigationColor.set("black");
  scrollListActive.set(false);

  // *** REACTIVE
  $: {
    if (slug !== currentSlug) {
      product = loadArticle(query, { slug: slug });
      currentSlug = slug;
    }
  }

  let product = loadProduct(query, { slug: slug });

  // *** ON MOUNT
  onMount(async () => {
    window.scrollTo(0, 0);
    // setTimeout(() => {
    //   bannerActive = true;
    // }, 3000);
  });
</script>

<style lang="scss">
  @import "../variables.scss";

  .product {
    background: $white;

    &.top-padded {
      padding-top: 100px;
    }

    &.bureau {
      background: $grey;
    }

    &__header {
      img,
      video {
        height: $full-height;
        width: 100%;
        object-fit: cover;
      }

      @include screen-size("small") {
        // height: 70vh;
      }
    }

    em {
      font-family: $serif-stack;
      font-style: italic;
    }

    &__title {
      font-size: $xlarge;
      font-weight: 300;
      line-height: 1em;
      text-transform: uppercase;
      margin-bottom: $large-vertical-margin;
      margin-top: $small-vertical-margin;
      line-height: 0.9em;
      max-width: 90%;
      font-family: $sans-stack;
      margin-left: $small-margin;
      opacity: 1;

      @include screen-size("small") {
        font-size: $mobile_xlarge;
        margin-bottom: $large-vertical-margin;
      }

      transition: opacity $transition;
    }

    &__tags {
      margin-left: $small-margin;
      margin-top: $small-margin;

      transition: opacity $transition;
    }
  }

  .related-header {
    font-family: $sans-stack;
    font-size: $large;
    font-weight: 300;
    line-height: 1em;
    text-transform: uppercase;
    line-height: 0.9em;
    margin-bottom: $small-margin;
    margin-top: $small-vertical-margin;
    margin-left: $small-margin;

    @include screen-size("small") {
      font-size: $mobile_large;
    }
  }

  .bureau {
    font-family: $sans-stack;
  }

  a {
    color: currentColor;
    text-decoration: none;
    border-bottom: 1px solid $black;
    transition: border 0.3s $transition;

    &:hover {
      border-bottom: 1px solid transparent;
    }
  }

  .sidebar-banner {
    position: fixed;
    top: 20vh;
    right: 2 * $small-margin;
    width: 200px;
    z-index: 100;
    border-bottom: 0;

    img {
      width: 100%;
      max-height: 70vh;
      object-fit: contain;
    }

    @include screen-size("small") {
      display: none;
    }
  }

  .bottom-space {
    height: $large-vertical-margin;
    width: 100%;
  }

  .left-pane {
    height: 100vh;
    width: 50vw;
    float: left;

    img {
      height: 100%;
      width: 100%;
      object-fit: cover;
    }
  }

  .right-pane {
    height: 100vh;
    width: 50vw;
    float: left;
    padding-top: 80px;
    background: $white;
  }

  .title {
    font-size: $large;
    font-weight: 300;
    line-height: 1em;
    text-transform: uppercase;
    margin-top: $small-vertical-margin;
    line-height: 0.9em;
    max-width: 90%;
    font-family: $sans-stack;
    margin-left: $small-margin;
    opacity: 1;
    margin-bottom: 0 !important;
    @include screen-size("small") {
      font-size: $mobile_large;
      margin-bottom: $large-vertical-margin;
    }

    transition: opacity $transition;
  }

  .description {
    font-size: $large;
    font-weight: 300;
    line-height: 1em;
    line-height: 0.9em;
    max-width: 90%;
    font-family: $sans-stack;
    margin-left: $small-margin;
    opacity: 1;
    margin-bottom: 0;

    p {
      margin: 0 !important;
    }

    @include screen-size("small") {
      font-size: $mobile_large;
      margin-bottom: $large-vertical-margin;
    }

    transition: opacity $transition;
  }

  .details {
    font-size: $small;
    font-weight: 300;
    max-width: 90%;
    font-family: $sans-stack;
    margin-left: $small-margin;
    opacity: 1;
    margin-bottom: 0;

    p {
      margin: 0 !important;
    }

    @include screen-size("small") {
      font-size: $mobile_large;
      margin-bottom: $large-vertical-margin;
    }

    transition: opacity $transition;
  }

  .purchase-link {
    font-size: $intro;
    font-weight: 300;
    line-height: 1em;
    text-transform: uppercase;
    line-height: 0.9em;
    max-width: 90%;
    font-family: $sans-stack;
    margin-left: $small-margin;
    opacity: 1;
    text-decoration: none;

    background: none;
    border: none;
    outline: none;
    cursor: pointer;
    display: inline-block;
    padding: 0;

    margin-top: $large-vertical-margin;

    border-bottom: 2px solid $black;

    @include screen-size("small") {
      font-size: $mobile_large;
      margin-bottom: $large-vertical-margin;
    }

    transition: opacity $transition;

    &:hover {
      border-bottom: 2px solid transparent;
    }
  }
</style>

{#await product then product}

  <!-- <MetaData {product} /> -->

  <article class="product">

    <div class="left-pane">
      <img
        src={urlFor(product.mainImage)
          .width(1400)
          .quality(90)
          .auto('format')
          .url()} />

    </div>

    <div class="right-pane">

      <!-- TITLE -->
      <h1 class="title">
        {@html product.title}
      </h1>

      <!-- MAIN CONTENT -->
      <div class="description">
        {@html renderBlockText(product.description)}
      </div>

      <div class="details">
        <p>€{product.price}</p>
        {@html renderBlockText(product.details)}
      </div>

      {#if product.isExternal}
        <a href={product.externalLink} class="purchase-link" target="_blank">
          Buy from {product.externalName}
        </a>
      {:else}
        <button
          class="snipcart-add-item purchase-link"
          data-item-id={product.slug.current}
          data-item-price={product.price}
          data-item-url={product.slug.current}
          data-item-description={toPlainText(product.description)}
          data-item-image={urlFor(product.mainImage)
            .width(400)
            .quality(70)
            .auto('format')
            .url()}
          data-item-name={product.title}>
          Add to cart
        </button>
      {/if}

    </div>

    <!-- RELATED -->
    <!-- {#if product.related && !isEmpty(product.related)}
      <div class="related-header">RELATED ARTICLES</div>
      <Slideshow imageArray={product.related} isRelated={true} />
    {:else}
      <div class="bottom-space" />
    {/if} -->

  </article>

  <Footer active={true} />

{/await}

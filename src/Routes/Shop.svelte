<script>
  // # # # # # # # # # # # # #
  //
  //  SHOP
  //
  // # # # # # # # # # # # # #

  // *** IMPORTS
  import { onMount } from "svelte";
  import {
    urlFor,
    toPlainText,
    renderBlockText,
    loadProducts
  } from "../sanity.js";
  import get from "lodash/get";

  import MetaData from "../Components/MetaData.svelte";

  // STORES
  import { navigationColor, pages, scrollListActive } from "../stores.js";

  // *** MODULES
  import Image from "../Components/Modules/Image.svelte";
  import ImageGroup from "../Components/Modules/ImageGroup.svelte";
  import VideoEmbed from "../Components/Modules/VideoEmbed.svelte";
  import Audio from "../Components/Modules/Audio.svelte";
  import Slideshow from "../Components/Modules/Slideshow.svelte";

  // COMPONENTS
  import Footer from "../Components/Footer.svelte";

  // PROPS
  export let slug = "";
  export let location = {};

  const query = '*[_type == "product"]';
  const products = loadProducts(query);

  navigationColor.set("black");
  scrollListActive.set(false);

  // *** ON MOUNT
  onMount(async () => {
    window.scrollTo(0, 0);
  });
</script>

<style lang="scss">
  @import "../variables.scss";

  .shop {
    display: inline-block;
    background: $white;
    width: 100vw;
    height: auto;
    min-height: 100vh;
    line-height: 1em;
    padding-bottom: $large-vertical-margin;
  }

  .shop-item {
    width: 50%;
    height: 100vh;
    float: left;
    position: relative;
  }

  .shop-item-image {
    width: 100%;
    height: 100%;
    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }

  .shop-item-title {
    position: absolute;
    bottom: $small-margin;
    left: $small-margin;
    font-size: $large;
    font-weight: 300;
    line-height: 1em;
    text-transform: uppercase;
    line-height: 0.9em;
    max-width: 90%;
    font-family: $sans-stack;
    opacity: 1;
  }
</style>

<MetaData post={{ title: 'Shop' }} />

{#await products then products}
  <article class="shop" use:links>

    {#each products as p}
      <a href="/shop/{p.slug.current}" class="shop-item">
        <div class="shop-item-image">
          <img
            src={urlFor(p.mainImage)
              .width(1400)
              .quality(90)
              .auto('format')
              .url()} />
        </div>
        <div class="shop-item-title">{p.title}</div>
      </a>
    {/each}

  </article>

  <Footer active={true} />
{/await}

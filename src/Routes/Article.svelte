<script>
  // # # # # # # # # # # # # #
  //
  //  ARTICLE
  //
  // # # # # # # # # # # # # #

  // *** IMPORTS
  import { fade, slide } from "svelte/transition";
  import { quintOut } from "svelte/easing";
  import get from "lodash/get";
  import { loadArticle, renderBlockText } from "../sanity.js";

  // *** COMPONENTS
  import TaxList from "../Components/TaxList.svelte";
  import Footer from "../Components/Footer.svelte";
  import Preview from "../Components/Preview.svelte";

  // *** STORES
  import { navigationColor } from "../stores.js";

  // *** MODULES
  import Image from "../Components/Modules/Image.svelte";
  import ImageGroup from "../Components/Modules/ImageGroup.svelte";
  import VideoEmbed from "../Components/Modules/VideoEmbed.svelte";
  import Audio from "../Components/Modules/Audio.svelte";
  import Slideshow from "../Components/Modules/Slideshow.svelte";

  // *** PROPS
  export let slug = "";
  export let isBureau = false;
  export let location = {};

  // ** CONSTANTS
  const query = "*[slug.current == $slug]{..., related[]->{title}}[0]";

  // *** VARIABLES
  let currentSlug = slug;
  let title = "";

  navigationColor.set("black");

  // *** REACTIVE
  $: {
    if (slug !== currentSlug) {
      post = loadArticle(query, { slug: slug });
      currentSlug = slug;
    }
  }

  let post = loadArticle(query, { slug: slug });
</script>

<style lang="scss">
  @import "../variables.scss";

  .article {
    background: white;

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
        margin-bottom: $small-vertical-margin;
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
      // margin-bottom: 0px;
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
</style>

<!-- <svelte:head>
  <title>{title} NOVEMBRE</title>
</svelte:head> -->

{#await post then post}

  <article class="article">

    <!-- HEADER MEDIA -->
    <div class="article__header">
      <Preview {post} isHeader={true} />
      <!-- {#if post.preview._type == 'singleImage'}
        <Image imageObject={post.preview.image} fullwidth={true} />
      {/if} -->
    </div>

    <!-- DATE & TAGS -->
    <div class="article__tags">
      <TaxList
        taxonomy={post.taxonomy}
        white={true}
        date={post.publicationDate} />
    </div>

    <!-- TITLE -->
    <h1 class="article__title">
      {@html post.title}
    </h1>

    <!-- MAIN CONTENT -->
    <div class="content">
      {#each post.content as c}
        {#if c._type == 'block'}
          {@html renderBlockText(c)}
        {/if}
        {#if c._type == 'singleImage'}
          <Image
            imageObject={c.image}
            inlineDisplay={true}
            caption={get(c, 'caption', false)}
            alignment={get(c, 'alignment', '')}
            fullwidth={get(c, 'fullwidth', '')} />
        {/if}
        {#if c._type == 'imageGroup'}
          <ImageGroup
            imageArray={c.images}
            caption={get(c, 'caption', false)} />
        {/if}
        {#if c._type == 'video'}
          <VideoEmbed url={c.video} caption={get(c, 'caption', false)} />
        {/if}
        {#if c._type == 'slideshow'}
          <Slideshow imageArray={c.images} />
        {/if}
        {#if c._type == 'audio'}
          <Audio fileObject={c.audio} />
        {/if}
      {/each}
    </div>

    <!-- RELATED -->
    {#if post.related}
      <div class="related-header">RELATED ARTICLES</div>
      {#each post.related as p}{p.title}{/each}
      <Slideshow imageArray={post.related} isRelated={true} isPreview={false} />
    {/if}

  </article>

  <Footer active={true} />
{/await}

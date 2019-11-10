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
  import isEmpty from "lodash/isEmpty";
  import { urlFor, loadArticle, renderBlockText } from "../sanity.js";

  // *** COMPONENTS
  import TaxList from "../Components/TaxList.svelte";
  import Footer from "../Components/Footer.svelte";
  import Preview from "../Components/Preview.svelte";
  import MetaData from "../Components/MetaData.svelte";

  // *** STORES
  import { navigationColor, scrollListActive } from "../stores.js";

  // *** MODULES
  import Image from "../Components/Modules/Image.svelte";
  import ImageGroup from "../Components/Modules/ImageGroup.svelte";
  import VideoEmbed from "../Components/Modules/VideoEmbed.svelte";
  import Audio from "../Components/Modules/Audio.svelte";
  import Slideshow from "../Components/Modules/Slideshow.svelte";
  import VideoLoop from "../Components/Modules/Video.svelte";

  // *** PROPS
  export let slug = "";
  export let isBureau = false;
  export let location = {};

  // ** CONSTANTS
  const query =
    "*[slug.current == $slug]{'previewVideoUrl': preview[0].video.asset->url,..., related[]->{title, 'slug': slug.current, mainImage, 'category': taxonomy.category}}[0]";

  // *** VARIABLES
  let currentSlug = slug;
  let title = "";

  navigationColor.set("black");
  scrollListActive.set(false);

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

  .sidebar-banner {
    position: fixed;
    top: 20vh;
    right: 2 * $small-margin;
    width: 200px;
    z-index: 10;
    border-bottom: 0;

    img {
      width: 100%;
      max-height: 70vh;
      object-fit: contain;
    }
  }
</style>

{#await post then post}

  <MetaData {post} />

  {#if post.banner}
    <a
      href={post.banner.link}
      target="_blank"
      rel="noreferrer"
      class="sidebar-banner">
      <img
        src={urlFor(post.banner.image)
          .width(500)
          .quality(90)
          .auto('format')
          .url()} />
    </a>
  {/if}

  <article class="article">

    <!-- HEADER MEDIA -->
    <div class="article__header">
      <Preview {post} isHeader={true} />
    </div>

    <!-- DATE & TAGS -->
    <div class="article__tags">
      <TaxList
        taxonomy={post.taxonomy}
        white={false}
        isArticle={true}
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
            maxHeight={get(c, 'maxHeight', false)}
            backgroundColor={get(c, 'backgroundColor', false)}
            caption={get(c, 'caption', false)}
            alignment={get(c, 'alignment', '')}
            fullwidth={get(c, 'fullwidth', '')} />
        {/if}
        {#if c._type == 'imageGroup'}
          <ImageGroup
            imageArray={c.images}
            inlineDisplay={true}
            maxHeight={get(c, 'maxHeight', false)}
            backgroundColor={get(c, 'backgroundColor', false)}
            alignment={get(c, 'alignment', '')}
            fullwidth={get(c, 'fullwidth', '')}
            caption={get(c, 'caption', false)} />
        {/if}
        {#if c._type == 'videoLoop'}
          <VideoLoop
            url={'https://cdn.sanity.io/files/gj963qwj/production/' + c.video.asset._ref
                .replace('file-', '')
                .replace('-mp4', '.mp4')}
            inlineDisplay={true}
            maxHeight={get(c, 'maxHeight', false)}
            backgroundColor={get(c, 'backgroundColor', false)}
            caption={get(c, 'caption', false)}
            alignment={get(c, 'alignment', '')}
            fullwidth={get(c, 'fullwidth', '')} />
        {/if}
        {#if c._type == 'video'}
          <VideoEmbed
            url={c.video}
            backgroundColor={get(c, 'backgroundColor', false)}
            caption={get(c, 'caption', false)} />
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
    {#if post.related && !isEmpty(post.related)}
      <div class="related-header">RELATED ARTICLES</div>
      <Slideshow imageArray={post.related} isRelated={true} />
    {/if}

  </article>

  <Footer active={true} />
{/await}

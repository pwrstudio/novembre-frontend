<script>
  // # # # # # # # # # # # # #
  //
  //  PREVIEW
  //
  // # # # # # # # # # # # # #

  // *** IMPORTS
  import { Router, links } from "svelte-routing";
  import { fade } from "svelte/transition";

  import MediaQuery from "svelte-media-query";

  import has from "lodash/has";
  import get from "lodash/get";
  import kebabCase from "lodash/kebabCase";

  // *** COMPONENTS
  import TaxList from "./TaxList.svelte";

  // *** MODULES
  import VideoLoop from "./Modules/Video.svelte";
  import Image from "./Modules/Image.svelte";
  import ImageGroup from "./Modules/ImageGroup.svelte";
  import Slideshow from "./Modules/Slideshow.svelte";

  // *** PROPS
  export let post = {};
  export let isHeader = false;
  export let isFirst = false;

  // *** VARIABLES
  let active = true;
  let loaded = true;

  const backgroundColor = has(post, "previewColors.backgroundColor")
    ? "background-color:" + post.previewColors.backgroundColor.hex + ";"
    : "";
  const customTextColor = has(post, "previewColors.customTextColor")
    ? "color:" + post.previewColors.customTextColor.hex + ";"
    : "";
  const elementStyles = backgroundColor + " " + customTextColor;
</script>

<style lang="scss">
  @import "../variables.scss";

  .preview {
    position: relative;
    user-select: none;
    color: black;
    opacity: 0;
    overflow: hidden;
    background: $white;

    &__tags {
      position: absolute;
      top: 0;
      left: 0;
      margin-left: 8px;
      margin-top: 8px;
      z-index: 10;
      max-width: 90vw;
      overflow: hidden;
      opacity: 1;

      transition: opacity 0.3 $transition;

      &.bottom-tags {
        position: static;
      }
    }

    &__title {
      font-size: $large;
      font-weight: 300;
      line-height: 0.85em;
      text-transform: uppercase;
      max-width: 95%;
      position: absolute;
      bottom: $small-margin;
      left: $small-margin;
      text-decoration: none;
      z-index: 1;
      font-family: $sans-stack;
      pointer-events: none;

      transition: opacity 0.3 $transition;

      &--free {
        position: static;
        left: unset;
        bottom: unset;
        margin-left: $small-margin;
        margin-top: $small-margin;
        padding-bottom: $small-margin;
      }

      @include screen-size("small") {
        font-size: $mobile_large;
      }

      &--large-text {
        font-size: $xlarge;
        position: static;
        left: unset;
        bottom: unset;
        margin-left: $small-margin;
        margin-top: $small-margin;

        @include screen-size("small") {
          font-size: $large;
          padding-bottom: 20px;
        }
      }

      p {
        margin: 0;

        em {
          font-family: $serif-stack;
          font-style: italic;
        }
      }

      em {
        font-family: $serif-stack;
        font-style: italic;
      }
    }

    &__quote {
      font-size: $xlarge;
      font-weight: 300;
      line-height: 0.85em;
      text-transform: uppercase;
      height: 400px;

      p {
        margin: 0;
      }

      em {
        font-family: $serif-stack;
        font-style: italic;
      }

      @include screen-size("small") {
        font-size: $mobile_large;
      }
    }

    &.image-group {
      // &.first {
      //   padding-top: 60px;
      // }
      &.header {
        padding-top: 70px;
        padding-bottom: 40px;
      }
    }
    &.text {
      &.first {
        padding-top: 155px;
      }
    }

    &.header {
      a {
        cursor: default;
      }
    }
  }

  .loaded {
    opacity: 1;
  }

  .white {
    color: $white;
  }
</style>

<Router>

  <div
    class="preview {kebabCase(get(post, 'preview._type', ''))}"
    class:loaded
    class:first={isFirst}
    class:white={get(post, 'previewColors.textColor', 'black') == 'white'}
    class:header={isHeader}
    style={elementStyles}
    use:links>

    <!-- TAGS -->
    {#if !isHeader}
      <div
        class="preview__tags"
        class:bottom-tags={get(post, 'preview._type', '') == 'imageGroup'}>
        <TaxList
          taxonomy={post.taxonomy}
          date={post.publicationDate}
          white={get(post, 'previewColors.textColor', 'black') === 'white'} />
      </div>
    {/if}

    {#if get(post, 'preview._type', '') === 'singleImage'}
      <a href="/{post.taxonomy.category}/{post.slug}">
        <Image
          fullwidth={true}
          isListing={true}
          imageObject={post.preview.image} />
      </a>
    {/if}

    {#if get(post, 'preview._type', '') === 'imageGroup'}
      <a href="/{post.taxonomy.category}/{post.slug}">
        <ImageGroup
          isListing={true}
          {isHeader}
          imageArray={post.preview.images} />
      </a>
    {/if}

    {#if get(post, 'preview._type', '') === 'slideshow'}
      <a href="/{post.taxonomy.category}/{post.slug}">
        <Slideshow
          autoplay={post.preview.autoplay}
          isListing={true}
          imageArray={post.preview.images} />
      </a>
    {/if}

    {#if get(post, 'preview._type', '') === 'videoLoop'}
      <a href="/{post.taxonomy.category}/{post.slug}">
        <VideoLoop
          isListing={true}
          fullwidth={true}
          url={post.previewVideoUrl}
          posterImage={get(post, 'preview.posterImage', post.mainImage)} />
      </a>
    {/if}

    {#if !isHeader}
      <a href="/{post.taxonomy.category}/{post.slug}">
        <div
          class="preview__title preview__title--free"
          class:preview__title--free={get(post, 'preview._type', '') == 'imageGroup'}>
          {@html post.title}
        </div>
      </a>
    {/if}

  </div>

</Router>

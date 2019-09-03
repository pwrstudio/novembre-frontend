<script>
  import { fade } from "svelte/transition";
  import { onMount, onDestroy } from "svelte";
  import Flickity from "flickity";
  import { createEventDispatcher } from "svelte/internal";
  import { Router, links } from "svelte-routing";

  // COMPONENTS
  import TaxList from "./TaxList.svelte";
  import Slideshow from "./Modules/Slideshow.svelte";
  import Video from "./Modules/Video.svelte";
  import Image from "./Modules/Image.svelte";

  export let post;

  const dispatch = createEventDispatcher();

  let previewContainer;
  let wp;
  let active = false;

  function activate() {
    active = true;
    dispatch("active");
    wp.destroy();
  }

  onMount(async () => {
    wp = new Waypoint({
      element: previewContainer,
      handler: activate,
      offset: "80%"
    });
  });
</script>

<style lang="scss">
  @import "../variables.scss";

  .preview {
    $block: &;

    position: relative;
    user-select: none;
    color: black;

    &__tags {
      position: absolute;
      top: 0;
      left: 0;
      margin-left: 10px;
      margin-top: $small-margin;
      z-index: 10;
      max-width: 90vw;
    }

    &__title {
      font-size: $large;
      font-weight: 300;
      line-height: 0.85em;
      text-transform: uppercase;
      max-width: 95%;
      padding-bottom: $small-margin;
      margin-left: $small-margin;
      position: absolute;
      bottom: $small-margin;
      left: $small-margin;
      text-decoration: none;
      z-index: 1;
      font-family: $sans-stack;
      overflow: hidden;

      &--free {
        position: static;
        left: unset;
        bottom: unset;
        // background: yellow;
      }

      &--large-text {
        font-size: $xlarge;
        position: static;
        left: unset;
        bottom: unset;
        // background: purple;
        margin-top: 80px;
        margin-bottom: 80px;
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
        // background: pink;
      }

      @include screen-size("small") {
        font-size: $mobile_large;
      }
    }

    &--text {
      // background: yellow;
      display: inline-block;
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

    &--white {
      color: white;
    }
  }

  .preview {
    opacity: 0;
    transform: translateY(10%);
    transition: opacity 1s ease-out, transform 0.5s ease-out;
  }

  .active {
    transform: translateY(0);
    opacity: 1;
  }

  .preview__slide {
    height: calc(100vh - 80px);
  }
</style>

<Router>
  <div
    class="preview preview--{post.header.previewType}"
    class:active
    class:preview--white={!post.header.previewColor}
    style="background-color: {post.header.backgroundColor}"
    bind:this={previewContainer}
    use:links>

    {#if post.header.taxonomy}
      <div class="preview__tags">
        <TaxList taxonomy={post.header.taxonomy} />
      </div>
    {/if}

    <a href="/{post.header.parent}/{post.header.slug}">

      <!-- IMAGE -->
      {#if post.header.previewType == 'image'}
        <Image
          size={post.header.previewSize}
          file={post.header.previewImage.file}
          url={post.header.previewImage.url}
          multiFiles={post.header.previewSlideshow}
          caption={post.header.htmlTitle.fullTitle} />
      {/if}

      <!-- VIDEO -->
      {#if post.header.previewType == 'video'}
        <Video
          file={post.header.previewVideo.file}
          url={post.header.previewVideo.url}
          caption={post.header.title} />
      {/if}

      <!-- SLIDESHOW -->
      {#if post.header.previewType == 'slideshow'}
        <Slideshow slides={post.header.previewSlideshow} />
      {/if}

      <!-- TEXT -->
      {#if post.header.previewType == 'text'}
        <div class="preview__text">
          <!-- <blockquote class="preview__quote">
            {post.header.previewText}
          </blockquote> -->
        </div>
      {/if}

      <div
        class="preview__title preview__title--free"
        class:preview__title--free={post.header.previewType == 'image' && !post.header.previewSize}
        class:preview__title--large-text={post.header.previewType == 'text'}>
        {@html post.header.htmlTitle.fullTitle}
      </div>

    </a>

  </div>
</Router>

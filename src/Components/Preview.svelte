<script>
  import { onMount } from "svelte";
  import { Router, links } from "svelte-routing";
  import MediaQuery from "svelte-media-query";

  // COMPONENTS
  import TaxList from "./TaxList.svelte";
  import Slideshow from "./Modules/Slideshow.svelte";
  import Video from "./Modules/Video.svelte";
  import Image from "./Modules/Image.svelte";

  export let post;

  let previewContainer;
  let active = false;

  console.dir(post);

  const observer = new IntersectionObserver(
    entries => {
      // console.log("xxx");
      entries.forEach(entry => {
        if (entry.intersectionRatio > 0) {
          // console.log("case 1");
          // console.log(entry.intersectionRatio);
          active = true;
          observer.disconnect();
        }
      });
    },
    { treshhold: 0.5 }
  );

  onMount(async () => {
    observer.observe(previewContainer);
  });
</script>

<style lang="scss">
  @import "../variables.scss";

  .preview {
    $block: &;

    position: relative;
    user-select: none;
    color: black;
    overflow: hidden;

    &__tags {
      position: absolute;
      top: 0;
      left: 0;
      margin-left: $small-margin;
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
      position: absolute;
      bottom: $small-margin;
      left: $small-margin;
      text-decoration: none;
      z-index: 1;
      font-family: $sans-stack;
      overflow: hidden;
      pointer-events: none;

      &--free {
        position: static;
        left: unset;
        bottom: unset;
        margin-left: $small-margin;
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
        margin-left: $small-margin;
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
        hyphens: auto;
      }
    }

    &--text {
      // background: yellow;
      // display: inline-block;
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
    transform: translateY(100px);
    transition: opacity 0.7s ease-out,
      transform 0.7s cubic-bezier(0.23, 1, 0.32, 1);
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

    <!-- TAGS -->
    {#if post.header.taxonomy}
      <MediaQuery query="(min-width: 800px)" let:matches>
        {#if matches}
          <div class="preview__tags">
            <TaxList
              taxonomy={post.header.taxonomy}
              white={!post.header.previewColor} />
          </div>
        {/if}
      </MediaQuery>
    {/if}

    <a href="/{post.header.parent}/{post.header.slug}">

      <!-- IMAGE -->
      {#if post.header.previewType == 'image'}
        <Image
          size={post.header.previewSize}
          file={post.header.previewImage.file}
          url={post.header.previewImage.url}
          multiFiles={post.header.previewSlideshow}
          caption={post.header.htmlTitle.fullTitle}
          isListing={true} />
      {/if}

      <!-- VIDEO -->
      {#if post.header.previewType == 'video'}
        <Video
          file={post.header.previewVideo.file}
          url={post.header.previewVideo.url}
          caption={post.header.title}
          isListing={true} />
      {/if}

      <!-- SLIDESHOW -->
      {#if post.header.previewType == 'slideshow'}
        <Slideshow slides={post.header.previewSlideshow} />
      {/if}

      <!-- TEXT -->
      {#if post.header.previewType == 'text'}
        <!-- <div class="preview__text"> -->
        <!-- <blockquote class="preview__quote">
            {post.header.previewText}
          </blockquote> -->
        <!-- </div> -->
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

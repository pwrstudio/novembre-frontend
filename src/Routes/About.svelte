<script>
  // # # # # # # # # # # # # #
  //
  //  ABOUT
  //
  // # # # # # # # # # # # # #

  // *** IMPORTS
  import { onMount } from "svelte";
  import { renderBlockText } from "../sanity.js";
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

  navigationColor.set("black");
  scrollListActive.set(false);

  // *** ON MOUNT
  onMount(async () => {
    window.scrollTo(0, 0);
  });
</script>

<style lang="scss">
  @import "../variables.scss";

  .about {
    display: inline-block;
    background: $hotpink;
    width: 100vw;
    height: auto;
    line-height: 1em;
    padding-bottom: $large-vertical-margin;
  }

  .about-text {
    padding-top: 100px;
    height: auto;
    max-width: 95%;
    font-family: $sans-stack;
    line-height: 1em;
    font-size: $intro;
    text-transform: uppercase;

    @include screen-size("small") {
      font-size: $mobile_intro;
    }

    p {
      padding: $small-margin;
      margin-left: $small-margin;
    }
  }

  .about-credits {
    width: 800px;
    margin-left: auto;
    margin-right: auto;
    margin-top: $small-vertical-margin;
    max-width: 95vw;
    padding-bottom: $large-vertical-margin;
    line-height: 1.2em;
    font-family: $sans-stack;

    .about-credits-column {
      width: 33.33%;
      float: left;

      @include screen-size("small") {
        width: 100%;
        float: unset;
      }
    }

    .about-credits-header {
      text-transform: uppercase;
    }

    .about-credits-item {
      margin-bottom: 2 * $small-vertical-margin;
      break-inside: avoid;
    }
  }
</style>

<MetaData post={{ title: 'About' }} />

{#await $pages then pages}
  <article class="about">

    <div class="about-text">
      {#each pages.about.content as c}
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

    <div class="about-credits">

      <div class="about-credits-column">
        {@html renderBlockText(pages.credits.columnOne.content)}
      </div>

      <div class="about-credits-column">
        {@html renderBlockText(pages.credits.columnTwo.content)}
      </div>

      <div class="about-credits-column">
        {@html renderBlockText(pages.credits.columnThree.content)}
      </div>
    </div>

  </article>

  <Footer active={true} />
{/await}

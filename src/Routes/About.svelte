<script>
  // # # # # # # # # # # # # #
  //
  //  ABOUT
  //
  // # # # # # # # # # # # # #

  // STORES
  import { navigationColor, pages } from "../stores.js";
  import { renderBlockText } from "../sanity.js";
  import get from "lodash/get";

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
    font-size: $large;
    text-transform: uppercase;

    @include screen-size("small") {
      font-size: $mobile_large;
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

<svelte:head>
  <title>ABOUT / NOVEMBRE</title>
</svelte:head>

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

    <div class="about-credits">

      <div class="about-credits-column">
        <div class="about-credits-item">
          <strong>Creative directors</strong>
          <br />
          Florence Tétier
          <br />
          Jeanne-Salomé Rochat
        </div>
        <div class="about-credits-item">
          <strong>Editor-in-chief</strong>
          <br />
          Florence Tétier
        </div>
        <div class="about-credits-item">
          <strong>Arts &amp; critic director</strong>
          <br />
          Jeanne-Salomé Rochat
        </div>
      </div>

      <div class="about-credits-column">
        <div class="about-credits-item">
          <strong>Editor &amp; luxury consultant</strong>
          <br />
          Florian Joye
        </div>
        <div class="about-credits-item">
          <strong>Fashion director</strong>
          <br />
          Georgia Pendlebury
        </div>
        <div class="about-credits-item">
          <strong>Editors-at-large</strong>
          <br />
          Nicolas Coulomb
        </div>
        <div class="about-credits-item">
          <strong>Legal advisors</strong>
          <br />
          Nancy Medina
          <br />
          Yannis Egloff
        </div>
        <div class="about-credits-item">
          <strong>Contributing editor</strong>
          <br />
          Marisa Makin
        </div>
      </div>

      <div class="about-credits-column">
        <div class="about-credits-item">
          <strong>Digital Editor</strong>
          <br />
          Morgane Nicolas
        </div>
        <div class="about-credits-item">
          <strong>Diffusion &amp; Circulation</strong>
          <br />
          K.D. Presse
          <br />
          Pineapple Media
        </div>
        <div class="about-credits-item">All rights reserved ©2015/16</div>
      </div>
    </div>

  </article>

  <Footer active={true} />
{/await}

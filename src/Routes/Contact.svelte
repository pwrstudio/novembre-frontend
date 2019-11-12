<script>
  // # # # # # # # # # # # # #
  //
  //  CONTACT
  //
  // # # # # # # # # # # # # #

  // *** IMPORTS
  import { onMount } from "svelte";

  import { navigationColor, pages, scrollListActive } from "../stores.js";
  import { renderBlockText } from "../sanity.js";
  import get from "lodash/get";

  // COMPONENTS
  import Footer from "../Components/Footer.svelte";
  import NewsletterSignUp from "../Components/NewsletterSignUp.svelte";
  import MetaData from "../Components/MetaData.svelte";

  // *** MODULES
  import Image from "../Components/Modules/Image.svelte";
  import ImageGroup from "../Components/Modules/ImageGroup.svelte";
  import VideoEmbed from "../Components/Modules/VideoEmbed.svelte";
  import Audio from "../Components/Modules/Audio.svelte";
  import Slideshow from "../Components/Modules/Slideshow.svelte";

  // PROPS
  export let slug = "";
  export let location = {};

  // LOGIC
  navigationColor.set("black");
  scrollListActive.set(false);

  // *** ON MOUNT
  onMount(async () => {
    window.scrollTo(0, 0);
  });
</script>

<style lang="scss">
  @import "../variables.scss";

  .contact {
    padding-top: 100px;
    margin-bottom: $large-vertical-margin;
    font-family: $sans-stack;
    font-size: $large;
    text-transform: uppercase;
    line-height: 1em;
    overflow: hidden;
    background: #f6f6f6;
    padding-left: 0;
    padding-right: 0;

    @include screen-size("small") {
      font-size: $mobile-body;
      margin-bottom: $small-vertical-margin;
    }

    .contact-section {
      margin-bottom: 1em;
      padding: $small-margin;

      &.mail {
        background: #d9f52c;
        padding-bottom: 40px;
        margin-bottom: 0;
      }

      a {
        color: currentColor;
        text-decoration: none;
        border-bottom: 3px solid transparent;

        @include screen-size("small") {
          border-bottom: 2px solid transparent;
        }

        transition: border 0.3s $transition;

        &:hover {
          border-bottom: 3px solid $black;
          @include screen-size("small") {
            border-bottom: 2px solid black;
          }
        }
      }
    }
  }
</style>

<MetaData post={{ title: 'Contact' }} />

{#await $pages then pages}
  <article class="contact">

    <div class="contact-section">
      {#each pages.contact.content as c}
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

    <!-- <div class="contact-section mail">
      <NewsletterSignUp />
    </div> -->

  </article>

  <Footer active={true} />
{/await}

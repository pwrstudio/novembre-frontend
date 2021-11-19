<script>
  // # # # # # # # # # # # # #
  //
  //  SATELLITE SITE TEMPLATE
  //
  // # # # # # # # # # # # # #

  // *** IMPORTS
  import { onMount, onDestroy } from "svelte"
  import { fade } from "svelte/transition"
  import get from "lodash/get"
  import isEmpty from "lodash/isEmpty"
  import { urlFor, loadSatelliteSite, renderBlockText } from "../sanity.js"

  // *** COMPONENTS
  import Logo from "../Components/Logo.svelte"

  // *** STORES
  import { satelliteSiteActive } from "../stores.js"

  // *** MODULES
  import Image from "../Components/Modules/Image.svelte"
  import ImageGroup from "../Components/Modules/ImageGroup.svelte"
  import ThumbnailGroup from "../Components/Modules/ThumbnailGroup.svelte"
  import VideoEmbed from "../Components/Modules/VideoEmbed.svelte"
  import Audio from "../Components/Modules/Audio.svelte"
  import ArbitraryEmbed from "../Components/Modules/ArbitraryEmbed.svelte"
  import Slideshow from "../Components/Modules/Slideshow.svelte"
  import Flipshow from "../Components/Modules/FlipShow.svelte"
  import VideoLoop from "../Components/Modules/Video.svelte"

  // *** PROPS
  export let slug = ""
  export let location = {}

  // ** CONSTANTS
  const query = "*[_type == 'satelliteSite' && slug.current == $slug]{...}[0]"
  satelliteSiteActive.set(true)

  const post = loadSatelliteSite(query, { slug: slug })

  post.then(s => {
    console.log("post", s)
  })

  let landingHidden = false

  // *** ON MOUNT
  onDestroy(async () => {
    satelliteSiteActive.set(false)
  })
</script>

{#await post then post}
  <div
    class="satellite"
    style={"background-color:" +
      get(post, "background.backgroundColor.hex", "#ffffff") +
      "; background-image: url(" +
      urlFor(get(post, "background.backgroundImage.asset", "")) +
      ");"}
  >
    {#if get(post, "landing.enabled", false) && !landingHidden}
      <div
        class="landing"
        in:fade
        on:click={() => {
          landingHidden = true
        }}
      >
        <!-- IMAGE -->
        {#if get(post, "landing.landingImage.asset", false)}
          <img
            src={urlFor(post.landing.landingImage.asset)
              .quality(80)
              .height(800)
              .url()}
          />
        {/if}
        <!-- TITLE -->
        {#if get(post, "landing.showTitle", false)}
          <div class="title">{post.title}</div>
        {/if}
      </div>
    {:else}
      <!-- HEADER -->
      <div class="header" in:fade>
        <!-- NOVEMBRE LOGO -->
        {#if get(post, "header.showNovembreLogo", false)}
          <div class="novembre-logo">
            <Logo />
          </div>
        {/if}
        <!-- EXTERNAL LOGO -->
        {#if get(post, "header.externalLogo.asset", false)}
          <div class="external-logo">
            <img
              src={urlFor(post.header.externalLogo.asset)
                .quality(80)
                .height(100)
                .url()}
            />
          </div>
        {/if}
        <!-- TITLE -->
        {#if get(post, "header.showTitle", false)}
          <div class="title">{post.title}</div>
        {/if}
      </div>

      <!-- MAIN CONTENT -->
      <div class="content" in:fade>
        {#each post.content as c}
          <!-- TEXT -->
          {#if c._type == "block"}
            {@html renderBlockText(c)}
          {/if}
          <!-- SINGLE IMAGE -->
          {#if c._type == "singleImage"}
            <Image
              imageObject={c.image}
              linkUrl={c.linkUrl}
              inlineDisplay={c.noBottomMargin ? false : true}
              maxHeight={get(c, "maxHeight", false)}
              backgroundColor={get(c, "backgroundColor", false)}
              caption={get(c, "caption", false)}
              alignment={get(c, "alignment", "")}
              fullwidth={get(c, "fullwidth", "")}
            />
          {/if}
          <!-- IMAGE GROUP -->
          {#if c._type == "imageGroup"}
            <ImageGroup
              imageArray={c.images}
              linkUrl={c.linkUrl}
              inlineDisplay={c.noBottomMargin ? false : true}
              maxHeight={get(c, "maxHeight", false)}
              backgroundColor={get(c, "backgroundColor", false)}
              alignment={get(c, "alignment", "")}
              fullwidth={get(c, "fullwidth", "")}
              caption={get(c, "caption", false)}
            />
          {/if}
          <!-- THUMBNAIL GROUP -->
          {#if c._type == "thumbnailGroup"}
            <ThumbnailGroup
              imageArray={c.images}
              fullwidth={get(c, "fullwidth", "")}
            />
          {/if}
          <!-- VIDEO LOOP -->
          {#if c._type == "videoLoop"}
            <VideoLoop
              url={"https://cdn.sanity.io/files/gj963qwj/production/" +
                c.video.asset._ref.replace("file-", "").replace("-mp4", ".mp4")}
              inlineDisplay={c.noBottomMargin ? false : true}
              posterImage={get(c, "preview.posterImage", "")}
              autoplay={get(c, "autoplay", false)}
              maxHeight={get(c, "maxHeight", false)}
              backgroundColor={get(c, "backgroundColor", false)}
              caption={get(c, "caption", false)}
              alignment={get(c, "alignment", "")}
              fullwidth={get(c, "fullwidth", "")}
            />
          {/if}
          <!-- EMBEDDED VIDEO -->
          {#if c._type == "video"}
            <VideoEmbed
              url={c.video}
              backgroundColor={get(c, "backgroundColor", false)}
              caption={get(c, "caption", false)}
            />
          {/if}
          <!-- SLIDESHOW -->
          {#if c._type == "slideshow"}
            <Slideshow autoplay={c.autoplay} imageArray={c.images} />
          {/if}
          <!-- FLIPSHOW -->
          {#if c._type == "flipshow"}
            <Flipshow imageArray={c.images} />
          {/if}
          <!-- AUDIO -->
          {#if c._type == "audio"}
            <Audio
              url={"https://cdn.sanity.io/files/gj963qwj/production/" +
                c.audio.asset._ref.replace("file-", "").replace("-mp3", ".mp3")}
              title={get(c, "title", "")}
              link={get(c, "link", false)}
              posterImage={get(c, "image", false)}
              backgroundColor={get(c, "backgroundColor.hex", false)}
              foregroundColor={get(c, "foregroundColor.hex", false)}
              autoplay={get(c, "autoplay", false)}
              hidden={get(c, "hidden", false)}
            />
          {/if}
          <!-- ARBITRARY EMBED -->
          {#if c._type == "arbitraryEmbed"}
            <ArbitraryEmbed code={c.embedCode} />
          {/if}
        {/each}
      </div>
    {/if}
  </div>
{/await}

<style lang="scss">
  @import "../variables.scss";

  .satellite {
    color: white;
    display: flex;
    justify-content: center;
    align-items: center;
    font-family: $sans-stack;

    .landing {
      height: 100vh;
      width: 100vw;
      overflow: hidden;
      display: flex;
      justify-content: center;
      align-items: center;
      position: relative;
      cursor: pointer;

      img {
        max-height: 90%;
        max-width: 90%;
        object-fit: contain;
      }

      .title {
        position: fixed;
        top: 50%;
        left: 50%;
        width: 90%;
        text-align: center;
        font-size: $large;
        transform: translateX(-50%) translateY(-50%);
        user-select: none;
      }
    }

    .header {
      width: 100%;
      position: fixed;
      top: 0;
      left: 0;
      z-index: 10;
      text-align: left;
      line-height: 100px;

      .novembre-logo {
        height: 100px;
        float: left;
        margin-right: 20px;
      }

      .external-logo {
        height: 100px;
        float: left;
        margin-right: 20px;
      }

      .title {
        float: left;
        font-size: $large;
      }
    }

    .content {
      width: 100vw;
      overflow: hidden;
    }
  }
</style>
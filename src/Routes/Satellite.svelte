<script>
  // # # # # # # # # # # # # #
  //
  //  SATELLITE SITE TEMPLATE
  //
  // # # # # # # # # # # # # #

  // *** IMPORTS
  import { onDestroy } from "svelte"
  import { fade } from "svelte/transition"
  import get from "lodash/get"
  import { urlFor, loadSatelliteSite, renderBlockText } from "../sanity.js"

  // *** COMPONENTS
  import Logo from "../Components/Logo.svelte"
  import Footer from "../Components/Footer.svelte"

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
        {#if get(post, "header.showExternalLogo", false)}
          <!-- __ 1. Showcase external logo -->
          {#if get(post, "header.externalLogo.asset", false)}
            <div class="novembre-logo external">
              <img
                src={urlFor(post.header.externalLogo.asset)
                  .quality(100)
                  .height(260)
                  .url()}
              />
            </div>
          {/if}
          {#if get(post, "header.presentedByNovembre", false)}
            <a
              href="https://novembre.global"
              class="small-credits presented-by"
            >
              <div class="text">Presented by</div>
              <div class="logo"><Logo /></div>
            </a>
          {:else if get(post, "header.novembreMediaPartner", false)}
            <a
              href="https://novembre.global"
              class="small-credits media-partner"
            >
              <div class="logo"><Logo /></div>
              <div class="text">media partner</div>
            </a>
          {/if}
          <!-- __ 2. Novembre Presents: layout option -->
        {:else if get(post, "header.usePresentsLayout", false)}
          <div class="novembre-logo small">
            <span class="text-container">
              Novembre presents: {get(post, "header.externalName", "")}
            </span>
          </div>
        {:else}
          <!-- __ 3. Default option -->
          <div class="novembre-logo">
            <Logo />
          </div>
        {/if}
      </div>

      <!-- MAIN CONTENT -->
      {#if post.content && Array.isArray(post.content) && post.content.length > 0}
        <div class="content" in:fade>
          {#each post.content as c}
            <!-- TEXT -->
            {#if c._type == "content"}
              {@html renderBlockText(c.content)}
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
                  get(c, "video.asset._ref", "")
                    .replace("file-", "")
                    .replace("-mp4", ".mp4")}
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
                size={get(c, "size", false)}
                noBottomMargin={get(c, "noBottomMargin", false)}
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
                  get(c, "audio.asset._ref", "")
                    .replace("file-", "")
                    .replace("-mp3", ".mp3")}
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
            <!-- ARBITRARY EMBED -->
            {#if c._type == "map"}
              <ArbitraryEmbed isMap={true} code={c.embedCode} />
            {/if}
          {/each}
        </div>
      {/if}
    {/if}
  </div>
{/await}

<style lang="scss">
  @import "../variables.scss";

  @font-face {
    font-family: "knif";
    src: url("/fonts/aa_knif-mono_italic-webfont.woff2") format("woff");
    font-style: italic;
  }

  @font-face {
    font-family: "knif";
    src: url("/fonts/aa_knif-mono-webfont.woff2") format("woff");
    font-style: normal;
  }

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

        @include screen-size("small") {
          font-size: $intro;
        }
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

      @include screen-size("small") {
        text-align: center;
        padding: 0;
      }

      .small-credits {
        float: right;
        height: 100px;
        margin-right: 20px;
        font-size: 18px;
        display: flex;
        justify-content: center;
        align-items: center;
        user-select: none;

        @include screen-size("small") {
          height: 30px;
          margin-right: 5px;
          font-size: 14px;
          word-break: keep-all;
          white-space: nowrap;
          // padding-left: 10px;
          // padding-right: 10px;
          // position: fixed;
          // bottom: 10px;
          // right: 10px;
        }

        .text {
          display: inline-block;
          margin-right: 1px;
          position: relative;
          top: -2px;
        }

        &.media-partner {
          .text {
            margin-right: 0;
            margin-left: 2px;
            top: -1px;
          }
        }

        .logo {
          display: inherit;
          height: 30px;
          @include screen-size("small") {
            height: 20px;
          }
        }
      }

      .novembre-logo {
        height: 100px;
        float: left;
        margin-right: 20px;

        &.external {
          padding-top: 0;
          padding-left: 20px;
          height: 200px;

          @include screen-size("small") {
            height: 80px;
            padding-left: 10px;
            padding-top: 5px;

            img {
              max-height: 100%;
            }
          }
        }

        @include screen-size("small") {
          height: 50px;
        }

        &.small {
          height: 50px;
          display: flex;
          line-height: 50px;
          font-size: 28px;

          .text-container {
            padding-left: 6px;
            word-spacing: 6px;
            display: flex;

            img {
              padding-left: 6px;
            }
          }
        }
      }

      .external-logo {
        height: 100px;
        float: left;
        margin-right: 20px;

        img {
          height: 100%;
        }

        @include screen-size("small") {
          height: 50px;
          float: right;
          line-height: 0;
          padding: 0;
          margin-right: 0;
        }
      }

      .title {
        float: left;
        font-size: $intro;

        @include screen-size("small") {
          font-size: $body;
          line-height: $body;
          width: 100%;
          margin-top: 5px;
        }
      }
    }

    .content {
      width: 100vw;
      min-height: 100vh;
      overflow: hidden;
      font-family: "knif" !important;
    }
  }
</style>

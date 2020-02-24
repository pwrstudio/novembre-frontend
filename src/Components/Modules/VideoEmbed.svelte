<script>
  // # # # # # # # # # # # # #
  //
  // VIDEO EMBED
  //
  // # # # # # # # # # # # # #

  // *** IMPORTS
  import getVideoId from "get-video-id";

  // *** PROPS
  export let url = false;
  export let caption = "";
  export let backgroundColor = false;
</script>

<style lang="scss">
  @import "../../variables.scss";

  .embed {
    color: $white;
    margin-bottom: $large-vertical-margin;
    cursor: pointer;
    display: flex;
    justify-content: center;
    align-items: center;

    padding-bottom: $small-vertical-margin;
    padding-top: $small-vertical-margin;

    width: 100vw;

    &.fullscreen {
      height: 100vh;
    }

    .inner {
      width: 720px;

      @include screen-size("small") {
        width: 480px;
      }

      iframe {
        width: 100%;
      }
    }
  }
</style>

<div
  class="embed"
  style="background-color: {backgroundColor.hex}"
  class:fullscreen={backgroundColor}>

  <div class="inner">
    {#if url.includes('youtube')}
      <iframe
        width="720"
        height="480"
        title={caption}
        src="https://www.youtube.com/embed/{getVideoId(url).id}"
        frameborder="0"
        allow="accelerometer; autoplay; encrypted-media; gyroscope;
        picture-in-picture"
        allowfullscreen />
    {/if}
    {#if url.includes('vimeo')}
      <iframe
        width="720"
        height="480"
        title={caption}
        src="https://player.vimeo.com/video/{getVideoId(url).id}"
        frameborder="0"
        byline="false"
        color="#ffffff"
        allow="autoplay; fullscreen"
        allowfullscreen />
    {/if}
  </div>

</div>

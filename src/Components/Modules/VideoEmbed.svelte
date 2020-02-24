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
  export let size = true;
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

    .inner {
      width: 640px;
      margin-left: auto;
      margin-right: auto;
      max-width: 95vw;
    }
  }
</style>

<div class="embed" style="background-color: {backgroundColor.hex}">

  <div class="inner">
    {#if url.includes('youtube')}
      <iframe
        width="720"
        height="480"
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
        src="https://player.vimeo.com/video/{getVideoId(url).id}"
        frameborder="0"
        byline="false"
        color="#ffffff"
        allow="autoplay; fullscreen"
        allowfullscreen />
    {/if}
  </div>

</div>

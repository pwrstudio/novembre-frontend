<script>
  export let file;
  export let url;
  export let caption = "testest";
  export let backgroundColor = "transparent";
  export let size;
</script>

<style lang="scss">
  @import "../variables.scss";

  .video-player {
    $base: &;
    position: relative;
    background: black;
    user-select: none;
    height: 100%;
    max-width: 100vw;

    &__video {
      position: relative;
      padding-bottom: 56.25%;
      height: 0;
      overflow: hidden;
      max-width: 100%;
    }

    &__video-element {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
    }

    &__control {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translateY(-50%) translateX(-50%);
      width: 100px;
      height: 100px;
      text-align: center;
      font-size: 300px;
      line-height: 100px;
      cursor: pointer;
    }

    &__play {
    }
    &__stop {
      display: none;
    }

    &__progress {
      position: absolute;
      bottom: 0;
      left: 0;
      width: 100%;
      height: 30px;
      // background: green;
      cursor: pointer;
      display: none;
    }

    &--playing {
      #{ $base }__play {
        display: none;
      }
      #{ $base }__stop {
        display: block;
      }
    }
  }
</style>

<video class="video-player" autoplay loop muted src={url} />

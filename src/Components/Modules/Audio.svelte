<script>
  export let file;
  export let url;
  export let caption = "testest";
  export let backgroundColor = "transparent";
</script>

<style lang="scss">
  @import "../variables.scss";

  .audio-player {
    $base: &;
    position: relative;
    background: black;

    &__audio {
      position: relative;
      padding-bottom: 56.25%;
      height: 0;
      overflow: hidden;
      max-width: 100%;
    }

    &__audio-element {
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
      // background: red;
      text-align: center;
      font-size: 80px;
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

<audio class="audio-element" controls src={url} />

<div class="audio-player" />

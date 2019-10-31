<script>
  // # # # # # # # # # # # # #
  //
  //  Audio module
  //
  // # # # # # # # # # # # # #

  // *** PROPS
  export let file = "";
  export let url = "";
  export let caption = "";
  export let size = true;
  export let backgroundColor = false;
  export let posterImage = false;

  // *** VARIABLES
  let time = 0;
  let duration = 0;
  let paused = true;
  const controlsTimeoutDuration = 2500;

  // *** DOM REFERENCES
  let audioEl;

  function handleMousemove(e) {
    if (e.which !== 1) return; // mouse not down
    if (!duration) return; // audio not loaded yet
    const { left, right } = this.getBoundingClientRect();
    time = (duration * (e.clientX - left)) / (right - left);
  }

  function handleMousedown(e) {
    function handleMouseup() {
      if (paused) audioEl.play();
      else audioEl.pause();
      cancel();
    }

    function cancel() {
      e.target.removeEventListener("mouseup", handleMouseup);
    }

    e.target.addEventListener("mouseup", handleMouseup);

    setTimeout(cancel, 200);
  }

  const format = seconds => {
    if (isNaN(seconds)) return "...";
    const minutes = Math.floor(seconds / 60);
    seconds = Math.floor(seconds % 60);
    if (seconds < 10) seconds = "0" + seconds;
    return `${minutes}:${seconds}`;
  };
</script>

<style lang="scss">
  @import "../../variables.scss";

  .audio {
    position: relative;
    height: 500px;
    width: 100%;
    color: $black;
    font-family: $sans-stack;
    font-size: $large;
    line-height: 1em;
    margin-bottom: $large-vertical-margin;

    @include screen-size("small") {
      font-size: $mobile_large;
      height: 400px;
    }

    display: flex;
    justify-content: center;
    align-items: center;
    background: rgba(200, 200, 200, 1);

    cursor: pointer;

    &:active {
      cursor: grab;
    }
  }

  .poster-image {
    position: relative;
    width: auto;
    height: 440px;
    pointer-events: none;
    z-index: 90;
    mix-blend-mode: multiply;

    @include screen-size("small") {
      height: 360px;
    }
  }

  .current-time {
    position: absolute;
    top: 0px;
    left: 10px;
    z-index: 100;
  }

  .total-time {
    position: absolute;
    top: 0px;
    right: 10px;
    z-index: 100;
  }

  .audio-toggle {
    text-align: center;
    position: absolute;
    top: 0px;
    left: 50%;
    z-index: 100;
    transform: translateX(-50%);
  }

  .audio-title {
    position: absolute;
    bottom: $small-margin;
    left: 10px;
    z-index: 100;
    font-size: $large;
    line-height: 1em;
    max-width: 16ch;

    @include screen-size("small") {
      font-size: $mobile_large;
    }
  }

  progress {
    position: absolute;
    top: 0px;
    left: 0px;
    display: block;
    width: 100%;
    height: 100%;
    z-index: 80;
    -webkit-appearance: none;
    appearance: none;

    &::-webkit-progress-value {
      background-color: rgba(0, 255, 0, 1);
    }

    &::-webkit-progress-bar {
      background-color: rgba(200, 200, 200, 0);
    }
  }
</style>

<div
  on:mousemove={handleMousemove}
  on:mousedown={handleMousedown}
  class="audio"
  class:audio--full={size == true || size == 'fullWidth'}
  class:audio--inline={size == 'proportional'}
  style="background-color:{backgroundColor}">

  <audio
    class="audio-player"
    preload="auto"
    src={url}
    bind:currentTime={time}
    bind:duration
    bind:paused
    bind:this={audioEl} />

  <div class="controls">

    {#if posterImage}
      <img src={posterImage} class="poster-image" alt={caption} />
    {/if}

    <div class="audio-toggle">{paused ? 'PLAY' : 'PAUSE'}</div>

    <div class="current-time">{format(time)}</div>

    <div class="total-time">{format(duration)}</div>

    <div class="audio-title">{caption}</div>

    <progress value={time / duration || 0} />

  </div>

</div>

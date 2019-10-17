<script>
  // # # # # # # # # # # # # #
  //
  //  Audio module
  //
  // # # # # # # # # # # # # #

  export let file = "";
  export let url = "";
  export let caption = "Novembre";
  export let size = true;
  export let poster = "";
  export let backgroundColor = false;
  export let posterImage = false;

  let audioEl;
  let time = 0;
  let duration;
  let paused = true;
  let showControls = true;
  let showControlsTimeout;
  let controlsTimeoutDuration = 2500;

  // From => https://svelte.dev/tutorial/media-elements
  function handleMousemove(e) {
    // Make the controls visible, but fade out after
    // 2.5 seconds of inactivity
    clearTimeout(showControlsTimeout);
    showControlsTimeout = setTimeout(
      () => (showControls = false),
      controlsTimeoutDuration
    );
    showControls = true;

    if (e.which !== 1) return; // mouse not down
    if (!duration) return; // audio not loaded yet

    const { left, right } = this.getBoundingClientRect();
    time = (duration * (e.clientX - left)) / (right - left);
  }

  function handleMousedown(e) {
    // we can't rely on the built-in click event, because it fires
    // after a drag — we have to listen for clicks ourselves

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

  function format(seconds) {
    if (isNaN(seconds)) return "...";

    const minutes = Math.floor(seconds / 60);
    seconds = Math.floor(seconds % 60);
    if (seconds < 10) seconds = "0" + seconds;

    return `${minutes}:${seconds}`;
  }
</script>

<style lang="scss">
  @import "../../variables.scss";

  .audio {
    $block: &;

    width: 100%;
    height: auto;

    color: white;

    font-family: $sans-stack;
    font-size: $small;

    margin-bottom: $large-vertical-margin;
    position: relative;

    height: 500px;
    width: 500px;

    margin-left: auto;
    margin-right: auto;
    max-width: 95vw;

    &--inline {
      margin-left: auto;
      margin-right: auto;
      max-width: 95vw;

      audio {
        width: 100%;
      }
    }

    cursor: pointer;

    &--playing {
      cursor: grab;
    }
  }

  .controls {
    transition: opacity 1s;
  }

  .buttons {
    position: absolute;
    position: absolute;
    top: 50%;
    left: 50%;
    z-index: 1000;

    width: 200px;
    height: 200px;

    transform: translateX(-50%) translateY(-50%);
    pointer-events: none;

    svg {
      width: 100%;
    }
  }

  .poster-image {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
    pointer-events: none;
  }

  .play {
    position: relative;
    left: 4px;
  }

  .time {
    position: absolute;
    bottom: 10px;
    right: 10px;
  }

  progress {
    position: absolute;
    bottom: 0px;
    left: 0px;
    display: block;
    width: 100%;
    height: 40px;
    z-index: 1000;
    -webkit-appearance: none;
    appearance: none;

    pointer-events: none;

    &::-webkit-progress-value {
      background-color: rgba(255, 255, 255, 1);
    }

    &::-webkit-progress-bar {
      background-color: rgba(0, 0, 0, 1);
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

  <div class="controls" style="opacity: {duration && showControls ? 1 : 0}">

    <!-- <div class="time">{format(time)} / {format(duration)}</div> -->
    <progress value={time / duration || 0} />

    <div class="buttons">
      {#if paused}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="0.5"
          class="feather feather-play play">
          <polygon points="5 3 19 12 5 21 5 3" />
        </svg>
      {:else}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="0.5"
          class="feather feather-pause pause">
          <rect x="6" y="4" width="4" height="16" />
          <rect x="14" y="4" width="4" height="16" />
        </svg>
      {/if}
    </div>

  </div>

  {#if posterImage}
    <img src={posterImage} class="poster-image" alt="Audio player" />
  {/if}

</div>

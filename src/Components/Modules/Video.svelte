<script>
  export let file = "";
  export let url = "";
  export let autoplay = false;
  export let controls = true;
  export let loop = false;
  export let muted = false;
  export let caption = "Novembre";
  export let size = true;
  export let backgroundColor = false;
  export let posterImage = false;

  // let time = 0;
  let time = 0;
  let duration;
  let paused = true;
  let showControls = true;
  let showControlsTimeout;
  let controlsTimeoutDuration = 2500;

  // $: if (duration > 0) {
  //   window.alert(duration);
  // }

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
    if (!duration) return; // video not loaded yet

    const { left, right } = this.getBoundingClientRect();
    time = (duration * (e.clientX - left)) / (right - left);
  }

  function handleMousedown(e) {
    // we can't rely on the built-in click event, because it fires
    // after a drag — we have to listen for clicks ourselves

    function handleMouseup() {
      if (paused) e.target.play();
      else e.target.pause();
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

  .video {
    $block: &;

    width: 100%;
    height: auto;

    color: white;

    font-family: $sans-stack;
    font-size: $small;

    margin-top: 20px;
    margin-bottom: 20px;
    position: relative;

    // background: green;

    &--full {
      height: $full-height;
      width: 100vw;

      video {
        height: 100%;
        width: 100%;
        object-fit: cover;
      }
    }

    &--inline {
      height: auto;
      width: 800px;
      margin-left: auto;
      margin-right: auto;
      max-width: 95vw;
      // margin-bottom: 5rem;

      video {
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

    width: 100px;
    height: 100px;
    // background: red;

    transform: translateX(-50%) translateY(-50%);
    pointer-events: none;

    svg {
      width: 100%;
      // height: 100%;
    }
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
    left: -2px;
    display: block;
    width: 100%;
    height: 7px;
    -webkit-appearance: none;
    appearance: none;

    pointer-events: none;

    // &:hover {
    //   height: 20px;
    // }

    &::-webkit-progress-value {
      background-color: rgba(255, 255, 255, 1);
    }

    &::-webkit-progress-bar {
      background-color: rgba(0, 0, 0, 1);
    }
  }
</style>

<div
  class="video"
  class:video--full={size == true || size == 'fullWidth'}
  class:video--inline={size == 'proportional'}
  style="background-color: {backgroundColor}">

  <video
    class="video-player"
    preload="metadata"
    {autoplay}
    {loop}
    {muted}
    poster={posterImage}
    src={url + '#t=0.1'}
    on:mousemove={handleMousemove}
    on:mousedown={handleMousedown}
    bind:currentTime={time}
    bind:duration
    bind:paused />

  {#if controls && !autoplay}
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
            stroke-linecap="round"
            stroke-linejoin="round"
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
            stroke-linecap="round"
            stroke-linejoin="round"
            class="feather feather-pause pause">
            <rect x="6" y="4" width="4" height="16" />
            <rect x="14" y="4" width="4" height="16" />
          </svg>
        {/if}
      </div>

    </div>
  {/if}

</div>

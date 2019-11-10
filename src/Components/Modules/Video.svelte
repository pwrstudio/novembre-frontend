<script>
  // # # # # # # # # # # # # #
  //
  //  LOCAL VIDEO
  //  *
  //  _ caption
  //  _ maxHeigth
  //  _ alignment
  //  _ inlineDisplay
  //  _ fullWidth
  //  _ backgroundColor
  //  *
  //
  // # # # # # # # # # # # # #

  // *** IMPORTS
  import MediaQuery from "svelte-media-query";
  import { onMount } from "svelte";

  // *** PROPS
  export let url = "";
  export let posterImage = "";
  export let caption = false;
  export let backgroundColor = false;
  export let alignment = "";
  export let maxHeight = false;
  export let autoplay = false;
  export let fullwidth = false;
  export let inlineDisplay = false;
  export let isListing = false;
  export let loop = true;
  export let muted = true;
  export let controls = false;

  // console.log("caption", caption);
  // console.log("backgroundColor", backgroundColor);
  // console.log("alignment", alignment);
  // console.log("maxHeight", maxHeight);
  // console.log(fullwidth);
  // console.log("autoplay", autoplay);
  // console.log(inlineDisplay);
  // console.log(isListing);

  const customStyles =
    (maxHeight ? "height:" + maxHeight + "vh; " : "") +
    (backgroundColor ? "background:" + backgroundColor.hex + ";" : "");

  // *** PROPS

  // *** DOM REFERENCES
  let videoEl = {};

  // *** CONSTANTS
  const VIDEO_ROOT = "https://res.cloudinary.com/pwr/video/upload/";
  const REMOTE_FOLDER = "novembre";

  // *** VARIABLES
  let time = 0;
  let duration = 0;
  let paused = true;
  let showControls = true;
  let showControlsTimeout;
  let controlsTimeoutDuration = 2500;
  let post = {};
  let videoUrl = "";
  let videoSrc = "";
  let posterImageSrc = "";

  // *** FUNCTIONS

  // --- Video controls
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
    function handleMouseup() {
      if (paused) {
        e.target.play();
      } else {
        e.target.pause();
      }
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

  // // --- Build urls
  // videoUrl = url.replace("https://testing.novembre.global", "");
  // videoSrc = VIDEO_ROOT + REMOTE_FOLDER + encodeURI(videoUrl);
  // posterImageSrc = videoSrc.substring(0, videoSrc.length - 4) + ".jpg";

  // console.dir(url);

  // *** ON MOUNT
  onMount(async () => {
    if (autoplay || isListing) {
      let promise = videoEl.play();
      if (promise !== undefined) {
        promise.catch(err => {
          Sentry.captureException(err);
        });
      }
    }
  });
</script>

<style lang="scss">
  @import "../../variables.scss";

  .video {
    width: 100%;
    height: auto;

    color: white;

    font-family: $sans-stack;
    font-size: $small;

    position: relative;
    display: flex;
    justify-content: center;

    margin-bottom: $large-vertical-margin;

    &--full {
      height: $full-height;
      width: 100vw;
      pointer-events: none;
      margin-bottom: $large-vertical-margin;

      @include screen-size("small") {
        height: 70vh;
      }

      video {
        height: 100%;
        width: 100%;
        object-fit: cover;
      }
    }

    &--inline {
      height: auto;
      width: 100%;
      height: $full-height;
      display: flex;
      justify-content: center;
      align-items: center;

      .inner {
        width: 800px;
        margin-left: auto;
        margin-right: auto;
        max-width: 95vw;
      }

      video {
        width: 100%;
      }
    }

    cursor: pointer;

    &--playing {
      cursor: grab;
    }

    &.listing {
      margin-bottom: 0;
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

    transform: translateX(-50%) translateY(-50%);
    pointer-events: none;

    svg {
      width: 100%;
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
  class:listing={isListing}
  class:video--full={fullwidth || isListing}
  style={customStyles}>

  <video
    class="video-player {alignment}"
    preload="metadata"
    {loop}
    muted={autoplay || isListing}
    poster={posterImageSrc}
    src={url}
    on:mousemove={handleMousemove}
    on:mousedown={handleMousedown}
    bind:currentTime={time}
    bind:duration
    bind:paused
    bind:this={videoEl} />
  {#if !autoplay && !isListing}
    <div class="controls" style="opacity: {duration && showControls ? 1 : 0}">

      <!-- <progress value={time / duration || 0} /> -->

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

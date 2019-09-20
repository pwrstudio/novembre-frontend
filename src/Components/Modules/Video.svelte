<script>
  export let file = "";
  export let url = false;
  export let embed = "";
  export let autoplay = true;
  export let controls = true;
  export let loop = false;
  export let muted = false;
  export let caption = "Novembre";
  export let size = true;
  export let backgroundColor = false;
  export let posterImage = false;

  // let time = 0;
  let time = 0;
  let duration = 0;
  let paused = true;
  let showControls = true;
  let showControlsTimeout;
  let controlsTimeoutDuration = 2500;
  let unPlayed = true;
  let post = false;

  // url = file;

  console.log("asfdasd");
  console.log(url);
  console.log(embed);

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
      if (paused) {
        e.target.play();
        unPlayed = false;
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

  // *** FUNCTIONS
  async function loadData(endpoint) {
    const res = await fetch(endpoint);
    const post = await res.json();
    console.log(post);
    return post;
  }

  if (embed) {
    let endpoint =
      "http://iframe.ly/api/iframely?url=" +
      embed +
      "&api_key=c64ca8b7ee9ebe2bc48ff5";

    post = loadData(endpoint);
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
      width: 100%;
      height: $full-height;
      display: flex;
      justify-content: center;
      align-items: center;

      // margin-bottom: 5rem;

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

  .poster-image {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
    pointer-events: none;
  }
</style>

<div
  class="video"
  class:video--full={size == true || size == 'fullWidth'}
  class:video--inline={size == 'proportional'}
  style="background-color: {backgroundColor}">

  {#if url}
    <video
      class="video-player"
      preload="metadata"
      {autoplay}
      {loop}
      {muted}
      poster={posterImage}
      src={url}
      on:mousemove={handleMousemove}
      on:mousedown={handleMousedown}
      bind:currentTime={time}
      bind:duration
      bind:paused />
    {#if posterImage && unPlayed}
      <img src={posterImage} class="poster-image" alt="Video player" />
    {/if}

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
  {:else if embed}
    {#await post then post}
      <div class="inner">
        {@html post.html}
      </div>
    {/await}
  {/if}

</div>

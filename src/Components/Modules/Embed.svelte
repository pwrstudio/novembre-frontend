<script>
  import { onMount } from "svelte";

  export let url = false;
  export let caption = "";
  export let size = true;
  export let backgroundColor = false;

  let post = {};

  // *** FUNCTIONS
  async function loadData() {
    try {
      const res = await fetch(
        "https://iframe.ly/api/iframely?url=" +
          url +
          "&api_key=c64ca8b7ee9ebe2bc48ff5"
      );
      const post = await res.json();
      if (post && post.html) {
        return post;
      } else {
        return { html: "" };
      }
    } catch (err) {
      Sentry.captureException(err);
    }
  }

  post = loadData();
</script>

<style lang="scss">
  @import "../../variables.scss";

  .embed {
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
    }

    cursor: pointer;

    &--playing {
      cursor: grab;
    }
  }
</style>

<div
  class="embed"
  class:embed--full={size == true || size == 'fullWidth'}
  class:embed--inline={size == 'proportional'}
  style="background-color: {backgroundColor}">

  {#await post then post}
    <div class="inner">
      {@html post.html}
    </div>
  {/await}

</div>

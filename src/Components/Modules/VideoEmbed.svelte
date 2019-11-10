<script>
  // # # # # # # # # # # # # #
  //
  // VIDEO EMBED
  //
  // # # # # # # # # # # # # #

  // *** PROPS
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
    color: white;
    margin-bottom: 1.2em;
    cursor: pointer;
    display: flex;
    justify-content: center;
    align-items: center;

    height: $full-height;
    width: 100vw;

    @include screen-size("small") {
      height: 70vh;
    }

    .inner {
      width: 800px;
      margin-left: auto;
      margin-right: auto;
      max-width: 95vw;
    }
  }
</style>

<div class="embed" style="background-color: {backgroundColor}">

  {#await post then post}
    <div class="inner">
      {@html post.html}
    </div>
  {/await}

</div>

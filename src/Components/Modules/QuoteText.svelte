<script>
  // # # # # # # # # # # # # #
  //
  //  Text: Quote
  //
  // # # # # # # # # # # # # #

  // *** IMPORT
  export let text;
</script>

<style lang="scss">
  @import "../../variables.scss";

  .quote-text {
    width: 100%;
    height: auto;
    color: black;
    height: auto;
    min-height: 60vh;
    width: 800px;
    margin-left: auto;
    margin-right: auto;
    max-width: 95vw;
    margin-bottom: 5rem;
    font-family: $serif-stack;
    font-style: italic;
    font-size: $large;
    margin-bottom: 3rem;
    line-height: 1em;

    @include screen-size("small") {
      font-size: $mobile_large;
    }
  }
</style>

<blockquote class="quote-text">
  <span>
    {@html text}
  </span>
</blockquote>

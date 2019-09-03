<script>
  export let text;
</script>

<style lang="scss">
  @import "../variables.scss";

  .quote-text {
    width: 100%;
    height: auto;
    font-family: $sans-stack;

    color: white;

    &__blockquote {
      font-size: $xlarge;
      line-height: 1em;
      max-width: 80%;
      text-transform: uppercase;
      padding-top: 100px;
      padding-bottom: 100px;
      margin: 0;
    }
  }
</style>

<div class="quote-text">
  {@html text}
</div>

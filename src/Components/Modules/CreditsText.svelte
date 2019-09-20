<script>
  export let text;

  console.log(text);
</script>

<style lang="scss">
  @import "../../variables.scss";

  .body-text {
    height: auto;
    width: 800px;
    margin-left: auto;
    margin-right: auto;
    max-width: 95vw;
    margin-bottom: 40px;
    font-family: $sans-stack;
    font-size: $small;
    line-height: 1.4em;
    overflow: hidden;

    p {
      margin-bottom: 1rem;
    }

    @include screen-size("small") {
      font-size: $mobile_body;
    }

    a {
      color: currentColor;
      text-decoration: none;
      border-bottom: 1px solid $black;
      transition: border 0.3s $transition;

      &:hover {
        border-bottom: 1px solid transparent;
      }
    }
  }

  .entertainment {
    font-family: $sans-stack;
  }

  a {
    color: currentColor;
    text-decoration: none;
    border-bottom: 1px solid $black;
    transition: border 0.3s $transition;

    &:hover {
      border-bottom: 1px solid transparent;
    }
  }
</style>

<div class="body-text">
  {@html text}
</div>

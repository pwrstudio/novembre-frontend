<script>
  export let text;
  export let isEntertainment;
</script>

<style lang="scss">
  @import "../../variables.scss";

  .body-text {
    height: auto;
    width: 800px;
    margin-left: auto;
    margin-right: auto;
    max-width: 95vw;
    margin-bottom: 5rem;
    font-family: $serif-stack;
    font-size: $body;
    line-height: 1.2em;
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
    p {
      min-height: 400px;
      column-count: 2;
      column-fill: auto;
      background: red;
      // min-height: 300px;
    }
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

<div class="body-text" class:entertainment={isEntertainment}>
  {@html text}
</div>

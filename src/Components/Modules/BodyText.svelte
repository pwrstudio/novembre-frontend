<script>
  // # # # # # # # # # # # # #
  //
  //  Body Text Module
  //
  // # # # # # # # # # # # # #

  // *** IMPORTS
  import { throttle } from "throttle-debounce";

  // *** STORES
  import { navigationStyle, menuActiveGlobal } from "../../stores.js";

  // *** PROPS
  export let text;
  export let isEntertainment = false;
</script>

<style lang="scss">
  @import "../../variables.scss";

  .body-text {
    height: auto;
    width: 800px;
    margin-left: auto;
    margin-right: auto;
    max-width: 95vw;
    margin-bottom: 20px;
    font-family: $serif-stack;
    font-size: $body;
    line-height: 1.2em;
    overflow: hidden;

    &:empty {
      display: none;
    }

    p {
      margin-bottom: 1em;
    }

    @include screen-size("small") {
      font-size: $mobile_body;
      margin-bottom: 0px;
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

    &.hide-text {
      opacity: 0;
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

<div
  class="body-text"
  class:entertainment={isEntertainment}
  class:hide-text={$menuActiveGlobal}>
  {@html text}
</div>

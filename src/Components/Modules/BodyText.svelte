<script>
  // # # # # # # # # # # # # #
  //
  //  Body Text Module
  //
  // # # # # # # # # # # # # #

  // *** IMPORTS

  // *** STORES
  import { menuActiveGlobal } from "../../stores.js";

  // *** PROPS
  export let text;
  export let isBureau = false;
</script>

<style lang="scss">
  @import "../../variables.scss";

  .body-text {
    height: auto;
    width: 800px;
    margin-left: auto;
    margin-right: auto;
    max-width: 95vw;
    margin-bottom: $large-vertical-margin;
    font-family: $serif-stack;
    font-size: $body;
    line-height: 1.2em;
    overflow: hidden;

    &:empty {
      display: none;
    }

    p {
      margin-bottom: $small-vertical-margin;
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

  .bureau {
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
  class:bureau={isBureau}
  class:hide-text={$menuActiveGlobal}>
  {@html text}
</div>

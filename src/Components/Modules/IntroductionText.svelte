<script>
  // # # # # # # # # # # # # #
  //
  //  Text: Introduction
  //
  // # # # # # # # # # # # # #

  // *** IMPORT
  export let text = "";

  // *** STORES
  import { navigationStyle, menuActiveGlobal } from "../../stores.js";
</script>

<style lang="scss">
  @import "../../variables.scss";

  .introduction-text {
    height: auto;
    width: 800px;
    margin-left: auto;
    margin-right: auto;
    max-width: 95vw;
    margin-bottom: 5rem;
    font-family: $serif-stack;
    font-style: italic;
    line-height: 1.2em;
    font-size: $intro;
    margin-bottom: 3rem;
    line-height: 1.2em;
    transition: opacity $transition;

    &.hide-text {
      opacity: 0;
    }

    @include screen-size("small") {
      font-size: $mobile_intro;
    }
  }
</style>

<div class="introduction-text" class:hide-text={$menuActiveGlobal}>
  {@html text}
</div>

<script>
  // # # # # # # # # # # # # #
  //
  //  Text: Credits
  //
  // # # # # # # # # # # # # #

  // *** IMPORT
  export let text;

  // *** STORES
  import { navigationStyle, menuActiveGlobal } from "../../stores.js";
</script>

<style lang="scss">
  @import "../../variables.scss";

  .credits-text {
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

    transition: opacity $transition;

    &.hide-text {
      opacity: 0;
    }
  }
</style>

<div class="credits-text" class:hide-text={$menuActiveGlobal}>
  {@html text}
</div>

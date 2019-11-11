<script>
  // # # # # # # # # # # # # #
  //
  //  SPLASH TEXT
  //
  // # # # # # # # # # # # # #

  import { pages } from "../stores.js";
  import { renderBlockText } from "../sanity.js";
  import get from "lodash/get";

  // *** PROPS
  export let section = "landing";
</script>

<style lang="scss">
  @import "../variables.scss";

  .splash-text {
    opacity: 1;
    overflow: hidden;
    height: auto;
    width: 100vw;
    padding: $small-margin;
    padding-top: 180px;
    display: flex;
    align-items: flex-end;

    @include screen-size("small") {
      padding-top: 160px;
    }

    div {
      user-select: none;
      color: black;
      font-size: $intro;
      font-weight: 300;
      line-height: 0.85em;
      text-decoration: none;
      z-index: 1;
      font-family: $sans-stack;
      text-transform: uppercase;

      @include screen-size("small") {
        font-size: $mobile-intro;
      }
    }
  }

  .magazine {
    background-color: $hotpink;
  }

  .bureau {
    background-color: $neongreen;
  }

  .landing {
    display: none;
  }
</style>

<div class="splash-text {section}">
  {#await $pages then pages}
    <div>
      {@html section === 'magazine' ? renderBlockText(get(pages, 'magazine.content', [])) : renderBlockText(get(pages, 'bureau.content', []))}
    </div>
  {/await}
</div>

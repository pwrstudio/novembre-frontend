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

  // *** VARIABLES
  let backgroundColor = "";
  let content = [];

  console.dir($pages);
  console.log(section);

  $pages.then(pages => {
    console.log(pages);
    if (section === "landing") {
      backgroundColor = get(pages, "feedColor.hex", "");
      content = get(pages, "feed.content", []);
    }
    if (section === "magazine") {
      backgroundColor = get(pages, "magazineColor.hex", "");
      content = get(pages, "magazine.content", []);
    }
    if (section === "bureau") {
      backgroundColor = get(pages, "bureauColor.hex", "");
      content = get(pages, "bureau.content", []);
    }

    console.log(backgroundColor);
    console.log(content);
  });
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
      padding-top: 150px;
    }

    div {
      user-select: none;
      color: black;
      font-size: $intro;
      font-weight: 300;
      line-height: 1em;
      text-decoration: none;
      z-index: 1;
      font-family: $sans-stack;
      text-transform: uppercase;

      @include screen-size("small") {
        font-size: $mobile-intro;
      }
    }
  }

  .landing {
    padding-top: 100px;
  }
</style>

<div class="splash-text {section}" style="background: {backgroundColor};">
  <div>
    {@html renderBlockText(content)}
  </div>
</div>

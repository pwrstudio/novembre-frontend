<script>
  // # # # # # # # # # # # # #
  //
  //  Body Text Module
  //
  // # # # # # # # # # # # # #

  // *** IMPORTS
  import { onMount, onDestroy } from "svelte";
  import { throttle } from "throttle-debounce";

  // *** STORES
  import { navigationStyle } from "../../stores.js";

  // *** PROPS
  export let text;
  export let isEntertainment = false;

  // *** DOM REFERENCES
  let textEl;

  // *** FUNCTIONS
  function checkTopOffset() {
    // console.log(
    //   post.header.htmlTitle.fullTitle,
    //   textEl.getBoundingClientRect().top
    // );
    if (textEl.getBoundingClientRect().top < 40) {
      console.log("swtich");
      navigationStyle.set(false);
    }
  }

  const throttledCheck = throttle(100, checkTopOffset);

  const observer = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        // Element is in view
        if (entry.intersectionRatio > 0) {
          console.log("TEXT IN VIEW");
          window.addEventListener("scroll", throttledCheck);
        }
        // Element is out of view
        if (entry.intersectionRatio <= 0) {
          console.log("OUT OF VIEW: destroy:");
          window.removeEventListener("scroll", throttledCheck);
        }
      });
    },
    { threshold: [0, 1] }
  );

  // *** ON MOUNT
  onMount(async () => {
    // console.log(post);
    observer.observe(textEl);
  });

  // *** ON DESTROY
  onDestroy(() => {
    // console.log("DESTROYYYY");
    window.removeEventListener("scroll", throttledCheck);
  });
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

<div class="body-text" class:entertainment={isEntertainment} bind:this={textEl}>
  {@html text}
</div>

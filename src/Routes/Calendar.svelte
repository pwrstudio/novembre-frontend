<script>
  // # # # # # # # # # # # # #
  //
  //  Calendar
  //
  // # # # # # # # # # # # # #

  // *** IMPORTS
  import { fade } from "svelte/transition";
  import { onMount } from "svelte";

  // STORES
  import { navigationColor } from "../stores.js";

  // COMPONENTS
  import Footer from "../Components/Footer.svelte";

  // PROPS
  export let endpoint = "";
  export let slug = "";
  export let location = {};

  //   // LOGIC
  navigationColor.set("black");

  onMount(async () => {
    window.scrollTo(0, 0);
  });
</script>

<style lang="scss">
  @import "../variables.scss";

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

    // &.hide-text {
    //   opacity: 0;
    // }
  }

  .credits {
    column-count: 3;
    width: 100%;
    margin-right: 60px;
    margin-left: 60px;

    height: auto;
    width: 800px;
    margin-left: auto;
    margin-right: auto;
    max-width: 95vw;
    margin-bottom: $large-vertical-margin;
    line-height: 1.2em;
    overflow: hidden;
    font-family: $sans-stack;

    @include screen-size("small") {
      column-count: 2;
    }

    &__item {
      margin-bottom: $small-vertical-margin;
      break-inside: avoid;
    }
  }

  .about {
    background: white;
    min-height: 80vh;
    padding-top: 120px;
    height: auto;
    width: 800px;
    margin-left: auto;
    margin-right: auto;
    max-width: 95vw;
    margin-bottom: $large-vertical-margin;
    line-height: 1.2em;
    overflow: hidden;

    @include screen-size("small") {
      padding-top: 100px;
    }

    // &.hide-text {
    //   opacity: 0;
    // }

    &__header {
      img,
      video {
        height: $full-height;
        width: 100%;
        object-fit: cover;
      }

      &--black {
        background: black;
      }

      @include screen-size("small") {
        // height: 70vh;
      }
    }

    em {
      font-family: $serif-stack;
      font-style: italic;
    }
  }
</style>

<svelte:head>
  <title>CALENDAR / NOVEMBRE</title>
</svelte:head>

<article class="about">

  <div class="body-text">
    <iframe
      src="https://calendar.google.com/calendar/embed?src=novembremagazine.com_riqnf01uh50b32n8purjgb86ek%40group.calendar.google.com&ctz=Europe%2FParis"
      style="border: 0"
      width="800"
      title="Calendar"
      height="600"
      frameborder="0"
      scrolling="no" />
  </div>

</article>

<Footer active={true} />

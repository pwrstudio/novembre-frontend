<script>
  // # # # # # # # # # # # # #
  //
  //  Page
  //
  // # # # # # # # # # # # # #

  // *** IMPORTS
  import { fade } from "svelte/transition";
  import { quintOut } from "svelte/easing";
  import { onMount } from "svelte";

  // STORES
  import { navigationStyle, menuActiveGlobal } from "../stores.js";

  // COMPONENTS
  import Footer from "../Components/Footer.svelte";
  import Logo from "../Components/Logo.svelte";

  // PROPS
  export let endpoint = "";
  export let slug = "";
  export let location = {};

  // VARIABLES
  let post = loadData();

  // LOGIC
  navigationStyle.set(false);

  async function loadData() {
    try {
      const res = await fetch(endpoint);
      const post = await res.json();
      return post;
    } catch (err) {
      Sentry.captureException(err);
    }
  }

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

    &.hide-text {
      opacity: 0;
    }
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

    &.hide-text {
      opacity: 0;
    }

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
  <title>ABOUT / NOVEMBRE</title>
</svelte:head>

{#await post then post}
  <article class="about" class:hide-text={$menuActiveGlobal}>

    <div class="body-text">
      {@html post.content}
    </div>

    <!-- <div class="credits">
      {@html post.header.credits}
    </div> -->
    <div class="credits">
      <div class="stockists__item">
        <strong>Creative directors</strong>
        <br />
        Florence Tétier
        <br />
        Jeanne-Salomé Rochat
      </div>
      <div class="stockists__item">
        <strong>Editor-in-chief</strong>
        <br />
        Florence Tétier
      </div>
      <div class="stockists__item">
        <strong>Arts &amp; critic director</strong>
        <br />
        Jeanne-Salomé Rochat
      </div>
      <div class="stockists__item">
        <strong>Editor &amp; luxury consultant</strong>
        <br />
        Florian Joye
      </div>
      <div class="stockists__item">
        <strong>Fashion director</strong>
        <br />
        Georgia Pendlebury
      </div>
      <div class="stockists__item">
        <strong>Editors-at-large</strong>
        <br />
        Nicolas Coulomb
      </div>
      <div class="stockists__item">
        <strong>Legal advisors</strong>
        <br />
        Nancy Medina
        <br />
        Yannis Egloff
      </div>
      <div class="stockists__item">
        <strong>Contributing editor</strong>
        <br />
        Marisa Makin
      </div>
      <div class="stockists__item">
        <strong>Digital Editor</strong>
        <br />
        Morgane Nicolas
      </div>
      <div class="stockists__item">
        <strong>Diffusion &amp; Circulation</strong>
        <br />
        K.D. Presse
        <br />
        Pineapple Media
      </div>
      <div class="stockists__item">All rights reserved ©2015/16</div>
    </div>
  </article>

  <Footer active={true} />
{/await}

<script>
  // # # # # # # # # # # # # #
  //
  //  Page
  //
  // # # # # # # # # # # # # #

  // STORES
  import { navigationColor } from "../stores.js";

  // COMPONENTS
  import Footer from "../Components/Footer.svelte";

  // PROPS
  export let endpoint = "";
  export let slug = "";
  export let location = {};

  // VARIABLES
  // let post = loadData();

  navigationColor.set("black");

  // async function loadData() {
  //   try {
  //     const res = await fetch(endpoint);
  //     const post = await res.json();
  //     return post;
  //   } catch (err) {
  //     Sentry.captureException(err);
  //   }
  // }
</script>

<style lang="scss">
  @import "../variables.scss";

  .about {
    display: inline-block;
    background: $hotpink;
    width: 100vw;
    height: auto;
    line-height: 1em;
    padding-bottom: $large-vertical-margin;
  }

  .about-text {
    padding: $small-margin;
    padding-top: 100px;
    height: auto;
    max-width: 95%;
    font-family: $sans-stack;
    line-height: 1em;
    font-size: $large;
    text-transform: uppercase;

    @include screen-size("small") {
      font-size: $mobile_large;
    }
  }

  .about-image {
    width: 100vw;
    height: 600px;

    @include screen-size("small") {
      height: 400px;
    }

    img {
      height: 100%;
      width: 100%;
      object-fit: cover;
    }
  }

  .about-credits {
    width: 800px;
    margin-left: auto;
    margin-right: auto;
    margin-top: $small-vertical-margin;
    max-width: 95vw;
    padding-bottom: $large-vertical-margin;
    line-height: 1.2em;
    font-family: $sans-stack;

    .about-credits-column {
      width: 33.33%;
      float: left;

      @include screen-size("small") {
        width: 100%;
      }
    }

    .about-credits-header {
      text-transform: uppercase;
    }

    .about-credits-item {
      margin-bottom: 2 * $small-vertical-margin;
      break-inside: avoid;
    }
  }
</style>

<svelte:head>
  <title>ABOUT / NOVEMBRE</title>
</svelte:head>

<!-- {#await post then post} -->
<article class="about">

  <div class="about-text">
    Novembre is an online and biannually printed magazine devoted to the
    products that make contemporary urban life exciting.
    <br />
    <br />
    Under the candid caption “Art practices, beauty & innovations”, we explore
    the worlds of art and fashion to challenge cultural trends and produce
    innovative imagery.
  </div>

  <div class="about-image">
    <img
      src="/user/themes/novembre/frontend/img/about-img.jpg"
      alt="Novembre" />
  </div>

  <div class="about-credits">

    <div class="about-credits-column">
      <div class="about-credits-item">
        <strong>Creative directors</strong>
        <br />
        Florence Tétier
        <br />
        Jeanne-Salomé Rochat
      </div>
      <div class="about-credits-item">
        <strong>Editor-in-chief</strong>
        <br />
        Florence Tétier
      </div>
      <div class="about-credits-item">
        <strong>Arts &amp; critic director</strong>
        <br />
        Jeanne-Salomé Rochat
      </div>
    </div>

    <div class="about-credits-column">
      <div class="about-credits-item">
        <strong>Editor &amp; luxury consultant</strong>
        <br />
        Florian Joye
      </div>
      <div class="about-credits-item">
        <strong>Fashion director</strong>
        <br />
        Georgia Pendlebury
      </div>
      <div class="about-credits-item">
        <strong>Editors-at-large</strong>
        <br />
        Nicolas Coulomb
      </div>
      <div class="about-credits-item">
        <strong>Legal advisors</strong>
        <br />
        Nancy Medina
        <br />
        Yannis Egloff
      </div>
      <div class="about-credits-item">
        <strong>Contributing editor</strong>
        <br />
        Marisa Makin
      </div>
    </div>

    <div class="about-credits-column">
      <div class="about-credits-item">
        <strong>Digital Editor</strong>
        <br />
        Morgane Nicolas
      </div>
      <div class="about-credits-item">
        <strong>Diffusion &amp; Circulation</strong>
        <br />
        K.D. Presse
        <br />
        Pineapple Media
      </div>
      <div class="about-credits-item">All rights reserved ©2015/16</div>
    </div>
  </div>

</article>

<Footer active={true} />
<!-- {/await} -->

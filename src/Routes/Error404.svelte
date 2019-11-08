<script>
  // # # # # # # # # # # # # #
  //
  //  ERROR 404
  //
  // # # # # # # # # # # # # #

  import Footer from "../Components/Footer.svelte";
  import { onMount } from "svelte";

  export let title;
  export let location = {};

  onMount(async () => {
    window.scrollTo(0, 0);
  });
</script>

<style lang="scss">
  @import "../variables.scss";

  .placeholder {
    margin-top: 160px;
    font-size: $xlarge;
    font-weight: 300;
    text-transform: uppercase;
    line-height: 0.9em;
    font-family: $sans-stack;
    margin-left: $small-margin;
    min-height: 80vh;

    @include screen-size("small") {
      font-size: $mobile_xlarge;
    }
  }
</style>

<svelte:head>
  <title>404 / NOVEMBRE</title>
</svelte:head>

<div class="placeholder">
  404
  <br />
  Page not found
</div>

<Footer active={true} />

<script>
  import Footer from "../Components/Footer.svelte";
  import { onMount } from "svelte";

  export let title;

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
    min-height: 90vh;
  }
</style>

<div class="placeholder">{title}</div>

<Footer />

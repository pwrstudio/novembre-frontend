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

  .calendar {
    background: white;
    padding-top: 90px;
    margin-bottom: $large-vertical-margin;
    line-height: 1.2em;
    width: 100vw;
    height: calc(100vh - 90px);
    padding-left: $small-margin;
    padding-right: $small-margin;
    position: relative;
    bottom: 0;
    left: 0;

    @include screen-size("small") {
      padding-top: 100px;
    }

    iframe {
      width: 100%;
      height: 100%;
    }
  }

  .calendar-link {
    display: inline-block;
    position: absolute;
    background: $hotpink;
    padding: $small-margin;
    font-size: $intro;
    font-family: $sans-stack;
    color: black;
    bottom: 5px;
    right: 5px;
    line-height: 1.1em;
  }
</style>

<svelte:head>
  <title>CALENDAR / NOVEMBRE</title>
</svelte:head>

<article class="calendar">

  <iframe
    src="https://calendar.google.com/calendar/embed?src=novembremagazine.com_riqnf01uh50b32n8purjgb86ek%40group.calendar.google.com&ctz=Europe%2FParis"
    style="border: 0"
    width="800"
    title="Calendar"
    frameborder="0"
    scrolling="no" />

  <a
    target="_blank"
    href="https://accounts.google.com/signin/v2/identifier?service=cl&passive=1209600&osid=1&continue=https%3A%2F%2Fcalendar.google.com%2Fcalendar%2Frender%3Fcid%3Dnovembremagazine.com_riqnf01uh50b32n8purjgb86ek%40group.calendar.google.com&followup=https%3A%2F%2Fcalendar.google.com%2Fcalendar&scc=1&flowName=GlifWebSignIn&flowEntry=ServiceLogin"
    class="calendar-link">
    SUBSCRIBE TO CALENDAR
  </a>

</article>

<Footer active={true} />

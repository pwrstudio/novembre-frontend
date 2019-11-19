<script>
  // # # # # # # # # # # # # #
  //
  //  ELLIPSE ANIMATION
  //
  // # # # # # # # # # # # # #

  // *** IMPORT
  import { onMount, onDestroy } from "svelte";

  // *** VARIABLES
  let text = "";
  let timer = {};

  const NUMBER_OF_PERIODS = 5;

  // *** ON MOUNT
  onMount(async () => {
    timer = setInterval(() => {
      text = text.length < NUMBER_OF_PERIODS ? text + "." : "";
    }, 500);
  });

  // *** ON DESTROY
  onDestroy(() => {
    clearInterval(timer);
  });
</script>

<span>{text}</span>

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
  let timer;

  // *** ON MOUNT
  onMount(async () => {
    timer = setInterval(() => {
      if (text.length < 5) {
        text += ".";
      } else {
        text = "";
      }
    }, 500);
  });

  // *** ON DESTROY
  onDestroy(() => {
    clearInterval(timer);
  });
</script>

<span>{text}</span>

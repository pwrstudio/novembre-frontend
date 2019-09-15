<script>
  import { onMount } from "svelte";
  import { fade } from "svelte/transition";

  export let endpoint = "";
  export let title = "";
  export let location;

  let emailAddress = "";
  let success = false;

  function submit() {
    console.log(emailAddress);
    fetch(
      "https://testing.novembre.global/user/themes/novembre/dist/php/subscribe.php?email=" +
        emailAddress
    ).then(function(response) {
      console.log(response);
      success = true;
    });
  }

  onMount(async () => {
    window.scrollTo(0, 0);
  });
</script>

<div class="mailing-list">
  {#if success}
    <span in:fade>
      <strong>Thank you.</strong>
      <br />
      You will receive a sign up confirmation at the address {emailAddress}
      shortly.
    </span>
  {:else}
    <input
      placeholder="Mailing list"
      class="mailing-list__input"
      bind:value={emailAddress} />
    <button class="mailing-list__submit" on:click={submit}>Sign up</button>
  {/if}
</div>

<script>
  // # # # # # # # # # # # # #
  //
  //  Newsletter sign-up form
  //
  // # # # # # # # # # # # # #

  // *** IMPORTS
  import { onMount } from "svelte";
  import { fade } from "svelte/transition";

  // VARIABLES
  let emailAddress = "";
  let emailName = "";
  let success = false;

  // LOGIC
  function submit() {
    console.log(emailAddress);
    console.log(emailName);

    fetch(
      "https://testing.novembre.global/user/themes/novembre/dist/php/subscribe.php?email=" +
        emailAddress
    )
      .then(function(response) {
        console.log(response);
        success = true;
      })
      .catch(err => {
        Sentry.captureException(err);
      });
  }

  onMount(async () => {
    window.scrollTo(0, 0);
  });
</script>

<style lang="scss">
  @import "../variables.scss";

  .newsletter-signup {
    width: 100%;
    height: auto;
    margin-bottom: $large-vertical-margin;
    line-height: 1.2em;
    overflow: hidden;
    font-family: $sans-stack;
    &__item {
      margin-bottom: $small-vertical-margin;
      break-inside: avoid;
    }

    input {
      background: transparent;
      border: 0;
      line-height: 1.2em;
      padding: 0px;
      font-weight: 300;
      outline: none;
      color: currentColor;
      font-size: $body;
      height: 1.2em;
      margin-right: 0;
      width: 90%;
      border-bottom: 1px solid black;
    }

    .form-section {
      margin-bottom: $large-vertical-margin;
      width: 100%;

      &.submit-button {
        display: inline-block;
        border-bottom: 1px solid black;
        height: auto;
        width: auto;
      }
    }

    .submit {
      display: inline-block;
      position: relative;
      line-height: 1em;
      color: currentColor;
      font-size: $body;
      background: transparent;
      outline: none;
      border: none;
      text-transform: uppercase;
      padding: 0;
      margin: 0;
      cursor: pointer;
      height: 1em;
      text-align: center;
      font-weight: 300;

      &:hover {
        position: relative;
        padding-top: 4px;
        font-family: $serif-stack;
        font-style: italic;
      }
    }
  }
</style>

<div class="mailing-list">
  {#if success}
    <span in:fade>
      <strong>Thank you.</strong>
      <br />
      You will receive a sign up confirmation at the address {emailAddress}
      shortly.
    </span>
  {:else}
    <form class="newsletter-signup">
      <div class="form-section">NEWSLETTER</div>
      <div class="form-section">
        <input
          name="email_name"
          placeholder="NAME"
          class="mailing-list__input"
          bind:value={emailName} />
      </div>

      <div class="form-section">
        <input
          placeholder="EMAIL ADDRESS"
          class="mailing-list__input"
          bind:value={emailAddress} />
      </div>

      <div class="form-section submit-button">
        <button class="submit" on:click={submit}>Sign up</button>
      </div>

    </form>
  {/if}
</div>

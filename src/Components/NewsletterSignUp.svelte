<script>
  // # # # # # # # # # # # # #
  //
  //  NEWSLETTER SIGN-UP
  //
  // # # # # # # # # # # # # #

  // *** IMPORTS
  import { fade } from "svelte/transition";

  // VARIABLES
  let emailAddress = "";
  let emailName = "";
  let success = false;

  // LOGIC
  const submit = () => {
    console.log(emailAddress);
    console.log(emailName);

    const url =
      "https://signup-form--novembre.netlify.com/.netlify/functions/signup?email=" +
      encodeURIComponent(emailAddress) +
      "&name=" +
      encodeURIComponent(emailName);

    console.log(url);

    fetch(url)
      .then(function(response) {
        console.log(response);
        success = true;
      })
      .catch(err => {
        Sentry.captureException(err);
      });
  };
</script>

<style lang="scss">
  @import "../variables.scss";

  .newsletter-signup {
    width: 100%;
    margin-bottom: $large-vertical-margin;
    line-height: 1em;
    font-family: $sans-stack;
    font-size: $large;

    @include screen-size("small") {
      font-size: $mobile-large;
      margin-bottom: $small-vertical-margin;
    }

    input {
      background: transparent;
      border: 0;
      line-height: 1em;
      padding: 0px;
      font-weight: 300;
      outline: none;
      color: currentColor;
      font-size: $large;

      height: 1em;
      width: 95%;
      border-bottom: 3px solid black;

      @include screen-size("small") {
        font-size: $mobile-large;
        border-bottom: 2px solid black;
      }
    }

    .form-section {
      margin-bottom: 1em;
      width: 100%;

      &.submit-button {
        position: relative;
        height: 1em;
      }
    }

    .submit {
      line-height: 1em;
      color: currentColor;
      font-size: $large;
      @include screen-size("small") {
        font-size: $mobile-large;
      }
      background: transparent;
      outline: none;
      border: none;
      text-transform: uppercase;
      padding: 0;
      margin: 0;
      cursor: pointer;
      text-align: center;
      font-weight: 300;
      position: absolute;
      top: 0;
      left: 0;

      &:hover {
        top: 8px;
        left: -5px;
        font-family: $serif-stack;
        font-style: italic;
      }
    }
  }

  ::-webkit-input-placeholder {
    color: $black;
  }

  :-ms-input-placeholder {
    color: $black;
    opacity: 0.8;
  }

  ::placeholder {
    color: rgba(0, 0, 0, 0.6);
    font-family: $sans-stack;
  }
</style>

<div id="mailing-list" class="mailing-list">
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
          name="email_first_name"
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
        <div class="submit" on:click={submit}>Sign up</div>
      </div>

    </form>
  {/if}
</div>

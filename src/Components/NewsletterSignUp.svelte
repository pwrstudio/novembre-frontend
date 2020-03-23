<script>
  // # # # # # # # # # #
  //
  // NEWSLETTER SIGN-UP
  //
  // # # # # # # # # # #

  // *** IMPORTS
  import { fade } from "svelte/transition";

  // *** PROPS
  export let compact = false;

  // VARIABLES
  let emailAddress = "";
  let emailFirstName = "";
  let emailLastName = "";
  let emailCompany = "";
  let success = false;

  // LOGIC
  const submit = () => {
    const url =
      "https://novembre.global/.netlify/functions/signup?email=" +
      encodeURIComponent(emailAddress) +
      "&firstname=" +
      encodeURIComponent(emailFirstName) +
      "&lastname=" +
      encodeURIComponent(emailLastName) +
      "&company=" +
      encodeURIComponent(emailCompany);

    fetch(url)
      .then(function(response) {
        console.log(response);
        success = true;
      })
      .catch(err => {
        console.error(err);
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

    &.compact {
      font-size: $intro;

      input {
        font-size: $intro;
        border-bottom: 1px solid black;

        @include screen-size("small") {
          font-size: $mobile-intro;
          border-bottom: 1px solid black;
        }
      }

      .submit {
        font-size: $intro;
        @include screen-size("small") {
          font-size: $mobile-intro;
        }

        &:hover {
          top: 3px;
          left: -5px;
        }
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

<div id="mailing-list" class="mailing-list" class:compact>
  {#if success}
    <span in:fade>
      <strong>Thank you.</strong>
      <br />
      You will receive a sign up confirmation at the address {emailAddress}
      shortly.
    </span>
  {:else}
    <form class="newsletter-signup" class:compact>
      {#if compact}
        <div class="form-section">Subscribe to our correspondence channel</div>
      {:else}
        <div class="form-section">NEWSLETTER</div>
      {/if}

      <!-- {#if !compact} -->
      <div class="form-section">
        <input
          name="email_first_name"
          placeholder="FIRST NAME"
          class="mailing-list__input"
          bind:value={emailFirstName} />
      </div>

      <div class="form-section">
        <input
          name="email_last_name"
          placeholder="LAST NAME"
          class="mailing-list__input"
          bind:value={emailLastName} />
      </div>

      <div class="form-section">
        <input
          name="email_company"
          placeholder="COMPANY"
          class="mailing-list__input"
          bind:value={emailCompany} />
      </div>
      <!-- {/if} -->

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

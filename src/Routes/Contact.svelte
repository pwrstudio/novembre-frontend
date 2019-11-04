<script>
  // # # # # # # # # # # # # #
  //
  //  Contact
  //
  // # # # # # # # # # # # # #

  // STORES
  import { navigationColor } from "../stores.js";

  // COMPONENTS
  import Footer from "../Components/Footer.svelte";
  import NewsletterSignUp from "../Components/NewsletterSignUp.svelte";

  // PROPS
  export let endpoint = "";
  export let slug = "";
  export let location = {};

  // VARIABLES
  let post = loadData();

  // LOGIC
  navigationColor.set("black");

  async function loadData() {
    try {
      const res = await fetch(endpoint);
      const post = await res.json();
      return post;
    } catch (err) {
      Sentry.captureException(err);
    }
  }
</script>

<style lang="scss">
  @import "../variables.scss";

  .contact {
    padding: $small-margin;
    padding-top: 100px;
    margin-bottom: $large-vertical-margin;
    font-family: $sans-stack;
    font-size: $large;
    text-transform: uppercase;
    line-height: 1em;
    overflow: hidden;

    @include screen-size("small") {
      font-size: $mobile-large;
      margin-bottom: $small-vertical-margin;
    }

    .contact-section {
      margin-bottom: 1em;

      a {
        color: currentColor;
        text-decoration: none;
        border-bottom: 3px solid transparent;

        @include screen-size("small") {
          border-bottom: 2px solid transparent;
        }

        transition: border 0.3s $transition;

        &:hover {
          border-bottom: 3px solid $black;
          @include screen-size("small") {
            border-bottom: 2px solid black;
          }
        }
      }
    }
  }
</style>

<svelte:head>
  <title>CONTACT / NOVEMBRE</title>
</svelte:head>

{#await post then post}
  <article class="contact">

    <div class="contact-section">
      <div>EMAIL</div>
      <a href="mailto:{post.header.email}" target="_blank">
        {post.header.email}
      </a>
    </div>

    <div class="contact-section">
      <div>INSTAGRAM</div>
      <a
        href="https://www.instagram.com/{post.header.instagram}"
        target="_blank"
        rel="noreferrer">
        @{post.header.instagram}
      </a>
    </div>

    <div class="contact-section">
      <div>FACEBOOK</div>
      <a
        href="https://facebook.com/novembremagazineworld"
        target="_blank"
        rel="noreferrer">
        @novembremagazineworld
      </a>
    </div>

    <div class="contact-section">
      <div>LINKEDIN</div>
      <a href="https://www.linkedin.com/novembre-magazine" target="_blank">
        @novembre-magazine
      </a>
    </div>

    <div class="contact-section">
      <NewsletterSignUp />
    </div>

  </article>

  <Footer active={true} />
{/await}

<script>
  import Logo from "./Logo.svelte";
  import SmoothScroll from "smooth-scroll";
  import { fade, fly } from "svelte/transition";

  var scroll = new SmoothScroll('a[href*="#"]');
</script>

<style lang="scss">
  @import "../variables.scss";

  .footer {
    user-select: none;
    width: 100vw;
    z-index: 10;
    background: white;
    font-family: $sans-stack;

    &__logo {
      display: block;
    }

    &__link {
      display: block;
      font-size: $large;
      color: black;
      text-decoration: none;
      font-weight: 300;
      line-height: 1em;

      &--left {
        float: left;
        margin-left: $small-margin;
        &:hover {
          font-family: $serif-stack;
          font-size: $large + 10px;
          // left: -2px;
          font-style: italic;
          top: 8px;
          position: relative;
          left: 3px;
        }
      }

      &--right {
        float: right;
        margin-right: $small-margin;
        &:hover {
          font-family: $serif-stack;
          font-size: $large + 10px;
          // left: -2px;
          font-style: italic;
          top: 8px;
          position: relative;
          right: 3px;
        }
      }

      @include screen-size("small") {
        font-size: $mobile_large;
      }
    }
  }
</style>

<footer class="footer" transition:fly>

  <a
    class="footer__link footer__link--left"
    href="https://www.instagram.com/novembremagazine/"
    target="_blank">
    INSTAGRAM
  </a>

  <a
    data-scroll
    href="#top"
    class="footer__link footer__link--right js-back-to-top">
    BACK TO TOP
  </a>

  <a data-scroll href="#top" class="footer__logo">
    <Logo />
  </a>

</footer>

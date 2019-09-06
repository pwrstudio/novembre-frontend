<script>
  import Logo from "./Logo.svelte";
  import SmoothScroll from "smooth-scroll";
  import { onMount } from "svelte";

  var scroll = new SmoothScroll('a[href*="#"]', {
    speed: 100
  });

  let footerEl;
  let active = false;

  const observer = new IntersectionObserver(
    entries => {
      // console.log("FOOTEr");
      entries.forEach(entry => {
        if (entry.intersectionRatio > 0) {
          // console.log("case 1");
          // console.log(entry.intersectionRatio);
          active = true;
          observer.disconnect();
        } else {
          // console.log(entry.intersectionRatio);
          // console.log("case 2");
        }
      });
    },
    { treshhold: 0.5 }
  );

  onMount(async () => {
    observer.observe(footerEl);
  });
</script>

<style lang="scss">
  @import "../variables.scss";

  .footer {
    user-select: none;
    width: 100vw;
    z-index: 10;
    background: white;
    font-family: $sans-stack;
    padding-top: 20px;

    opacity: 0;
    transition: opacity 1s ease-out;

    &.active {
      opacity: 1;
    }

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

<footer class="footer" class:active bind:this={footerEl}>

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

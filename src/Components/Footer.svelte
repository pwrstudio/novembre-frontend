<script>
  import Logo from "./Logo.svelte";
  import SmoothScroll from "smooth-scroll";
  import MediaQuery from "svelte-media-query";

  var scroll = new SmoothScroll('a[href*="#"]', {
    speed: 150
  });

  export let active = false;
</script>

<style lang="scss">
  @import "../variables.scss";

  .footer {
    user-select: none;
    width: 100vw;
    z-index: 10;
    background: white;
    font-family: $sans-stack;
    padding-top: $small-margin;
    margin-bottom: -$small-margin;

    opacity: 0;
    transition: none;

    @include screen-size("small") {
      // padding-top: 40px;
      padding-bottom: $small-margin;
    }

    &.active {
      opacity: 1;
      transition: opacity 0.5s ease-out;
    }

    &__logo {
      display: block;
      // background: red;
      @include screen-size("small") {
        position: relative;
        left: -1%;
      }
    }

    &__link {
      position: relative;
      width: auto;
      color: black;
      line-height: 1em;
      height: 100%;
      display: inline-block;
      font-size: $large;

      &--left {
        float: left;
        margin-left: $small-margin;
      }

      &--right {
        float: right;
        margin-right: $small-margin;
      }

      &--normal {
        opacity: 1;
        font-weight: 300;

        @include screen-size("small") {
          font-size: 45px;
          // hyphens: manual;
          // font-size: 46px;
        }
      }

      &--hover {
        position: absolute;
        top: 6px;
        font-family: $serif-stack;
        font-size: $large + 10px;
        font-weight: 500;
        font-style: italic;
        opacity: 0;
        z-index: 1000;
        hyphens: none;
        white-space: nowrap;

        &.left {
          left: -2px;
        }

        &.right {
          left: -25px;
        }

        @include screen-size("small") {
          font-size: 46px;
          font-size: $mobile_large;
          font-family: $sans-stack;
          font-style: normal;
          font-weight: 300;
          position: absolute;
          top: 0px;
          left: 0px;
        }
      }

      &:hover,
      &:active {
        .footer__link--hover {
          opacity: 1;
        }

        .footer__link--normal {
          opacity: 0;
        }
      }
    }

    // &__link {
    //   display: block;
    //   font-size: $large;
    //   color: black;
    //   text-decoration: none;
    //   font-weight: 300;
    //   line-height: 1em;

    //   &--left {
    //     float: left;
    //     margin-left: $small-margin;
    //     &:hover {
    //       font-family: $serif-stack;
    //       font-size: $large + 10px;
    //       // left: -2px;
    //       font-style: italic;
    //       top: 8px;
    //       position: relative;
    //       left: 3px;
    //     }
    //   }

    //   &--right {
    //     float: right;
    //     margin-right: $small-margin;
    //     &:hover {
    //       font-family: $serif-stack;
    //       font-size: $large + 10px;
    //       // left: -2px;
    //       font-style: italic;
    //       top: 8px;
    //       position: relative;
    //       right: 3px;
    //     }
    //   }

    //   @include screen-size("small") {
    //     font-size: $mobile_large;
    //   }
    // }
  }
</style>

<footer class="footer" class:active>

  <MediaQuery query="(min-width: 800px)" let:matches>
    {#if matches}
      <a
        href="https://www.instagram.com/novembremagazine/"
        class="footer__link footer__link--left"
        target="_blank">
        <div class="footer__link--normal">INSTAGRAM</div>
        <div class="footer__link--hover left">INSTAGRAM</div>
      </a>

      <a data-scroll href="#top" class="footer__link footer__link--right">
        <div class="footer__link--normal">BACK TO TOP</div>
        <div class="footer__link--hover right">BACK TO TOP</div>
      </a>

      <Logo />
    {:else}
      <a data-scroll href="#top" class="footer__logo">
        <Logo />
      </a>
    {/if}
  </MediaQuery>

</footer>

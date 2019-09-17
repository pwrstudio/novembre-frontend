<script>
  // # # # # # # # # # # # # #
  //
  //  Navigation bar and menu
  //
  // # # # # # # # # # # # # #

  // *** IMPORTS
  import { Router, links } from "svelte-routing";
  import MediaQuery from "svelte-media-query";
  import { fade } from "svelte/transition";

  // *** COMPONENTS
  import Logo from "./Logo.svelte";
  import SearchBox from "./SearchBox.svelte";

  // *** STORES
  import { pageLocation, navigationStyle } from "../stores.js";

  // *** PROPS
  export let isTransparent = false;

  // *** VARIABLES
  let menuActive = false;
  let menuItems = [
    { title: "MAGAZINE", target: "/magazine" },
    { title: "ENTERTAINMENT", target: "/entertainment" },
    { title: "ABOUT", target: "/about" },
    { title: "CONTACT", target: "/contact" },
    { title: "STOCKISTS", target: "/stockists" }
  ];

  // *** REACTIVE
  $: toggleText = menuActive ? "CLOSE" : "MENU";

  // *** FUNCTIONS
  var scroll = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  };
</script>

<style lang="scss">
  @import "../variables.scss";

  .navigation {
    $block: &;
    $height: 80px;

    position: fixed;
    top: 0;
    left: 0;
    user-select: none;

    font-family: $sans-stack;
    font-weight: 300;
    font-size: $large;

    width: 100vw;
    z-index: 100;
    // transition: background 0.5s $transition;

    color: white;

    // transition: color 0.3s $transition;

    &--black {
      color: black;
      // background: red;
    }

    &__bar {
      width: 100vw;
      height: $height;
      z-index: 100;
    }

    &--transparent {
      #{$block}__bar {
        background: transparent;
      }
    }

    &__logo {
      position: absolute;
      top: 0;
      left: 0;
      height: 100px;
      margin-top: -2px;
      z-index: 101;
      cursor: pointer;

      svg {
        height: 100px;

        @include screen-size("small") {
          height: unset;
        }
      }

      @include screen-size("small") {
        width: 100%;
      }
    }

    &__toggle {
      float: right;
      font-size: $large;
      font-weight: 300;
      line-height: 80px;
      padding-right: $small-margin;
      cursor: pointer;

      @include screen-size("small") {
        display: none;
      }
    }

    &__menu {
      position: fixed;
      // background: black;
      display: block;
      margin: 0;
      padding: 10px;
      opacity: 0;
      width: 100vw;
      pointer-events: none;
      clip-path: inset(0 0 100% 0);
      padding-bottom: 20px;

      span {
        display: inline;
        position: relative;
        line-height: 1em;
        cursor: pointer;

        @include screen-size("small") {
          font-size: $mobile_large;
        }
      }
    }

    &__menu-item {
      display: block;
      height: 63px;

      @include screen-size("small") {
        height: 55px;
      }
    }

    &__link {
      position: relative;
      width: auto;
      line-height: 1em;
      height: 100%;
      display: inline-block;

      &--normal {
        font-size: $large;
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
        left: -2px;
        font-family: $serif-stack;
        font-size: $large + 10px;
        font-weight: 500;
        font-style: italic;
        opacity: 0;
        z-index: 1000;
        hyphens: none;

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
        .navigation__link--hover {
          opacity: 1;
        }

        .navigation__link--normal {
          opacity: 0;
        }
      }
    }

    &--expanded {
      #{$block}__bar {
        // background: black;
        // transition: background 0.3s $transition;
      }

      #{$block}__logo {
        svg {
          fill: white;
        }
      }

      #{$block}__menu {
        pointer-events: all;
        clip-path: inset(0 0 0% 0);
        transition: clip-path 0.4s $transition, opacity 0.4s $transition;
        opacity: 1;
        @include screen-size("small") {
          height: $full-height;
        }
      }
    }
  }

  .overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    z-index: 99;
    background: black;
    opacity: 0.9;

    &.black {
      background: white;
    }
  }
</style>

<nav
  class="navigation"
  class:navigation--transparent={isTransparent}
  class:navigation--black={!$navigationStyle}
  class:navigation--expanded={menuActive}
  use:links>

  <Router>
    <div class="navigation__bar">
      <MediaQuery query="(min-width: 800px)" let:matches>
        {#if matches}
          <!-- We are on desktop -->
          {#if menuActive}
            <!-- The menu is open: close it -->
            <div class="navigation__logo" on:click={() => (menuActive = false)}>
              <Logo white={$navigationStyle} />
            </div>
          {:else if $pageLocation === 'Landing'}
            <!-- Menu is closed and we are on landing: scroll to top -->
            <span class="navigation__logo" on:click={scroll}>
              <Logo white={$navigationStyle} />
            </span>
          {:else}
            <!-- Menu is closed and we are anywhere else than landing -->
            <a href="/" class="navigation__logo">
              <Logo white={$navigationStyle} />
            </a>
          {/if}
        {:else}
          <!-- We are on phone -->
          <div
            class="navigation__logo"
            on:click={() => (menuActive = !menuActive)}>
            <Logo white={$navigationStyle} />
          </div>
        {/if}
        <div
          class="navigation__toggle"
          on:click={() => (menuActive = !menuActive)}>
          {toggleText}
        </div>
      </MediaQuery>
    </div>

    <menu class="navigation__menu">

      {#each menuItems as item}
        <menuitem class="navigation__menu-item">
          <a
            href={item.target}
            class="navigation__link"
            on:click={() => (menuActive = !menuActive)}>
            <div class="navigation__link--normal">
              {@html item.title}
            </div>
            <div class="navigation__link--hover">
              {@html item.title}
            </div>
          </a>
        </menuitem>
      {/each}

      <menuitem class="navigation__menu-item">
        <SearchBox {menuActive} />
      </menuitem>
    </menu>
  </Router>

</nav>

<!-- {#if menuActive}
  <div class="overlay" class:black={!$navigationStyle} />
{/if} -->
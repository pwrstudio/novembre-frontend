<script>
  // # # # # # # # # # # # # #
  //
  //  NAVIGATION BAR
  //
  // # # # # # # # # # # # # #

  // *** IMPORTS
  import { Router, links } from "svelte-routing";
  import isEmpty from "lodash/isEmpty";

  // *** COMPONENTS
  import Logo from "./Logo.svelte";
  import SearchBox from "./SearchBox.svelte";
  import { urlFor } from "../sanity.js";

  // *** STORES
  import { menuBanners, navigationColor, menuActiveGlobal } from "../stores.js";

  // *** VARIABLES
  let menuActive = false;
  const menuItems = [
    { title: "FEED", target: "/" },
    { title: "MAGAZINE", target: "/magazine" },
    { title: "BUREAU", target: "/bureau" },
    { title: "ABOUT", target: "/about" },
    { title: "CONTACT", target: "/contact" },
    { title: "STOCKISTS", target: "/stockists" }
  ];

  // *** REACTIVE
  $: menuActiveGlobal.set(menuActive);
  $: {
    menuActive
      ? document.querySelector("body").classList.add("no-scroll")
      : document.querySelector("body").classList.remove("no-scroll");
  }

  console.dir($menuBanners);
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

    color: white;

    &--black {
      color: black;
    }

    &__bar {
      width: 100vw;
      height: $height;
      z-index: 100;
      opacity: 1;
      background: transparent;
      transition: background 0.4s $transition;
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
      position: relative;
      z-index: 1000;

      @include screen-size("small") {
        display: none;
      }
    }

    &__menu {
      position: fixed;
      display: block;
      margin: 0;
      opacity: 0;
      width: 100vw;
      height: auto;
      pointer-events: none;
      // clip-path: inset(0% 0% 100% 0%);
      // -webkit-clip-path: inset(0% 0% 100% 0%);
      padding: 10px;
      padding-bottom: 20px;
      background: white;
      top: 0;
      padding-top: $height;

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

      // @include screen-size("small") {
      //   height: 55px;
      // }
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

        // @include screen-size("small") {
        //   font-size: 45px;
        // }
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
          font-size: $large;
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
      #{$block}__logo {
        svg {
          fill: white;
        }
      }

      #{$block}__menu {
        pointer-events: all;
        transition: opacity 0.3s $transition;
        opacity: 1;

        @include screen-size("small") {
          height: $full-height;
        }
      }
    }

    .bg-bar {
      position: fixed;
      top: 0;
      left: 0;
      width: 100vw;
      height: $height;
      background: white;
      transition: opacity 0.3s $transition;
      display: none;
    }
  }

  .banner {
    position: absolute;
    right: 10px;
    top: $height;
    height: 90%;
    max-width: 50vw;

    img {
      height: 90%;
      max-width: 50vw;
    }

    @include screen-size("small") {
      display: none;
    }
  }
</style>

<nav
  class="navigation"
  class:navigation--black={$navigationColor === 'black' || menuActive}
  class:navigation--expanded={menuActive}
  use:links>

  <Router>

    <div class="navigation__bar">
      <div class="navigation__logo" on:click={() => (menuActive = !menuActive)}>
        <Logo white={$navigationColor === 'white' && !menuActive} />
      </div>
      <div
        class="navigation__toggle"
        on:click={() => (menuActive = !menuActive)}>
        {menuActive ? 'CLOSE' : 'MENU'}
      </div>
    </div>

    {#if menuActive}
      <div class="bg-bar" />
    {/if}

    <menu class="navigation__menu" on:click={() => (menuActive = !menuActive)}>

      {#if menuActive}
        {#each menuItems as item, menuIndex}
          <menuitem class="navigation__menu-item">
            <a href={item.target} class="navigation__link">
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
      {/if}

      {#await $menuBanners then menuBanners}
        {#if !isEmpty(menuBanners)}
          <a
            href={menuBanners[0].link}
            target="_blank"
            rel="noreferrer"
            class="banner">
            <img
              src={urlFor(menuBanners[0].image)
                .width(700)
                .quality(90)
                .auto('format')
                .url()} />
          </a>
        {/if}
      {/await}

    </menu>
  </Router>

</nav>

<script>
  import { Router, links } from "svelte-routing";

  // COMPONENTS
  import Logo from "./Logo.svelte";
  import SearchBox from "./SearchBox.svelte";

  let menuActive = false;

  $: toggleText = menuActive ? "CLOSE" : "MENU";

  let menuItems = [
    { title: "MAGAZINE", target: "/magazine" },
    { title: "ENTERTAINMENT", target: "/entertainment" },
    { title: "ABOUT", target: "/about" },
    { title: "CONTACT", target: "/contact" }
  ];
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
    width: 100vw;
    z-index: 100;
    transition: background 0.3s $transition;

    font-family: $sans-stack;

    &__bar {
      width: 100vw;
      height: $height;
      background: white;
      padding-left: 0px;
      z-index: 100;
    }

    &__logo {
      position: absolute;
      top: 0;
      left: 0;
      height: 100px;
      float: left;
      margin-top: -2px;
      z-index: 101;

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
        font-size: $mobile_large;
      }
    }

    &__open {
      display: block;
    }

    &__close {
      display: none;
    }

    &__menu {
      position: fixed;
      background: black;
      display: block;
      margin: 0;
      padding: 10px;
      opacity: 0;
      width: 100vw;
      pointer-events: none;

      transition: opacity 0.3s $transition;

      span {
        display: inline;
        position: relative;
        font-size: $large;
        color: white;
        text-decoration: none;
        font-weight: 300;
        line-height: 1em;
        cursor: pointer;

        // &.active {
        //   border-bottom: 3px solid white;
        //   transition: width 0.3s $transition, border 0.3s $transition;
        // }

        &:hover {
          font-family: $serif-stack;
          top: 0px;
          font-style: italic;
        }

        @include screen-size("small") {
          font-size: $mobile_large;
        }
      }
    }

    &__menu-item {
      display: block;
    }
    &--expanded {
      #{$block}__bar {
        background: black;
        color: white;
        transition: background 0.3s $transition;
      }

      #{$block}__logo {
        svg {
          fill: white;
        }
      }

      #{$block}__menu {
        pointer-events: all;
        clip-path: inset(0 0 0% 0);
        transition: opacity 0.3s $transition;
        transition: clip-path 0.2s $transition, opacity 0.3s $transition;
        opacity: 1;
        @include screen-size("small") {
          height: $full-height;
        }
      }

      #{$block}__open {
        display: none;
      }

      #{$block}__close {
        display: block;
      }
    }
  }

  .navigation {
    $block: &;
    $height: 80px;

    position: fixed;
    top: 0;
    left: 0;
    user-select: none;
    width: 100vw;
    z-index: 100;
    transition: background 0.3s $transition;

    &__bar {
      width: 100vw;
      height: $height;
      background: white;
      padding-left: 0px;
      z-index: 100;

      // @include screen-size('small') {
      //   height: 60px;
      // }
    }

    &__logo {
      position: absolute;
      top: 0;
      left: 0;
      height: 100px;
      float: left;
      margin-top: -2px;
      z-index: 101;

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
        font-size: $mobile_large;
      }
    }

    &__open {
      display: block;
    }

    &__close {
      display: none;
    }

    &__menu {
      position: fixed;
      background: black;
      display: block;
      margin: 0;
      padding: 10px;
      opacity: 0;
      width: 100vw;
      pointer-events: none;
      clip-path: inset(0 0 100% 0);

      span {
        display: inline;
        position: relative;
        font-size: $large;
        color: white;
        text-decoration: none;
        font-weight: 300;
        line-height: 1em;
        cursor: pointer;

        // &.active {
        //   border-bottom: 3px solid white;
        //   transition: width 0.3s $transition, border 0.3s $transition;
        // }

        &:hover {
          font-family: $serif-stack;
          top: 0px;
          font-style: italic;
        }

        @include screen-size("small") {
          font-size: $mobile_large;
        }
      }
    }

    &__menu-item {
      display: block;
      height: 63px;
    }

    &__link {
      font-size: $large;
      position: relative;
      width: auto;
      color: white;
      text-decoration: none;
      line-height: 1em;
      height: 100%;
      display: inline-block;

      &--normal {
        font-family: $sans-stack;
        font-size: $large;
        opacity: 1;
        font-weight: 300;
      }

      &--hover {
        position: absolute;
        top: 6px;
        left: -2px;
        font-family: $serif-stack;
        font-size: $large + 10px;
        font-style: italic;
        opacity: 0;
        z-index: 1000;
      }

      &:hover {
        .navigation__link--hover {
          opacity: 1;
        }

        .navigation__link--normal {
          opacity: 0;
        }
      }

      @include screen-size("small") {
        font-size: $mobile_large;
      }
    }

    &--expanded {
      #{$block}__bar {
        background: black;
        color: white;
        transition: background 0.3s $transition;
      }

      #{$block}__logo {
        svg {
          fill: white;
        }
      }

      #{$block}__menu {
        pointer-events: all;
        clip-path: inset(0 0 0% 0);
        transition: opacity 0.3s $transition;
        transition: clip-path 0.4s $transition, opacity 0.4s $transition;
        opacity: 1;
        @include screen-size("small") {
          height: $full-height;
        }
      }

      #{$block}__open {
        display: none;
      }

      #{$block}__close {
        display: block;
      }
    }
  }
</style>

<nav class="navigation" class:navigation--expanded={menuActive} use:links>

  <Router>
    <div class="navigation__bar">
      <a
        href="/"
        class="navigation__logo"
        on:click={() => (menuActive = false)}>
        <Logo white={menuActive} />
      </a>
      <div
        class="navigation__toggle"
        on:click={() => (menuActive = !menuActive)}>
        {toggleText}
      </div>
    </div>

    <menu class="navigation__menu">

      {#each menuItems as item}
        <menuitem class="navigation__menu-item">
          <a
            href={item.target}
            class="navigation__link"
            on:click={() => (menuActive = !menuActive)}>
            <div class="navigation__link--normal">{item.title}</div>
            <div class="navigation__link--hover">{item.title}</div>
          </a>
        </menuitem>
      {/each}

      <menuitem class="navigation__menu-item">
        <SearchBox />
      </menuitem>
    </menu>
  </Router>

</nav>

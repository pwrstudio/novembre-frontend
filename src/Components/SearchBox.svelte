<script>
  import { onMount } from "svelte";
  import MediaQuery from "svelte-media-query";

  let searchActive = false;
  let searchQuery = "";
  let searchField = {};

  export let menuActive = false;

  let openEl;
  let submitWidth;
  let inputWidth;

  // console.log(searchField);

  const showSearchBox = () => {
    searchActive = true;
    searchField.focus().select();
  };

  // console.log(menuActive);

  $: {
    if (!menuActive) {
      searchActive = false;
      searchQuery = "";
    }
  }

  function resizeInput() {
    submitWidth = openEl.offsetWidth;
    // console.log(submitWidth);
    inputWidth = window.innerWidth - submitWidth - 40; // Subtract margins
    // console.log(inputWidth);
    // console.log(window.innerWidth);
  }

  const submitSearch = () => {
    if (searchQuery.length > 0) {
      window.location = "/search/" + searchQuery;
    } else {
      searchActive = false;
    }

    window.onresize = resizeInput;
  };

  onMount(async () => {
    resizeInput();
  });
</script>

<style lang="scss">
  @import "../variables.scss";

  .search {
    $block: &;

    font-size: $large;
    font-family: $sans-stack;
    color: currentColor;
    font-weight: 300;

    position: relative;
    margin-bottom: $small-margin;

    // top: -4px;

    &__input {
      display: inline-block;
      position: relative;
      background: transparent;
      border: 0;
      line-height: 1em;
      padding: 0px;
      font-weight: 300;
      text-transform: uppercase;
      outline: none;
      color: currentColor;
      font-size: $large;
      width: 80vw;
      height: 1em;
      border-bottom: 3px solid transparent;
      transition: border 1s $transition;
      margin-right: 0;
      top: -5px;

      @include screen-size("small") {
        width: 90vw;
        font-size: $mobile_large;
        display: none;
        border-bottom: 0;
        background: transparent;
        margin-top: 20px;
        margin-bottom: 0;
      }

      &--active {
        border-bottom: 3px solid currentColor;
        @include screen-size("small") {
          display: block;
        }
      }
    }

    // transform: translateX(-81vw);
    transition: transform 0.3s $transition;

    @include screen-size("small") {
      transform: none;
    }

    &__submit {
      display: inline;
      position: relative;
      line-height: 1em;

      @include screen-size("small") {
        font-size: $mobile_large;
      }

      &:hover {
        position: relative;
        top: -2px;
        font-family: $serif-stack;
        font-style: italic;
        font-size: $large;

        @include screen-size("small") {
          font-size: $mobile_large;
          font-family: $sans-stack;
          top: unset;
          font-style: normal;
        }
      }
    }

    &__open {
      display: inline;
      position: relative;
      line-height: 1em;

      @include screen-size("small") {
        font-size: $mobile_large;
      }

      &:hover {
        position: relative;
        top: -2px;
        font-family: $serif-stack;
        font-style: italic;
        font-size: $large;

        @include screen-size("small") {
          font-size: $mobile_large;
          font-family: $sans-stack;
          top: unset;
          font-style: normal;
        }
      }
    }

    // &--active {
    //   transform: translateX(4px);
    //   @include screen-size("small") {
    //     transform: none;
    //   }
    // }
  }
</style>

<div class="search" class:search--active={searchActive}>
  {#if !searchActive}
    <span class="search__open" on:click={showSearchBox} bind:this={openEl}>
      SEARCH
    </span>
  {/if}
  <MediaQuery query="(min-width: 800px)" let:matches>
    <input
      ref="search"
      type="text"
      class="search__input"
      style={!matches ? 'width:{inputWidth}px' : ''}
      class:search__input--active={searchActive}
      bind:value={searchQuery}
      bind:this={searchField}
      on:keypress={e => (e.keyCode === 13 ? submitSearch() : false)} />
  </MediaQuery>

  {#if searchActive}
    <span class="search__submit" on:click={submitSearch}>SEARCH</span>
  {/if}
</div>

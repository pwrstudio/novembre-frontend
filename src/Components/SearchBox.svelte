<script>
  // # # # # # # # # # # # # #
  //
  //  Searchj Box
  //
  // # # # # # # # # # # # # #

  // *** IMPORTS
  import { onMount } from "svelte";
  import MediaQuery from "svelte-media-query";

  // *** VARIABLES
  let searchActive = false;
  let searchQuery = "";
  let searchField = {};
  let submitWidth = 0;
  let inputWidth = 0;

  // *** PROPS
  export let menuActive = false;

  // *** DOM REFERENCES
  let openEl = {};

  const showSearchBox = e => {
    e.preventDefault();
    e.stopPropagation();
    searchActive = true;
    searchField.focus();
  };

  $: {
    if (!menuActive) {
      searchActive = false;
      searchQuery = "";
    }
  }

  function resizeInput() {
    submitWidth = openEl.offsetWidth;
    inputWidth = window.innerWidth - submitWidth - 60; // Subtract margins
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
    margin-bottom: $small-vertical-margin;

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
        font-size: 45px;
        display: none;
        border-bottom: 0;
        background: transparent;
        margin-top: 20px;
        margin-bottom: 0;
        border-bottom: 2px solid transparent;
      }

      &--active {
        border-bottom: 3px solid currentColor;
        @include screen-size("small") {
          border-bottom: 2px solid currentColor;
          display: block;
        }
      }
    }

    transition: transform 0.3s $transition;

    @include screen-size("small") {
      transform: none;
    }

    &__submit {
      display: inline;
      position: relative;
      line-height: 1em;
      cursor: pointer;

      @include screen-size("small") {
        font-size: 45px;
      }

      &:hover {
        position: relative;
        top: -2px;
        font-family: $serif-stack;
        font-style: italic;
        font-size: $large;

        @include screen-size("small") {
          font-size: 45px;
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
        font-size: 45px;
      }

      &:hover {
        position: relative;
        top: -2px;
        font-family: $serif-stack;
        font-style: italic;
        font-size: $large;

        @include screen-size("small") {
          font-size: 45px;
          font-family: $sans-stack;
          top: unset;
          font-style: normal;
        }
      }
    }
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
      style={matches ? 'width:' + inputWidth + 'px' : ''}
      class:search__input--active={searchActive}
      bind:value={searchQuery}
      bind:this={searchField}
      on:click={e => {
        e.preventDefault();
        e.stopPropagation();
      }}
      on:keypress={e => (e.keyCode === 13 ? submitSearch() : false)} />
  </MediaQuery>

  {#if searchActive}
    <span class="search__submit" on:click={submitSearch}>SEARCH</span>
  {/if}
</div>

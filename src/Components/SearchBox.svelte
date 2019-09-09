<script>
  let searchActive = false;
  let searchQuery = "";
  let searchField = {};

  export let menuActive = false;

  // console.log(searchField);

  const showSearchBox = () => {
    searchActive = !searchActive;
    searchField.focus().select();
  };

  // console.log(menuActive);

  $: {
    if (!menuActive) {
      searchActive = false;
      searchQuery = "";
    }
  }

  const submitSearch = () => {
    if (searchQuery.length > 0) {
      window.location = "/search/" + searchQuery;
    } else {
      searchActive = false;
    }
  };
</script>

<style lang="scss">
  @import "../variables.scss";

  .search {
    $block: &;

    font-size: $large;
    font-family: $sans-stack;
    color: white;
    font-weight: 300;

    position: relative;
    margin-bottom: 10px;

    // top: -4px;

    &__input {
      display: inline-block;
      position: relative;
      background: black;
      border: 0;
      line-height: 1em;
      padding: 0px;
      font-weight: 300;
      text-transform: uppercase;
      outline: none;
      color: white;
      font-size: $large;
      width: 500px;
      height: 1em;
      margin-right: $small-margin;
      border-bottom: 3px solid transparent;
      transition: border 1s $transition;
      margin-right: $small-margin;
      top: -4px;

      @include screen-size("small") {
        width: 90%;
        font-size: $mobile_large;
        display: none;
        border-bottom: 0;
        background: transparent;
        margin-top: 20px;
        margin-bottom: 0;
      }

      &--active {
        border-bottom: 3px solid white;
        @include screen-size("small") {
          display: block;
        }
      }
    }

    transform: translateX(-512px);
    transition: transform 0.3s $transition;

    &--active {
      transform: translateX(4px);
      @include screen-size("small") {
        transform: none;
      }
    }

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
  }
</style>

<div class="search" class:search--active={searchActive}>
  <input
    ref="search"
    type="text"
    class="search__input"
    class:search__input--active={searchActive}
    bind:value={searchQuery}
    bind:this={searchField}
    on:keypress={e => (e.keyCode === 13 ? submitSearch() : false)} />
  <span
    class="search__submit"
    on:click={e => (searchActive ? submitSearch() : showSearchBox())}>
    SEARCH
  </span>
</div>

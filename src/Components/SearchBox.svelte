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

  const submitSearch = () => {
    window.location = "/search/" + searchQuery;
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

    top: -4px;

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
      width: 15ch;
      height: 1em;
      margin-right: $small-margin;
      border-bottom: 3px solid transparent;
      transition: border 1s $transition;
      margin-right: $small-margin;
      top: -4px;

      &--active {
        border-bottom: 3px solid white;
      }

      @include screen-size("small") {
        font-size: $mobile_large;
      }
    }

    transform: translateX(calc(-15ch - 59px));
    transition: transform 0.3s $transition;

    &--active {
      transform: translateX(4px);
    }

    &__submit {
      display: inline;
      position: relative;
      line-height: 1em;

      &:hover {
        position: relative;
        top: -2px;
        font-family: $serif-stack;
        font-style: italic;
        font-size: $large;
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

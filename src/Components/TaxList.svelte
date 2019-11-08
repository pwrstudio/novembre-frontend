<script>
  // # # # # # # # # # # # # #
  //
  //  TAXONOMY LIST
  //
  // # # # # # # # # # # # # #

  // *** IMPORTS
  import { Router, links, Link } from "svelte-routing";
  import { format } from "date-fns";

  // *** PROPS
  export let taxonomy;
  export let white = false;
  export let date = false;
</script>

<style lang="scss">
  @import "../variables.scss";

  .taxonomy {
    font-family: $sans-stack;
    font-size: $small;
    width: 100%;
    text-transform: uppercase;
    letter-spacing: 1px;

    @include screen-size("small") {
      font-size: $mobile_small;
    }

    &__item {
      display: inline-block;
      text-decoration: none;
      margin-right: 10px;
      color: white;
      transition: border 0.3s $transition;
      border-bottom: 1px solid transparent;

      &:hover {
        border-bottom: 1px solid white;
      }

      &.date {
        font-style: normal;

        &:hover {
          cursor: auto;
          border-bottom: 1px solid transparent !important;
        }
      }

      @include screen-size("small") {
        margin-bottom: $small-margin;
        margin-right: 10px;
      }
    }

    &.white {
      .taxonomy__item {
        color: black;

        &:hover {
          border-bottom: 1px solid black;
        }
      }
    }
  }
</style>

<div class="taxonomy" class:white>

  <span class="taxonomy__item date">
    {format(new Date(date), 'yyyy/dd/MM')}
  </span>

  {#if taxonomy.subCategory}
    <span class="taxonomy__item">
      <a
        href="https://testing.novembre.global/magazine#{taxonomy.subCategory.toLowerCase()}">
        {taxonomy.subCategory}
      </a>
    </span>
  {/if}

  <Router>
    {#each taxonomy.tags as t}
      <span class="taxonomy__item">
        <a href="/taxonomy/{t}">{t}</a>
      </span>
    {/each}
  </Router>

</div>

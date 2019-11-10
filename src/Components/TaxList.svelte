<script>
  // # # # # # # # # # # # # #
  //
  //  TAXONOMY LIST
  //
  // # # # # # # # # # # # # #

  // *** IMPORTS
  import { Router, links } from "svelte-routing";
  import { format, isValid } from "date-fns";
  import sortBy from "lodash/sortBy";

  // *** PROPS
  export let taxonomy;
  export let isArticle = false;
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
      color: black;
      transition: border 0.3s $transition;
      border-bottom: 1px solid transparent;

      &:hover {
        border-bottom: 1px solid black;
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
        color: white;

        &:hover {
          border-bottom: 1px solid white;
        }
      }
    }
  }
</style>

<Router>

  <div class="taxonomy" class:white use:links>

    {#if isArticle && isValid(date)}
      <span class="taxonomy__item date">
        {format(new Date(date), 'yyyy/dd/MM')}
      </span>
    {/if}

    {#if taxonomy.subCategory}
      <span class="taxonomy__item">
        <a href="/{taxonomy.category}/category/{taxonomy.subCategory}">
          {taxonomy.subCategory}
        </a>
      </span>
    {/if}

    {#if isArticle}
      {#each sortBy(taxonomy.tags) as t}
        <span class="taxonomy__item">
          <a href="/taxonomy/{t}">{t}</a>
        </span>
      {/each}
    {/if}

  </div>

</Router>

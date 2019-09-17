<script>
  // # # # # # # # # # # # # #
  //
  //  List of taxonomy entries
  //
  // # # # # # # # # # # # # #

  // *** IMPORTS
  import { Router, Link, links } from "svelte-routing";

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
      margin-right: $small-margin;
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
          border-bottom: 1px solid transparent;
        }
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

  <!-- DATE -->
  {#if date}
    <span class="taxonomy__item date">{date}</span>
  {/if}

  {#if taxonomy.magazine}
    {#each taxonomy.magazine as m}
      <span class="taxonomy__item">
        <a href="/magazine#{m}">{m}</a>
      </span>
    {/each}
  {/if}

  {#if taxonomy.entertainment}
    {#each taxonomy.entertainment as e}
      <span class="taxonomy__item">
        <a href="/entertainment/#{e}">{e}</a>
      </span>
    {/each}
  {/if}

  <Router>
    {#if taxonomy.tag}
      {#each taxonomy.tag as t}
        <span class="taxonomy__item">
          <Link to="/taxonomy/{t}">{t}</Link>
        </span>
      {/each}
    {/if}
  </Router>

</div>

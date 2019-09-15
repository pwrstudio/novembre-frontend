<script>
  import { Router, Link, links } from "svelte-routing";

  export let taxonomy;
  export let white = false;
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
      font-size: $mobile_body;
    }

    &__item {
      display: inline-block;
      text-decoration: none;
      color: currentColor;
      border: 1px solid black;
      // border: 1px solid transparent;
      margin-right: $small-margin;
      background: white;
      color: black;
      padding: $small-margin;
      transition: border 0.3s $transition;

      &:hover {
        border: 1px solid white;
      }
    }

    // &.white {
    //   .taxonomy__item {
    //     border: 1px solid white;

    //     color: white;
    //     background: black;

    //     &:hover {
    //       border: 1px solid black;
    //     }
    //   }
    // }
  }
</style>

<div class="taxonomy" class:white>

  {#if taxonomy.magazine}
    {#each taxonomy.magazine as m}
      <a href="/magazine#{m}" class="taxonomy__item">{m}</a>
    {/each}
  {/if}

  {#if taxonomy.entertainment}
    {#each taxonomy.entertainment as e}
      <a href="/entertainment/#{e}" class="taxonomy__item">{e}</a>
    {/each}
  {/if}

  <Router>
    {#if taxonomy.tag}
      {#each taxonomy.tag as t}
        <span class="taxonomy__item">
          <Link to="/taxonomy/{t}" class="taxonomy__item">{t}</Link>
        </span>
      {/each}
    {/if}
  </Router>

</div>

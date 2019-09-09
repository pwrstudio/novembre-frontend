<script>
  import { Router, Link, links } from "svelte-routing";

  export let taxonomy;
</script>

<style lang="scss">
  @import "../variables.scss";

  .taxonomy {
    font-family: $serif-stack;
    font-style: italic;
    font-size: $body;
    line-height: 1.2em;
    width: 100%;
    margin-left: $small-margin;

    @include screen-size("small") {
      font-size: $mobile_body;
    }

    &__item {
      display: inline-block;
      text-decoration: none;
      border-bottom: 1px solid transparent;
      color: currentColor;
      margin-right: $small-margin;

      &:hover {
        border-bottom: 1px solid currentColor;
      }
    }
  }
</style>

<div class="taxonomy">

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

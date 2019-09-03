<script>
  import { onMount } from "svelte";
  import { Router, links } from "svelte-routing";

  export let taxonomy;

  let tags = [];

  onMount(async () => {
    tags = [].concat(
      taxonomy.magazine ? taxonomy.magazine : [],
      taxonomy.entertainment ? taxonomy.entertainment : [],
      taxonomy.tag ? taxonomy.tag : []
    );
  });
</script>

<style lang="scss">
  @import "../variables.scss";

  .taxonomy {
    font-family: $serif-stack;
    font-style: italic;
    font-size: $body;
    line-height: 1.2em;

    @include screen-size("small") {
      font-size: $mobile_body;
    }

    &__item {
      text-decoration: none;
      border-bottom: 1px solid transparent;
      color: currentColor;

      &:hover {
        border-bottom: 1px solid currentColor;
      }
    }
  }
</style>

<Router>
  <div class="taxonomy" use:links>

    {#each tags as t}
      <a href="/taxonomy/{t}" class="taxonomy__item">{t}</a>
      &nbsp;
    {/each}

  </div>
</Router>

<script>
  // # # # # # # # # # # # # #
  //
  //  Single article page
  //
  // # # # # # # # # # # # # #

  // *** IMPORTS
  import { fade } from "svelte/transition";
  import { onMount } from "svelte";

  // *** COMPONENTS
  import TaxList from "../Components/TaxList.svelte";
  import Footer from "../Components/Footer.svelte";
  import Preview from "../Components/Preview.svelte";

  // *** MODULES
  import BodyText from "../Components/Modules/BodyText.svelte";
  import IntroductionText from "../Components/Modules/IntroductionText.svelte";
  import QuoteText from "../Components/Modules/QuoteText.svelte";
  import CreditsText from "../Components/Modules/CreditsText.svelte";
  import Image from "../Components/Modules/Image.svelte";
  import Video from "../Components/Modules/Video.svelte";
  import Audio from "../Components/Modules/Audio.svelte";
  import Slideshow from "../Components/Modules/Slideshow.svelte";
  import Portal from "../Components/Modules/Portal.svelte";

  // *** STORES
  import { navigationStyle } from "../stores.js";

  // *** PROPS
  export let slug = "";
  export let endpoint = "";
  export let isEntertainment = false;
  export let location = {};

  // *** VARIABLES
  let currentSlug = slug;
  let post = loadData();

  // *** REACTIVE
  $: {
    if (slug !== currentSlug) {
      post = loadData();
      currentSlug = slug;
    }
  }

  // *** FUNCTIONS
  async function loadData() {
    const res = await fetch(endpoint + slug + ".json");
    const post = await res.json();
    console.log(post.header.fieldSelection);
    window.scrollTo(10, 0);
    return post;
  }

  navigationStyle.set(false);

  // *** ON MOUNT
  onMount(async () => {
    window.scrollTo(0, 0);
  });
</script>

<style lang="scss">
  @import "../variables.scss";

  .article {
    background: white;
    min-height: 80vh;

    &.entertainment {
      padding-top: 100px;
      background: $grey;
    }

    &__header {
      img,
      video {
        height: $full-height;
        width: 100%;
        object-fit: cover;
      }

      @include screen-size("small") {
        // height: 70vh;
      }
    }

    em {
      font-family: $serif-stack;
      font-style: italic;
    }

    &__title {
      font-size: $xlarge;
      font-weight: 300;
      line-height: 1em;
      text-transform: uppercase;
      margin-bottom: 3rem;
      margin-top: 1rem;
      line-height: 0.9em;
      max-width: 90%;
      font-family: $sans-stack;
      margin-left: $small-margin;
      overflow: hidden;

      @include screen-size("small") {
        font-size: $mobile_xlarge;
        hyphens: auto;
      }
    }

    &__tags {
      margin-left: $small-margin;
      margin-top: $small-margin;
    }
  }

  .related-header {
    font-family: $sans-stack;
    font-size: $large;
    font-weight: 300;
    line-height: 1em;
    text-transform: uppercase;
    line-height: 0.9em;
    margin-bottom: $small-margin;
    margin-top: 20px;

    @include screen-size("small") {
      font-size: $mobile_large;
      margin-bottom: 0px;
    }
  }
</style>

{#await post then post}
  <article class="article" class:entertainment={isEntertainment} in:fade>

    <!-- HEADER MEDIA -->
    <div class="article__header">
      {#if !isEntertainment}
        <Preview {post} isHeader={true} />
      {/if}
    </div>

    <!-- DATE & TAGS -->
    {#if post.header.taxonomy}
      <div class="article__tags">
        <TaxList
          taxonomy={post.header.taxonomy}
          white={true}
          date={post.header.date} />
      </div>
    {/if}

    <!-- TITLE -->
    <h1 class="article__title">
      {@html post.header.htmlTitle.fullTitle}
    </h1>

    <!-- MAIN CONTENT -->
    {#each post.header.fieldSelection as { select, body, introduction, quote, credits, image, video, audio, slideshow, portal }}
      {#if select == 'body'}
        <BodyText {...body} {isEntertainment} />
      {:else if select == 'introduction'}
        <IntroductionText {...introduction} />
      {:else if select == 'quote'}
        <QuoteText {...quote} />
      {:else if select == 'credits'}
        <CreditsText {...credits} />
      {:else if select == 'image'}
        <Image {...image} />
      {:else if select == 'video'}
        <Video {...video} />
      {:else if select == 'audio'}
        <Audio {...audio} />
      {:else if select == 'slideshow'}
        <Slideshow {...slideshow} />
      {:else if select == 'portal'}
        <Portal {...portal} />
      {/if}
    {/each}

    <!-- RELATED -->
    {#if post.header.related.length > 0}
      <div class="related-header">RELATED ARTICLES</div>
      <Slideshow slides={post.header.related} isRelated={true} />
    {/if}

  </article>

  <Footer active={true} />
{/await}

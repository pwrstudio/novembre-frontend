<script>
  // # # # # # # # # # # # # #
  //
  //  Single article page
  //
  // # # # # # # # # # # # # #

  // *** IMPORTS
  import { onMount, onDestroy } from "svelte";
  import { fade, slide } from "svelte/transition";
  import { quintOut } from "svelte/easing";

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
  import Embed from "../Components/Modules/Embed.svelte";
  import Audio from "../Components/Modules/Audio.svelte";
  import Slideshow from "../Components/Modules/Slideshow.svelte";
  import Portal from "../Components/Modules/Portal.svelte";

  // *** STORES
  import { navigationStyle, menuActiveGlobal } from "../stores.js";

  // *** PROPS
  export let slug = "";
  export let endpoint = "";
  export let isEntertainment = false;
  export let location = {};

  // *** VARIABLES
  let currentSlug = slug;

  // *** REACTIVE
  $: {
    if (slug !== currentSlug) {
      post = loadData();
      currentSlug = slug;
    }
  }

  // *** FUNCTIONS
  async function loadData() {
    try {
      const res = await fetch(endpoint + slug + ".json");
      const post = await res.json();
      // console.log(post.header.fieldSelection);
      window.scrollTo(0, 0);
      return post;
    } catch (err) {
      Sentry.captureException(err);
    }
  }

  const scrollDown = () => {
    try {
      // console.log(post);
      window.scrollTo({
        top: 500,
        behavior: "smooth"
      });
    } catch (err) {
      Sentry.captureException(err);
    }
  };

  let post = loadData();

  navigationStyle.set(false);

  // *** ON MOUNT
  onMount(async () => {
    window.scrollTo(0, 0);
    if (isEntertainment) {
      try {
        document.getElementsByTagName("html")[0].classList.add("entertainment");
      } catch (err) {
        Sentry.captureException(err);
      }
    }
  });

  // *** ON MOUNT
  onDestroy(async () => {
    window.scrollTo(0, 0);
    try {
      document
        .getElementsByTagName("html")[0]
        .classList.remove("entertainment");
    } catch (err) {
      Sentry.captureException(err);
    }
  });
</script>

<style lang="scss">
  @import "../variables.scss";

  .article {
    background: white;
    // min-height: 160vh;

    // &.dark-background {
    //   background: black;
    // }

    // &.light-background {
    //   background: white;
    // }

    &.top-padded {
      padding-top: 100px;
      // background: $grey;
    }

    &.entertainment {
      // padding-top: 100px;
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
      opacity: 1;

      @include screen-size("small") {
        font-size: $mobile_xlarge;
        hyphens: auto;
        margin-bottom: 20px;
      }

      transition: opacity $transition;

      &.hide-text {
        opacity: 0;
      }
    }

    &__tags {
      margin-left: $small-margin;
      margin-top: $small-margin;

      transition: opacity $transition;

      &.hide-text {
        opacity: 0;
      }
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
    margin-left: $small-margin;

    @include screen-size("small") {
      font-size: $mobile_large;
      // margin-bottom: 0px;
    }
  }
</style>

{#await post then post}
  <article
    class="article"
    class:top-padded={post.header.previewType == 'text'}
    class:entertainment={isEntertainment}
    class:dark-background={$menuActiveGlobal && $navigationStyle}
    class:light-background={$menuActiveGlobal && !$navigationStyle}>

    <!-- HEADER MEDIA -->
    {#if post.header.previewType != 'text'}
      <div class="article__header">
        <Preview {post} isHeader={true} />
      </div>
    {/if}

    <!-- DATE & TAGS -->
    {#if post.header.taxonomy}
      <div class="article__tags" class:hide-text={$menuActiveGlobal}>
        <TaxList
          taxonomy={post.header.taxonomy}
          white={true}
          date={post.header.date} />
      </div>
    {/if}

    <!-- TITLE -->
    <h1 class="article__title" class:hide-text={$menuActiveGlobal}>
      {@html post.header.htmlTitle.fullTitle}
    </h1>

    <!-- MAIN CONTENT -->
    {#if post.header.fieldSelection}
      {#each post.header.fieldSelection as { select, body, introduction, quote, credits, image, video, embed, audio, slideshow, portal }}
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
        {:else if select == 'embed'}
          <Embed {...embed} />
        {:else if select == 'audio'}
          <Audio {...audio} autoplay={false} controls={true} />
        {:else if select == 'slideshow'}
          <Slideshow {...slideshow} isRelated={false} isPreview={false} />
        {:else if select == 'portal'}
          <Portal {...portal} />
        {/if}
      {/each}
    {/if}

    <!-- RELATED -->
    {#if post.header && post.header.related && post.header.related.length > 0}
      <div class="related-header">RELATED ARTICLES</div>
      <Slideshow
        slides={post.header.related}
        isRelated={true}
        isPreview={false} />
    {/if}

  </article>

  <Footer active={true} />
{/await}

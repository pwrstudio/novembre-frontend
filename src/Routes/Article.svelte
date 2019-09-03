<script>
  import { fade } from "svelte/transition";

  // COMPONENTS
  import TaxList from "../Components/TaxList.svelte";
  import Footer from "../Components/Footer.svelte";
  import Related from "../Components/Related.svelte";

  // MODULES
  import BodyText from "../Components/Modules/BodyText.svelte";
  import IntroductionText from "../Components/Modules/IntroductionText.svelte";
  import QuoteText from "../Components/Modules/QuoteText.svelte";
  import Image from "../Components/Modules/Image.svelte";
  import Video from "../Components/Modules/Video.svelte";
  import Audio from "../Components/Modules/Audio.svelte";
  import Slideshow from "../Components/Modules/Slideshow.svelte";
  import Portal from "../Components/Modules/Portal.svelte";

  export let slug;

  let post = loadData();

  async function loadData() {
    const res = await fetch("http://3.221.158.133/magazine/" + slug + ".json");
    const post = await res.json();

    console.log(post);
    window.scrollTo(0, 0);

    return post;
  }
</script>

<style lang="scss">
  @import "../variables.scss";

  .article {
    margin-top: 80px;
    background: white;
    min-height: 100vw;

    &__header {
      img,
      video {
        height: $full-height;
        width: 100%;
        object-fit: cover;
      }
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

      em {
        font-family: $serif-stack;
        font-style: italic;
      }

      @include screen-size("small") {
        font-size: $mobile_xlarge;
      }
    }

    &__tags {
      margin-left: $small-margin;
      margin-top: $small-margin;
      font-family: $serif-stack;
      font-style: italic;
      font-size: $body;
      line-height: 1.2em;
      color: black;

      @include screen-size("small") {
        font-size: $mobile_body;
      }
    }

    &--entertainment {
      background: $grey;
    }
  }
</style>

{#await post then post}
  <article class="article" in:fade>

    <!-- {# HEADER MEDIA #} -->
    <div class="article__header">
      {#if post.header.previewType === 'image' || post.header.previewType == 'slideshow'}
        <Image url={post.header.previewImage.url} caption={post.header.title} />
      {/if}

      {#if post.header.previewType === 'video'}
        <Video />
      {/if}

    </div>

    <!-- {# TAGS #} -->
    {#if post.header.taxonomy}
      <div class="article__tags">
        <TaxList taxonomy={post.header.taxonomy} />
      </div>
    {/if}

    <h1 class="article__title">
      {@html post.header.htmlTitle.fullTitle}
    </h1>

    {#each post.header.fieldSelection as { select, body, introduction, quote, image, video, audio, slideshow, portal }}
      {#if select == 'body'}
        <BodyText {...body} />
      {:else if select == 'introduction'}
        <IntroductionText {...introduction} />
      {:else if select == 'quote'}
        <QuoteText {...quote} />
      {:else if select == 'image'}
        <Image {...image} inline={true} />
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

    <!-- <Related {post} /> -->
    <Related related={post.header.related} />

  </article>

  <Footer />
{/await}

<script>
  export let file = "";
  export let url = "";
  export let multiFiles = [];
  export let caption = "Novembre";
  export let size = true;
  export let isListing = false;

  // console.log("inline:", inline);
  // console.log("size:", size);

  // TEMP SOLUTION
  url =
    url.replace("http://3.221.158.133", "https://novmag.imgix.net") + "?w=1400";

  multiFiles.forEach(f => {
    f.url =
      f.url.replace("http://3.221.158.133", "https://novmag.imgix.net") +
      "?w=600&auto=compress&auto=format";
  });
</script>

<style lang="scss">
  @import "../../variables.scss";

  .image {
    width: 100%;
    height: auto;
    pointer-events: none;

    $block: &;

    // margin-top: 20px;
    // margin-bottom: 20px;

    &--full {
      height: $full-height;
      width: 100vw;

      img,
      video {
        height: 100%;
        width: 100%;
        object-fit: cover;
      }
    }

    &--inline {
      height: auto;
      width: 800px;
      margin-left: auto;
      margin-right: auto;
      max-width: 95vw;
      margin-bottom: 5rem;

      img,
      video {
        width: 100%;
      }
    }

    &--free {
      cursor: pointer;

      display: inline-block;

      #{ $block }__image {
        max-height: 600px;
        float: left;
        margin-left: $small-margin;
        margin-top: $small-margin;
        height: auto;
      }

      &--free-1 {
        #{ $block }__image {
          max-width: 100vw;
          // background: red;
        }
      }

      #{ $block }__title {
        width: 100%;
        font-size: $large;
        font-weight: 300;
        line-height: 0.85em;
        text-transform: uppercase;
        margin-bottom: $small-margin;
        margin-left: $small-margin;
        margin-top: $small-margin;
        text-decoration: none;
        position: static;
        display: inline-block;

        @include screen-size("small") {
          font-size: $mobile_large;
        }
      }
    }

    &--free-1 {
      #{ $block }__image {
        max-width: 45vw;
        // background: red;
      }
    }

    &--free-2 {
      #{ $block }__image {
        max-width: 40vw;
        // background: red;
      }
    }

    &--free-3 {
      #{ $block }__image {
        max-width: 30vw;
        // background: red;
      }
    }

    &--free-4 {
      #{ $block }__image {
        max-width: 23vw;
        // background: red;
      }
    }
  }
</style>

<div
  class="image"
  class:image--full={size == true || size == 'fullWidth'}
  class:image--inline={size == 'proportional'}
  class:image--free={!size && multiFiles && multiFiles.length > 0}
  class:image--free-1={!size && multiFiles && multiFiles.length === 1}
  class:image--free-2={!size && multiFiles && multiFiles.length === 2}
  class:image--free-3={!size && multiFiles && multiFiles.length === 3}
  class:image--free-4={!size && multiFiles && multiFiles.length === 4}>

  {#if size || multiFiles.length === 0}
    <img class="image__image" src={url} alt={caption} />
    {#if !isListing}
      <figcaption>{caption}</figcaption>
    {/if}
  {:else}
    {#each multiFiles as slide}
      <img
        class="image__image image__image--multi"
        alt="Novembre"
        src={slide.url} />
    {/each}
  {/if}

</div>

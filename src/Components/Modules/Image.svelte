<script>
  export let file = "";
  export let url = "";
  export let multiFiles = false;
  export let caption = "Novembre";
  export let size = true;
  export let isListing = false;

  let srcset;
  let sizes;
  let src;
  let imgixParams = "&auto=format";

  // console.log("inline:", inline);
  // console.log("file:", file);
  // console.log("size:", size);

  // TEMP SOLUTION

  if (multiFiles) {
    // Size depending on layout
    if (multiFiles.length === 1) {
      // FULL WIDTH
      sizes = "80vw";
    } else if (multiFiles.length === 2) {
      // PROPORTIONAL or inline
      sizes = "45vw";
    } else if (multiFiles.length === 3) {
      sizes = "30vw";
    } else if (multiFiles.length === 4) {
      sizes = "25vw";
    }

    multiFiles.forEach(f => {
      f.url = f.url.replace("http://3.221.158.133", "https://novmag.imgix.net");
      f.src = f.url + "?w=800" + imgixParams;
      f.srcset = ["", 200, 400, 600, 800, 1000, 1200, 1400].reduce(
        (result, size) => {
          return (
            result + f.url + "?w=" + size + imgixParams + " " + size + "w, "
          );
        }
      );
      f.sizes = sizes;
    });
  } else {
    // Set base image size
    src =
      url.replace("http://3.221.158.133", "https://novmag.imgix.net") +
      "?w=1200" +
      imgixParams;

    // Generate srcset
    srcset = ["", 600, 800, 1000, 1200, 1400, 1600, 2000].reduce(
      (result, size) => {
        return result + url + "?w=" + size + imgixParams + " " + size + "w, ";
      }
    );

    if (size === true || size === "fullWidth") {
      // FULL WIDTH
      sizes = "100vw";
    } else {
      // PROPORTIONAL or inline
      sizes = "80vw";
    }

    // console.dir(srcset);
  }
</script>

<style lang="scss">
  @import "../../variables.scss";

  .image {
    width: 100%;
    height: auto;
    // pointer-events: none;

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
  class:image--full={size == true || size == 'fullWidth' || multiFiles.length === 0}
  class:image--inline={size == 'proportional'}
  class:image--free={!size && multiFiles && multiFiles.length > 0}
  class:image--free-1={!size && multiFiles && multiFiles.length === 1}
  class:image--free-2={!size && multiFiles && multiFiles.length === 2}
  class:image--free-3={!size && multiFiles && multiFiles.length === 3}
  class:image--free-4={!size && multiFiles && multiFiles.length === 4}>

  {#if size || multiFiles.length === 0}
    <img class="image__image" {srcset} {sizes} {src} alt={caption} />
    {#if !isListing}
      <figcaption>{caption}</figcaption>
    {/if}
  {:else}
    {#each multiFiles as slide}
      <img
        class="image__image image__image--multi"
        alt="Novembre"
        srcset={slide.srcset}
        sizes={slide.sizes}
        src={slide.src} />
    {/each}
  {/if}

</div>

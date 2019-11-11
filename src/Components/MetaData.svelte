<script>
  // # # # # # # # # # # # # #
  //
  //  METADATA
  //
  // # # # # # # # # # # # # #

  // _lodash
  import get from "lodash/get";
  import has from "lodash/has";
  import isArray from "lodash/isArray";
  import isEmpty from "lodash/isEmpty";
  import truncate from "lodash/truncate";

  // *** STORES

  import { toPlainText, urlFor } from "../sanity.js";

  // *** PROPS
  export let post = {};

  //   activeCategory.set(get(post, "taxonomy.category", ""));

  const defaultDescription = "XXXXX";

  const title =
    (has(post, "title") && !isEmpty(post.title) ? post.title + " / " : "") +
    "NOVEMBRE";

  const description =
    has(post, "content") && isArray(post.content) && !isEmpty(post.content)
      ? truncate(toPlainText(post.content), {
          length: 160,
          separator: /.? +/
        })
      : defaultDescription;

  //   const image = has(post, "preview.asset")
  //     ? urlFor(post.mainImage)
  //         .quality(80)
  //         .height(1200)
  //         .width(1200)
  //         .auto("format")
  //         .url()
  //     : siteInfo.image;
</script>

<svelte:head>
  <title>{title}</title>
  <meta property="og:title" content={title} />
  <meta property="twitter:title" content={title} />
  <meta property="description" content={description} />
  <meta property="og:description" content={description} />
  <meta property="twitter:description" content={description} />
  <!-- <meta property="image" content={image} />
  <meta property="og:image" content={image} />
  <meta property="twitter:image" content={image} /> -->
</svelte:head>

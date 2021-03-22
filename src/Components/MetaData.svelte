<script>
  // # # # # # # # # # # # # #
  //
  //  METADATA
  //
  // # # # # # # # # # # # # #

  // _lodash
  import has from "lodash/has";
  import isArray from "lodash/isArray";
  import isEmpty from "lodash/isEmpty";
  import truncate from "lodash/truncate";

  // *** STORES

  import { toPlainText, urlFor } from "../sanity.js";

  // *** PROPS
  export let post = {};

  const stripHtml = html => {
    let tmp = document.createElement("DIV");
    tmp.innerHTML = html;
    return tmp.textContent || tmp.innerText || "";
  };

  const defaultDescription =
    "Novembre Global is a platform for expression, guiding individuals and professionals in search of inspiration, new styles and emergent cultural trends.";

  const title =
    (has(post, "title") && !isEmpty(post.title)
      ? stripHtml(post.title) + " / "
      : "") + "NOVEMBRE GLOBAL";

  const description =
    has(post, "content") && isArray(post.content) && !isEmpty(post.content)
      ? truncate(toPlainText(post.content), {
          length: 160,
          separator: /.? +/
        })
      : defaultDescription;

  const image = has(post, "mainImage")
    ? urlFor(post.mainImage)
        .quality(80)
        .height(1200)
        .width(1200)
        .url()
    : "https://novembre.global/logo.png";
</script>

<svelte:head>
  <title>{title}</title>
  <meta property="og:title" content={title} />
  <meta property="twitter:title" content={title} />
  <meta name="twitter:card" content="summary_large_image" />
  <meta property="description" content={description} />
  <meta property="og:description" content={description} />
  <meta property="twitter:description" content={description} />
  <meta property="image" content={image} />
  <meta property="og:type" content="website" />
  <meta property="og:image" content={image} />
  <meta property="twitter:image" content={image} />
</svelte:head>

<script>
    // # # # # # # # # # # # # #
    //
    //  SATELLITE SITE TEMPLATE
    //
    // # # # # # # # # # # # # #
  
    // *** IMPORTS
    import { onMount, onDestroy } from "svelte"
    import { fade } from "svelte/transition"
    import get from "lodash/get"
    import isEmpty from "lodash/isEmpty"
    import { urlFor, loadSatelliteSite, renderBlockText } from "../sanity.js"
  
    // *** COMPONENTS
    // import TaxList from "../Components/TaxList.svelte"
    // import Footer from "../Components/Footer.svelte"
    // import Preview from "../Components/Preview.svelte"
    // import MetaData from "../Components/MetaData.svelte"
  
    // *** STORES
    import { satelliteSiteActive } from "../stores.js"
  
    // *** MODULES
    // import Image from "../Components/Modules/Image.svelte"
    // import ImageGroup from "../Components/Modules/ImageGroup.svelte"
    // import VideoEmbed from "../Components/Modules/VideoEmbed.svelte"
    // import Audio from "../Components/Modules/Audio.svelte"
    // import ArbitraryEmbed from "../Components/Modules/ArbitraryEmbed.svelte";
    // import Slideshow from "../Components/Modules/Slideshow.svelte"
    // import VideoLoop from "../Components/Modules/Video.svelte"
  
    // *** PROPS
    export let slug = ""
    export let location = {}
  
    // ** CONSTANTS
    const query = "*[_type == 'satelliteSite' && slug.current == $slug]{...}[0]"

    satelliteSiteActive.set(true)

    console.log('slug', slug)
  
    let siteData = loadSatelliteSite(query, { slug: slug })
  
    siteData.then(s => {
      console.log("siteData", s)
    })
  
    // *** ON MOUNT
    onDestroy(async () => {
        satelliteSiteActive.set(false)
    })
  </script>
  
  <style lang="scss">
    @import "../variables.scss";
  
    .satellite {
      background: $hotpink;
      width: 100vw;
      overflow: hidden;
      height: 100vh;
      color: white;
      display: flex;
      justify-content: center;
      align-items: center;
      font-family: $sans-stack;
      text-transform: uppercase;
      text-align: center;
      font-size: $large;
    }

  </style>
  
  {#await siteData then siteData}
    <!-- <MetaData {post} /> -->
    <div class="satellite">
        <div>
            {#if siteData.mainImage}
                <img
                    alt={siteData.title}
                    src={urlFor(siteData.mainImage)
                        .height(600)
                        .quality(90)
                        .auto('format')
                        .url()} />
            {/if}
            <div>{siteData.title}</div>
        </div>
    </div>
  {/await}
  
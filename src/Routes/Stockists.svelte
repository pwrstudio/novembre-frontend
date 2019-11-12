<script>
  // # # # # # # # # # # # # #
  //
  //  STOCKISTS
  //
  // # # # # # # # # # # # # #

  // *** IMPORTS
  import { onMount } from "svelte";
  import mapboxgl from "mapbox-gl";
  import { fade } from "svelte/transition";
  import { tick } from "svelte/internal";
  import { renderBlockText } from "../sanity.js";

  import MetaData from "../Components/MetaData.svelte";

  import sample from "lodash/sample";

  // STORES
  import { navigationColor, pages, scrollListActive } from "../stores.js";

  scrollListActive.set(false);

  // COMPONENTS
  import Footer from "../Components/Footer.svelte";

  // PROPS
  export let endpoint = "";
  export let slug = "";
  export let location = {};

  const markerList = [
    {
      lat: "43.771577",
      lon: "11.249287"
    },
    {
      lat: "47.377618",
      lon: "8.516100"
    },
    {
      lat: "34.084152",
      lon: "-118.361299"
    },
    {
      lat: "59.331820",
      lon: "18.068290"
    },
    {
      lat: "22.599720",
      lon: "120.478410"
    }
  ];

  let counter = 0;

  let map = {};

  let mapEl = {};

  const initMap = () => {
    return new Promise((resolve, reject) => {
      mapboxgl.accessToken =
        "pk.eyJ1IjoicHdyc3R1ZGlvIiwiYSI6ImNpbTJmMWYwazAwbXV2a201dHV4M3Q0MTEifQ.haMHeGT4HNA8zI2S0BDgGg";
      map = new mapboxgl.Map({
        container: mapEl,
        style: "mapbox://styles/pwrstudio/ck2f16esc0jgk1cljcu5yym1r",
        center: [34.1, 24.1],
        zoom: 1.3
      });
      resolve();
    });
  };
  const setMarkers = () => {
    markerList.map(x => {
      let el = document.createElement("div");
      el.className = "marker";
      new mapboxgl.Marker(el).setLngLat([x.lon, x.lat]).addTo(map);
    });
  };

  // VARIABLES
  let post = loadData();

  // LOGIC
  navigationColor.set("black");

  async function loadData() {
    try {
      const res = await fetch(endpoint);
      const post = await res.json();
      return post;
    } catch (err) {
      Sentry.captureException(err);
    }
  }

  onMount(async () => {
    window.scrollTo(0, 0);
    await tick();
    initMap().then(() => {
      // setMarkers()
    });
  });

  const flyTest = () => {
    map.flyTo({
      center: sample(markerList),
      curve: 1,
      zoom: 14,
      speed: 1.4
    });
    counter += 1;
  };
</script>

<style lang="scss">
  @import "../variables.scss";

  .stockists {
    column-count: 3;
    column-gap: $small-margin;
    width: 100%;
    margin-right: 60px;
    margin-left: 60px;
    margin-top: 20px;

    margin-bottom: $large-vertical-margin;
    line-height: 1.2em;
    overflow: hidden;
    font-family: $sans-stack;

    @include screen-size("small") {
      column-count: 2;
      margin-right: 20px;
      margin-left: 20px;
    }

    &__item {
      margin-bottom: 2 * $small-vertical-margin;
    }
  }

  .stockists-placeholder {
    width: 100%;
    margin-right: $small-margin;
    margin-left: $small-margin;
    margin-top: 20px;

    margin-bottom: $large-vertical-margin;
    line-height: 1.2em;
    overflow: hidden;
    font-size: $intro;
    font-family: $sans-stack;

    @include screen-size("small") {
      margin-top: 0px;
      font-size: $mobile_intro;
    }

    &__item {
      margin-bottom: 2 * $small-vertical-margin;
    }
  }

  .stockist-page {
    background: xellow;
    height: auto;
    margin-bottom: $large-vertical-margin;
    line-height: 1.2em;
    overflow: hidden;

    em {
      font-family: $serif-stack;
      font-style: italic;
    }
  }

  .map {
    height: 80vh;
    width: 100vw;
    outline: none;
    border: 0;

    @include screen-size("small") {
      height: 60vh;
    }
  }
</style>

<MetaData post={{ title: 'Stockists' }} />

<article class="stockist-page">
  <div bind:this={mapEl} class="map" />

  <!-- {#await post then post} -->

  <!-- {#await $pages then pages}
    <div class="stockists">
      {@html renderBlockText(pages.stockistsPlaceholder.content)}
    </div>
  {/await} -->

  {#await $pages then pages}
    <div class="stockists-placeholder">
      {@html renderBlockText(pages.stockistsPlaceholder.content)}
    </div>
  {/await}

</article>

<Footer active={true} />

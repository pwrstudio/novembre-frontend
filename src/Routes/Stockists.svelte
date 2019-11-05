<script>
  // # # # # # # # # # # # # #
  //
  //  Page
  //
  // # # # # # # # # # # # # #

  // *** IMPORTS
  import { onMount } from "svelte";
  import mapboxgl from 'mapbox-gl'
  import { fade } from "svelte/transition";
  import { tick } from "svelte/internal";

  import sample from 'lodash/sample'


  // STORES
  import { navigationColor } from "../stores.js";

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
      lon: '8.516100'
    },
        {
      lat: "34.084152",
      lon: '-118.361299'
    },
            {
      lat: "59.331820",
      lon: '18.068290'
    },
            {
      lat: "22.599720",
      lon: '120.478410'
    }
  ]

  let counter = 0

  let map = {};

  let mapEl = {};

  const initMap = () => {
    return new Promise((resolve, reject) => {
      mapboxgl.accessToken =
        'pk.eyJ1IjoicHdyc3R1ZGlvIiwiYSI6ImNpbTJmMWYwazAwbXV2a201dHV4M3Q0MTEifQ.haMHeGT4HNA8zI2S0BDgGg'
      map = new mapboxgl.Map({
        container: mapEl,
        style: 'mapbox://styles/pwrstudio/ck2f16esc0jgk1cljcu5yym1r',
        center: [34.1, 24.1],
        zoom: 1.3
      })
      resolve()
    })
  }
    const setMarkers = () => {
        markerList.map(x => {
          let el = document.createElement('div')
          el.className = 'marker'
            new mapboxgl.Marker(el)
              .setLngLat([x.lon, x.lat])
              .addTo(map)
        })
    }

  // VARIABLES
  let post = loadData();

  // LOGIC
  navigationColor.set('black');

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
    await tick();
    initMap().then(() => {
      // setMarkers()
    })
  });

  const flyTest = () => {
      map.flyTo({
      center: sample(markerList),
      curve: 1,
      zoom: 14,
      speed: 1.4
      });
      counter += 1
  }

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

    margin-bottom:  $large-vertical-margin;
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

    @include screen-size('small') {
      height: 60vh;
    }
  }

</style>

<svelte:head>
  <title>STOCKISTS / NOVEMBRE</title>
</svelte:head>


  <article
    class="stockist-page">
  <div
    bind:this={mapEl}
    class="map"/>

{#await post then post}

      <div class="stockists" on:click={flyTest}>
        <div class="content_tab grid_12">

          <div class="stockists__item">
            <strong>Beautiful Pages</strong>
            <br />
            <span class="adr">
              <span class="street-address">
                Graphic Design Concept Store 114 Oxford Street Darlinghurst
                <br />
              </span>
              2010 NSW -
              <span class="locality">Sydney</span>
            </span>
          </div>

          <div class="stockists__item">
            <strong>Bondi Centre Newsagency</strong>
            <br />
            <span class="adr">
              <span class="street-address">
                161 Bondi Road
                <br />
              </span>
              NSW 2026 -
              <span class="locality">Bondi</span>
            </span>
          </div>

          <div class="stockists__item">
            <strong>Globe Newsagency</strong>
            <br />
            <span class="adr">
              <span class="street-address">
                Shop 1013 Westfield
                <br />
              </span>
              NSW 2022 -
              <span class="locality">Bondi Junction</span>
            </span>
          </div>
          <div class="stockists__item">
            <strong>Kings Cross NewsAgency</strong>
            <br />
            <span class="adr">
              <span class="street-address">
                99 – 101 Darlinghurst Road
                <br />
              </span>
              NSW 2011 -
              <span class="locality">Kings Cross</span>
            </span>
          </div>
          <div class="stockists__item">
            <strong>Mag Nation</strong>
            <br />
            <span class="adr">
              <span class="street-address">
                155 King Street
                <br />
              </span>
              NSW 2042 -
              <span class="locality">Newtoon</span>
            </span>
          </div>
          <div class="stockists__item">
            <strong>News Plus</strong>
            <br />
            <span class="adr">
              <span class="street-address">
                267 King Street
                <br />
              </span>
              NSW 2042 -
              <span class="locality">Newtoon</span>
            </span>
          </div>
          <div class="stockists__item">
            <strong>Oz World News Centre</strong>
            <br />
            <span class="adr">
              <span class="street-address">
                Shop 9-10/ 684-686 George St
                <br />
              </span>
              NSW 2000 -
              <span class="locality">Sydney</span>
            </span>
          </div>
          <div class="stockists__item">
            <strong>Paddington NewsAgency</strong>
            <br />
            <span class="adr">
              <span class="street-address">
                330 Oxford Street
                <br />
              </span>
              NSW 2021 -
              <span class="locality">Newtoon</span>
            </span>
          </div>
          <div class="stockists__item">
            <strong>Supanews Chatswood Chase A18</strong>
            <br />
            <span class="adr">
              <span class="street-address">
                Shop B-011 LevelLG Chatswood Chase - S/C345 Victoria Ave
                <br />
              </span>
              NSW 2057 -
              <span class="locality">Bondi Junction</span>
            </span>
          </div>
          <div class="stockists__item">
            <strong>World Food Books</strong>
            <br />
            <span class="adr">
              <span class="street-address">
                Studio 19, Level 3/The Nicholas Building, 37 Swanston Street
                <br />
              </span>
              VIC 3000 -
              <span class="locality">Melbourne</span>
            </span>
          </div>
          <div class="stockists__item">
            <strong>World Newsagency Danks Plaza</strong>
            <br />
            <span class="adr">
              <span class="street-address">
                Shop 14/1 Crystal St
                <br />
              </span>
              NSW 2007 -
              <span class="locality">Sydney</span>
            </span>
          </div>
          <div class="stockists__item">
            <strong>World Square Newsagency Bookshop</strong>
            <br />
            <span class="adr">
              <span class="street-address">
                Shop 7 & 11 Pitt St
                <br />
              </span>
              NSW 2000 -
              <span class="locality">Sydney</span>
            </span>
          </div>

          <div class="content_tab grid_12">
            <div class="stockists__item">
              <strong>Endelweber Jörg</strong>
              <br />
              <span class="adr">
                <span class="street-address">
                  7 Tegetthoffstraße
                  <br />
                </span>
                1010 -
                <span class="locality">Vienna</span>
              </span>
            </div>
            <div class="stockists__item">
              <strong>Morawa Buch u.Medien GmbH</strong>
              <br />
              <span class="adr">
                <span class="street-address">
                  1 Am Eisernen Tor
                  <br />
                </span>
                8010 -
                <span class="locality">Graz</span>
              </span>
            </div>
            <div class="stockists__item">
              <strong>Morawa Buch u.Medien GmbH</strong>
              <br />
              <span class="adr">
                <span class="street-address">
                  5 Anichstraße
                  <br />
                </span>
                6020 -
                <span class="locality">Innsbrück</span>
              </span>
            </div>
            <div class="stockists__item">
              <strong>Morawa Buch u.Medien GmbH</strong>
              <br />
              <span class="adr">
                <span class="street-address">
                  11 Wollzeile
                  <br />
                </span>
                1010 -
                <span class="locality">Vienna</span>
              </span>
            </div>
            <div class="stockists__item">
              <strong>Thalia Buch &amp; Medien GmbH</strong>
              <br />
              <span class="adr">
                <span class="street-address">
                  2a Landstraßer Hauptstr.
                  <br />
                </span>
                1030 -
                <span class="locality">Vienna</span>
              </span>
            </div>
            <div class="stockists__item">
              <strong>Valora Retail A.GmbH&amp;CoKG</strong>
              <br />
              <span class="adr">
                <span class="street-address">
                  Railroad Station
                  <br />
                </span>
                5020 -
                <span class="locality">Salzbürg</span>
              </span>
            </div>
            <div class="stockists__item">
              <strong>Valora Retail A.GmbH&amp;CoKG</strong>
              <br />
              <span class="adr">
                <span class="street-address">
                  Railroad Station
                  <br />
                </span>
                1150 -
                <span class="locality">Vienna</span>
              </span>
            </div>
          </div>

          <div class="content_tab grid_12">
            <div class="stockists__item">
              <strong>CHAM KEE</strong>
              <br />
              <span class="adr">
                <span class="street-address">
                  Central Pier 3, Central
                  <br />
                </span>
                -
                <span class="locality">HONG KONG</span>
              </span>
            </div>
            <div class="stockists__item">
              <strong>CNPIEC Bookstore -</strong>
              <br />
              <span class="adr">
                <span class="street-address">
                  Grand Gateway
                  <br />
                </span>
                5/F, 1 Hong Qiao Road -
                <span class="locality">SHANGHAI</span>
              </span>
            </div>
            <div class="stockists__item">
              <strong>Chung Wah Book Co Ltd. – Airport</strong>
              <br />
              <span class="adr">
                <span class="street-address">
                  Terminal 1, HK International Airport
                  <br />
                </span>
                -
                <span class="locality">HONG KONG</span>
              </span>
            </div>
            <div class="stockists__item">
              <strong>Cnpiec</strong>
              <br />
              <span class="adr">
                <span class="street-address">
                  633 Biyun Road
                  <br />
                </span>
                Pudong -
                <span class="locality">Shangai</span>
              </span>
            </div>
            <div class="stockists__item">
              <strong>CNPIEC Bookstore - Citic Square</strong>
              <br />
              <span class="adr">
                <span class="street-address">
                  Unit 522, 1168 Nan Jing Road West
                  <br />
                </span>
                -
                <span class="locality">SHANGHAI</span>
              </span>
            </div>
            <div class="stockists__item">
              <strong>CNPIEC Bookstore - Hilton</strong>
              <br />
              <span class="adr">
                <span class="street-address">
                  250 Hua Shan Road
                  <br />
                </span>
                -
                <span class="locality">SHANGHAI</span>
              </span>
            </div>
            <div class="stockists__item">
              <strong>CNPIEC Bookstore - Hongmei</strong>
              <br />
              <span class="adr">
                <span class="street-address">
                  1/F, Hongqiao International Pearl City,
                  <br />
                </span>
                3721 Hon Mei Road -
                <span class="locality">SHANGHAI</span>
              </span>
            </div>
            <div class="stockists__item">
              <strong>CNPIEC Bookstore - Jinqiao</strong>
              <br />
              <span class="adr">
                <span class="street-address">
                  C4, Green Sport & Leisure Center,
                  <br />
                </span>
                No.600, Lan Tian Road -
                <span class="locality">SHANGHAI</span>
              </span>
            </div>
            <div class="stockists__item">
              <strong>The Eslite Culture – Causeway Bay</strong>
              <br />
              <span class="adr">
                <span class="street-address">
                  8/F Hysan Place,500 Leighton Road,Hong Kong
                  <br />
                </span>
                -
                <span class="locality">HONG KONG</span>
              </span>
            </div>
            <div class="stockists__item">
              <strong>The Eslite Culture – Taikoo Shing</strong>
              <br />
              <span class="adr">
                <span class="street-address">
                  Unit 074&144, Cityplaza, 18 Taikoo Shing Road, Hong Kong
                  <br />
                </span>
                -
                <span class="locality">HONG KONG</span>
              </span>
            </div>
            <div class="stockists__item">
              <strong>The Eslite Culture – Tsim Sha Tsui</strong>
              <br />
              <span class="adr">
                <span class="street-address">
                  Star Annex 2-3/F, Star House, 3 Salisbury Road, Tsim Sha Tsui
                  <br />
                </span>
                -
                <span class="locality">HONG KONG</span>
              </span>
            </div>
            <div class="stockists__item">
              <strong>Variety</strong>
              <br />
              <span class="adr">
                <span class="street-address">
                  Shop G9 G/F, Harbour Centre, 25 Harbour Road,
                  <br />
                </span>
                Wanchai -
                <span class="locality">HONG KONG</span>
              </span>
            </div>
          </div>

          <div class="content_tab grid_12">
            <div class="stockists__item">
              <strong>0fr</strong>
              <br />
              <span class="adr">
                <span class="street-address">
                  20, rue Dupetit-Thouars
                  <br />
                </span>
                75003 -
                <span class="locality">Paris</span>
              </span>
            </div>
            <div class="stockists__item">
              <strong>Agora Presse</strong>
              <br />
              <span class="adr">
                <span class="street-address">
                  18 Rue des Archives
                  <br />
                </span>
                75004 -
                <span class="locality">Paris</span>
              </span>
            </div>
            <div class="stockists__item">
              <strong>Artazart</strong>
              <br />
              <span class="adr">
                <span class="street-address">
                  83 Quai de Valmy
                  <br />
                </span>
                75010 -
                <span class="locality">paris</span>
              </span>
            </div>
            <div class="stockists__item">
              <strong>Artcurial</strong>
              <br />
              <span class="adr">
                <span class="street-address">
                  7 Rond-Point des Champs Elysées
                  <br />
                </span>
                75008 -
                <span class="locality">Paris</span>
              </span>
            </div>
            <div class="stockists__item">
              <strong>Camper Lab</strong>
              <br />
              <span class="adr">
                <span class="street-address">
                  15, rue Debelleyme
                  <br />
                </span>
                75003 -
                <span class="locality">Paris</span>
              </span>
            </div>
            <div class="stockists__item">
              <strong>Centre Culturel Suisse</strong>
              <br />
              <span class="adr">
                <span class="street-address">
                  38 Rue des Francs Bourgeois
                  <br />
                </span>
                75003 -
                <span class="locality">Paris</span>
              </span>
            </div>
            <div class="stockists__item">
              <strong>Chez Moi, Paris</strong>
              <br />
              <span class="adr">
                <span class="street-address">
                  25 Rue Hérold
                  <br />
                </span>
                75001 -
                <span class="locality">Paris</span>
              </span>
            </div>
            <div class="stockists__item">
              <strong>Colette</strong>
              <br />
              <span class="adr">
                <span class="street-address">
                  213 Rue Saint-Honoré
                  <br />
                </span>
                75001 -
                <span class="locality">Paris</span>
              </span>
            </div>
            <div class="stockists__item">
              <strong>Drugstore</strong>
              <br />
              <span class="adr">
                <span class="street-address">
                  133 Avenue des Champs Elysées
                  <br />
                </span>
                75008 -
                <span class="locality">Paris</span>
              </span>
            </div>
            <div class="stockists__item">
              <strong>Etudes Studio</strong>
              <br />
              <span class="adr">
                <span class="street-address">
                  14, rue Debelleyme
                  <br />
                </span>
                75003 -
                <span class="locality">Paris</span>
              </span>
            </div>
            <div class="stockists__item">
              <strong>Galerie Emmanuel Perrotin</strong>
              <br />
              <span class="adr">
                <span class="street-address">
                  76 Rue de Turenne
                  <br />
                </span>
                75003 -
                <span class="locality">Paris</span>
              </span>
            </div>
            <div class="stockists__item">
              <strong>Galerie Yvon Lambert</strong>
              <br />
              <span class="adr">
                <span class="street-address">
                  108 Rue Vieille du Temple
                  <br />
                </span>
                75003 -
                <span class="locality">Paris</span>
              </span>
            </div>
            <div class="stockists__item">
              <strong>Kiosque Alma</strong>
              <br />
              <span class="adr">
                <span class="street-address">
                  1, Quai Branly / Pont de l 'Alma
                  <br />
                </span>
                75007 -
                <span class="locality">Paris</span>
              </span>
            </div>
            <div class="stockists__item">
              <strong>Kiosque Bonne-Nouvelle</strong>
              <br />
              <span class="adr">
                <span class="street-address">
                  13 Boulevard Saint-Denis
                  <br />
                </span>
                75002 -
                <span class="locality">Paris</span>
              </span>
            </div>
            <div class="stockists__item">
              <strong>L&#39;Imagerie</strong>
              <br />
              <span class="adr">
                <span class="street-address">
                  10, Rue du 8 Mai 1945
                  <br />
                </span>
                95100 -
                <span class="locality">Argenteuil</span>
              </span>
            </div>
            <div class="stockists__item">
              <strong>Lancryer</strong>
              <br />
              <span class="adr">
                <span class="street-address">
                  34 Rue Lancry
                  <br />
                </span>
                75010 -
                <span class="locality">Paris</span>
              </span>
            </div>
            <div class="stockists__item">
              <strong>Le Salon</strong>
              <br />
              <span class="adr">
                <span class="street-address">
                  92, rue Jean-Pierre Timbaud
                  <br />
                </span>
                75011 -
                <span class="locality">Paris</span>
              </span>
            </div>
            <div class="stockists__item">
              <strong>Les Abattoirs</strong>
              <br />
              <span class="adr">
                <span class="street-address">
                  76 Allées Charles-de-Fitte
                  <br />
                </span>
                31300 -
                <span class="locality">Toulouse</span>
              </span>
            </div>
            <div class="stockists__item">
              <strong>Les Mots à la Bouche</strong>
              <br />
              <span class="adr">
                <span class="street-address">
                  6 Rue Ste Croix la Bretonnerie
                  <br />
                </span>
                75004 -
                <span class="locality">Paris</span>
              </span>
            </div>
            <div class="stockists__item">
              <strong>Librairie Datta</strong>
              <br />
              <span class="adr">
                <span class="street-address">
                  10 Rue du Griffon
                  <br />
                </span>
                69001 -
                <span class="locality">Lyon</span>
              </span>
            </div>
            <div class="stockists__item">
              <strong>Librairie de la Mode</strong>
              <br />
              <span class="adr">
                <span class="street-address">
                  22 Rue Pierre Lescot
                  <br />
                </span>
                75001 -
                <span class="locality">Paris</span>
              </span>
            </div>
            <div class="stockists__item">
              <strong>Librairie du lycee Jules Ferry</strong>
              <br />
              <span class="adr">
                <span class="street-address">
                  55, rue de Douai
                  <br />
                </span>
                75009 -
                <span class="locality">Paris</span>
              </span>
            </div>
            <div class="stockists__item">
              <strong>Librairie Georges Pompidou</strong>
              <br />
              <span class="adr">
                <span class="street-address">
                  Place Georges Pompidou
                  <br />
                </span>
                75004 -
                <span class="locality">Paris</span>
              </span>
            </div>
            <div class="stockists__item">
              <strong>LO/A, Library Of Arts</strong>
              <br />
              <span class="adr">
                <span class="street-address">
                  17, rue Notre Dame de Nazareth
                  <br />
                </span>
                75003 -
                <span class="locality">Paris</span>
              </span>
            </div>
            <div class="stockists__item">
              <strong>Lorette News</strong>
              <br />
              <span class="adr">
                <span class="street-address">
                  10, Rue Notre Dame de Lorette,
                  <br />
                </span>
                75009 -
                <span class="locality">Paris</span>
              </span>
            </div>
            <div class="stockists__item">
              <strong>Musée du Jeu de Paume</strong>
              <br />
              <span class="adr">
                <span class="street-address">
                  1 Place de la Concorde
                  <br />
                </span>
                75008 -
                <span class="locality">Paris</span>
              </span>
            </div>
            <div class="stockists__item">
              <strong>Palais de Tokyo</strong>
              <br />
              <span class="adr">
                <span class="street-address">
                  13, Avenue du Président Wilson
                  <br />
                </span>
                75016 -
                <span class="locality">Paris</span>
              </span>
            </div>
            <div class="stockists__item">
              <strong>Paper Lab / BHV Marais</strong>
              <br />
              <span class="adr">
                <span class="street-address">
                  52, rue de Rivoli
                  <br />
                </span>
                75004 -
                <span class="locality">Paris</span>
              </span>
            </div>
            <div class="stockists__item">
              <strong>Presse des Martyrs</strong>
              <br />
              <span class="adr">
                <span class="street-address">
                  51 Rue des Martyrs
                  <br />
                </span>
                75009 -
                <span class="locality">Paris</span>
              </span>
            </div>
            <div class="stockists__item">
              <strong>Terrasse de Gutemberg</strong>
              <br />
              <span class="adr">
                <span class="street-address">
                  9 Rue Emilio Castelar
                  <br />
                </span>
                75012 -
                <span class="locality">Paris</span>
              </span>
            </div>
            <div class="stockists__item">
              <strong>THE WOODS GALLERY</strong>
              <br />
              <span class="adr">
                <span class="street-address">
                  22 rue André del Sarte
                  <br />
                </span>
                75018 -
                <span class="locality">Paris</span>
              </span>
            </div>
            <div class="stockists__item">
              <strong>WH Smith</strong>
              <br />
              <span class="adr">
                <span class="street-address">
                  248 Rue de Rivoli
                  <br />
                </span>
                75001 -
                <span class="locality">Paris</span>
              </span>
            </div>
          </div>

          <div class="content_tab grid_12">
            <div class="stockists__item">
              <strong>ECKERT,LUDWIG,KÖLN</strong>
              <br />
              <span class="adr">
                <span class="street-address">
                  BAHNHOF
                  <br />
                </span>
                -
                <span class="locality">Köln</span>
              </span>
            </div>
            <div class="stockists__item">
              <strong>SCHMITT, FRANFURT HB</strong>
              <br />
              <span class="adr">
                <span class="street-address">
                  BAHNHOF
                  <br />
                </span>
                -
                <span class="locality">Frankfurt</span>
              </span>
            </div>
            <div class="stockists__item">
              <strong>SODABOOKS</strong>
              <br />
              <span class="adr">
                <span class="street-address">
                  SONSTIGE
                  <br />
                </span>
                -
                <span class="locality">BERLIN</span>
              </span>
            </div>
            <div class="stockists__item">
              <strong>SODABOOKS</strong>
              <br />
              <span class="adr">
                <span class="street-address">
                  SONSTIGE
                  <br />
                </span>
                -
                <span class="locality">Düsseldorf</span>
              </span>
            </div>
            <div class="stockists__item">
              <strong>Do You Read Me</strong>
              <br />
              <span class="adr">
                <span class="street-address">
                  28 Auguststrasse
                  <br />
                </span>
                10117 -
                <span class="locality">Berlin</span>
              </span>
            </div>
            <div class="stockists__item">
              <strong>GRAUERT, DÜSSELDORF</strong>
              <br />
              <span class="adr">
                <span class="street-address">
                  BAHNHOF
                  <br />
                </span>
                -
                <span class="locality">Düsseldorf</span>
              </span>
            </div>
            <div class="stockists__item">
              <strong>Schmitt &amp; Hahn</strong>
              <br />
              <span class="adr">
                <span class="street-address">
                  16/17Im Hauptbahnhof Querbahnsteig Gleis
                  <br />
                </span>
                60329 -
                <span class="locality">Frankfurt</span>
              </span>
            </div>
            <div class="stockists__item">
              <strong>SODABOOKS, MUC</strong>
              <br />
              <span class="adr">
                <span class="street-address">
                  SONSTIGE
                  <br />
                </span>
                -
                <span class="locality">MÜNCHEN</span>
              </span>
            </div>
            <div class="stockists__item">
              <strong>Steinacker/Soda books</strong>
              <br />
              <span class="adr">
                <span class="street-address">
                  3 Rumfordstraße
                  <br />
                </span>
                80469 -
                <span class="locality">Munich</span>
              </span>
            </div>
          </div>

          <div class="content_tab grid_12">
            <div class="stockists__item">
              <strong>Newsstand</strong>
              <br />
              <span class="adr">
                <span class="street-address">
                  Largo Treves
                  <br />
                </span>
                -
                <span class="locality">MILAN</span>
              </span>
            </div>
            <div class="stockists__item">
              <strong>10 Corso Como</strong>
              <br />
              <span class="adr">
                <span class="street-address">
                  Corso Como 10
                  <br />
                </span>
                -
                <span class="locality">MILAN</span>
              </span>
            </div>
            <div class="stockists__item">
              <strong>Fashion Room</strong>
              <br />
              <span class="adr">
                <span class="street-address">
                  3/3a via dei Palchetti
                  <br />
                </span>
                50123 -
                <span class="locality">Florence</span>
              </span>
            </div>
            <div class="stockists__item">
              <strong>Libreria Luxemburg</strong>
              <br />
              <span class="adr">
                <span class="street-address">
                  Via Cesare Battisti 7
                  <br />
                </span>
                -
                <span class="locality">TURIN</span>
              </span>
            </div>
            <div class="stockists__item">
              <strong>Mondadori Duomo</strong>
              <br />
              <span class="adr">
                <span class="street-address">
                  1 Piazza del Duomo
                  <br />
                </span>
                20121 -
                <span class="locality">Milan</span>
              </span>
            </div>
            <div class="stockists__item">
              <strong>Mondadori Multicenter</strong>
              <br />
              <span class="adr">
                <span class="street-address">
                  2 Corso Vittorio Emanuele
                  <br />
                </span>
                20121 -
                <span class="locality">Milan</span>
              </span>
            </div>
            <div class="stockists__item">
              <strong>Newsstand</strong>
              <br />
              <span class="adr">
                <span class="street-address">
                  Piazza San Babila
                  <br />
                </span>
                -
                <span class="locality">MILAN</span>
              </span>
            </div>
            <div class="stockists__item">
              <strong>Newsstand</strong>
              <br />
              <span class="adr">
                <span class="street-address">
                  Via Veneto/Via Lombardia
                  <br />
                </span>
                -
                <span class="locality">ROMA</span>
              </span>
            </div>
          </div>

          <div class="content_tab grid_12">
            <div class="stockists__item">
              <strong>ABC Aoyama Main Store</strong>
              <br />
              <span class="adr">
                <span class="street-address">
                  3-7-6 Jingumae
                  <br />
                </span>
                Shibuya Ku -
                <span class="locality">Tokyo</span>
              </span>
            </div>
            <div class="stockists__item">
              <strong>Bandi &amp; Luni&#39;s - Gangnam 2nd Store</strong>
              <br />
              <span class="adr">
                <span class="street-address">
                  4F, Shinsegae, 19-3, Banpo-dong, Seocho-gu
                  <br />
                </span>
                6546 -
                <span class="locality">Seoul</span>
              </span>
            </div>
            <div class="stockists__item">
              <strong>Bonjour Records</strong>
              <br />
              <span class="adr">
                <span class="street-address">
                  24-1 Sarugaku-cho, Daikanyama
                  <br />
                </span>
                -
                <span class="locality">TOKYO</span>
              </span>
            </div>
            <div class="stockists__item">
              <strong>Book First Shibuya</strong>
              <br />
              <span class="adr">
                <span class="street-address">
                  33 Udagawacho, Shibuya-ku
                  <br />
                </span>
                -
                <span class="locality">TOKYO</span>
              </span>
            </div>
            <div class="stockists__item">
              <strong>Junku Osaka</strong>
              <br />
              <span class="adr">
                <span class="street-address" />
                -
                <span class="locality">OSAKA</span>
              </span>
            </div>
            <div class="stockists__item">
              <strong>Shibuya Tsutaya</strong>
              <br />
              <span class="adr">
                <span class="street-address">
                  150-0042 Tokyo, Shibuya
                  <br />
                </span>
                -
                <span class="locality">TOKYO</span>
              </span>
            </div>
            <div class="stockists__item">
              <strong>Tsutaya Daikanyama T-Site</strong>
              <br />
              <span class="adr">
                <span class="street-address">
                  17-5 Sarugakucho
                  <br />
                </span>
                Shibuya-ku -
                <span class="locality">Tokyo</span>
              </span>
            </div>
            <div class="stockists__item">
              <strong>Umeda Tsutaya</strong>
              <br />
              <span class="adr">
                <span class="street-address">
                  Lucua1100,9F 3-1-3 Umeda Kita-ku
                  <br />
                </span>
                Osaka 530-8558 -
                <span class="locality">OSAKA</span>
              </span>
            </div>
          </div>

          <div class="content_tab grid_12">
            <div class="stockists__item">
              <strong>Bandi &amp; Luni’s Bookstore</strong>
              <br />
              <span class="adr">
                <span class="street-address">
                  19-3 Banpo-dong
                  <br />
                </span>
                Seocho-gu -
                <span class="locality">Seoul</span>
              </span>
            </div>
            <div class="stockists__item">
              <strong>World Magazine Co., Ltd.</strong>
              <br />
              <span class="adr">
                <span class="street-address">
                  Yujin Building 1F / 13-7 Nonhyun-dong
                  <br />
                </span>
                Kangnam-gu -
                <span class="locality">Seoul</span>
              </span>
            </div>
            <div class="stockists__item">
              <strong>World Magazine in Mapo</strong>
              <br />
              <span class="adr">
                <span class="street-address">
                  3F, 316-13 Sangsoo-dong
                  <br />
                </span>
                Mapo-gu -
                <span class="locality">Seoul</span>
              </span>
            </div>
          </div>

          <div class="content_tab grid_12">
            <div class="stockists__item">
              <strong>Relay Krakow Balice &#39;Virgin&#39;</strong>
              <br />
              <span class="adr">
                <span class="street-address">
                  Airport
                  <br />
                </span>
                -
                <span class="locality">Krakow</span>
              </span>
            </div>
            <div class="stockists__item">
              <strong>Super Salon</strong>
              <br />
              <span class="adr">
                <span class="street-address">
                  Chmielna 10
                  <br />
                </span>
                00-020 -
                <span class="locality">Warszawa</span>
              </span>
            </div>
          </div>

          <div class="content_tab grid_12">
            <div class="stockists__item">
              <strong>Press Stop</strong>
              <br />
              <span class="adr">
                <span class="street-address">
                  31 Götgatan
                  <br />
                </span>
                11621 -
                <span class="locality">Stockholm</span>
              </span>
            </div>
            <div class="stockists__item">
              <strong>Press Stop</strong>
              <br />
              <span class="adr">
                <span class="street-address">
                  27 Regeringsgatan
                  <br />
                </span>
                11153 -
                <span class="locality">Stockholm</span>
              </span>
            </div>
            <div class="stockists__item">
              <strong>Press Stop</strong>
              <br />
              <span class="adr">
                <span class="street-address">
                  50 Fleminggatan
                  <br />
                </span>
                11233 -
                <span class="locality">Stockholm</span>
              </span>
            </div>
            <div class="stockists__item">
              <strong>Pressbyran</strong>
              <br />
              <span class="adr">
                <span class="street-address">
                  Centralhallen
                  <br />
                </span>
                11120 -
                <span class="locality">Stockholm</span>
              </span>
            </div>
          </div>

          <div class="content_tab grid_12">
            <div class="stockists__item">
              <strong>CAROUGE MIGROS M-PARC NAVILLE</strong>
              <br />
              <span class="adr">
                <span class="street-address">
                  Av. Vibert 32
                  <br />
                </span>
                1227 Carouge -
                <span class="locality">Geneva</span>
              </span>
            </div>
            <div class="stockists__item">
              <strong>CHAVANNES CENTRE</strong>
              <br />
              <span class="adr">
                <span class="street-address">
                  CC Manor
                  <br />
                </span>
                1279 Chavannes-de-Bogis -
                <span class="locality">Vaud</span>
              </span>
            </div>
            <div class="stockists__item">
              <strong>CIAMBRIELLO RAPHAEL KIOSQUE AUX DARDANELLES</strong>
              <br />
              <span class="adr">
                <span class="street-address">
                  Rue d'Yverdon 5
                  <br />
                </span>
                1530 Payerne -
                <span class="locality">Vaud</span>
              </span>
            </div>
            <div class="stockists__item">
              <strong>DI FUORTI FATZANE KIOSQUE DES REMPARTS</strong>
              <br />
              <span class="adr">
                <span class="street-address">
                  Prom.Aug-Fallet 1
                  <br />
                </span>
                1401 Yverdon-les-Bains -
                <span class="locality">Vaud</span>
              </span>
            </div>
            <div class="stockists__item">
              <strong>ECUBLENS COOP</strong>
              <br />
              <span class="adr">
                <span class="street-address">
                  Ch. du Croset 3 - CP 260
                  <br />
                </span>
                1024 Ecublens -
                <span class="locality">Vaud</span>
              </span>
            </div>
            <div class="stockists__item">
              <strong>FRIBOURG MIGROS PEROLLES</strong>
              <br />
              <span class="adr">
                <span class="street-address">
                  Bd de Pérolles 21A
                  <br />
                </span>
                1700 -
                <span class="locality">Fribourg</span>
              </span>
            </div>
            <div class="stockists__item">
              <strong>GENEVE AIG ARRIVEE</strong>
              <br />
              <span class="adr">
                <span class="street-address">
                  K KIOSK Aéroport Arrivées
                  <br />
                </span>
                1215 Genève -
                <span class="locality">Geneva</span>
              </span>
            </div>
            <div class="stockists__item">
              <strong>GENEVE MANOR ROUSSEAU</strong>
              <br />
              <span class="adr">
                <span class="street-address">
                  NAVILLE Rue J.-J. Rousseau 21
                  <br />
                </span>
                1201 -
                <span class="locality">Geneva</span>
              </span>
            </div>
            <div class="stockists__item">
              <strong>GENEVE RIVE NAVILLE</strong>
              <br />
              <span class="adr">
                <span class="street-address">
                  Rue de Rive 13
                  <br />
                </span>
                1204 -
                <span class="locality">Geneva</span>
              </span>
            </div>
            <div class="stockists__item">
              <strong>HURZELER THIERRY KIOSQUE DES FLANDRES</strong>
              <br />
              <span class="adr">
                <span class="street-address">
                  Rue des Flandres 5.
                  <br />
                </span>
                CP39 2004 Neuchâtel 4 -
                <span class="locality" />
              </span>
            </div>
            <div class="stockists__item">
              <strong>KIOSQUE MIKAJO RIKLY B.</strong>
              <br />
              <span class="adr">
                <span class="street-address">
                  C.COMMERCIAL COOP
                  <br />
                </span>
                1110 Morges -
                <span class="locality">Vaud</span>
              </span>
            </div>
            <div class="stockists__item">
              <strong>LAUSANNE CFF SOUS-VOIES</strong>
              <br />
              <span class="adr">
                <span class="street-address">
                  K KIOSK Gare CFF
                  <br />
                </span>
                1003 Lausanne -
                <span class="locality">Vaud</span>
              </span>
            </div>
            <div class="stockists__item">
              <strong>LAUSANNE METROPOLE</strong>
              <br />
              <span class="adr">
                <span class="street-address">
                  Rue des Terreaux 25
                  <br />
                </span>
                1003 Lausanne -
                <span class="locality">Vaud</span>
              </span>
            </div>
            <div class="stockists__item">
              <strong>LAUSANNE ST-FR.PEPINET</strong>
              <br />
              <span class="adr">
                <span class="street-address">
                  Pl. St-François 2
                  <br />
                </span>
                1003 Lausanne -
                <span class="locality">Vaud</span>
              </span>
            </div>
            <div class="stockists__item">
              <strong>LAUSANNE ST-FR.POSTE</strong>
              <br />
              <span class="adr">
                <span class="street-address">
                  BAT.PTT PL.St.François 15
                  <br />
                </span>
                1003 Lausanne -
                <span class="locality">Vaud</span>
              </span>
            </div>
            <div class="stockists__item">
              <strong>MEYRIN CENTRE NAVILLE CAFE PRESSE</strong>
              <br />
              <span class="adr">
                <span class="street-address">
                  C. Com. Av. Feuillasse 24
                  <br />
                </span>
                1217 Meyrin -
                <span class="locality">Geneva</span>
              </span>
            </div>
            <div class="stockists__item">
              <strong>MORGES CFF K KIOSK</strong>
              <br />
              <span class="adr">
                <span class="street-address">
                  Place de la Gare 2
                  <br />
                </span>
                1110 Morges -
                <span class="locality">Vaud</span>
              </span>
            </div>
            <div class="stockists__item">
              <strong>NEUCHATEL CFF SOUS-VOIES</strong>
              <br />
              <span class="adr">
                <span class="street-address">
                  Gare CFF
                  <br />
                </span>
                2000 Neuchâtel -
                <span class="locality" />
              </span>
            </div>
            <div class="stockists__item">
              <strong>NYON CFF</strong>
              <br />
              <span class="adr">
                <span class="street-address">
                  Gare CFF Place de la Gare
                  <br />
                </span>
                1260 Nyon -
                <span class="locality">Vaud</span>
              </span>
            </div>
            <div class="stockists__item">
              <strong>PALEZIEUX CFF AVEC</strong>
              <br />
              <span class="adr">
                <span class="street-address">
                  Gare CFF
                  <br />
                </span>
                1607 Palézieux-Gare -
                <span class="locality">Vaud</span>
              </span>
            </div>
            <div class="stockists__item">
              <strong>PAYOT NEUCHATEL</strong>
              <br />
              <span class="adr">
                <span class="street-address">
                  Rue du Seyon 2
                  <br />
                </span>
                2000 Neuchâtel -
                <span class="locality" />
              </span>
            </div>
            <div class="stockists__item">
              <strong>
                SIMOES LUIS-MANUEL &amp; ILDA KIOSQUE D&#39;OCTODURE
              </strong>
              <br />
              <span class="adr">
                <span class="street-address">
                  Pl. Centrale - CP 688
                  <br />
                </span>
                1920 Martigny 1 -
                <span class="locality">Wallis</span>
              </span>
            </div>
            <div class="stockists__item">
              <strong>VBM CONSULTING SARL</strong>
              <br />
              <span class="adr">
                <span class="street-address">
                  Chemin de Grange Canal 24
                  <br />
                </span>
                1224 Chêne-Bougeries -
                <span class="locality">Geneva</span>
              </span>
            </div>
            <div class="stockists__item">
              <strong>VERBIER PLACE CENTRALE</strong>
              <br />
              <span class="adr">
                <span class="street-address">
                  Ancien Bât. PTT
                  <br />
                </span>
                1936 Verbier -
                <span class="locality">Wallis</span>
              </span>
            </div>
            <div class="stockists__item">
              <strong>VEVEY CFF K KIOSK</strong>
              <br />
              <span class="adr">
                <span class="street-address">
                  Gare CFF
                  <br />
                </span>
                1800 Vevey -
                <span class="locality">Vaud</span>
              </span>
            </div>
            <div class="stockists__item">
              <strong>YVERDON PROMENADE</strong>
              <br />
              <span class="adr">
                <span class="street-address">
                  K KIOSK Pl. de la Gare
                  <br />
                </span>
                1401 Yverdon-les-Bains -
                <span class="locality">Vaud</span>
              </span>
            </div>
            <div class="stockists__item">
              <strong>Archigraphy</strong>
              <br />
              <span class="adr">
                <span class="street-address">
                  Halles de l’Ile - 1 Place de l’Ile
                  <br />
                </span>
                1204 -
                <span class="locality">Genève</span>
              </span>
            </div>
            <div class="stockists__item">
              <strong>Camille</strong>
              <br />
              <span class="adr">
                <span class="street-address">
                  Rue Caroline 5
                  <br />
                </span>
                1003 -
                <span class="locality">Lausanne</span>
              </span>
            </div>
            <div class="stockists__item">
              <strong>Cicuit Art Gallery</strong>
              <br />
              <span class="adr">
                <span class="street-address">
                  9 avenue de Montchoisi
                  <br />
                </span>
                1001 -
                <span class="locality">Lausanne</span>
              </span>
            </div>
            <div class="stockists__item">
              <strong>COOP</strong>
              <br />
              <span class="adr">
                <span class="street-address">
                  Rue de l'abbé Monnin 81
                  <br />
                </span>
                2854 Bassecourt -
                <span class="locality">Jura</span>
              </span>
            </div>
            <div class="stockists__item">
              <strong>COOP GENEVE SERVETTE 1962</strong>
              <br />
              <span class="adr">
                <span class="street-address">
                  Rue de la Servette 83
                  <br />
                </span>
                1202 Genève -
                <span class="locality">Geneva</span>
              </span>
            </div>
            <div class="stockists__item">
              <strong>CRISSIER MIGROS CENTRE</strong>
              <br />
              <span class="adr">
                <span class="street-address">
                  Centre Commercial MMM
                  <br />
                </span>
                1023 Crissier -
                <span class="locality">Vaud</span>
              </span>
            </div>
            <div class="stockists__item">
              <strong>FOOUND SARL YUPIK / BOOKAZINES</strong>
              <br />
              <span class="adr">
                <span class="street-address">
                  16,rue Jean Gutenberg
                  <br />
                </span>
                1201 Genève -
                <span class="locality">Geneva</span>
              </span>
            </div>
            <div class="stockists__item">
              <strong>FRIBOURG CENTRE</strong>
              <br />
              <span class="adr">
                <span class="street-address">
                  Av.de la Gare 10
                  <br />
                </span>
                1700 Fribourg -
                <span class="locality">Fribourg</span>
              </span>
            </div>
            <div class="stockists__item">
              <strong>Galerie Lucy Macintosh</strong>
              <br />
              <span class="adr">
                <span class="street-address">
                  7 Avenue des Acacias
                  <br />
                </span>
                1006 -
                <span class="locality">Lausanne</span>
              </span>
            </div>
            <div class="stockists__item">
              <strong>GENEVE AIG GARE</strong>
              <br />
              <span class="adr">
                <span class="street-address">
                  K KIOSK Aeroport - CP 706
                  <br />
                </span>
                1215 Genève -
                <span class="locality">Geneva</span>
              </span>
            </div>
            <div class="stockists__item">
              <strong>GENEVE BALEXERT</strong>
              <br />
              <span class="adr">
                <span class="street-address">
                  NAVILLE Av.Louis Casai 27
                  <br />
                </span>
                1209 -
                <span class="locality">Genève</span>
              </span>
            </div>
            <div class="stockists__item">
              <strong>GENEVE CFF PLACE</strong>
              <br />
              <span class="adr">
                <span class="street-address">
                  K KIOSK Gare CFF Place Cornavin
                  <br />
                </span>
                1201 -
                <span class="locality">Geneva</span>
              </span>
            </div>
            <div class="stockists__item">
              <strong>GENEVE CFF TGV</strong>
              <br />
              <span class="adr">
                <span class="street-address">
                  K KIOSK Gare CFF
                  <br />
                </span>
                Cornavin 1201 -
                <span class="locality">Genève</span>
              </span>
            </div>
            <div class="stockists__item">
              <strong>GENEVE FLORISSANT</strong>
              <br />
              <span class="adr">
                <span class="street-address">
                  NAVILLE Rte de Florissant 53
                  <br />
                </span>
                1206 -
                <span class="locality">Geneva</span>
              </span>
            </div>
            <div class="stockists__item">
              <strong>GENEVE MIGROS SERVETTE</strong>
              <br />
              <span class="adr">
                <span class="street-address">
                  NAVILLE Rue de la Servette 93
                  <br />
                </span>
                1202 Genève -
                <span class="locality">Geneva</span>
              </span>
            </div>
            <div class="stockists__item">
              <strong>LAUSANNE CFF EST</strong>
              <br />
              <span class="adr">
                <span class="street-address">
                  K KIOSK Gare CFF
                  <br />
                </span>
                1003 Lausanne -
                <span class="locality">Vaud</span>
              </span>
            </div>
            <div class="stockists__item">
              <strong>LAUSANNE CFF HALL</strong>
              <br />
              <span class="adr">
                <span class="street-address">
                  K KIOSK Gare CFF CP
                  <br />
                </span>
                1020 1001 Lausanne -
                <span class="locality">Vaud</span>
              </span>
            </div>
            <div class="stockists__item">
              <strong>LAUSANNE LA SALLAZ NAVILLE</strong>
              <br />
              <span class="adr">
                <span class="street-address">
                  Place de la Sallaz 10
                  <br />
                </span>
                1010 Lausanne -
                <span class="locality">Vaud</span>
              </span>
            </div>
            <div class="stockists__item">
              <strong>LAUSANNE M2 FLON AVEC</strong>
              <br />
              <span class="adr">
                <span class="street-address">
                  Gare Flon Pl.Europe 5
                  <br />
                </span>
                1003 Lausanne -
                <span class="locality">Vaud</span>
              </span>
            </div>
            <div class="stockists__item">
              <strong>LAUSANNE RIPONNE NAVILLE</strong>
              <br />
              <span class="adr">
                <span class="street-address">
                  Pl. de la Riponne
                  <br />
                </span>
                1005 Lausanne -
                <span class="locality">Vaud</span>
              </span>
            </div>
            <div class="stockists__item">
              <strong>Le Bal des Créateurs</strong>
              <br />
              <span class="adr">
                <span class="street-address">
                  25 rue de l’Arquebuse
                  <br />
                </span>
                1204 -
                <span class="locality">Genève</span>
              </span>
            </div>
            <div class="stockists__item">
              <strong>Librairie du Musée de l’Elysée</strong>
              <br />
              <span class="adr">
                <span class="street-address">
                  18 av. de l’Elysée
                  <br />
                </span>
                1014 -
                <span class="locality">Lausanne</span>
              </span>
            </div>
            <div class="stockists__item">
              <strong>MARCHE VALOCTO SA MARCHE VALAISAN</strong>
              <br />
              <span class="adr">
                <span class="street-address">
                  Relais du Gd-St-Bernard
                  <br />
                </span>
                1920 Martigny -
                <span class="locality">Wallis</span>
              </span>
            </div>
            <div class="stockists__item">
              <strong>MARTIGNY MIGROS MANOIR</strong>
              <br />
              <span class="adr">
                <span class="street-address">
                  Pl. du Manoir
                  <br />
                </span>
                1920 Martigny -
                <span class="locality">Wallis</span>
              </span>
            </div>
            <div class="stockists__item">
              <strong>MDS GRACE SARL KIOSQUE MIGROS ROSSFELD</strong>
              <br />
              <span class="adr">
                <span class="street-address">
                  Rue des Lacustres 2
                  <br />
                </span>
                3960 Sierre -
                <span class="locality">Wallis</span>
              </span>
            </div>
            <div class="stockists__item">
              <strong>MONTHEY MANOR CENTRE</strong>
              <br />
              <span class="adr">
                <span class="street-address">
                  Av. de l'Europe 21
                  <br />
                </span>
                1870 Monthey -
                <span class="locality">Wallis</span>
              </span>
            </div>
            <div class="stockists__item">
              <strong>MORGES GRAND-RUE</strong>
              <br />
              <span class="adr">
                <span class="street-address">
                  NAVILLE Grand-Rue 79
                  <br />
                </span>
                1110 Morges -
                <span class="locality">Vaud</span>
              </span>
            </div>
            <div class="stockists__item">
              <strong>Motto</strong>
              <br />
              <span class="adr">
                <span class="street-address">
                  1 Kochstrasse
                  <br />
                </span>
                8004 -
                <span class="locality">Zürich</span>
              </span>
            </div>
            <div class="stockists__item">
              <strong>NEUCHATEL CFF HALL</strong>
              <br />
              <span class="adr">
                <span class="street-address">
                  Gare CFF
                  <br />
                </span>
                2000 Neuchâtel -
                <span class="locality">Neuchâtel</span>
              </span>
            </div>
            <div class="stockists__item">
              <strong>NEUCHATEL ST-HONORE</strong>
              <br />
              <span class="adr">
                <span class="street-address">
                  Rue St-Honoré 2
                  <br />
                </span>
                2000 -
                <span class="locality">Neuchâtel</span>
              </span>
            </div>
            <div class="stockists__item">
              <strong>PAOLO L. &amp; VAUCHER L.</strong>
              <br />
              <span class="adr">
                <span class="street-address">
                  Rue de la Gare 19
                  <br />
                </span>
                1260 Nyon -
                <span class="locality">Vaud</span>
              </span>
            </div>
            <div class="stockists__item">
              <strong>Payot</strong>
              <br />
              <span class="adr">
                <span class="street-address">
                  4 Place Pépinet
                  <br />
                </span>
                1003 -
                <span class="locality">Lausanne</span>
              </span>
            </div>
            <div class="stockists__item">
              <strong>PLAN-LES-OUATES MIGROS NAVILLE</strong>
              <br />
              <span class="adr">
                <span class="street-address">
                  Rte de St-Julien 176bis
                  <br />
                </span>
                1228 Plan Les Ouates -
                <span class="locality">Geneva</span>
              </span>
            </div>
            <div class="stockists__item">
              <strong>VESENAZ MANOR NAVILLE</strong>
              <br />
              <span class="adr">
                <span class="street-address">
                  Chemin Neuf de Vésenaz 6
                  <br />
                </span>
                1222 -
                <span class="locality">Vésenaz</span>
              </span>
            </div>
          </div>

          <div class="content_tab grid_12">
            <div class="stockists__item">
              <strong>ArtWords (Broadway Market)</strong>
              <br />
              <span class="adr">
                <span class="street-address">
                  20/22 Broadway Market
                  <br />
                </span>
                E8 4QJ -
                <span class="locality">London</span>
              </span>
            </div>
            <div class="stockists__item">
              <strong>ArtWords (Shoreditch)</strong>
              <br />
              <span class="adr">
                <span class="street-address">
                  69 Rivington Street
                  <br />
                </span>
                EC2A 3AY -
                <span class="locality">London</span>
              </span>
            </div>
            <div class="stockists__item">
              <strong>Barbican News</strong>
              <br />
              <span class="adr">
                <span class="street-address">
                  34 Goswell Rd, Golden Lane Estate
                  <br />
                </span>
                EC1M 7AA -
                <span class="locality">London</span>
              </span>
            </div>
            <div class="stockists__item">
              <strong>Charlotte News</strong>
              <br />
              <span class="adr">
                <span class="street-address">
                  66 Charlotte St, Bloomsbury
                  <br />
                </span>
                W1T 4QE -
                <span class="locality">London</span>
              </span>
            </div>
            <div class="stockists__item">
              <strong>Compton News</strong>
              <br />
              <span class="adr">
                <span class="street-address">
                  48 Old Compton Street
                  <br />
                </span>
                W1D 4UA -
                <span class="locality">London</span>
              </span>
            </div>
            <div class="stockists__item">
              <strong>Good News</strong>
              <br />
              <span class="adr">
                <span class="street-address">
                  23 Berwick Street
                  <br />
                </span>
                W1F 8RP -
                <span class="locality">London</span>
              </span>
            </div>
            <div class="stockists__item">
              <strong>M2 Covent Garden</strong>
              <br />
              <span class="adr">
                <span class="street-address">
                  34 Drury Ln
                  <br />
                </span>
                WC2B 5RH -
                <span class="locality">London</span>
              </span>
            </div>
            <div class="stockists__item">
              <strong>Magazine Brighton LTD</strong>
              <br />
              <span class="adr">
                <span class="street-address">
                  23 Trafalgar St
                  <br />
                </span>
                BN1 4EQ -
                <span class="locality">Brighton</span>
              </span>
            </div>
            <div class="stockists__item">
              <strong>Magma</strong>
              <br />
              <span class="adr">
                <span class="street-address">
                  22 Oldham St
                  <br />
                </span>
                M1 1JN -
                <span class="locality">Manchester</span>
              </span>
            </div>
            <div class="stockists__item">
              <strong>Meera&#39;s News</strong>
              <br />
              <span class="adr">
                <span class="street-address">
                  11 Marshall Street
                  <br />
                </span>
                W1F 7EN -
                <span class="locality">London</span>
              </span>
            </div>
            <div class="stockists__item">
              <strong>Newsmart</strong>
              <br />
              <span class="adr">
                <span class="street-address">
                  7 Harewood Pl, Mayfair
                  <br />
                </span>
                W1S 1BZ -
                <span class="locality">London</span>
              </span>
            </div>
            <div class="stockists__item">
              <strong>Rayden Newsagent</strong>
              <br />
              <span class="adr">
                <span class="street-address">
                  Temple Pl
                  <br />
                </span>
                WC2R 2PH -
                <span class="locality">London</span>
              </span>
            </div>
            <div class="stockists__item">
              <strong>Rococo</strong>
              <br />
              <span class="adr">
                <span class="street-address">
                  12 Elgin Crescent
                  <br />
                </span>
                W11 2HX -
                <span class="locality">London</span>
              </span>
            </div>
            <div class="stockists__item">
              <strong>Tate Modern</strong>
              <br />
              <span class="adr">
                <span class="street-address">
                  Bankside
                  <br />
                </span>
                SE1 9TG -
                <span class="locality">London</span>
              </span>
            </div>
            <div class="stockists__item">
              <strong>The Newbridge Books</strong>
              <br />
              <span class="adr">
                <span class="street-address">
                  12 New Bridge St W
                  <br />
                </span>
                NE1 8AW -
                <span class="locality">Newcastle</span>
              </span>
            </div>
            <div class="stockists__item">
              <strong>Thrive News</strong>
              <br />
              <span class="adr">
                <span class="street-address">
                  Westfield London Shopping Centre, 305, Ariel Way
                  <br />
                </span>
                W12 7GF -
                <span class="locality">London</span>
              </span>
            </div>
            <div class="stockists__item">
              <strong>Unique Magazines LTD</strong>
              <br />
              <span class="adr">
                <span class="street-address">
                  https://www.uniquemagazines.co.uk/
                  <br />
                </span>
                -
                <span class="locality" />
              </span>
            </div>
            <div class="stockists__item">
              <strong>Wardour News</strong>
              <br />
              <span class="adr">
                <span class="street-address">
                  118 Wardour Street
                  <br />
                </span>
                W1F 0TU -
                <span class="locality">London</span>
              </span>
            </div>
            <div class="stockists__item">
              <strong>WhSmith – Selfridges</strong>
              <br />
              <span class="adr">
                <span class="street-address">
                  400 Oxford Street
                  <br />
                </span>
                W1 1D -
                <span class="locality">London</span>
              </span>
            </div>
          </div>

          <div class="content_tab grid_12">
            <div class="stockists__item">
              <strong>All American Newsstand</strong>
              <br />
              <span class="adr">
                <span class="street-address">
                  18001 Ventura Blvd
                  <br />
                </span>
                CA 91316 -
                <span class="locality">ENCINO</span>
              </span>
            </div>
            <div class="stockists__item">
              <strong>Around The World Fashion Publications II</strong>
              <br />
              <span class="adr">
                <span class="street-address">
                  148th W 37th St
                  <br />
                </span>
                NY 10018 -
                <span class="locality">NEW YORK</span>
              </span>
            </div>
            <div class="stockists__item">
              <strong>AVRIL FIFTY</strong>
              <br />
              <span class="adr">
                <span class="street-address">
                  3406 SANSOM ST
                  <br />
                </span>
                19104 -
                <span class="locality">PHILADELPHIA</span>
              </span>
            </div>
            <div class="stockists__item">
              <strong>BJ Newstand Inc</strong>
              <br />
              <span class="adr">
                <span class="street-address">
                  670 Lexington Ave
                  <br />
                </span>
                NY 10022 -
                <span class="locality">NEW YORK</span>
              </span>
            </div>
            <div class="stockists__item">
              <strong>Borderless Ink Co.</strong>
              <br />
              <span class="adr">
                <span class="street-address">
                  66 Avenue A
                  <br />
                </span>
                NY 10009 -
                <span class="locality">NEW YORK</span>
              </span>
            </div>
            <div class="stockists__item">
              <strong>BOUWERIE ICONIC MAGS</strong>
              <br />
              <span class="adr">
                <span class="street-address">
                  215 BOWERY
                  <br />
                </span>
                10002 -
                <span class="locality">NEW YORK</span>
              </span>
            </div>
            <div class="stockists__item">
              <strong>BRENTWOOD NEWSSTAND</strong>
              <br />
              <span class="adr">
                <span class="street-address">
                  11737 SAN VICENTE
                  <br />
                </span>
                CA 90024 -
                <span class="locality">BRENTWOOD</span>
              </span>
            </div>
            <div class="stockists__item">
              <strong>CANAL ICONIC MAGAZIN</strong>
              <br />
              <span class="adr">
                <span class="street-address">
                  385 CANAL ST
                  <br />
                </span>
                10013 -
                <span class="locality">NEW YORK</span>
              </span>
            </div>
            <div class="stockists__item">
              <strong>CANYON NEWS</strong>
              <br />
              <span class="adr">
                <span class="street-address">
                  12100 1/2 VENTURA STUDIO CITY
                  <br />
                </span>
                CA 91604 -
                <span class="locality" />
              </span>
            </div>
            <div class="stockists__item">
              <strong>Centerfold</strong>
              <br />
              <span class="adr">
                <span class="street-address">
                  716 N Fairfax Ave
                  <br />
                </span>
                CA 90046 -
                <span class="locality">LOS ANGELES</span>
              </span>
            </div>
            <div class="stockists__item">
              <strong>Century World News</strong>
              <br />
              <span class="adr">
                <span class="street-address">
                  10597 W Pico Blvd
                  <br />
                </span>
                CA 90064 -
                <span class="locality">LOS ANGELES</span>
              </span>
            </div>
            <div class="stockists__item">
              <strong>Century World News</strong>
              <br />
              <span class="adr">
                <span class="street-address">
                  10597 W Pico Blvd
                  <br />
                </span>
                CA 90064 -
                <span class="locality">LOS ANGELES</span>
              </span>
            </div>
            <div class="stockists__item">
              <strong>Chicago Main</strong>
              <br />
              <span class="adr">
                <span class="street-address">
                  4024 N. Cicero
                  <br />
                </span>
                IL 60202 -
                <span class="locality">EVANSTON</span>
              </span>
            </div>
            <div class="stockists__item">
              <strong>CITY NEWSSTAND</strong>
              <br />
              <span class="adr">
                <span class="street-address">
                  4018 N CICERO A
                  <br />
                </span>
                60641 -
                <span class="locality">CHICAGO</span>
              </span>
            </div>
            <div class="stockists__item">
              <strong>Co-Op Records</strong>
              <br />
              <span class="adr">
                <span class="street-address">
                  516 South 2nd St
                  <br />
                </span>
                IA 52732-4210 -
                <span class="locality">CLINTON</span>
              </span>
            </div>
            <div class="stockists__item">
              <strong>COCO ONE STOP</strong>
              <br />
              <span class="adr">
                <span class="street-address">
                  825 BROADWAY
                  <br />
                </span>
                10003 -
                <span class="locality">NEW YORK</span>
              </span>
            </div>

            <div class="stockists__item">
              <strong>DOWNTOWN BOOKS &amp; NEWS</strong>
              <br />
              <span class="adr">
                <span class="street-address">
                  67 N LEXINGTON
                  <br />
                </span>
                28801 -
                <span class="locality">ASHEVILLE</span>
              </span>
            </div>

            <div class="stockists__item">
              <strong>ICONIC MILFORD PLAZA</strong>
              <br />
              <span class="adr">
                <span class="street-address">
                  700 8TH AVE
                  <br />
                </span>
                10036 -
                <span class="locality">NEW YORK</span>
              </span>
            </div>
            <div class="stockists__item">
              <strong>INTERNATIONAL NEWS &amp; MAGAZINES</strong>
              <br />
              <span class="adr">
                <span class="street-address">
                  302 E 86TH ST
                  <br />
                </span>
                10028 -
                <span class="locality">NEW YORK</span>
              </span>
            </div>
            <div class="stockists__item">
              <strong>KING’S NEWSSTAND</strong>
              <br />
              <span class="adr">
                <span class="street-address">
                  8361 BEVERLY BLVD
                  <br />
                </span>
                CA 90048 -
                <span class="locality">LOS ANGELES</span>
              </span>
            </div>
            <div class="stockists__item">
              <strong>KOSHER NEWS</strong>
              <br />
              <span class="adr">
                <span class="street-address">
                  370 N. FAIR
                  <br />
                </span>
                FAXCA 90036 -
                <span class="locality">LOS ANGELES</span>
              </span>
            </div>
            <div class="stockists__item">
              <strong>Lafayette Smoke Shop</strong>
              <br />
              <span class="adr">
                <span class="street-address">
                  63 Spring St
                  <br />
                </span>
                NY 10012 -
                <span class="locality">NEW YORK</span>
              </span>
            </div>
            <div class="stockists__item">
              <strong>LARCHMONT ABOVE THE FOLD</strong>
              <br />
              <span class="adr">
                <span class="street-address">
                  226 N. LARCHMONTCA
                  <br />
                </span>
                90004 -
                <span class="locality">LOS ANGELES</span>
              </span>
            </div>
            <div class="stockists__item">
              <strong>Magazine Cafe</strong>
              <br />
              <span class="adr">
                <span class="street-address">
                  15 W 37th St
                  <br />
                </span>
                NY 10018 -
                <span class="locality">NEW YORK</span>
              </span>
            </div>
            <div class="stockists__item">
              <strong>Magazines &amp; Cards Store</strong>
              <br />
              <span class="adr">
                <span class="street-address">
                  916 Third Ave
                  <br />
                </span>
                NY 10022 -
                <span class="locality">NEW YORK</span>
              </span>
            </div>
            <div class="stockists__item">
              <strong>MALIBU NEWS STAND</strong>
              <br />
              <span class="adr">
                <span class="street-address">
                  23717 MALIBU
                  <br />
                </span>
                CA 90265 -
                <span class="locality">MALIBU</span>
              </span>
            </div>
            <div class="stockists__item">
              <strong>MOCA Los Angeles</strong>
              <br />
              <span class="adr">
                <span class="street-address">
                  250 S Grand Ave
                  <br />
                </span>
                CA 90012 -
                <span class="locality">LOS ANGELES</span>
              </span>
            </div>
            <div class="stockists__item">
              <strong>MULBERRY ICONIC MAGAZINES</strong>
              <br />
              <span class="adr">
                <span class="street-address">
                  188 MULBERRY ST
                  <br />
                </span>
                10012 -
                <span class="locality">NEW YORK</span>
              </span>
            </div>
            <div class="stockists__item">
              <strong>NATIONAL NEWS</strong>
              <br />
              <span class="adr">
                <span class="street-address">
                  11203 NATIONAL BL
                  <br />
                </span>
                CA 90064 -
                <span class="locality">LOS ANGELES</span>
              </span>
            </div>
            <div class="stockists__item">
              <strong>NEWSSTAND 1935 LLC</strong>
              <br />
              <span class="adr">
                <span class="street-address">
                  1935 EAST DUBLI
                  <br />
                </span>
                43229 -
                <span class="locality">COLUMBUS</span>
              </span>
            </div>
            <div class="stockists__item">
              <strong>PINAZ ENTERPRISES</strong>
              <br />
              <span class="adr">
                <span class="street-address">
                  488 6TH AV OF AMERICAS
                  <br />
                </span>
                10011 -
                <span class="locality">NEW YORK</span>
              </span>
            </div>
            <div class="stockists__item">
              <strong>RICH&#39;S CIGAR STORE</strong>
              <br />
              <span class="adr">
                <span class="street-address">
                  820 SW ALDER
                  <br />
                </span>
                97205 -
                <span class="locality">ST PORTLAND</span>
              </span>
            </div>
            <div class="stockists__item">
              <strong>RICH&#39;S CIGAR STORE</strong>
              <br />
              <span class="adr">
                <span class="street-address">
                  922 NW FLANDERS
                  <br />
                </span>
                97209 -
                <span class="locality">PORTLAND</span>
              </span>
            </div>
            <div class="stockists__item">
              <strong>ROBERTSON MAGAZINES</strong>
              <br />
              <span class="adr">
                <span class="street-address">
                  1414 ROBERTSON BL
                  <br />
                </span>
                CA 90035 -
                <span class="locality">LOS ANGELES</span>
              </span>
            </div>
            <div class="stockists__item">
              <strong>S&amp;S International News</strong>
              <br />
              <span class="adr">
                <span class="street-address">
                  405 Sixth Ave
                  <br />
                </span>
                NY 10014 -
                <span class="locality">NEW YORK</span>
              </span>
            </div>

            <div class="stockists__item">
              <strong>Sebastian’s News Inc.</strong>
              <br />
              <span class="adr">
                <span class="street-address">
                  1886 Broadway
                  <br />
                </span>
                NY 10023 -
                <span class="locality">NEW YORK</span>
              </span>
            </div>

            <div class="stockists__item">
              <strong>Sheltam</strong>
              <br />
              <span class="adr">
                <span class="street-address">
                  6333 W 3rd St 550
                  <br />
                </span>
                CA 90036-3109 -
                <span class="locality">LOS ANGELES</span>
              </span>
            </div>
            <div class="stockists__item">
              <strong>Sherman Oaks Newstand</strong>
              <br />
              <span class="adr">
                <span class="street-address">
                  14500 Ventura Blvd
                  <br />
                </span>
                CA 91403 -
                <span class="locality">SHERMAN OAKS</span>
              </span>
            </div>
            <div class="stockists__item">
              <strong>SMOKE SIGNALS</strong>
              <br />
              <span class="adr">
                <span class="street-address">
                  2223 POLK ST
                  <br />
                </span>
                94109 -
                <span class="locality">SAN FRANCISCO</span>
              </span>
            </div>
            <div class="stockists__item">
              <strong>Soho News</strong>
              <br />
              <span class="adr">
                <span class="street-address">
                  186 Prince St
                  <br />
                </span>
                NY 10012 -
                <span class="locality">NEW YORK</span>
              </span>
            </div>
            <div class="stockists__item">
              <strong>The Book Table</strong>
              <br />
              <span class="adr">
                <span class="street-address">
                  1045 Lake St
                  <br />
                </span>
                IL 60301 -
                <span class="locality">OAK PARK</span>
              </span>
            </div>
            <div class="stockists__item">
              <strong>TOMO MAGS</strong>
              <br />
              <span class="adr">
                <span class="street-address">
                  1206 HAWTHORNE ST
                  <br />
                </span>
                77006 -
                <span class="locality">HOUSTON</span>
              </span>
            </div>
            <div class="stockists__item">
              <strong>UNION SQ ONE SHOP</strong>
              <br />
              <span class="adr">
                <span class="street-address">
                  141 4TH AVE
                  <br />
                </span>
                10003 -
                <span class="locality">NEW YORK</span>
              </span>
            </div>
            <div class="stockists__item">
              <strong>VILLAGE GLOBAL NEWS/CASA</strong>
              <br />
              <span class="adr">
                <span class="street-address">
                  22 8TH AVE
                  <br />
                </span>
                10014 -
                <span class="locality">NEW YORK</span>
              </span>
            </div>

            <div class="stockists__item">
              <strong>World Book &amp; News</strong>
              <br />
              <span class="adr">
                <span class="street-address">
                  1652 N Cahuenga Blvd
                  <br />
                </span>
                CA 90028 -
                <span class="locality">LOS ANGELES</span>
              </span>
            </div>
          </div>

        </div>
      </div>

{/await}


</article>

<Footer active={true} />

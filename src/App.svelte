<script>
  import { Router, Link, Route } from "svelte-routing";

  import Navigation from "./Components/Navigation.svelte";

  // ROUTES
  import Listing from "./Routes/Listing.svelte";
  import Article from "./Routes/Article.svelte";
  import Page from "./Routes/Page.svelte";
  
  const baseURL = 'http://3.221.158.133/'

  const listingRouteParams = {
    landing: {
      title: 'Landing',
      endpoint: baseURL + 'landing.json',
      showTaxonomyScroller: false,
      showFooter: false
    },
    magazine: {
      title: 'Magazine',
      endpoint: baseURL + 'magazine.json',
      showTaxonomyScroller: true,
    },
    entertainment: {
      title: 'Entertainment',
      endpoint: baseURL + 'entertainment.json',
      showTaxonomyScroller: true,
    },
    taxonomy: {
      title: 'Taxonomy',
      endpoint: baseURL + 'taxonomy.json/tag:',
      showTaxonomyScroller: false,
      isQuery: true
    },
    search: {
      title: 'Search',
      endpoint: baseURL + 'search.json/query:',
      showTaxonomyScroller: false,
      isQuery: true
    }
  }
</script>

<Navigation />

<Router>
  <Route path="/" component={Listing} {...listingRouteParams.landing}/>
  <Route path="magazine" component={Listing} {...listingRouteParams.magazine}/>
  <Route path="magazine/:category" component={Listing} {...listingRouteParams.magazine}/>
  <Route path="entertainment" component={Listing} {...listingRouteParams.entertainment}/>
  <Route path="entertainment/:category" component={Listing} {...listingRouteParams.entertainment}/>
  <Route path="taxonomy/:tag" component={Taxonomy} {...listingRouteParams.taxonomy}/>
  <Route path="taxonomy/" component={Taxonomy} {...listingRouteParams.taxonomy}/>
  <Route path="search/:query" component={Search} {...listingRouteParams.search}/>
  <Route path="search/" component={Search} {...listingRouteParams.search}/>
  <Route path="magazine/:slug" component={Article} />
  <Route path="entertainment/:slug" component={Article} />
  <Route path="about" component={Page} title='ABOUTTT'/>
  <Route path="contact" component={Page} title='CONTACT' />
  // TODO: add 404
</Router>

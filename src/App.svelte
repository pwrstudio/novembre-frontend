<script>
  import { Router, Link, Route } from "svelte-routing";

  import Navigation from "./Components/Navigation.svelte";

  // ROUTES
  import Landing from "./Routes/Landing.svelte";
  import Article from "./Routes/Article.svelte";
  import Magazine from "./Routes/Magazine.svelte";
  import Entertainment from "./Routes/Entertainment.svelte";
  import About from "./Routes/About.svelte";
  import Contact from "./Routes/Contact.svelte";
  import Search from "./Routes/Search.svelte";
  import Taxonomy from "./Routes/Taxonomy.svelte";
</script>

<Navigation />

<Router>
  <Route path="/" fallback component={Landing} />
  <Route path="magazine" component={Magazine} />
  <Route path="magazine/category/:category" component={Magazine} />
  <Route path="entertainment" component={Entertainment} />
  <Route path="entertainment/category/:category" component={Magazine} />
  <Route path="magazine/:slug" component={Article} />
  <Route path="entertainment/:slug" component={Article} />
  <Route path="about" component={About} />
  <Route path="contact" component={Contact} />
  <Route path="taxonomy/:tag" component={Taxonomy} />
  <Route path="taxonomy/" component={Taxonomy} />
  <Route path="search/:query" component={Search} />
  <Route path="search/" component={Search} />
</Router>

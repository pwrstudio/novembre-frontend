<script>
  // # # # # # # # # # # # # #
  //
  //  Splash Text
  //
  // # # # # # # # # # # # # #

  // *** PROPS
  export let section = "landing";

  const magazineText =
    "<em>Novembre Magazine</em> is a printed magazine published biannually, devoted to the vertiginous excitement of contemporary urban life.";
  const bureauText =
    "<em>Novembre Bureau</em> serves as an inter-disciplinary creative agency that harnesses the cultural capital of Novembre Global to provide tailor-made and bespoke creative services for media outlets, independent labels, institutions, and international luxury brand.";
</script>

<style lang="scss">
  @import "../variables.scss";

  .splash-text {
    opacity: 1;
    overflow: hidden;
    height: auto;
    min-height: 100vh;
    width: 100vw;
    padding: $small-margin;
    display: flex;
    align-items: flex-end;

    div {
      user-select: none;
      color: black;
      font-size: $large;
      font-weight: 300;
      line-height: 0.85em;
      text-decoration: none;
      z-index: 1;
      font-family: $sans-stack;
      text-transform: uppercase;
    }
  }

  .magazine {
    background-color: $hotpink;
  }

  .bureau {
    background-color: $neongreen;
  }

  .landing {
    display: none;
  }
</style>

<div class="splash-text {section}">
  <div>
    {@html section === 'magazine' ? magazineText : bureauText}
  </div>
</div>

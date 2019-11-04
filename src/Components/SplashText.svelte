<script>
  // # # # # # # # # # # # # #
  //
  //  Splash Text
  //
  // # # # # # # # # # # # # #

  // *** PROPS
  export let section = "landing";

  const magazineText =
    "<em class='splash-header'>Novembre Magazine</em> is a printed magazine published biannually, devoted to the vertiginous excitement of contemporary urban life.";
  const bureauText =
    "<em class='splash-header'>Novembre Bureau</em> serves as an inter-disciplinary creative agency that harnesses the cultural capital of Novembre Global to provide tailor-made and bespoke creative services for media outlets, independent labels, institutions, and international luxury brand.";
</script>

<style lang="scss">
  @import "../variables.scss";

  .splash-text {
    opacity: 1;
    overflow: hidden;
    height: auto;
    width: 100vw;
    padding: $small-margin;
    padding-top: 180px;
    display: flex;
    align-items: flex-end;

    @include screen-size("small") {
      padding-top: 160px;
    }

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

      @include screen-size("small") {
        font-size: $mobile-large;
      }
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

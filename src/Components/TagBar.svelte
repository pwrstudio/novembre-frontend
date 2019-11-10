<script>
  // # # # # # # # # # # # # #
  //
  //  TAGBAR
  //
  // # # # # # # # # # # # # #

  // *** PROPS
  export let text = "";
</script>

<style lang="scss">
  @import "../variables.scss";

  .tagbar {
    height: 96px;
    font-family: $sans-stack;
    font-size: $large;
    font-weight: 300;
    text-transform: uppercase;
    line-height: 0.8em;
    padding-bottom: $small-margin;
    padding-top: $small-margin;
    position: fixed;
    top: 75px;
    width: 100%;
    left: 0;
    overflow: hidden;
    z-index: 99;

    @include screen-size("small") {
      font-size: $mobile_large;
      padding-bottom: $small-margin;
      padding-top: $small-margin;
      height: 67px;
    }

    width: 100%;
    background: black;
    color: white;
    opacity: 1;
    transition: opacity 0.3s ease-out, transform 0.3s ease-out;
  }

  .item {
    display: inline-block;
    margin-right: 30px;
    white-space: nowrap;
    height: auto;
    overflow: visible;
    padding-top: 3px;

    span {
      cursor: pointer;
      border-bottom: 2px solid transparent;
    }

    @include screen-size("small") {
      margin-right: 20px;
    }
  }

  .inner {
    height: 96px;
    width: 100%;
    font-family: $sans-stack;
    font-size: $large;
    font-weight: 300;
    line-height: 1.4em;
    margin-left: $small-margin;

    @include screen-size("small") {
      font-size: $mobile_large;
      padding-bottom: 3px;
    }
  }
</style>

<div class="tagbar">
  <div class="inner">
    <div class="item">{text}</div>
  </div>
</div>

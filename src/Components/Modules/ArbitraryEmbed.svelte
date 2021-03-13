<script>
    // # # # # # # # # # # # # #
    //
    // ARBITRARY EMBED
    //
    // # # # # # # # # # # # # #
    
    // *** PROPS
    // export let  = false;
    export let code = "";
    // export let backgroundColor = false;

    // console.log('ARBITRARY EMBED: code =>', code)
  </script>
  
  <style lang="scss">
    @import "../../variables.scss";
  
    .embed {
      color: $white;
      margin-bottom: $large-vertical-margin;
      cursor: pointer;
      display: flex;
      justify-content: center;
      align-items: center;
  
      padding-bottom: $small-vertical-margin;
      padding-top: $small-vertical-margin;
  
      width: 100vw;
  
      &.fullscreen {
        height: 100vh;
      }
  
      .inner {
        width: 720px;
  
        @include screen-size("small") {
          width: 480px;
        }
  
        iframe {
          width: 100%;
        }
      }
    }
  </style>
  
  <div class="embed">
    <div class="inner">
        {@html code}
    </div>
  </div>
  
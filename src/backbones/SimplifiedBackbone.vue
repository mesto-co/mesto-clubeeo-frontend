<template>
  <main class='simplified-backbone'>

    <aside>

      <slot name='aside' />

    </aside>

    <section>

      <slot />

    </section>
  </main>

</template>

<style lang='scss'>

main.simplified-backbone {
  margin: 0 auto;
  display: flex;

  overflow: hidden;

  //section {
  //  @media (min-width: $breakpoint-xs-max) {
  //    overflow-y: scroll;
  //    width: 100%;
  //    height: 100vh;
  //  }
  //
  //  .content-wrapper {
  //    display: flex;
  //    flex-direction: column;
  //    justify-content: space-between;
  //    width: 100%;
  //  }
  //}


  section {
    //min-width: 100%;

    //@media (min-width: $breakpoint-xs-max) {
    //  overflow-y: scroll;
    //  width: 100%;
    //  //height: 100vh;
    //}
    //
    //.content-wrapper {
    //  display: flex;
    //  flex-direction: column;
    //  justify-content: space-between;
    //  width: 100%;
    //
    //  @media (max-width: $breakpoint-xs-max) {
    //    min-height: 100%;
    //  }
    //  @media (min-width: $breakpoint-xs-max) {
    //    min-height: 100%;
    //  }
    //}
  }

  aside {
    //display: flex;
    flex-direction: column;
    justify-content: space-between;
    flex-grow: 1;
    padding: 0 30px;
    display: flex;

    @media (min-width: $breakpoint-xs-max) {
      display: flex;
      width: 299px;
      min-width: 299px;
      height: 100vh;
      padding: 0;
    }

  }
}

</style>

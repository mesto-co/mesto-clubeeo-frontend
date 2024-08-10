<template>
  <main class="clubeeo-wrapper">
    <section class="main-content-section">
      <div class="content-wrapper">
        <slot />

        <!--        <home-page2-->
        <!--          heroMinHeight='115px'-->
        <!--          :showSocialLinks='club && club.settings && !club.settings.hideSocialLinks'-->
        <!--        />-->
      </div>
    </section>

    <aside class="token-gate-invite">
      <slot name="aside" />

      <!--      <club-aside-proxy-->
      <!--        :aside-component='club && club.settings && club.settings.asideComponent'-->
      <!--        @reload='onAsideReload'-->
      <!--      />-->
    </aside>
  </main>
</template>

<style lang="scss">
main.clubeeo-wrapper {
  margin: 0 auto;
  display: flex;

  overflow: hidden;

  @media (max-width: $breakpoint-xs-max) {
    display: flex;
    flex-direction: column-reverse !important;
    min-height: 100vh;
  }

  section.main-content-section {
    @media (min-width: $breakpoint-xs-max) {
      overflow-y: scroll;
      width: 100%;
      //height: 100vh;
    }

    .content-wrapper {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      width: 100%;

      @media (max-width: $breakpoint-xs-max) {
        min-height: 100%;
      }
      @media (min-width: $breakpoint-xs-max) {
        min-height: 100%;
      }
    }
  }

  aside.token-gate-invite {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    flex-grow: 1;

    background-color: #212121;
    padding: 0 30px;
    //padding: 210px 30px 30px;

    font-weight: 600;
    color: #ffffff;

    @media (min-width: $breakpoint-xs-max) {
      width: 534px;
    }

    h1,
    h2,
    h3,
    h4,
    h5,
    h6 {
      margin: 0;
      font-weight: 600;
    }

    ol {
      font-size: 16px;
      line-height: 21px;

      li {
        margin-bottom: 18px;
      }
    }
  }
}
</style>

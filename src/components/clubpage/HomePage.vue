<template>

  <div class='home-page'>
    <club-hero />

    <h1>
      {{ club.name }}
    </h1>

    <div class='description-wrapper'>
      <div
        v-html='club.description'
      />
    </div>

    <buy-link-btn
      :buy-links='club.buyLinks'
    />
  </div>

  <div class='text-center q-pa-md'>
    <div>
      <social-links
        :social-links='club.socialLinks'
      />
    </div>

    <div
      v-if='club.website'
      class='clubpage-website'
    >
      <site-link
        :url='club.website'
      />
    </div>
  </div>

</template>

<style lang='scss'>

.home-page {

  div.logo-wrapper {
    display: flex;
    justify-content: center;
    margin-top: -60px;
    z-index: 1;
    position: relative;
    margin-bottom: 9px;
  }

  h1 {
    text-align: center;
    font-weight: 700;
    font-size: 32px;
    line-height: 42px;

    letter-spacing: 1px;

    color: #212121;
  }

  div.description-wrapper {
    margin: 0 8vw;
    text-align: center;

    > div {
      text-align: left;
      max-width: 550px;
      display: inline-block;
    }
  }

  .clubpage-website {
    margin-top: 12px;
  }

}

</style>

<script lang='ts'>
import SiteLink from './SiteLink.vue';
import SocialLinks from './SocialLinks.vue';
import BuyLinkBtn from './BuyLinkBtn.vue';
import { defineComponent, inject, onMounted } from 'vue';
import { state } from 'src/state';
import ClubHero from 'components/clubpage/ClubHero.vue';

export default defineComponent({
  components: { ClubHero, BuyLinkBtn, SocialLinks, SiteLink },
  setup() {
    const clubStyle = inject('clubStyle');

    onMounted(async () => {
      await state.$club.loadClub();
    })

    return {
      club: state.$club.club,
      meInClub: state.$club.meInClub,
      clubStyle,
    }
  }
});
</script>

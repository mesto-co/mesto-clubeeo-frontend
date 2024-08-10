<template>
  <club-page>
    <!--    :header='`${meInClub.screenName || ""} @ ${club.name || ""}`'-->
    <!--    :loading='!clubLoaded'-->
    <!--  >-->
    <!--    <club-hero-->
    <!--      max-height='120px'-->
    <!--      :show-logo='false'-->
    <!--    />-->

    <div class="q-mt-sm q-mb-md text-center">
      <!--      <div class='text-h5 q-pb-sm'>{{ meInClub.screenName }}</div>-->
      <!--      I'm active contributor in Demo Club community<br />-->
      <!--      💜  Demo Club ✌️-->
    </div>

    <div class="text-center q-mb-md">
      <!--      <social-links-->
      <!--        :social-links='{}'-->
      <!--      />-->
    </div>

    <!--    <div>Active wallet: {{ shortenAddressOnChain(meInClub.mainWallet) }}</div>-->
  </club-page>
</template>

<script lang="ts">
import { defineComponent, onMounted } from 'vue';
import ClubPage from '@components/clublayout/ClubPage.vue';
import { shortenAddressOnChain } from '@src/lib/components/chains';

export default defineComponent({
  components: { ClubPage },
  setup() {
    const load = async () => {
      // meLoaded.value = false;
      // const result = await getClubGraphql(slug.value);
      // me.value = result.club;
      // meLoaded.value = true;
    };

    onMounted(load);

    return {
      // clubStyle,
      // club,
      // clubLoaded,
      // meInClub: computed(() => club.value.meInClub || {}),
      shortenAddressOnChain,
    };
  },
});
</script>

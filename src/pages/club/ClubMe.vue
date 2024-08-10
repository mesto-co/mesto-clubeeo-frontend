<template>
  <club-page
    :header="`${meInClub.screenName || ''} @ ${club.name || ''}`"
    :loading="!clubLoaded"
  >
    <club-hero max-height="120px" :show-logo="false" />

    <div class="q-mt-sm q-mb-md text-center">
      <div class="text-h5 q-pb-sm">{{ meInClub.screenName }}</div>
      <!--      I'm active contributor in Demo Club community<br />-->
      <!--      💜  Demo Club ✌️-->
    </div>

    <div class="text-center q-mb-md">
      <social-links :social-links="{}" />
    </div>

    <!--    <hr style='border-top: 0; width: 90%' />-->

    <div class="q-pb-md">
      Active wallet: {{ shortenAddressOnChain(meInClub.mainWallet) }}
    </div>

    <div
      v-for="badge in userData.user.badges"
      :key="badge.id"
      class="inline-block q-mb-md"
    >
      <badge-renderer :badge="badge" size="120px" />
    </div>

    <!--    <div class='q-mb-md'>-->
    <!--      My community pass:-->
    <!--    </div>-->

    <!--    <div class='flex q-mb-md'>-->
    <!--      <q-card style='width: 180px; border-radius: 12px; background-color: rgb(29, 29, 39)' class='q-mr-md' flat>-->
    <!--        <q-img-->
    <!--          src='https://img.rarible.com/prod/video/upload/t_video_thumb_preview/prod-itemAnimations/0x7171965c9eb3ece226cca9f7eb2f0542e5c35366:72475762466921778884703330387740705564141322443071743540995683200273523671043/2e55ab85tv1'-->
    <!--        />-->

    <!--        <q-card-section class='text-center'>-->
    <!--          <div>Demo Club</div>-->
    <!--          <q-badge class='clubButtonActive q-ml-xs'>premium</q-badge><br />-->
    <!--          <small>-->
    <!--            &lt;!&ndash;            amount: 1<br />&ndash;&gt;-->
    <!--            0x717...5366 @ ethereum-->
    <!--          </small>-->
    <!--        </q-card-section>-->
    <!--      </q-card>-->
    <!--    </div>-->
  </club-page>
</template>

<script lang="ts">
import {
  computed,
  defineComponent,
  inject,
  onMounted,
  Ref,
  ref,
  watch,
} from 'vue';
import ClubPage from '@components/clublayout/ClubPage.vue';
import { getClubGraphql, ILoadedClub } from '@src/api/clubGraphql';
import { useRoute } from 'vue-router';
import { IClubStyle } from '@src/models/clubStyle';
import ClubHero from '@components/clubpage/ClubHero.vue';
import SocialLinks from '@components/clubpage/SocialLinks.vue';
import { shortenAddressOnChain } from '@src/lib/components/chains';
import BadgeRenderer from '@components/renderers/BadgeRenderer.vue';
import { ILoadMemberResponse, loadMe } from '@src/api/clubApi';

export default defineComponent({
  components: { BadgeRenderer, SocialLinks, ClubHero, ClubPage },
  setup() {
    const $route = useRoute();

    const slug = computed(() =>
      $route.params.clubSlug ? String($route.params.clubSlug) : null
    );
    const clubStyle = inject('clubStyle') as Ref<IClubStyle>;

    const clubLoaded = ref(false);
    const club = ref<Partial<ILoadedClub>>({});

    const userData = ref<Partial<ILoadMemberResponse>>({});

    const load = async () => {
      if (slug.value) {
        clubLoaded.value = false;

        const result = await getClubGraphql(slug.value);
        club.value = result.club;

        userData.value = await loadMe({ clubSlug: slug.value });

        clubLoaded.value = true;
      }
    };

    onMounted(load);
    watch(slug, async () => {
      await load();
    });

    return {
      clubStyle,
      club,
      clubLoaded,
      userData,
      meInClub: computed(() => club.value.meInClub || {}),
      shortenAddressOnChain,
    };
  },
});
</script>

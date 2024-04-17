<template>
  <club-page
    header='member'
    sticky='bottom'
  >
    <template v-if='userData && userData.user'>
      <h4>{{ userData.user.screenName }}</h4>

      <div
        class='q-mb-lg'
      >
        <member-roles-manager
          :club-slug='clubSlug'
          :member-id='memberId'
          :user-data='userData'
          @saved='onLoad'
        />
      </div>

      <div
        class='q-mb-lg'
      >
        <member-badges-manager
          :club-slug='clubSlug'
          :user-id='memberId'
          :user-data='userData'
          @saved='onLoad'
        />
      </div>

    </template>
  </club-page>

</template>

<script lang='ts'>

import { defineComponent, onMounted, ref, watch } from 'vue';
import { useRoute } from 'vue-router';
import { state } from 'src/state';
import ClubPage from 'components/clublayout/ClubPage.vue';
import { ILoadMemberResponse, loadMember } from 'src/api/clubApi';
import MemberRolesManager from 'components/dashboard/member/MemberRolesManager.vue';
import MemberBadgesManager from 'components/dashboard/member/MemberBadgesManager.vue';
import { requireParam } from 'src/uses/useAppRoute';

export default defineComponent({
  components: { MemberBadgesManager, MemberRolesManager, ClubPage },
  setup() {
    const $route = useRoute();

    const clubSlug = requireParam('clubSlug');
    const memberId = requireParam('memberId');

    const userData = ref<Partial<ILoadMemberResponse>>({});

    const onLoad = async () => {
      await state.$club.loadClub();

      userData.value = await loadMember({
        clubSlug: clubSlug.value,
        memberId: memberId.value
      });
    };

    onMounted(async () => {
      await onLoad();
    });
    watch($route, onLoad, { deep: true });

    return {
      clubSlug,
      memberId,
      userData,
      club: state.$club,
      onLoad
    };
  }
});
</script>

<template>
  <q-page class='clubPage'>

    <div>
      <div class='text-h6 q-pb-md'>member</div>

      <div v-if='!club.isLoading.value'>
        <club-button
          class='clubButtonActive q-ma-md'
          @click='syncUserClub'
        >Sync User</club-button>

        <club-button
          class='clubButtonActive q-ma-md'
          @click='syncUserClubDiscord'
        >Sync User Discord</club-button>
      </div>

    </div>

  </q-page>
</template>

<script lang='ts'>
// import { defaultPagination } from 'src/lib/components/table';
import { computed, defineComponent, onMounted } from 'vue';
import { api } from 'boot/axios';
import { useRoute } from 'vue-router';
import { state } from 'src/state';
import ClubButton from 'components/clubpage/ClubButton.vue';
import { Notify } from 'quasar';

export default defineComponent({
  components: { ClubButton },
  setup() {
    const $route = useRoute();

    const userId = computed(() => $route.params.userId ? String($route.params.userId) : null);

    const syncUserClub = async () => {
      if (!userId.value) return console.warn('No userId.value');

      const result = await api.post<{
        data: {
          syncUserClub: boolean
        }
      }>('/graphql', {
        query: `mutation syncUserClub($clubId:ID!, $userId:ID!) {
          syncUserClub(clubId:$clubId, userId:$userId)
        }`,
        variables: {
          clubId: state.$club.club.id,
          userId: Number(userId.value),
        }
      });

      console.log(result);

      Notify.create({
        message: result.data.data.syncUserClub ? 'User is member' : 'User is not a member'
      });
    };

    const syncUserClubDiscord = async () => {
      const result = await api.post<{
        data: {
          syncUserClubDiscord: boolean
        }
      }>('/graphql', {
        query: `mutation syncUserClubDiscord($clubId:ID!, $userId:ID!) {
          syncUserClubDiscord(clubId:$clubId, userId:$userId)
        }`,
        variables: {
          clubId: state.$club.club.id,
          userId: Number(userId.value),
        }
      });

      Notify.create({
        message: result.data.data.syncUserClubDiscord ? '+' : '-'
      });
    };

    //
    // const users = ref<IFetchedUser[]>([]);

    // const club = ref<Partial<IFetchedClub>>({});

    onMounted(async () => {
      await state.$club.loadClub();
    });


    return {
      club: state.$club,
      syncUserClub,
      syncUserClubDiscord,
    };
  }
});
</script>

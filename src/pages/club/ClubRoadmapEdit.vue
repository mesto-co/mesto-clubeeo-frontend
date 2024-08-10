<template>
  <club-page header="edit roadmap" sticky="bottom" :loading="!isRoadmapLoaded">
    <template v-slot:buttons>
      <club-button
        class="clubButton buttonSecondary q-px-md q-mr-md"
        :class="{}"
        :to="{ name: 'club-home' }"
        dense
        >cancel</club-button
      >

      <club-button
        class="clubButtonActive q-px-md q-mr-md"
        dense
        @click="preview = !preview"
        >{{ preview ? 'edit' : 'preview' }}</club-button
      >

      <club-button class="clubButtonActive q-px-md" dense @click="onSaveClicked"
        >save</club-button
      >
    </template>

    <!--    <template v-if='club'>-->

    <roadmap-editor v-if="!preview" v-model="roadmap" />

    <roadmap-viewer v-else v-model="roadmap" />

    <!--    </template>-->
  </club-page>
</template>

<style lang="scss">
.q-uploader__header {
  background: linear-gradient(
    45deg,
    rgba(rgb(0, 76, 255), 0.5),
    rgba(rgb(135, 28, 255), 0.5)
  );
}
</style>

<script lang="ts">
import { computed, defineComponent, onMounted, ref } from 'vue';
import { api } from 'boot/axios';
import { useRoute, useRouter } from 'vue-router';
import ClubButton from '@components/clubpage/ClubButton.vue';
import { Notify } from 'quasar';
import { mapSocialToIcon } from '@src/lib/components/socials';
import ClubPage from '@components/clublayout/ClubPage.vue';
import RoadmapEditor from '@components/clubpage/RoadmapEditor.vue';
import RoadmapViewer from '@components/clubpage/RoadmapViewer.vue';
import { IRoadmapEntry } from '@src/models/roadmapModel';
import { clubRoadmapPartial } from '@src/lib/api/graphqlPartials';

export default defineComponent({
  components: { RoadmapViewer, RoadmapEditor, ClubPage, ClubButton },
  setup() {
    const $route = useRoute();
    const $router = useRouter();

    // const clubStore = useClubStore();

    // const roadmap = ref<ILoadedRoadmap | null>(null);

    const slug = computed(() =>
      $route.params.clubSlug ? String($route.params.clubSlug) : null
    );

    const roadmap = ref<IRoadmapEntry[]>([]);
    const club = ref<{ id: number } | null>(null);

    // const clubStore = useClubStore();
    onMounted(async () => {
      await load();
    });

    const load = async () => {
      if (!slug.value) return;

      const result = await api.post<{
        data: {
          club: {
            id: number;
            roadmap: {
              entries: IRoadmapEntry[];
            };
          };
        };
      }>('/graphql', {
        query: `{
          club(slug: "${slug.value}") {
            id
            roadmap ${clubRoadmapPartial}
          }
        }`,
      });

      const clubData = result.data.data.club;

      club.value = clubData;
      roadmap.value = clubData.roadmap?.entries || [];

      if (roadmap.value.length === 0) {
        // add empty roadmap entry to be filled by user
        roadmap.value = [{ title: '', text: '', when: '' }];
      }
    };

    const onSaveClicked = async () => {
      if (!club.value) return;

      await api.post('/graphql', {
        query: `mutation saveClubRoadmap($id:ID!, $input:SaveClubInput!) {
          saveClub(id:$id, input:$input) {
            id
          }
        }`,
        variables: {
          id: club.value.id,
          input: {
            roadmap: {
              entries: roadmap.value,
            },
          },
        },
      });

      Notify.create({
        type: 'dark',
        message: 'data is updated',
        position: 'top-right',
      });
      await $router.push({ name: 'club-home' });
    };

    // specific

    const preview = ref(false);

    const isRoadmapLoaded = true;

    return {
      roadmap,
      preview,
      mapSocialToIcon,
      onSaveClicked,
      isRoadmapLoaded,
    };
  },
});
</script>

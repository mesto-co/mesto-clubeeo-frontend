<template>
  <club-page
    header='trigger'
    sticky='top'
    :loading='clubLoader.isLoading.value'
    :back-link='{name: "club-automation"}'
  >
    <template v-slot:buttons>
      <club-button label='dry run' class='clubButtonActive q-mr-sm' @click='onDryRunClick' />
      <club-button label='save trigger' class='clubButtonActive' @click='onCreate' />
    </template>

    <trigger-editor />

  </club-page>

</template>

<script lang='ts'>
import ClubPage from 'src/components/clublayout/ClubPage.vue';
import { defineComponent } from 'vue';
import { meInClubPartial } from 'src/models/meInClub';
import ClubButton from 'components/clubpage/ClubButton.vue';
import { requireParam } from 'src/uses/useAppRoute';
import { useLoadGraphql } from 'src/uses/useLoaders';
import TriggerEditor from 'src/modules/automation/components/TriggerEditor.vue';
import { useTriggerDryRunStore, useTriggerStore } from 'src/modules/automation/useTriggerStore';
import { useRouter } from 'vue-router';

export default defineComponent({
  components: { TriggerEditor, ClubButton, ClubPage },
  setup() {
    // const club = ref<ILoadedClub | null>(null);
    const $router = useRouter();
    const clubSlug = requireParam('clubSlug');
    const trigger = useTriggerStore();
    const triggerDryRun = useTriggerDryRunStore();

    const clubLoader = useLoadGraphql({
      query: () => `{
        club(slug:"${clubSlug.value}") {
          id
          name
          meInClub ${meInClubPartial}
        }
      }`,
      key: 'club',
    });

    const onCreate = async () => {
      const result = await trigger.create(clubSlug.value);
      if (result?.ok) {
        await $router.push({
          name: 'club-automation-trigger-edit',
          params: {
            triggerId: result.trigger.id,
          }
        });
      }
    }

    const onDryRunClick = async () => {
      await triggerDryRun.dryRun(clubSlug.value);
    }


    return {
      clubSlug,
      trigger,
      clubLoader,

      onCreate,
      onDryRunClick,
    };
  }
})
</script>

<template>
  <club-page
    header="trigger"
    sticky="top"
    :loading="trigger.isLoading"
    :back-link="{ name: 'club-automation' }"
  >
    <template v-slot:buttons>
      <!--      <club-button label='dry run' class='clubButtonActive q-mr-sm' @click='onDryRunClick' />-->
      <club-button
        label="save trigger"
        class="clubButtonActive"
        @click="onCreate"
      />
    </template>

    <app-trigger-editor />
  </club-page>
</template>

<script lang="ts">
import ClubPage from '@src/components/clublayout/ClubPage.vue';
import { defineComponent, onMounted } from 'vue';
import ClubButton from '@components/clubpage/ClubButton.vue';
import { requireParam } from '@src/uses/useAppRoute';
import { useTriggerDryRunStore } from '@src/modules/automation/useTriggerStore';
import { useRouter } from 'vue-router';
import AppTriggerEditor from '@src/modules/automation/components/AppTriggerEditor.vue';
import { useAppTriggerStore } from '@src/modules/automation/useAppTriggerStore';

export default defineComponent({
  components: { AppTriggerEditor, ClubButton, ClubPage },
  setup() {
    const $router = useRouter();
    const clubSlug = requireParam('clubSlug');
    const trigger = useAppTriggerStore();
    const triggerDryRun = useTriggerDryRunStore();

    const reset = () => {
      if (!clubSlug.value) return;
      trigger.reset();
    };
    onMounted(reset);

    const onCreate = async () => {
      const result = await trigger.create(clubSlug.value);
      if (result?.ok) {
        await $router.push({
          name: 'club-automation-trigger-edit',
          params: {
            triggerId: result.trigger.id,
          },
        });
      }
    };

    const onDryRunClick = async () => {
      await triggerDryRun.dryRun(clubSlug.value);
    };

    return {
      clubSlug,
      trigger,

      onCreate,
      onDryRunClick,
    };
  },
});
</script>

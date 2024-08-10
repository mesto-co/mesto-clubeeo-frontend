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
        @click="onSave"
      />
    </template>

    <app-trigger-editor />
  </club-page>
</template>

<script lang="ts">
import ClubPage from '@src/components/clublayout/ClubPage.vue';
import { defineComponent, onMounted, watch } from 'vue';
import ClubButton from '@components/clubpage/ClubButton.vue';
import { requireParam } from '@src/uses/useAppRoute';
import { useTriggerDryRunStore } from '@src/modules/automation/useTriggerStore';
import AppTriggerEditor from '@src/modules/automation/components/AppTriggerEditor.vue';
import { useAppTriggerStore } from '@src/modules/automation/useAppTriggerStore';

export default defineComponent({
  components: { AppTriggerEditor, ClubButton, ClubPage },
  setup() {
    const clubSlug = requireParam('clubSlug');
    const triggerId = requireParam('triggerId');

    const trigger = useAppTriggerStore();
    const triggerDryRun = useTriggerDryRunStore();

    const load = async () => {
      if (!triggerId.value) return;
      if (!clubSlug.value) return;
      await trigger.load(clubSlug.value, triggerId.value);
    };
    onMounted(load);
    watch([clubSlug, triggerId], load);

    const onSave = async () => {
      await trigger.save(clubSlug.value);
    };

    const onDryRunClick = async () => {
      await triggerDryRun.dryRun(clubSlug.value);
    };

    return {
      clubSlug,
      trigger,

      onSave,
      onDryRunClick,
    };
  },
});
</script>

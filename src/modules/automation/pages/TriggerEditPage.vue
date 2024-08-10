<template>
  <club-page
    header="trigger"
    sticky="top"
    :back-link="{ name: 'club-automation' }"
  >
    <template v-slot:buttons>
      <club-button
        label="dry run"
        class="clubButtonActive q-mr-sm"
        @click="onDryRunClick"
      />
      <club-button
        label="save trigger"
        class="clubButtonActive"
        @click="onSave"
      />
    </template>

    <trigger-editor />
  </club-page>
</template>

<script lang="ts">
import ClubPage from '@src/components/clublayout/ClubPage.vue';
import { defineComponent, onMounted, watch } from 'vue';
import ClubButton from '@components/clubpage/ClubButton.vue';
import { requireParam } from '@src/uses/useAppRoute';
import TriggerEditor from '@src/modules/automation/components/TriggerEditor.vue';
import {
  useTriggerDryRunStore,
  useTriggerStore,
} from '@src/modules/automation/useTriggerStore';

export default defineComponent({
  components: { TriggerEditor, ClubButton, ClubPage },
  setup() {
    // const club = ref<ILoadedClub | null>(null);
    const clubSlug = requireParam('clubSlug');
    const triggerId = requireParam('triggerId');
    const trigger = useTriggerStore();
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

<template>
  <div class="row">
    <q-input
      dark
      outlined
      label="trigger name"
      class="col q-pb-md"
      v-model="triggerStore.name"
    />

    <div class="col-auto q-pl-lg">
      <q-toggle
        color="primary"
        checked-icon="check"
        unchecked-icon="clear"
        v-model="triggerStore.enabled"
      /><br />
      {{ triggerStore.enabled ? 'enabled' : 'disabled' }}
    </div>
  </div>

  <q-card dark class="q-mb-md clubCard">
    <q-card-section>
      <app-binding-editor
        mode="event"
        :club-slug="clubSlug"
        v-model:selected-app="triggerStore.sourceApp"
        v-model:selected-binding="triggerStore.eventType"
        v-model:props="eventProps"
      />
    </q-card-section>
  </q-card>

  <div class="q-mb-md text-center">
    <q-icon name="fas fa-arrow-down" size="sm" />
  </div>

  <c-select
    label="processing type"
    class="q-mb-md"
    v-model="triggerStore.processingType"
    map-options
    emit-value
    :options="processingTypeOptions"
  />

  <template v-if="processingTypeOption">
    <q-input
      v-if="processingTypeOption.showData"
      dark
      outlined
      label="static data"
      v-model="triggerStore.processingDataInput"
      type="textarea"
      class="q-mb-md text-mono"
    />

    <q-input
      v-if="processingTypeOption.showOpts"
      dark
      outlined
      label="processing settings"
      v-model="triggerStore.processingOptsInput"
      type="textarea"
      class="q-mb-md text-mono"
    />

    <q-input
      v-if="processingTypeOption.showCode"
      dark
      outlined
      label="code"
      v-model="triggerStore.processingCodeInput"
      type="textarea"
      class="q-mb-md text-mono"
    >
      <template v-slot:append>
        <q-btn
          flat
          dense
          round
          icon="fa-regular fa-circle-question"
          @click="isCodeHelpShown = true"
        />
      </template>
    </q-input>

    <q-dialog v-model="isCodeHelpShown">
      <trigger-code-help />
    </q-dialog>
  </template>

  <div class="q-mb-md text-center">
    <q-icon name="fas fa-arrow-down" size="sm" />
  </div>

  <q-card dark class="q-mb-md q-pb-none clubCard">
    <q-card-section>
      <app-binding-editor
        mode="action"
        :club-slug="clubSlug"
        v-model:selected-app="triggerStore.targetApp"
        v-model:selected-binding="triggerStore.actionType"
        v-model:props="actionProps"
      />
    </q-card-section>
  </q-card>
</template>

<script lang="ts">
import { computed, defineComponent, ref, toRef } from 'vue';

import {
  processingTypeOptions,
  processingTypeOptionsMap,
} from '@src/modules/automation/triggerDefinitions';
import { useAppTriggerStore } from '@src/modules/automation/useAppTriggerStore';
import { requireParam } from '@src/uses/useAppRoute';

import AppBindingEditor from '@src/modules/automation/components/AppBindingEditor.vue';
import CSelect from '@src/components/elements/CSelect.vue';
import TriggerCodeHelp from '@src/modules/automation/components/TriggerCodeHelp.vue';

export default defineComponent({
  components: { AppBindingEditor, TriggerCodeHelp, CSelect },
  emits: ['update:modelValue'],
  setup() {
    const triggerStore = useAppTriggerStore();

    const processingTypeOption = computed(() =>
      triggerStore?.processingType
        ? processingTypeOptionsMap[triggerStore.processingType]
        : null
    );

    const clubSlug = requireParam('clubSlug');
    const eventProps = toRef(triggerStore, 'eventProps');
    const actionProps = toRef(triggerStore, 'actionProps');

    return {
      triggerStore,
      clubSlug,

      processingTypeOption,
      processingTypeOptions,

      eventProps,
      actionProps,

      isCodeHelpShown: ref(false),
    };
  },
});
</script>

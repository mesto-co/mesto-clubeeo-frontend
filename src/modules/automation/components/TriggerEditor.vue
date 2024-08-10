<template>
  <q-input
    dark
    outlined
    label="trigger name"
    class="q-pb-md"
    v-model="value.name"
  />

  <q-card dark class="q-mb-md clubCard">
    <q-card-section>
      <div class="row q-col-gutter-md">
        <div class="col-sm col-12">
          <c-select
            label="event source"
            v-model="eventSource"
            :options="eventSourceOptions"
          />
        </div>
        <div class="col-sm col-12">
          <c-select
            label="event type"
            v-model="value.eventType"
            map-options
            emit-value
            :disable="!eventSource"
            :options="eventTypeOptions"
          />
        </div>
      </div>

      <div>
        <q-input
          dark
          outlined
          label="sample event data"
          v-model="value.testEventData"
          type="textarea"
          class="q-mt-md text-mono"
        />
      </div>
    </q-card-section>
  </q-card>

  <div class="q-mb-md text-center">
    <q-icon name="fas fa-arrow-down" size="sm" />
  </div>

  <c-select
    label="processing type"
    class="q-mb-md"
    v-model="value.processingType"
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
      v-model="value.processingDataInput"
      type="textarea"
      class="q-mb-md text-mono"
    />

    <q-input
      v-if="processingTypeOption.showOpts"
      dark
      outlined
      label="processing settings"
      v-model="value.processingOptsInput"
      type="textarea"
      class="q-mb-md text-mono"
    />

    <q-input
      v-if="processingTypeOption.showCode"
      dark
      outlined
      label="code"
      v-model="value.processingCodeInput"
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

  <q-card dark class="q-mb-md clubCard">
    <q-card-section>
      <div class="row q-col-gutter-md">
        <div class="col-sm col-12">
          <c-select
            label="task target"
            v-model="taskTarget"
            :options="taskTargetOptions"
          />
        </div>
        <div class="col-sm col-12">
          <c-select
            label="task type"
            v-model="value.taskType"
            map-options
            emit-value
            :disable="!taskTarget"
            :options="taskTypeOptions"
          />
        </div>
      </div>

      <div>
        <q-input
          dark
          outlined
          v-model="value.testTargetData"
          label="sample task data"
          type="textarea"
          class="q-mt-md text-mono"
        />
      </div>
    </q-card-section>
  </q-card>
</template>

<script lang="ts">
import { computed, defineComponent, onMounted, ref, watch } from 'vue';
import { defaultPagination } from '@src/lib/components/table';
import CSelect from '@src/components/elements/CSelect.vue';
import {
  eventSourceOptions,
  eventSourceOptionsMap,
  eventTypeOptionsMap,
  processingTypeOptions,
  processingTypeOptionsMap,
  taskTargetOptions,
  taskTargetOptionsMap,
  taskTypeOptionsMap,
} from '@src/modules/automation/triggerDefinitions';
import { useTriggerStore } from '@src/modules/automation/useTriggerStore';
import TriggerCodeHelp from '@src/modules/automation/components/TriggerCodeHelp.vue';

interface IOption {
  label: string;
  value: string;
  caption: string;
  children?: Array<IOption>;
}

export default defineComponent({
  components: { TriggerCodeHelp, CSelect },
  emits: ['update:modelValue'],
  setup() {
    const value = useTriggerStore();

    // EVENT

    const eventSource = ref<IOption | null>(null);
    const eventTypeOptions = computed(
      () =>
        (eventSource.value?.value
          ? eventSourceOptionsMap[eventSource.value?.value]?.children
          : []) || []
    );
    const pickEventSourceByType = () => {
      const eventTypeOption = eventTypeOptionsMap[value.eventType || ''];
      if (eventTypeOption?.parent?.value)
        eventSource.value =
          eventSourceOptionsMap[eventTypeOption?.parent?.value];
    };
    watch(() => value.eventType, pickEventSourceByType);

    // TASK

    const taskTarget = ref<IOption | null>(null);
    const taskTypeOptions = computed(
      () =>
        (taskTarget.value?.value
          ? taskTargetOptionsMap[taskTarget.value?.value]?.children
          : []) || []
    );
    const pickTaskTargetByType = () => {
      const taskTypeOption = taskTypeOptionsMap[value.taskType || ''];
      if (taskTypeOption?.parent?.value)
        taskTarget.value = taskTargetOptionsMap[taskTypeOption?.parent?.value];
    };
    watch(() => value.taskType, pickTaskTargetByType);

    onMounted(() => {
      pickEventSourceByType();
      pickTaskTargetByType();
    });

    const processingTypeOption = computed(() =>
      value?.processingType
        ? processingTypeOptionsMap[value.processingType]
        : null
    );

    return {
      value,

      defaultPagination,
      eventSource,
      eventSourceOptions,
      eventTypeOptions,

      taskTargetOptions,
      taskTarget,
      taskTypeOptions,

      processingTypeOption,
      processingTypeOptions,

      isCodeHelpShown: ref(false),
    };
  },
});
</script>

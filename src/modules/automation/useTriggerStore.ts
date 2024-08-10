import { defineStore } from 'pinia';
import { Notify } from 'quasar';
import { api } from 'boot/axios';
import { ref } from 'vue';
import { processingTypeOptionsMap } from '@src/modules/automation/triggerDefinitions';

export interface ITrigger {
  id: number | null;
  name: string;
  eventType: string | null;
  taskType: string | null;
  processingType: string | null;
  processingOptsInput: string;
  processingDataInput: string;
  processingCodeInput: string;
  testEventData?: string;
  testTargetData?: string;
}

const triggerStoreDefault = {
  id: null,
  name: '',
  eventType: '',
  taskType: '',
  processingType: '',
  processingOptsInput: '',
  processingDataInput: '',
  processingCodeInput: '',
  testEventData: '',
  testTargetData: '',
};

export const useTriggerDryRunStore = defineStore('trigger-gry-run', () => {
  const $trigger = useTriggerStore();

  const isDryRunning = ref(false);

  const dryRun = async (clubSlug: string) => {
    if (!$trigger.eventType || !$trigger.taskType || !$trigger.processingType) {
      Notify.create({
        type: 'negative',
        message: 'please, complete the form first',
      });
      return;
    }

    isDryRunning.value = true;

    try {
      let processingOpts: Record<string, unknown> = {};
      const processingTypeData =
        processingTypeOptionsMap[$trigger.processingType];
      if (processingTypeData.showOpts)
        processingOpts = JSON.parse($trigger.processingOptsInput) as Record<
          string,
          unknown
        >;
      if (processingTypeData.showCode)
        processingOpts.code = $trigger.processingCodeInput;

      const result = await api.post<{
        ok: boolean;
        data: string | null | Record<string, unknown>;
        taskType: string;
      }>(`/api/club/clubSlug:${clubSlug}/motion/trigger/dry-run`, {
        eventType: $trigger.eventType, //.value.value,
        taskType: $trigger.taskType, //.value.value,
        processingType: $trigger.processingType, //processingType.value.value,
        processingOpts,
        processingData: processingTypeData.showData
          ? (JSON.parse($trigger.processingDataInput) as string)
          : {},
        testEventData: $trigger.testEventData, //.value,
      });

      $trigger.testTargetData = JSON.stringify(result.data.data);
    } catch (e) {
      throw e;
    } finally {
      isDryRunning.value = false;
    }
  };

  return {
    dryRun,
  };
});

export const useTriggerStore = defineStore('trigger', {
  state(): ITrigger {
    return {
      ...triggerStoreDefault,
    };
  },
  actions: {
    reset() {
      Object.assign(this, triggerStoreDefault);
    },
    async load(clubSlug: string, triggerId: string) {
      const result = await api.get<{
        ok: boolean;
        trigger: ITrigger & {
          id: number;
          processor: {
            opts?: Record<string, string>;
          };
        };
      }>(`/api/club/clubSlug:${clubSlug}/motion/trigger/${triggerId}`);

      const trigger = result.data.trigger;
      this.$patch(trigger);
      if (trigger.processor?.opts?.code) {
        this.processingCodeInput = trigger.processor?.opts?.code;
      }

      return trigger;
    },
    async create(clubSlug: string) {
      if (!this.eventType || !this.taskType || !this.processingType) {
        Notify.create({
          type: 'negative',
          message: 'please, complete the form first',
        });
        return;
      }

      // isDryRunning.value = true;

      try {
        let processingOpts: Record<string, unknown> = {};
        const processingTypeData =
          processingTypeOptionsMap[this.processingType];
        if (processingTypeData.showOpts)
          processingOpts = JSON.parse(this.processingOptsInput) as Record<
            string,
            unknown
          >;
        if (processingTypeData.showCode)
          processingOpts.code = this.processingCodeInput;

        const result = await api.post<{
          ok: boolean;
          trigger: {
            id: number;
          };
        }>(`/api/club/clubSlug:${clubSlug}/motion/trigger`, {
          name: this.name,
          eventType: this.eventType, //.value.value,
          taskType: this.taskType, //.value.value,
          processingType: this.processingType, //processingType.value.value,
          processingOpts,
          processingData: processingTypeData.showData
            ? (JSON.parse(this.processingDataInput) as string)
            : {},
          // testEventData: this.testEventData,
          enabled: false,
        });

        if (result.data.ok) {
          Notify.create({ type: 'positive', message: 'trigger is created' });
          this.id = result.data.trigger.id;
        }

        return result.data;
      } catch (e) {
        throw e;
        // } finally {
        //   isDryRunning.value = false;
      }
    },
    async save(clubSlug: string) {
      if (!this.eventType || !this.taskType || !this.processingType) {
        Notify.create({
          type: 'negative',
          message: 'please, complete the form first',
        });
        return;
      }
      if (!this.id) {
        Notify.create({
          type: 'negative',
          message: "can't save: ID is not defined",
        });
        return;
      }

      // isDryRunning.value = true;

      try {
        let processingOpts: Record<string, unknown> = {};
        const processingTypeData =
          processingTypeOptionsMap[this.processingType];
        if (processingTypeData.showOpts)
          processingOpts = JSON.parse(this.processingOptsInput) as Record<
            string,
            unknown
          >;
        if (processingTypeData.showCode)
          processingOpts.code = this.processingCodeInput;

        const result = await api.put<{
          ok: boolean;
          trigger: {
            id: number;
          };
        }>(`/api/club/clubSlug:${clubSlug}/motion/trigger/${this.id}`, {
          name: this.name,
          eventType: this.eventType, //.value.value,
          taskType: this.taskType, //.value.value,
          processingType: this.processingType, //processingType.value.value,
          processingOpts,
          processingData: processingTypeData.showData
            ? (JSON.parse(this.processingDataInput) as string)
            : {},
          testEventData: this.testEventData,
          enabled: false,
        });

        if (result.data.ok) {
          Notify.create({ type: 'positive', message: 'trigger is saved' });
          this.id = result.data.trigger.id;
        }

        return result.data;
      } catch (e) {
        throw e;
        // } finally {
        //   isDryRunning.value = false;
      }
    },
  },
});

import { defineStore } from 'pinia';
import { Notify } from 'quasar';
import { api } from 'boot/axios';
import { processingTypeOptionsMap } from 'src/modules/automation/triggerDefinitions';
import fromEntries from 'fromentries';

export interface ITrigger {
  id: number | null,
  name: string,

  sourceApp: IOption | null,
  eventType: IOption | null,
  eventProps: Record<string, IOption>,

  targetApp: IOption | null,
  actionType: IOption | null,
  actionProps: Record<string, IOption>,

  processingType: string | null,
  processingOptsInput: string,
  processingDataInput: string,
  processingCodeInput: string,
  testEventData?: string,
  testTargetData?: string,

  enabled: boolean,

  isLoading: boolean,
  isSaving: boolean,
}

export interface ITriggerApi {
  id: number | null,
  name: string,

  sourceApp: number | null,
  eventType: string | null,
  eventProps: Record<string, string>,

  targetApp: number | null,
  actionType: string | null,
  actionProps: Record<string, string>,

  processingType: string | null,
  processingOptsInput: string,
  processingDataInput: string,
  processingCodeInput: string,
  testEventData?: string,
  testTargetData?: string,

  isLoading: boolean,
  isSaving: boolean,

  enabled: boolean,
}

export interface IOption {
  label: string,
  value: string,
  caption?: string,
  img?: string,
}

const triggerStoreDefault = {
  id: null,
  name: '',

  sourceApp: null,
  eventType: null,
  eventProps: {},

  targetApp: null,
  actionType: null,
  actionProps: {},

  processingType: 'bypass',
  processingOptsInput: '',
  processingDataInput: '',
  processingCodeInput: '',
  testEventData: '',
  testTargetData: '',

  enabled: false,

  isLoading: false,
  isSaving: false,
}

export const useAppTriggerStore = defineStore('trigger', {
  state(): ITrigger {
    return {
      ...triggerStoreDefault,
    };
  },
  getters: {
    apiData(state: ITrigger) {
      let processingOpts: Record<string, unknown> = {};
      const processingTypeData = state.processingType ? processingTypeOptionsMap[state.processingType] : null;
      if (processingTypeData?.showOpts) processingOpts = JSON.parse(state.processingOptsInput) as Record<string, unknown>;
      if (processingTypeData?.showCode) processingOpts.code = state.processingCodeInput;

      return {
        name: state.name,

        sourceApp: state.sourceApp?.value,
        eventType: state.eventType?.value,
        eventProps: fromEntries(Object.entries(state.eventProps).map(([k,v]) => [k, v.value])),

        targetApp: state.targetApp?.value,
        actionType: state.actionType?.value,
        actionProps: fromEntries(Object.entries(state.actionProps).map(([k,v]) => [k, v.value])),

        processingType: state.processingType,
        processingOpts,
        processingData: processingTypeData?.showData ? JSON.parse(state.processingDataInput) as string : {},

        // testEventData: this.testEventData,
        enabled: state.enabled,
      }
    }
  },
  actions: {
    reset() {
      Object.assign(this, triggerStoreDefault);
    },
    async load(clubSlug: string, triggerId: string) {
      this.$state.isLoading = true;

      try {
        const result = await api.get<{
          ok: boolean,
          trigger: ITriggerApi & {
            id: number,
            processor: {
              opts?: Record<string, string>
            }
          }
        }>(`/api/club/clubSlug:${clubSlug}/motion/trigger/${triggerId}`);

        const data = result.data.trigger;

        const trigger = {
          ...data,
          sourceApp: data.sourceApp ? { value: String(data.sourceApp), label: String(data.sourceApp), } : null,
          targetApp: data.targetApp ? { value: String(data.targetApp), label: String(data.targetApp), } : null,
          eventType: data.eventType ? { value: String(data.eventType), label: String(data.eventType), } : null,
          actionType: data.actionType ? { value: String(data.actionType), label: String(data.actionType), } : null,
          eventProps: fromEntries(Object.entries(data.eventProps).map(([k,v]) => [k, {value: v, label: v}])),
          actionProps: fromEntries(Object.entries(data.actionProps).map(([k,v]) => [k, {value: v, label: v}])),
        };
        this.$patch(trigger);
        if (trigger.processor?.opts?.code) {
          this.processingCodeInput = trigger.processor?.opts?.code;
        }

        return trigger;
      } catch (e) {
        throw e;
      } finally {
        this.$state.isLoading = false;
      }
    },
    async create(clubSlug: string) {
      if (!this.eventType || !this.actionType || !this.processingType) {
        Notify.create({type: 'negative', message: 'please, complete the form first'})
        return;
      }

      // isDryRunning.value = true;

      try {
        this.$state.isSaving = true;

        const result = await api.post<{
          ok: boolean,
          trigger: {
            id: number,
          }
        }>(`/api/club/clubSlug:${clubSlug}/motion/trigger`, {
          ...this.apiData,
        });

        if (result.data.ok) {
          Notify.create({type: 'positive', message: 'trigger is created'});
          this.id = result.data.trigger.id;
        }

        return result.data;
      } catch (e) {
        throw e;
      // } finally {
      //   isDryRunning.value = false;
      } finally {
        this.$state.isSaving = false;
      }
    },
    async save(clubSlug: string) {
      if (!this.eventType || !this.actionType || !this.processingType) {
        Notify.create({type: 'negative', message: 'please, complete the form first'})
        return;
      }
      if (!this.id) {
        Notify.create({type: 'negative', message: 'can\'t save: ID is not defined'});
        return;
      }

      // isDryRunning.value = true;

      try {
        this.$state.isSaving = true;

        const result = await api.put<{
          ok: boolean,
          trigger: {
            id: number,
          }
        }>(`/api/club/clubSlug:${clubSlug}/motion/trigger/${this.id}`, {
          ...this.apiData,
        });

        if (result.data.ok) {
          Notify.create({type: 'positive', message: 'trigger is saved'});
          this.id = result.data.trigger.id;
        }

        return result.data;
      } catch (e) {
        throw e;
        // } finally {
        //   isDryRunning.value = false;
      } finally {
        this.$state.isSaving = false;
      }
    }
  }
});

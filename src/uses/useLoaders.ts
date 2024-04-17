import { WatchSource } from '@vue/runtime-core';
import { onMounted, ref, watch } from 'vue';
import { Ref } from '@vue/reactivity';
import { api } from 'boot/axios';
import { Notify } from 'quasar';

export const useLoad = <T, key extends string>(opts: {
  url: () => string | null | undefined,
  key: key,
  watch?: WatchSource,
  notifyOnError?: boolean,
}) => {
  const data = ref<T | null>(null) as Ref<T | null>;
  const isLoading = ref(true);

  const load = async () => {
    try {
      const url = opts.url();
      // reject reloading if url is not set
      if (!url) return;

      isLoading.value = true;
      data.value = null;

      const respKey = opts.key;
      const result = await api.get<Record<key, T>>(url);
      data.value = result.data[respKey];
    } catch (e) {
      if (opts.notifyOnError || opts.notifyOnError === null) {
        Notify.create({
          type: 'negative',
          message: `error loading ${opts.key}`
        })
      }
      throw e;
    } finally {
      isLoading.value = false;
    }
  };

  onMounted(load);
  watch(opts.watch || opts.url, load);

  return {
    data,
    isLoading,
  };
};

export const useLoadIndex = <T, key extends string>(opts: {
  url: () => string | null | undefined,
  key: key,
  watch?: WatchSource,
  notifyOnError?: boolean,
}) => {
  const data = ref<T[]>([]) as Ref<T[]>;
  const isLoading = ref(true);

  const load = async () => {
    try {
      const url = opts.url();
      // reject reloading if url is not set
      if (!url) return;

      isLoading.value = true;
      data.value = [];

      const respKey = opts.key;
      const result = await api.get<Record<key, T[]>>(url);
      data.value = result.data[respKey];
    } catch (e) {
      if (opts.notifyOnError || opts.notifyOnError === null) {
        Notify.create({
          type: 'negative',
          message: `error loading ${opts.key}`
        })
      }
      throw e;
    } finally {
      isLoading.value = false;
    }
  };

  onMounted(load);
  watch(opts.watch || opts.url, load);

  return {
    data,
    isLoading,
  };
};

export const useLoadGraphql = <T, key extends string>(opts: {
  query: () => string,
  key: key,
  watch?: WatchSource,
  notifyOnError?: boolean,
}) => {
  const data = ref<T[]>([]) as Ref<T[]>;
  const isLoading = ref(true);

  const load = async () => {
    try {
      isLoading.value = true;
      data.value = [];

      const respKey = opts.key;

      const result = await api.post<{
        data: Record<key, T[]>
      }>('/graphql', {
        query: opts.query(),
      });

      data.value = result.data.data[respKey];
    } catch (e) {
      if (opts.notifyOnError || opts.notifyOnError === null) {
        Notify.create({
          type: 'negative',
          message: `error loading ${opts.key}`
        })
      }
      throw e;
    } finally {
      isLoading.value = false;
    }
  };

  onMounted(load);
  watch(opts.watch || opts.query, load);

  return {
    data,
    isLoading,
  };
};

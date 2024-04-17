import { computed } from 'vue';
import { useRoute } from 'vue-router';
import { Notify } from 'quasar';
import { ComputedRef } from '@vue/reactivity';

export const useParam = (paramName: string) => {
  const $route = useRoute();
  return computed(() => $route.params[paramName] ? String($route.params[paramName]) : null);
}

export const requireParam = (paramName: string): ComputedRef<string> => {
  const paramRef = useParam(paramName);
  if (paramRef.value === null) {
    const message = `${paramName} is required`;
    Notify.create({ type: 'negative', message });
    throw Error(message);
  }
  return paramRef as ComputedRef<string>;
}

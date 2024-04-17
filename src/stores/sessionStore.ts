import { defineStore } from 'pinia';
import { useStorage } from '@vueuse/core';
import { LocationQuery } from 'vue-router';

export const useSessionStore = defineStore('session', {
  state: () => {
    return {
      meta: useStorage('sessionMeta', {}),
      sessionId: useStorage<string>('sessionId', () => String(Math.random())),
      query: useStorage('query', () => ({}))
    };
  },
  getters: {
    sessionData: state => {
      return {
        sessionId: state.sessionId,
        query: state.query,
      }
    }
  },
  actions: {
    clearQuery() {
      Object.getOwnPropertyNames(this.query)
        .forEach(property => {
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          delete this.query[property];
        });
    },
    // setQuery(query: LocationQuery, clubSlug: string) {
    setQuery(query: LocationQuery) {
      Object.assign(this.query, query);
      // this.clubSlug.value = clubSlug;
    }
  }
});

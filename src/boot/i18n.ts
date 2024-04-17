import { boot } from 'quasar/wrappers';
import { createI18n } from 'vue-i18n';

import messages from 'src/i18n';
import { createPinia } from 'pinia';
import { markRaw } from 'vue';
// import router from 'src/router';
import { route } from 'quasar/wrappers'

export default boot(({ app }) => {
  const i18n = createI18n({
    locale: 'en-US',
    messages,
  });

  // Set i18n instance on app
  app.use(i18n);

  const pinia = createPinia();
  // pinia.use(({ store }) => {
  //   store.router = markRaw(router)
  // });

  pinia.use(({ store }) => {
    store.route = markRaw(route);
  })

  app.use(pinia);
});

import { boot } from 'quasar/wrappers';

import { createPinia } from 'pinia';
import { markRaw } from 'vue';
import { route } from 'quasar/wrappers';

export default boot(({ app }) => {
  const pinia = createPinia();

  pinia.use(({ store }) => {
    store.route = markRaw(route);
  });

  app.use(pinia);
});

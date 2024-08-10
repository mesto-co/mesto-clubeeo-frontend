import VueHighlightJS from 'vue3-highlightjs';
import 'highlight.js/styles/solarized-light.css';
import { boot } from 'quasar/wrappers';

export default boot(({ app }) => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  app.use(VueHighlightJS);
});

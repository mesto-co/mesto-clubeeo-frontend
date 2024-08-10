import { boot } from 'quasar/wrappers';
import SnippetRenderer from '@components/snippets/SnippetRenderer.vue';

// we globally register our component with Vue
export default boot(({ app }) => {
  app.component('snippet-renderer', SnippetRenderer);
});

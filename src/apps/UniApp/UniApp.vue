<template>
  <club-page header="UniApp" :loading="!isTemplateReady">
    <uni-app-renderer :template="template" :setup-code="setupCode" :styles="styles" />
  </club-page>
  <!-- <club-page header="UniApp"> -->
  <!-- <div> -->
  <!-- <h1>UniApp</h1>
      <div class="demo-render">
        <component :is="renderedComponent" v-if="renderedComponent" />
        <p v-if="compilationError">{{ compilationError }}</p>
        <p v-if="!renderedComponent && !compilationError">Loading component...</p>
      </div>
      <pre>{{ appData }}</pre> -->
  <!-- </div> -->
  <!-- </club-page> -->

  <!-- <profile-app-show v-if="!$route.params.appPage" :app-data="appData" />
  <profile-app-edit
    v-else-if="$route.params.appPage === 'edit'"
    :app-data="appData"
  /> -->
</template>

<script setup>
import { ref, onMounted } from 'vue';
// import { compile } from 'vue/dist/vue.esm-browser.js';
// import { appProps } from '@apps/_common/appProps';
// import ClubPage from '@components/clublayout/ClubPage.vue';
// import { useQuasar } from 'quasar';
import UniAppRenderer from './UniAppRenderer.vue';
import ClubPage from '@components/clublayout/ClubPage.vue';

// const $q = useQuasar();
// const renderedComponent = ref(null);
// const compilationError = ref('');

// Simulate backend response with template, setup code, and styles
// const mockBackendResponse = {
const isTemplateReady = ref(false);
const template = ref('');
const setupCode = ref('');
const styles = ref('');

async function fetchTemplate() {
  await new Promise((resolve) => setTimeout(resolve, 1000));
  template.value = `
      <div class="dynamic-component">
        <button @click="increment" class="custom-button">
          Count is: {{ count }}
        </button>
        <q-input v-model="message" label="Enter message" class="custom-input" />
        <p class="message">{{ message }}</p>
        <button @click="showNotification" class="notification-button">Show Notification</button>
      </div>
    `;
  setupCode.value = `
      const count = ref(0);
      const message = ref('Edit this message!');

      function increment() {
        count.value++;
      }

      function showNotification() {
        $q.notify({
          message: message.value,
          color: 'primary'
        });
      }

      return {
        count,
        message,
        increment,
        showNotification
      }
    `;
  styles.value = `
      .dynamic-component {
        padding: 20px;
        background: #f8f9fa;
        border-radius: 8px;
        box-shadow: 0 2px 4px rgba(0,0,0,0.1);
      }

      .custom-button {
        background: #007bff;
        color: white;
        border: none;
        padding: 10px 20px;
        border-radius: 4px;
        cursor: pointer;
        transition: background 0.3s;
      }

      .custom-button:hover {
        background: #0056b3;
      }

      .custom-input {
        margin: 20px 0;
      }

      .message {
        color: #495057;
        font-size: 1.1em;
        margin: 15px 0;
      }

      .notification-button {
        background: #6c757d;
        color: white;
        border: none;
        padding: 8px 16px;
        border-radius: 4px;
        cursor: pointer;
        transition: background 0.3s;
      }

      .notification-button:hover {
        background: #5a6268;
      }
    `;
  isTemplateReady.value = true;
}

onMounted(async () => {
  await fetchTemplate();
});

// Create style element for dynamic styles
// const styleId = 'dynamic-component-styles';
// const addStyles = (styles) => {
//   // Remove existing styles if they exist
//   const existingStyles = document.getElementById(styleId);
//   if (existingStyles) {
//     existingStyles.remove();
//   }

//   // Create and append new styles
//   const styleElement = document.createElement('style');
//   styleElement.id = styleId;
//   styleElement.textContent = styles;
//   document.head.appendChild(styleElement);
// };

// Add styles immediately
// addStyles(mockBackendResponse.styles);

// const DynamicComponent = defineComponent({
//   name: 'DynamicComponent',
//   setup() {
//     return {
//       ...mockBackendResponse,
//     };
//     // try {
//     //   // Create setup function from backend code
//     //   const setupFn = new Function(
//     //     'ref',
//     //     '$q',
//     //     `
//     //     ${mockBackendResponse.setupCode}
//     //   `,
//     //   );

//     //   // Execute setup with required dependencies
//     //   const setupResult = setupFn(ref, $q);

//     //   // Compile template
//     //   const render = compile(mockBackendResponse.template);

//     //   // Return render function with setup context
//     //   return () => {
//     //     return render({
//     //       ...setupResult,
//     //     });
//     //   };
//     // } catch (error) {
//     //   console.error('Component creation error:', error);
//     //   return () =>
//     //     h('div', [
//     //       h('p', { style: 'color: red' }, `Error: ${error.message}`),
//     //       h('pre', { style: 'background: #f5f5f5; padding: 10px' }, error.stack),
//     //     ]);
//     // }
//   },
//   // Clean up styles when component is unmounted
//   unmounted() {
//     const styleElement = document.getElementById(styleId);
//     if (styleElement) {
//       styleElement.remove();
//     }
//   },
// });

// try {
//   console.log('Creating component...');
//   renderedComponent.value = markRaw(DynamicComponent);
// } catch (error) {
//   compilationError.value = `Component error: ${error.message}`;
//   console.error('Component error:', error);
// }

// const { appData } = appProps;
</script>

<!-- <style>
.demo-render {
  margin: 20px;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 4px;
}
</style> -->

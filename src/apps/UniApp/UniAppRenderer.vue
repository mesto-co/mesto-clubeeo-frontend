<template>
  <div>
    <h1>UniApp</h1>
    <div class="demo-render">
      <component :is="renderedComponent" v-if="renderedComponent" />
      <p v-if="compilationError">{{ compilationError }}</p>
      <p v-if="!renderedComponent && !compilationError">Loading component...</p>
    </div>
    <pre>{{ appData }}</pre>
  </div>
</template>

<script setup>
import { defineComponent, ref, markRaw, h } from 'vue';
import { compile } from 'vue/dist/vue.esm-browser.js';
import { appProps } from '@apps/_common/appProps';
import { useQuasar } from 'quasar';

const props = defineProps({
  template: {
    type: String,
    required: true
  },
  setupCode: {
    type: String,
    required: true
  },
  styles: {
    type: String,
    required: true
  }
});

const $q = useQuasar();
const renderedComponent = ref(null);
const compilationError = ref('');

// Create style element for dynamic styles
const styleId = 'dynamic-component-styles';
const addStyles = (styles) => {
  // Remove existing styles if they exist
  const existingStyles = document.getElementById(styleId);
  if (existingStyles) {
    existingStyles.remove();
  }

  // Create and append new styles
  const styleElement = document.createElement('style');
  styleElement.id = styleId;
  styleElement.textContent = styles;
  document.head.appendChild(styleElement);
};

// Add styles immediately
addStyles(props.styles);

const DynamicComponent = defineComponent({
  name: 'DynamicComponent',
  setup() {
    try {
      // Create setup function from props code
      const setupFn = new Function(
        'ref',
        '$q',
        `
        ${props.setupCode}
      `,
      );

      // Execute setup with required dependencies
      const setupResult = setupFn(ref, $q);

      // Compile template from props
      const render = compile(props.template);

      // Return render function with setup context
      return () => {
        return render({
          ...setupResult,
        });
      };
    } catch (error) {
      console.error('Component creation error:', error);
      return () =>
        h('div', [
          h('p', { style: 'color: red' }, `Error: ${error.message}`),
          h('pre', { style: 'background: #f5f5f5; padding: 10px' }, error.stack),
        ]);
    }
  },
  // Clean up styles when component is unmounted
  unmounted() {
    const styleElement = document.getElementById(styleId);
    if (styleElement) {
      styleElement.remove();
    }
  },
});

try {
  console.log('Creating component...');
  renderedComponent.value = markRaw(DynamicComponent);
} catch (error) {
  compilationError.value = `Component error: ${error.message}`;
  console.error('Component error:', error);
}

const { appData } = appProps;
</script>

<style>
.demo-render {
  margin: 20px;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 4px;
}
</style>

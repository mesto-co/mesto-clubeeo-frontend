<template>
  <q-select
    ref="selectRef"
    outlined
    dark
    use-input
    use-chips
    multiple
    hide-dropdown-icon
    input-debounce="0"
    new-value-mode="add-unique"
    :options="options"
    @filter="fetchOptions"
    v-model="selected"
    v-model:input-value="inputValue"
    @update:model-value="handleSelection"
  />
</template>

<script setup>
import { ref } from 'vue';
import { api } from 'boot/axios';
import axios from 'axios';

const props = defineProps({
  listType: {
    type: String,
    required: true,
  },
  optionsUrl: {
    type: String,
    required: false,
  },
});

const selectRef = ref(null);
const options = ref([]);
const inputValue = ref('');
const selected = ref([]);

// Method to fetch options from the backend based on user input
const fetchOptions = async (val, update, abort) => {
  inputValue.value = val;

  // If no input, reset options
  if (!val) {
    options.value = [];
    update(() => {
      options.value = [];
    });
    return;
  }

  // Cancel previous request if necessary
  if (fetchOptions.previousRequest) {
    fetchOptions.previousRequest.cancel();
  }

  // Define the request
  const source = axios.CancelToken.source();
  fetchOptions.previousRequest = source;

  try {
    const response = await api.get(props.optionsUrl || `/api/lists/${props.listType}/search`, {
      params: {
        take: 20,
        search: val,
      },
      cancelToken: source.token,
    });

    // Update options based on response
    options.value = response.data.data.map((item) => item.name);

    // If no matches found, add the user input as an option
    if (options.value.length === 0) {
      options.value = [val];
    }

    update(() => {
      options.value = options.value;
    });
  } catch (error) {
    if (axios.isCancel(error)) {
      console.log('Previous request canceled:', error.message);
    } else {
      console.error('Error fetching options:', error);
      abort();
    }
  }
};

// Handle selection changes
const handleSelection = () => {
  // Force close the dropdown
  selectRef.value.hidePopup();

  // Get the input element
  const inputEl = selectRef.value.$el.querySelector('input');
  // Blur and clear the native input
  inputEl.blur();
  inputEl.value = '';

  // Dispatch an input event to sync the component
  inputEl.dispatchEvent(new Event('input'));

  // Also clear the reactive ref
  inputValue.value = '';
};
</script>

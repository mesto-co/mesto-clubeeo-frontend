<template>
  <q-select
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

const options = ref([]);

// Method to fetch options from the backend based on user input
const fetchOptions = async (val, update, abort) => {
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
    options.value = response.data.data.map((item) => item.name); // Adjust this according to your API response structure
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
</script>

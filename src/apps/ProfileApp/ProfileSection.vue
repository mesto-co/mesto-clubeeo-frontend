<template>
  <div>
    <div class="text-right">
      {{ label }}
      <q-icon :name="icon" class="q-px-sm" />
    </div>
    <div>
      <q-chip v-for="item in items" :key="item" :label="item" class="q-mb-xs q-px-sm" dense />
    </div>
  </div>
</template>

<script>
export default {
  props: {
    label: {
      type: String,
      required: true,
    },
    items: {
      type: Array,
      required: true,
    },
    icon: {
      type: String,
      default: 'fa-solid fa-circle',
    },
  },
};
</script>

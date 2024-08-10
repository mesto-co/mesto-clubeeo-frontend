<template>
  <div class="row q-col-gutter-md">
    <div v-for="prop in props" :key="prop.key" class="col-12">
      <prop-editor :prop="prop" v-model="model[prop.key]" />
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, PropType } from 'vue';
import { IProp } from '@src/modules/appManager/shared/IAppConfig';
import PropEditor from '@components/dashboard/PropEditor.vue';

export default defineComponent({
  components: { PropEditor },
  props: {
    modelValue: {
      type: Object as PropType<Record<string, string>>,
    },
    props: {
      type: Object as PropType<Record<string, IProp>>,
    },
  },
  emits: ['update:modelValue'],
  setup(props, { emit }) {
    const model = computed({
      get: () => props.modelValue,
      set: (val) => {
        emit('update:modelValue', val);
      },
    });

    return {
      model,
    };
  },
});
</script>

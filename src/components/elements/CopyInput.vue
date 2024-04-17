<template>
  <q-input>
    <template v-slot:after>
      <q-btn
        icon='fa-solid fa-copy' round
        @click='onCopyClick'
      />
    </template>
  </q-input>
</template>


<script lang='ts'>
import { defineComponent } from 'vue';
import { useClipboard } from '@vueuse/core';
import { Notify } from 'quasar';

export default defineComponent({
  props: {
    copyValue: {
      type: String,
      required: true,
    }
  },
  setup(props) {
    const clipboard = useClipboard();

    const onCopyClick = async () => {
      await clipboard.copy(props.copyValue);

      Notify.create({
        type: 'positive',
        message: 'Copied',
        icon: 'fa-solid fa-copy',
      });
    }

    return {
      clipboard,
      onCopyClick,
    };
  }
});
</script>

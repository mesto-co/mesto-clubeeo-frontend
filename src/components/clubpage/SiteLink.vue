<template>
  <a
    :href='url'
    target='_blank'
  >{{ screenURL }}</a>
</template>

<style scoped>
a {
  text-decoration: none;
  color: inherit;
}

a:hover {
  text-decoration: underline;
}
</style>

<script lang='ts'>
import { computed, defineComponent } from 'vue';

export default defineComponent({
  props: {
    url: {
      type: String,
      required: true,
    }
  },
  setup(props) {
    const screenURL = computed(() => props.url
      .replace(/^https:\/\//, '')
      .replace(/\?.*$/, '')
    );

    return {
      screenURL
    };
  }
});
</script>

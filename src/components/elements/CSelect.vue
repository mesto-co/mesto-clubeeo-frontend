<template>

  <q-select
    dark outlined
    v-model='model'
  >
    <template v-slot:prepend v-if='showImage'>
      <q-avatar square>
        <q-img
          v-if='model'
          class='c-select-image'
          :src='model.img || `https://ui-avatars.com/api/?name=${model.label}&size=128&bold=true&format=svg&background=1c1c1f&color=fff`'
        />
        <q-img
          v-else
          class='c-select-image'
          src='https://ui-avatars.com/api/?name=?&size=128&bold=true&format=svg&background=2b2e3b&color=fff'
        />
      </q-avatar>
    </template>

    <template v-slot:option="scope">
      <q-item v-bind="scope.itemProps" class='clubBgDark'>
        <q-item-section
          v-if='showImage'
          avatar
        >
          <q-img
            class='c-select-image'
            :src='scope.opt.img || `https://ui-avatars.com/api/?name=${scope.opt.label}&size=128&bold=true&format=svg&background=1c1c1f&color=fff`'
          />
        <!--                <q-icon :name="scope.opt.icon" />-->
        </q-item-section>
        <q-item-section>
          <q-item-label>{{ scope.opt.label }}</q-item-label>
          <q-item-label caption v-if='scope.opt.caption'>{{ scope.opt.caption }}</q-item-label>
        </q-item-section>
      </q-item>
    </template>
  </q-select>

</template>

<style scoped lang='scss'>
.c-select-image {
  border-radius: 8px;
}
</style>

<script lang='ts'>
import { computed, defineComponent } from 'vue';

export default defineComponent({
  props: {
    showImage: {
      type: Boolean,
      default: false,
    },
    modelValue: {
      type: Object
    }
  },
  emits: ['update:modelValue'],
  setup(props, {emit}) {
    const model = computed({
      get: () => props.modelValue,
      set: (val) => emit('update:modelValue', val),
    });

    return {
      model,
    }
  }
});
</script>

<template>
  <div class="row q-col-gutter-md">
    <div v-for="(group, key) in groups" :key="key" class="col-12">
      <prop-list-editor v-if="!key" :props="group" v-model="model" />
      <div v-else>
        <q-list>
          <q-card flat bordered dark class="bg-transparent">
            <q-expansion-item>
              <template v-slot:header>
                <q-item-section>
                  {{ key }}
                </q-item-section>
              </template>

              <q-card-section>
                <prop-list-editor :props="group" v-model="model" />
              </q-card-section>
            </q-expansion-item>
          </q-card>
        </q-list>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, PropType } from 'vue';
import { IProp } from '@src/modules/appManager/shared/IAppConfig';
import PropListEditor from '@components/dashboard/PropListEditor.vue';

export default defineComponent({
  components: { PropListEditor },
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

    const groups = computed(() => {
      const result: Record<string, Record<string, IProp>> = {};
      if (props.props) {
        Object.entries(props.props).forEach(([k, v]) => {
          result[v.group || ''] ||= {};
          result[v.group || ''][k] = v;
        });
      }
      return result;
    });

    return {
      model,
      groups,
    };
  },
});
</script>

<template>
  <div>

    <!--      <q-list bordered class='rounded-borders'>-->
    <draggable
      v-model='links'
      tag='transition-group'
      item-key='id'
      v-bind='dragOptions'
      handle='.links-editor__grab-area'
    >
      <template #item='{element, index}'>
        <q-card class='links-editor__item q-mb-md' flat style='background-color: #1d1d27' dark>
          <!--              <q-item-section avatar class='handle'>-->
          <!--                <q-icon :name='findLinkIcon(element.url) || "link"' color='grey' />-->
          <!--              </q-item-section>-->

          <q-card-section class='row q-pl-xs'>
            <div class='col flex flex-center links-editor__grab-area' style='max-width: 32px'>
              <q-btn icon='fas fa-ellipsis-v' class='clubButtonActive' round dense size='sm' style='cursor: default' />
            </div>
            <div class='col'>
              <div class='q-pb-sm'>
                <q-input
                  filled dense dark
                  label='milestone / stage'
                  v-model='element.title'
                />
              </div>
              <div class='q-pb-sm row q-col-gutter-md'>
<!--                <div class='col'>-->
<!--                  <q-input-->
<!--                    filled dense dark-->
<!--                    label='Date (YYYY-MM-DD)'-->
<!--                    v-model='element.date'-->
<!--                  />-->
<!--                </div>-->
                <div class='col'>
                  <q-input
                    filled dense dark
                    label='when'
                    v-model='element.when'
                  />
                </div>
              </div>
              <div class='q-pb-sm'>
                <q-input
                  filled dense dark
                  type='textarea'
                  v-model='element.text'
                />
              </div>
              <div>
                <div class='text-right'>
                  <q-btn
                    icon='far fa-trash-alt'
                    round flat size='sm' dark-percentage
                    class='clubButtonActive'
                    @click='removeLink(index)'
                  />
                </div>
              </div>
            </div>

            <!--              <i class="far fa-trash-alt"></i>-->

          </q-card-section>

        </q-card>

      </template>
    </draggable>

    <div class='text-right'>
      <!--        <q-btn class='q-mt-md' @click='addLink'>-->
      <!--          +-->
      <!--        </q-btn>-->

      <q-btn
        icon='fa-solid fa-plus' round dense
        class='q-mt-md clubButtonActive'
        size='lg'
        @click='addLink'
      />
      <!--        <add-button class='q-mt-md' @click='addLink' />-->
    </div>

  </div>
</template>

<style lang='scss'>
.links-editor {
  .links-editor__item {
    margin-bottom: 1rem;
    border-bottom: 1px solid #cccccc;
  }

  .links-editor__grab-area {
    max-width: 32px;
    cursor: grab;
  }
}
</style>

<script lang='ts'>
import { computed, defineComponent, PropType, Ref } from 'vue';
import draggable from 'vuedraggable';
import { IRoadmapEntry } from 'src/models/roadmapModel';

const dragOptions = {
  animation: 200,
  group: 'description',
  disabled: false,
  ghostClass: 'ghost'
};

function useModelWrapper<T>(
  props: Record<string, T>,
  emit: (name: string, value: T) => void,
  name = 'modelValue'
): Ref<T> {
  return computed<T>({
    get: () => props[name],
    set: (value) => emit(`update:${name}`, value)
  });
}

export default defineComponent({
  components: {
    draggable
  },
  props: {
    modelValue: Array as PropType<IRoadmapEntry[]>
  },
  setup(props, { emit }) {
    const links = useModelWrapper<IRoadmapEntry[]>(props as unknown as Record<string, IRoadmapEntry[]>, emit);

    return {
      //links
      links,
      addLink: () => {
        links.value.push({ title: '', text: '', when: '' });
      },
      removeLink: (idx: number) => {
        links.value.splice(idx, 1);
      },

      dragOptions

      // findLinkIcon
    };
  }
});
</script>

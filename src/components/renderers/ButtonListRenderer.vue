<template>

  <template
    v-for='(taskStep, i) in data.steps'
    v-bind:key='i'
  >
    <div v-if='!taskStep.type'>
      <div
        class='row'
      >
        <div class='col'>
          <club-button
            class='full-width q-mb-sm'
            :class='taskStep.class'
            scheme='inverse'
            :disabled='taskStep.state === "available" ? undefined : true'
            :icon='mapSocialToIcon(taskStep.icon) || taskStep.icon'
            :label='taskStep.label'
            :href='taskStep.link'
          />
        </div>

        <div
          v-if='taskStep.points'
          class='col-auto q-pl-xs text-right'
        >
          <q-icon
            :name='stateIcon(taskStep.state)'
            size='12px'
            color='grey-6 q-pr-xs'
          />

          <q-badge
            :disabled='taskStep.state === "completed" ? undefined : true'
            :class='taskStep.pointsClass || taskStep.class'
            style='min-width: 32px; text-align: center; display: inline-block'
          >+{{ taskStep.points }}</q-badge>
        </div>

        <div
          v-else
          class='col-auto q-pl-sm text-right'
        >
          <q-icon
            :name='stateIcon(taskStep.state)'
            size='sm'
            color='grey-6'
          />
        </div>
      </div>
    </div>
  </template>

</template>

<script lang='ts'>
import { defineComponent, PropType } from 'vue';
import { mapSocialToIcon } from 'src/lib/components/socials';
import ClubButton from 'components/clubpage/ClubButton.vue';

const stateIcon = (state: string) => {
  if (state === 'locked') return 'fa-solid fa-lock';
  if (state === 'completed') return 'fa fa-check';
};

export default defineComponent({
  components: { ClubButton }, // components: { CardRenderer }
  props: {
    data: {
      type: Object as PropType<{
        type: string,
        steps: Array<{
          icon: string,
          label: string,
          state: string,
          class?: string,
        }>
      }>
    }
  },
  setup() {
    return {
      stateIcon,
      mapSocialToIcon,
    }
  }
});
</script>

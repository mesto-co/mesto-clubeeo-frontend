<template>
  <q-stepper
    v-model="currentStep"
    header-nav
    ref="stepper"
    animated
    vertical
    dark
    flat
  >
    <template v-for="(step, i) in steps" v-bind:key="i">
      <q-step
        :name="step.name"
        :title="step.title"
        :caption="step.caption"
        :icon="step.icon"
      >
        {{ step.text }}

        <q-stepper-navigation>
          <club-button
            v-if="currentStep !== steps.length"
            :class="styling.buttonClass"
            @click="
              () => {
                currentStep += 1;
              }
            "
            label="continue"
          />

          <club-button
            v-if="currentStep > 1"
            flat
            @click="currentStep -= 1"
            label="back"
            class="q-ml-sm"
          />
        </q-stepper-navigation>
      </q-step>
    </template>
  </q-stepper>
</template>

<style>
.q-stepper__tab--active,
.q-stepper__tab--done {
  color: #1a5cff;
}
/*:style="{color: '#154bd0'}"*/
</style>

<script lang="ts">
import { computed, defineComponent, PropType } from 'vue';
import ClubButton from '@components/clubpage/ClubButton.vue';

export interface IStepperRendererStep {
  title: string;
  text: string;
  icon?: string;
  caption?: string;
}

export default defineComponent({
  components: { ClubButton },
  props: {
    modelValue: Number,
    styling: {
      type: Object as PropType<{
        buttonClass?: string;
      }>,
      default: () => ({}),
    },
    steps: {
      type: Array as PropType<Array<IStepperRendererStep>>,
    },
  },
  emits: ['update:modelValue'],
  setup(props, { emit }) {
    const currentStep = computed({
      get: () => props.modelValue,
      set: (value) => emit('update:modelValue', value),
    });

    return {
      currentStep,
    };
  },
});
</script>

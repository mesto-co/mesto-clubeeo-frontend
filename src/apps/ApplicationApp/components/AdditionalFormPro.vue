<template>
  <div class="additional-form">
    <div class="text-h6 q-mb-md">Какие форматы взаимодействия вам наиболее интересны?</div>
    <div class="q-mb-lg">
      <q-option-group
        v-model="interactionFormatsModel"
        :options="interactionFormatsOptions"
        color="primary"
        dark
        type="checkbox"
      />
    </div>

    <div class="text-h6 q-mb-md">Есть ли у вас опыт наставничества или консультирования?</div>
    <div class="q-mb-lg">
      <q-option-group
        v-model="mentoringExperienceModel"
        :options="mentoringExperienceOptions"
        color="primary"
        dark
        type="checkbox"
      />
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue';

const props = defineProps({
  interactionFormats: {
    type: Array,
    default: () => [],
  },
  mentoringExperience: {
    type: Array,
    default: () => [],
  },
});

const emit = defineEmits(['update:interactionFormats', 'update:mentoringExperience']);

// Create local models that sync with parent component
const interactionFormatsModel = computed({
  get: () => props.interactionFormats,
  set: (value) => emit('update:interactionFormats', value),
});

const mentoringExperienceModel = computed({
  get: () => props.mentoringExperience,
  set: (value) => emit('update:mentoringExperience', value),
});

const interactionFormatsOptions = [
  { label: 'профессиональные дискуссии', value: 'professional_discussions' },
  { label: 'нетворкинг', value: 'networking' },
  { label: 'участие в проектах', value: 'project_participation' },
  { label: 'менторство', value: 'mentoring' },
  { label: 'акселерация стартапов', value: 'startup_acceleration' },
  { label: 'партнерства', value: 'partnerships' },
  { label: 'инвестиции', value: 'investments' },
];

const mentoringExperienceOptions = [
  { label: 'да, активно менторю', value: 'active_mentoring' },
  { label: 'да, но редко', value: 'rare_mentoring' },
  { label: 'нет, но хотел(а) бы попробовать', value: 'want_to_try' },
  { label: 'нет, неинтересно', value: 'not_interested' },
];
</script>

<style lang="scss" scoped>
.additional-form {
  max-width: 800px;
  margin: 0 auto;
}
</style>

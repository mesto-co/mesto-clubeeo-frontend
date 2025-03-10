<template>
  <div class="additional-form">
    <div class="text-h6 q-mb-md">Расскажите о вашей идее или проекте</div>

    <q-input v-model="projectDescriptionModel" filled dark type="textarea" autogrow class="q-mb-lg" />

    <div class="text-subtitle1 q-mb-md">На какой стадии ваш проект?</div>
    <div class="q-mb-lg">
      <q-option-group v-model="projectStageModel" :options="projectStageOptions" color="primary" dark type="radio" />
    </div>

    <div class="text-subtitle1 q-mb-md">Какая помощь сообщества вам может понадобиться?</div>
    <div class="q-mb-lg">
      <q-option-group v-model="helpNeededModel" :options="helpNeededOptions" color="primary" dark type="checkbox" />
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue';

const props = defineProps({
  projectDescription: {
    type: String,
    default: '',
  },
  projectStage: {
    type: String,
    default: 'idea',
  },
  helpNeeded: {
    type: Array,
    default: () => [],
  },
});

const emit = defineEmits(['update:projectDescription', 'update:projectStage', 'update:helpNeeded']);

// Create local models that sync with parent component
const projectDescriptionModel = computed({
  get: () => props.projectDescription,
  set: (value) => emit('update:projectDescription', value),
});

const projectStageModel = computed({
  get: () => props.projectStage,
  set: (value) => emit('update:projectStage', value),
});

const helpNeededModel = computed({
  get: () => props.helpNeeded,
  set: (value) => emit('update:helpNeeded', value),
});

const projectStageOptions = [
  { label: 'идея', value: 'idea' },
  { label: 'MVP', value: 'mvp' },
  { label: 'есть первые продажи', value: 'first_sales' },
  { label: 'получил инвестиции', value: 'investment' },
  { label: 'действующий бизнес', value: 'active_business' },
];

const helpNeededOptions = [
  { label: 'Развитие идеи (фидбек, мозговые штурмы, знания)', value: 'idea_development' },
  { label: 'Аудитория для исследования и тестов', value: 'research_audience' },
  { label: 'Найти кофаундера', value: 'find_cofounder' },
  { label: 'Люди в команду (не кофаундеры)', value: 'team_members' },
  { label: 'Клиенты', value: 'clients' },
  { label: 'Ментор или адвайзер', value: 'mentor' },
  { label: 'Инвестиции', value: 'investments' },
  { label: 'другое', value: 'other' },
];
</script>

<style lang="scss" scoped>
.additional-form {
  max-width: 800px;
  margin: 0 auto;
}
</style>

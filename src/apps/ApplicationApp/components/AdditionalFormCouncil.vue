<template>
  <div class="additional-form">
    <div class="text-h6 q-mb-md">Какие инициативы вам наиболее интересны?</div>
    <div class="text-body2 q-mb-md">
      Ваш вклад может формировать экосистему Mesto, выберите направления, где вы хотели бы участвовать.
    </div>
    <div class="q-mb-lg">
      <q-option-group v-model="initiativesModel" :options="initiativesOptions" color="primary" dark type="checkbox" />
    </div>

    <div class="text-h6 q-mb-md">Готовы ли вы делиться опытом с участниками Mesto?</div>
    <div class="text-body2 q-mb-md">
      В сообществе есть множество форматов для взаимодействия, и мы готовы предложить вам удобные способы обмена
      знаниями.
    </div>
    <div class="q-mb-lg">
      <q-option-group
        v-model="sharingExperienceModel"
        :options="sharingExperienceOptions"
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
  initiatives: {
    type: Array,
    default: () => [],
  },
  sharingExperience: {
    type: Array,
    default: () => [],
  },
});

const emit = defineEmits(['update:initiatives', 'update:sharingExperience']);

// Create local models that sync with parent component
const initiativesModel = computed({
  get: () => props.initiatives,
  set: (value) => emit('update:initiatives', value),
});

const sharingExperienceModel = computed({
  get: () => props.sharingExperience,
  set: (value) => emit('update:sharingExperience', value),
});

const initiativesOptions = [
  { label: 'поддержка стартапов', value: 'startup_support' },
  { label: 'инвестиции', value: 'investments' },
  { label: 'стратегические партнерства', value: 'strategic_partnerships' },
  { label: 'развитие комьюнити', value: 'community_development' },
  { label: 'социальный импакт', value: 'social_impact' },
];

const sharingExperienceOptions = [
  { label: 'да, через выступления/лекции', value: 'lectures' },
  { label: 'да, через закрытые дискуссии', value: 'closed_discussions' },
  { label: 'да, через менторство', value: 'mentoring' },
  { label: 'нет, пока не планирую', value: 'not_planning' },
];
</script>

<style lang="scss" scoped>
.additional-form {
  max-width: 800px;
  margin: 0 auto;
}
</style>

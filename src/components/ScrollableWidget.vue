<template>
  <h2 v-if="title" class="text-h5 q-mb-md">{{ title }}</h2>
  <div class="row no-wrap q-gutter-md scroll" ref="scrollContainer" @scroll="handleScroll">
    <!-- Main content slot -->
    <slot></slot>

    <!-- Loading placeholder slot -->
    <slot name="loading" v-if="isLoading">
      <div class="text-decoration-none">
        <q-card dark class="loading-card">
          <q-card-section class="text-center">
            <div class="avatar-placeholder">
              <q-spinner-dots color="primary" size="40px" />
            </div>
            <div class="text-placeholder q-mt-sm"></div>
            <div class="text-placeholder text-placeholder--multi"></div>
          </q-card-section>
        </q-card>
      </div>
    </slot>
  </div>
  <!-- Optional footer slot -->
  <slot name="footer"></slot>
</template>

<script setup>
import { ref } from 'vue';

const props = defineProps({
  title: String,
  isLoading: Boolean,
  hasMore: Boolean,
});

const emit = defineEmits(['load-more']);

const scrollContainer = ref(null);
const isLoadingMore = ref(false);

const handleScroll = async (event) => {
  const container = event.target;
  const scrollWidth = container.scrollWidth;
  const scrollLeft = container.scrollLeft;
  const clientWidth = container.clientWidth;

  if (!isLoadingMore.value && !props.isLoading && props.hasMore && scrollWidth - (scrollLeft + clientWidth) < 100) {
    isLoadingMore.value = true;
    await emit('load-more');
    isLoadingMore.value = false;
  }
};
</script>

<style lang="scss" scoped>
.scroll {
  overflow-x: auto;
  scrollbar-width: none;
  &::-webkit-scrollbar {
    display: none;
  }
}

.loading-card {
  background-color: rgba(29, 29, 39, 0.7);
  width: 200px;
  min-height: 180px;
}

.avatar-placeholder {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  background-color: rgba(255, 255, 255, 0.1);
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: center;
}

.text-placeholder {
  height: 1.5em;
  background-color: rgba(255, 255, 255, 0.1);
  border-radius: 4px;
  margin: 0 auto;
  width: 70%;

  &:first-of-type {
    margin-top: 0.5rem;
  }

  &--multi {
    height: 4.5em;
    margin-top: 0.25rem;
  }
}
</style>

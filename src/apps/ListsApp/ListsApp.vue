<template>
  <lists-app-grid
    v-if="!$route.params.appPage"
    :app-data="appData"
  />
  <lists-app-list-types-grid
    v-else-if="$route.params.appPage === 'lists-types'"
    :app-data="appData"
  />
</template>

<script setup>
import { defineComponent } from 'vue';
import { appProps } from '@apps/_common/appProps';
import ListsAppGrid from 'src/apps/ListsApp/ListsAppGrid.vue';
import ListsAppListTypesGrid from 'src/apps/ListsApp/ListsAppListTypesGrid.vue';

defineComponent({
  components: { ListsAppGrid },
  props: appProps,
});
</script>

<template>
  <club-page sticky="bottom" :loading="listsStore.isLoading">
    <!-- listTypes Table -->
    <q-table
      :rows="listsStore.listTypes"
      :columns="columns"
      row-key="id"
      hide-bottom
      dark
      flat
      style="background-color: rgb(29 29 39)"
      v-model:pagination="listsStore.pagination"
      :rows-per-page-options="[20, 50, 200]"
    >
      <template v-slot:body-cell-name="props">
        <q-td :props="props">
          {{ props.row.name }}
        </q-td>
      </template>
      <template v-slot:body-cell-slug="props">
        <q-td :props="props">
          {{ props.row.slug }}
        </q-td>
      </template>
    </q-table>
  </club-page>
</template>

<script setup>
import {onMounted} from 'vue';
import ClubPage from '@components/clublayout/ClubPage.vue';
import { useListsStore } from 'src/apps/ListsApp/listsStore';

const listsStore = useListsStore();

onMounted(async () => {
  await listsStore.getListsTypes();
});

const columns = [
  { name: 'name', align: 'left', label: 'Name', field: (r) => r.profile?.name },
  { name: 'slug', align: 'left', label: 'Slug' },
];
</script>

<template>
  <club-page sticky="bottom" :loading="listsStore.isLoading">
    <div class="row">
      <div class="col q-mb-md">
        <q-btn
          class="clubButtonBlue q-px-md q-ml-md cursor-pointer"
          dense
          flat
          @click="show"
        >
          Добавить тип списка
        </q-btn>
      </div>
    </div>
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
  <q-dialog v-model="dialog">
    <q-card dark class="clubCard" flat style="min-width: min(90vh, 960px)">
      <q-card-section style="max-height: 85vh" class="scroll">
        <div>Доавление записи</div>
      </q-card-section>
      <q-card-actions align="right" class="q-px-md" style="border-top: 1px solid rgba(0, 0, 0, 0.2)">
        <q-btn label="Отмена" flat no-caps v-close-popup />
        <q-btn
          dense
          no-caps
          color="positive"
          label="Create"
          class="q-ml-sm"
        />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script setup>
import {onMounted} from 'vue';
import ClubPage from '@components/clublayout/ClubPage.vue';
import { useDialog } from 'src/uses/Dialogs/useDialog';
import { useListsStore } from 'src/apps/ListsApp/listsStore';

const listsStore = useListsStore();
const {dialog, show} = useDialog();

onMounted(async () => {
  await listsStore.getListsTypes();
});

const columns = [
  { name: 'name', align: 'left', label: 'Name', field: (r) => r.profile?.name },
  { name: 'slug', align: 'left', label: 'Slug' },
];
</script>

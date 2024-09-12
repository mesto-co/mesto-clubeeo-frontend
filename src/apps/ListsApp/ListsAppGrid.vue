<template>
  <club-page sticky="bottom" :loading="listsStore.isLoading">
    <div class="row">
      <div class="col-12">
        <club-button
          class="clubButtonActive q-px-md q-mr-sm cursor-pointer"
          dense
          @click="
            $router.push({
              name: 'club-dynamic-app-page',
              params: { appPage: 'lists-types' },
            })
          "
        >
          Список типов
        </club-button>
      </div>
    </div>
    <div class="row q-py-md">
      <div class="col col-sm-4">
        <q-select
          v-model="selectedType"
          :options="listTypesOptions"
          label="Тип списка"
          outlined
          dark
          dense
          @update:model-value="fetchLists()"
        />
      </div>
      <div class="col">
        <q-btn
          class="clubButtonBlue q-px-md q-ml-md cursor-pointer"
          dense
          flat
          @click="show"
        >
          Добавить запись
        </q-btn>
      </div>
    </div>

    <q-table
      :rows="listsStore.lists"
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
      <template v-slot:body-cell-actions="props">
        <q-td :props="props">
<!--          {{ props.row.name }}-->
          <q-btn
            dense
            no-caps
            icon="edit"
            class="q-ml-sm"
          />
          <q-toggle v-model="props.row.enabled" />
        </q-td>
      </template>
    </q-table>
    <div class="q-pa-lg flex flex-center">
      <q-pagination
        v-model="listsStore.pagination.page"
        :max="Math.floor(listsStore.pagination.rowsNumber / listsStore.pagination.rowsPerPage) || 0"
        color="grey"
        :max-pages="6"
        active-color="primary"
        unelevated
        flat
        @update:model-value="changePage"
      />
    </div>
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
import {ref, onMounted, watch, computed} from 'vue';
import ClubPage from '@components/clublayout/ClubPage.vue';
import { useListsStore } from 'src/apps/ListsApp/listsStore';
import {useDialog} from 'src/uses/Dialogs/useDialog';

const listsStore = useListsStore();
const selectedType = ref([]);
const {dialog, show} = useDialog()

const listTypesOptions = computed(() => {
  if (!listsStore.listTypes) {
    return []
  }
  return listsStore.listTypes.map(type => {
    return {
      label: type.name,
      value: type.slug
    }
  })
})

// Fetch initial list of members
onMounted(async () => {
  await listsStore.getListsTypes();
  await listsStore.fetchLists();
});

watch(selectedType, async (newType) => {
  listsStore.pagination.page = 1
  await listsStore.fetchLists(newType.value);
});

const changePage = async() => {
  await listsStore.fetchLists(selectedType.value.value);
}

const columns = [
  { name: 'name', align: 'left', label: 'Name', field: (r) => r.profile?.name },
  { name: 'actions', align: 'right', label: 'Actions' },
];
</script>

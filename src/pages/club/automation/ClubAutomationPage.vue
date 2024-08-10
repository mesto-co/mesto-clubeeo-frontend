<template>
  <club-page header="automation" sticky="bottom" :loading="isLoading">
    <template v-slot:buttons>
      <club-button
        label="create trigger"
        class="clubButtonActive"
        :to="{ name: 'club-automation-trigger-create' }"
      />
    </template>

    <q-table
      :columns="columns"
      :rows="triggers"
      row-key="id"
      hide-bottom
      dark
      flat
      style="background-color: rgb(29 29 39)"
      :pagination="defaultPagination"
    >
      <template v-slot:body-cell-enabled="props">
        <q-td :props="props">
          <q-chip
            v-if="props.row.enabled"
            dense
            round
            size="12px"
            color="positive"
          >
            <q-icon name="check" />
          </q-chip>
          <q-chip v-else dense round size="12px" color="negative">
            <q-icon name="close" />
          </q-chip>
        </q-td>
      </template>

      <template v-slot:body-cell-buttons="props">
        <q-td :props="props">
          <club-button
            :to="{
              name: 'club-automation-trigger',
              params: { userId: props.row.id },
            }"
            dense
            size="sm"
            class="q-mr-xs"
            icon="fa-solid fa-gear"
            @click="
              $router.push({
                name: 'club-automation-trigger-edit',
                params: { triggerId: props.row.id },
              })
            "
          >
            <q-tooltip>config</q-tooltip>
          </club-button>
        </q-td>
      </template>
    </q-table>
  </club-page>
</template>

<script lang="ts">
import ClubPage from '@src/components/clublayout/ClubPage.vue';
import { defineComponent } from 'vue';
import { defaultPagination } from '@src/lib/components/table';
import ClubButton from '@components/clubpage/ClubButton.vue';
import { requireParam } from '@src/uses/useAppRoute';
import { useLoadIndex } from '@src/uses/useLoaders';

const columns = [
  { name: 'name', align: 'left', label: 'trigger name', field: 'name' },
  { name: 'eventType', align: 'left', label: 'event type', field: 'eventType' },
  {
    name: 'actionType',
    align: 'left',
    label: 'action type',
    field: 'actionType',
  },
  { name: 'enabled', align: 'right', label: 'enabled', field: 'enabled' },
  { name: 'buttons', align: 'right', label: '', field: 'buttons' },
];

interface ITrigger {
  id: number;
  name: string;
}

export default defineComponent({
  components: { ClubButton, ClubPage },
  setup() {
    const slug = requireParam('clubSlug');
    const { data: triggers, isLoading } = useLoadIndex<ITrigger, 'triggers'>({
      url: () => `/api/club/clubSlug:${slug.value}/motion/triggers`,
      key: 'triggers',
    });

    return {
      columns,
      defaultPagination,
      triggers,
      isLoading,
    };
  },
});
</script>

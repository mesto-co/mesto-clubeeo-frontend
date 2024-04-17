<template>
  <div class='text-white'>
<!--    <club-page-->
<!--      header='platform clubs'-->
<!--    >-->
      <q-table
        :rows='platformClubs'
        :columns='columns'
        row-key='id'
        hide-bottom
        dark flat
        style='background-color: rgb(29 29 39);'
        :pagination='defaultPagination'
        :rows-per-page-options='[20, 50, 200]'
      >
        <template v-slot:body-cell-links='props'>
          <q-td :props='props'>
            <club-button
              :to='{name: "club", params: {clubSlug: props.row.slug}}'
              dense size='xs'
              class='clubButtonActive q-mr-xs'
              icon='fa-solid fa-link'
            >
              <q-tooltip>club page</q-tooltip>
            </club-button>

            <club-button
              :to='{name: "club-home", params: {clubSlug: props.row.slug}}'
              dense size='xs'
              class='clubButtonActive q-mr-xs'
              icon='home'
            >
              <q-tooltip>club dashboard</q-tooltip>
            </club-button>

            <club-button
              :href='`/api/club/${props.row.slug}/config`'
              dense size='xs'
              class='clubButtonActive q-mr-xs'
              icon='fa-solid fa-file-lines'
            >
              <q-tooltip>config json</q-tooltip>
            </club-button>
          </q-td>
        </template>

        <template v-slot:body-cell-status='props'>
          <q-td :props='props'>
            <q-icon
              v-if='(props.row.settings || {}).isPremium'
              name='fa-solid fa-star'
              size='xs'
              class='clubHeaderActive q-mr-xs'
            >
              <q-tooltip>premium</q-tooltip>
            </q-icon>
          </q-td>
        </template>
      </q-table>
<!--    </club-page>-->
  </div>
</template>

<script lang='ts'>
import { defineComponent, onMounted, ref } from 'vue';
import { api } from 'boot/axios';
import { defaultPagination } from 'src/lib/components/table';
import { IClub } from 'src/api/clubApi';
import ClubButton from 'components/clubpage/ClubButton.vue';
import { appProps } from 'src/apps/_common/appProps';

const columnFor = (field: string) => {
  return { name: field, label: field, field: field, align: 'left' };
};

const columns = [
  { ...columnFor('id'), sortable: true, style: 'width: 30px', format: (val: string) => `#${val}` },
  { name: 'links', style: 'width: 30px' },
  { ...columnFor('name'), sortable: true },
  { ...columnFor('slug'), sortable: true },
  { name: 'status' }
];


export default defineComponent({
  components: { ClubButton },
  props: appProps,
  setup(props) {
    const platformClubs = ref<Array<IClub>>();

    onMounted(async () => {
      if (!props.appData) return;

      const result = await api.get<{ clubs: Array<IClub> }>(`/api/club/${props.appData.clubId}/apps/platformClubs`);
      platformClubs.value = result.data.clubs;
    });

    return {
      platformClubs,
      defaultPagination,
      columns
    };
  }
});
</script>

<template>
  <club-page :header="appData.title" sticky="bottom" :loading="isLoading">
    <q-list class="q-mb-sm" bordered>
      <template v-for="(item, i) in screenRows || []" v-bind:key="i">
        <q-expansion-item
          :label="item.title"
          :caption="item.caption"
          expand-separator
        >
          <template v-slot:header>
            <!-- <q-item clickable v-ripple @click="menuItemClick(item)"> -->
            <q-item-section avatar>
              <q-avatar
                :round="!item.logoMode || item.logoMode === 'round'"
                :square="item.logoMode === 'square'"
              >
                <img
                  :src="
                    item.logoImg || 'https://cdn.quasar.dev/img/mountains.jpg'
                  "
                />
              </q-avatar>
            </q-item-section>

            <q-item-section>
              <q-item-label>{{ item.title }}</q-item-label>
              <q-item-label caption lines="2" style="color: #cccccc">
                {{ item.caption }}
              </q-item-label>
            </q-item-section>

            <!-- <q-item-section side top>
                <q-item-label caption style="color: #cccccc">{{
                  item.info
                }}</q-item-label>
              </q-item-section> -->
            <!-- </q-item> -->
          </template>

          <q-item>
            <q-item-section>
              <div>{{ item.description }}</div>
            </q-item-section>
          </q-item>
        </q-expansion-item>
      </template>
    </q-list>
  </club-page>
</template>

<script lang="ts">
import { computed, defineComponent, ref } from 'vue';
import { useLoadIndex } from 'src/uses/useLoaders';
import ClubPage from 'components/clublayout/ClubPage.vue';
import { appProps } from 'src/apps/_common/appProps';

const columns = [
  {
    name: 'position',
    label: 'position',
    field: 'position',
    align: 'left',
    format: (val: string) => `#${val}`,
  },
  { name: 'name', label: 'name', field: 'name', align: 'left' },
  { name: 'value', label: 'value', field: 'value' },
];

interface ILeaderboardEntry {
  position: number;
  name: string;
  value: number;
}

export default defineComponent({
  components: { ClubPage },
  props: appProps,
  setup(props) {
    const expanded = ref(false);

    const { data: rows, isLoading } = useLoadIndex<ILeaderboardEntry, 'items'>({
      url: () =>
        props.appData?.clubId && props.appData?.appId
          ? `/api/club/${props.appData.clubId}/apps/${props.appData.appId}/telegram/exts`
          : null,
      key: 'items',
    });

    // const rows = ref<ILeaderboardEntry[]>([]);

    // const valueClass = (row: {position: string}) => {
    const valueClass = () => {
      return 'clubButtonActive';
      // return 'bg-grey-3 text-black';
    };

    return {
      valueClass,
      expanded,
      columns,
      rows,
      isLoading,
      menuItemClick: (item: any) => {
        console.log('menuItemClick', item);
      },
      screenRows: computed(() => {
        return rows.value.slice(0, expanded.value ? 50 : 10);
      }),
    };
  },
});
</script>

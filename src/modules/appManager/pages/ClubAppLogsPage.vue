<template>
  <club-page
    header='apps'
    sticky='top'
    :header-classes='{padding: {"q-px-md": true}}'
    :back-link='{name: "club-apps"}'
  >
    <template v-slot:header>
      <club-app-menu />
    </template>

    <q-table
      :columns='columns'
      :rows='events'
      row-key='id'
      hide-bottom
      dark flat
      style='background-color: rgb(29 29 39);'
      :pagination='defaultPagination'
    >
      <template v-slot:header="props">
        <q-tr :props="props">
          <q-th auto-width />
          <q-th
            v-for="col in props.cols"
            :key="col.name"
            :props="props"
          >
            {{ col.label }}
          </q-th>
        </q-tr>
      </template>

      <template v-slot:body="props">
        <q-tr :props="props">
          <q-td auto-width>
            <q-btn size="sm" round dense
                   :icon="props.expand ? 'fa-solid fa-chevron-down' : 'fa-solid fa-chevron-right'"
                   @click="props.expand = !props.expand"
            />
          </q-td>
          <q-td
            v-for="col in props.cols"
            :key="col.name"
            :props="props"
          >
            <template v-if='col.name === "actions"'>
              <template v-for='action in col.value || []' :key='action.id'>
                <q-badge>{{ action.taskType }}</q-badge>
              </template>
            </template>
            <template v-else>
              {{ col.value }}
            </template>
          </q-td>
        </q-tr>
        <q-tr v-show="props.expand" :props="props">
          <q-td colspan="100%">
            <q-badge color='white' text-color='black'>event data</q-badge>
            <pre class="text-left">{{JSON.stringify(props.row.data, null, 2)}}</pre>

            <template v-for='action in props.row.actions || []' :key='action.id'>
              <q-badge>{{ action.taskType }}</q-badge><br/>

              <q-badge color='white' text-color='black'>action data</q-badge>
              <pre class="text-left">{{JSON.stringify(action.data, null, 2)}}</pre>

              <q-badge color='white' text-color='black'>action result</q-badge>
              <pre class="text-left">{{JSON.stringify(action.result, null, 2)}}</pre>
            </template>
          </q-td>
        </q-tr>
      </template>
    </q-table>

<!--    <div-->
<!--      v-if='!isLoading && appList.length === 0'-->
<!--      class='text-center'-->
<!--    >-->
<!--      <div class='q-pt-xl'>-->
<!--        you don't have any installed apps yet-->
<!--      </div>-->
<!--      <club-button-->
<!--        label='go to registry'-->
<!--        class='clubButtonActive q-ma-lg'-->
<!--        :to='{name: "club-apps-registry"}'-->
<!--      />-->
<!--    </div>-->

<!--    <div class='flex flex-center q-my-md' v-if='!isLoading'>-->
<!--      <template-->
<!--        v-for='(clubApp, i) of appList'-->
<!--        v-bind:key='i'-->
<!--      >-->
<!--        <app-card-->
<!--          class='q-ma-sm'-->
<!--          :app='mapToAppCard(clubApp)'-->
<!--        >-->
<!--          <template v-slot:buttons>-->
<!--            <q-btn-->
<!--              no-caps-->
<!--              style='border-radius: 0 0 0 8px'-->
<!--              class='clubButton clubButtonActive full-width'-->
<!--              label='manage'-->
<!--              :to='{name: "club-app-manage", params: {appSlug: clubApp.appSlug}}'-->
<!--            />-->
<!--          </template>-->
<!--        </app-card>-->
<!--      </template>-->
<!--    </div>-->

  </club-page>

</template>

<script lang='ts'>
import { defaultPagination } from 'src/lib/components/table';
import { defineComponent } from 'vue';
import ClubPage from 'components/clublayout/ClubPage.vue';
import { requireParam } from 'src/uses/useAppRoute';
import { useLoadIndex } from 'src/uses/useLoaders';
import ClubAppMenu from 'src/modules/appManager/components/ClubAppMenu.vue';
import moment from 'moment';

const columns = [
  { name: 'eventType', align: 'left', label: 'eventType', field: 'eventType' },
  { name: 'userId', align: 'left', label: 'user', field: 'userId' },
  { name: 'actions', align: 'left', label: 'actions triggered', field: 'actions' },
  { name: 'createdAt', align: 'right', label: 'time', field: 'createdAt', format: (val: string) => moment(val).format('DD MMM YY HH:mm:ss') }
];

interface IEvent {
  id: number,
  userId: number,
  eventType: string,
  createdAt: string,
}

export default defineComponent({
  components: { ClubAppMenu, ClubPage },
  setup() {
    const clubSlug = requireParam('clubSlug');
    const appSlug = requireParam('appSlug');

    const { data: events, isLoading } = useLoadIndex<IEvent, 'events'>({
      url: () => clubSlug.value && appSlug.value && `/api/club/${clubSlug.value}/app/club-apps/clubAppSlug:${appSlug.value}/event-logs`,
      key: 'events'
    });

    return {
      events,
      columns,
      defaultPagination,
      isLoading,
    };
  }
});
</script>

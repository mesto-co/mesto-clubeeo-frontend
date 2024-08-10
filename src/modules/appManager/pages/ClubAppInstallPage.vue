<template>
  <club-page
    :header="(app || {}).name"
    sticky="top"
    :back-link="{ name: 'club-apps-registry' }"
  >
    <template v-if="app">
      <div class="row q-col-gutter-md q-py-sm">
        <div class="col-12 col-sm-auto">
          <app-card :app="app">
            <template v-slot:buttons>
              <q-btn
                no-caps
                style="border-radius: 0 0 8px 8px"
                class="clubButton clubButtonActive full-width"
                label="install"
                @click="onInstall()"
              />
            </template>
          </app-card>
        </div>

        <div class="col-sm col-12">
          <q-input
            label="title"
            class="q-mb-md"
            hint="name of this app instance"
            v-model="formData.title"
            filled
            dark
          />

          <q-input
            label="slug"
            class="q-mb-md"
            hint="url-friendly name"
            v-model="formData.appSlug"
            filled
            dark
          />

          <q-input
            label="menu priority"
            class="q-mb-lg"
            hint="menu items are sorted according to this value in ascending order, leave it blank to hide the app from menu"
            v-model="formData.menuIndex"
            type="number"
            filled
            dark
          />

          <prop-list-editor
            :props="app.config.computed"
            v-model="formData.props"
          />
        </div>
      </div>

      <div
        v-if="Object.keys(app.actions).length > 0"
        class="row q-col-gutter-md q-py-sm"
      >
        <div class="col">
          <div class="text-h6 q-pb-sm">actions</div>

          <template
            v-for="action in app.actions"
            :key="action.key"
            class="q-pb-sm"
          >
            <q-card dark class="clubCard">
              <q-card-section horizontal>
                <q-card-section>
                  <q-badge class="clubButtonActive">{{ action.name }}</q-badge>
                </q-card-section>
                <q-card-section>
                  <p>{{ action.description }}</p>

                  <small>parameters:</small>
                  <div v-for="prop in action.props" :key="prop.key">
                    <q-badge class="bg-white text-black">{{
                      prop.label
                    }}</q-badge>
                    &mdash; {{ prop.description }}
                  </div>
                  <div class="q-pa-sm"></div>
                  <small>input:</small>
                  <div v-for="input in action.input" :key="input.key">
                    <q-badge class="bg-white text-black">{{
                      input.label
                    }}</q-badge>
                    &mdash; {{ input.description }}
                  </div>
                </q-card-section>
              </q-card-section>
            </q-card>
          </template>
        </div>
      </div>

      <div
        v-if="Object.keys(app.events).length > 0"
        class="row q-col-gutter-md q-py-sm"
      >
        <div class="col">
          <div class="text-h6 q-pb-sm">events</div>

          <template
            v-for="event in app.events"
            :key="event.key"
            class="q-pb-sm"
          >
            <app-binding-card :binding="event" />
          </template>
        </div>
      </div>
    </template>
  </club-page>
</template>

<script lang="ts">
import { defaultPagination } from '@src/lib/components/table';
import { defineComponent, onMounted, reactive, ref, watch } from 'vue';
import ClubPage from '@components/clublayout/ClubPage.vue';
import { api } from 'boot/axios';
import { requireParam } from '@src/uses/useAppRoute';
import { useRouter } from 'vue-router';
import AppCard from '@src/modules/appManager/components/AppCard.vue';
import { Notify } from 'quasar';
import AppBindingCard from '@src/modules/automation/components/AppBindingCard.vue';
import PropListEditor from '@components/dashboard/PropListEditor.vue';
import fromEntries from 'fromentries';
import {
  IPropValue,
  IRegistryItem,
  serializeProp,
} from '@src/modules/appManager/shared/propHelpers';
import { useClubStore } from '@stores/clubStore';

interface IFetchedUser {
  // id: number
  screenName: string;
  coverImg: string;
  amount: number;
  roles: {
    name: string;
    class?: string;
  }[];
  wallets: {
    address: string;
    chainNorm: string;
  }[];
}

const columns = [
  {
    name: 'screenName',
    align: 'left',
    label: 'name',
    sortable: true,
    field: (u: IFetchedUser) => u.screenName,
  },
  { name: 'roles', align: 'left', label: 'roles', field: 'roles' },
  {
    name: 'amount',
    align: 'left',
    label: 'tokens',
    field: 'amount',
    sortable: true,
  },
  { name: 'wallets', align: 'right', label: 'wallet', field: 'wallets' },
];

export default defineComponent({
  components: { PropListEditor, AppBindingCard, AppCard, ClubPage },
  setup() {
    const $router = useRouter();
    const $club = useClubStore();
    const clubSlug = requireParam('clubSlug');
    const appKey = requireParam('appKey');

    const app = ref<IRegistryItem | null>(null);
    const load = async () => {
      if (!clubSlug.value || !appKey.value) return;

      const result = await api.get<{ app: IRegistryItem }>(
        `/api/club/${clubSlug.value}/app/registry/${appKey.value}`
      );
      app.value = result.data.app;

      formData.title = app.value.name;
      formData.appSlug = app.value.key;

      Object.keys(app.value.config.props).forEach((key) => {
        formData.props[key] = null;
      });
    };
    onMounted(load);
    watch([clubSlug, appKey], load);

    const onInstall = async () => {
      const result = await api.post<{
        clubApp: {
          id: number;
          appSlug: string;
        };
      }>(`/api/club/${clubSlug.value}/app/registry/${appKey.value}/install`, {
        ...formData,
        props: fromEntries(
          Object.entries(formData.props).map(([k, v]) => [
            k,
            serializeProp(v, app?.value?.config?.props?.[k]),
          ])
        ),
      });

      Notify.create({
        type: 'positive',
        message: 'app installed',
      });

      //reload club data & menu
      await $club.load();

      await $router.push({
        name: 'club-app-manage',
        params: {
          appSlug: result.data.clubApp.appSlug,
        },
      });
    };

    const formData = reactive<{
      title: string;
      appSlug: string;
      menuIndex: number | null;
      props: Record<
        string,
        IPropValue | { value: string; label?: string } | null
      >;
    }>({
      title: '',
      appSlug: '',
      menuIndex: null,
      props: {} as Record<string, { value: string; label?: string } | null>,
    });

    return {
      app,
      columns,
      defaultPagination,
      onInstall,
      formData,
    };
  },
});
</script>

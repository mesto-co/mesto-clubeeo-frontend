<template>
  <club-page
    :header='(app || {}).name'
    sticky='top'
    :header-classes='{padding: {"q-px-md": true}}'
    :back-link='{name: "club-apps"}'
  >
    <template v-slot:header>
      <club-app-menu />
    </template>

    <template v-if='app'>
      <div class='row q-col-gutter-md q-py-sm'>
        <div class='col-12 col-sm-auto'>
          <app-card
            :app='app'
          >
            <template v-slot:buttons>
              <q-btn
                no-caps
                style='border-radius: 0 0 8px 8px'
                class='clubButton clubButtonActive full-width'
                label='save'
                @click='onSave()'
              />
            </template>
          </app-card>
        </div>

        <div class='col-sm col-12'>
          <q-input
            label='title'
            class='q-mb-md'
            hint='name of this app instance'
            v-model='formData.title'
            filled dark
          />

          <q-input
            label='slug'
            class='q-mb-md'
            hint='url-friendly name'
            v-model='formData.appSlug'
            filled dark
          />

          <q-input
            label='menu priority'
            class='q-mb-lg'
            hint='menu items are sorted according to this value in ascending order, leave it blank to hide the app from menu'
            v-model='formData.menuIndex'
            type='number'
            filled dark
          />

          <prop-list-editor
            :props='app.config.computed'
            v-model='formData.props'
          />
        </div>
      </div>

      <div v-if='app && Object.keys(app.actions || {}).length > 0'
           class='row q-col-gutter-md q-py-sm'>
        <div class='col'>
          <div class='text-h6 q-pb-sm'>actions</div>

          <template v-for='action in app.actions' :key='action.key' class='q-pb-sm'>
            <q-card dark class='clubCard'>
              <q-card-section horizontal>
                <q-card-section>
                  <q-badge class='clubButtonActive'>{{ action.name }}</q-badge>
                </q-card-section>
                <q-card-section>
                  <p>{{ action.description }}</p>

                  <small>parameters:</small>
                  <div v-for='prop in action.props' :key='prop.key'>
                    <q-badge class='bg-white text-black'>{{ prop.label }}</q-badge>
                    &mdash; {{ prop.description }}
                  </div>
                  <div class='q-pa-sm'></div>
                  <small>input:</small>
                  <div v-for='input in action.input' :key='input.key'>
                    <q-badge class='bg-white text-black'>{{ input.label }}</q-badge>
                    &mdash; {{ input.description }}
                  </div>

                </q-card-section>
              </q-card-section>
            </q-card>
          </template>
        </div>
      </div>

      <div v-if='app && Object.keys(app.events || {}).length > 0'
           class='row q-col-gutter-md q-py-sm'>
        <div class='col'>
          <div class='text-h6 q-pb-sm'>events</div>

          <template v-for='event in app.events' :key='event.key' class='q-pb-sm'>
            <q-card dark class='clubCard'>
              <q-card-section horizontal>
                <q-card-section>
                  <q-badge class='clubButtonActive'>{{ event.name }}</q-badge>
                </q-card-section>
                <q-card-section>
                  <p>{{ event.description }}</p>

                  <small>parameters:</small>
                  <div v-for='prop in event.props' :key='prop.key'>
                    <q-badge class='bg-white text-black'>{{ prop.label }}</q-badge>
                    &mdash; {{ prop.description }}
                  </div>
                  <div class='q-pa-sm'></div>
                  <small>output:</small>
                  <div v-for='output in event.output' :key='output.key'>
                    <q-badge class='bg-white text-black'>{{ output.label }}</q-badge>
                    &mdash; {{ output.description }}
                  </div>

                </q-card-section>
              </q-card-section>
            </q-card>

          </template>
        </div>
      </div>

    </template>

  </club-page>
</template>

<script lang='ts'>
import { defaultPagination } from 'src/lib/components/table';
import { defineComponent, onMounted, reactive, ref, watch } from 'vue';
import ClubPage from 'components/clublayout/ClubPage.vue';
import { api } from 'boot/axios';
import { requireParam } from 'src/uses/useAppRoute';
import AppCard from 'src/modules/appManager/components/AppCard.vue';
import ClubAppMenu from 'src/modules/appManager/components/ClubAppMenu.vue';
import fromEntries from 'fromentries';
import PropListEditor from 'components/dashboard/PropListEditor.vue';
import { deserializeProp, IPropValue, IRegistryItem, serializeProp } from 'src/modules/appManager/shared/propHelpers';
import { Notify } from 'quasar';
import { useRouter } from 'vue-router';
import { useClubStore } from 'stores/clubStore';

interface IFetchedUser {
  // id: number
  screenName: string
  coverImg: string
  amount: number
  roles: {
    name: string
    class?: string
  }[]
  wallets: {
    address: string
    chainNorm: string
  }[]
}

const columns = [
  { name: 'screenName', align: 'left', label: 'name', sortable: true, field: (u: IFetchedUser) => u.screenName },
  { name: 'roles', align: 'left', label: 'roles', field: 'roles' },
  { name: 'amount', align: 'left', label: 'tokens', field: 'amount', sortable: true },
  { name: 'wallets', align: 'right', label: 'wallet', field: 'wallets' }
];

interface IClubApp {
  id: number,
  title: string,
  appSlug: string,
  menuIndex: number | null,
  config: Record<string, string>,
  app: IRegistryItem,
}

export default defineComponent({
  components: { PropListEditor, ClubAppMenu, AppCard, ClubPage },
  setup() {
    const $router = useRouter();
    const clubSlug = requireParam('clubSlug');
    const appSlug = requireParam('appSlug');
    const $club = useClubStore();

    const app = ref<IRegistryItem | null>(null);
    const clubApp = ref<IClubApp | null>(null);
    const load = async () => {
      if (!clubSlug.value || !appSlug.value) return;

      const result = await api.get<{ clubApp: IClubApp }>(`/api/club/${clubSlug.value}/app/club-apps/clubAppSlug:${appSlug.value}`);
      clubApp.value = result.data.clubApp;
      app.value = result.data.clubApp.app;

      if (!app.value.name) app.value.name = clubApp.value.title;
      if (!app.value.coverImg) app.value.coverImg = `https://ui-avatars.com/api/?name=${app.value.name}&size=256&bold=true&format=svg&background=1D1D27&color=fff`;

      formData.title = clubApp.value.title;
      formData.appSlug = clubApp.value.appSlug;
      formData.menuIndex = clubApp.value.menuIndex;
      formData.props = fromEntries(
        Object.entries(result.data.clubApp.config).map(([k, v]) => [k, deserializeProp(v, app?.value?.config?.props?.[k])])
      );

      // Object.entries(app.value.config.props).forEach(([key, prop]) => {
      //   formData.props[key] = clubApp.value?.config?.[key] || '';
      // });
    };
    onMounted(load);
    watch([clubSlug, appSlug], load);

    const formData = reactive<{
      title: string,
      appSlug: string,
      menuIndex: number | null,
      props: Record<string, IPropValue | { value: string, label?: string } | null>,
    }>({
      title: '',
      appSlug: '',
      menuIndex: null,
      props: {} as Record<string, IPropValue | { value: string, label?: string } | null>
    });

    const onSave = async () => {
      const result = await api.put<{
        clubApp: {
          id: number,
          appSlug: string
        }
      }>(`/api/club/${clubSlug.value}/app/club-apps/clubAppSlug:${appSlug.value}`, {
        ...formData,
        props: fromEntries(
          Object.entries(formData.props).map(([k, v]) => [k, serializeProp(v, app?.value?.config?.props?.[k])])
        )
      });

      Notify.create({
        type: 'positive',
        message: 'app updated'
      });

      //reload club data & menu
      await $club.load();

      const newAppSlug = result.data.clubApp.appSlug;
      if (newAppSlug !== appSlug.value) {
        await $router.push({
          name: 'club-app-manage',
          params: {
            appSlug: newAppSlug
          }
        });
      }
    };

    return {
      app,
      clubApp,
      columns,
      defaultPagination,
      onSave,
      formData
    };
  }
});
</script>

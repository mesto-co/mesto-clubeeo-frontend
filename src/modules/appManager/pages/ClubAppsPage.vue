<template>
  <club-page
    header='apps'
    sticky='top'
    :header-classes='{padding: {"q-px-md": true}}'
    :loading='isLoading'
  >
    <template v-slot:header>
      <app-manager-menu />
    </template>

    <div
      v-if='!isLoading && appList.length === 0'
      class='text-center'
    >
      <div class='q-pt-xl'>
        you don't have any installed apps yet
      </div>
      <club-button
        label='go to registry'
        class='clubButtonActive q-ma-lg'
        :to='{name: "club-apps-registry"}'
      />
    </div>

    <div class='flex flex-center q-my-md' v-if='!isLoading'>
      <template
        v-for='(clubApp, i) of appList'
        v-bind:key='i'
      >
        <app-card
          class='q-ma-sm'
          :app='mapToAppCard(clubApp)'
        >
          <template v-slot:buttons>
            <q-btn
              no-caps
              style='border-radius: 0 0 8px 8px'
              class='clubButton clubButtonActive full-width'
              label='manage'
              :to='{name: "club-app-manage", params: {appSlug: clubApp.appSlug}}'
            />
          </template>
        </app-card>
      </template>
    </div>

    <!--    <div class='q-mb-md text-center'>-->
    <!--      total members: 318-->
    <!--    </div>-->

  </club-page>

</template>

<script lang='ts'>
import { defaultPagination } from 'src/lib/components/table';
import { defineComponent } from 'vue';
import ClubPage from 'components/clublayout/ClubPage.vue';
import { requireParam } from 'src/uses/useAppRoute';
import AppManagerMenu from 'src/modules/appManager/components/AppManagerMenu.vue';
import { useLoadIndex } from 'src/uses/useLoaders';
import ClubButton from 'components/clubpage/ClubButton.vue';
import AppCard from 'src/modules/appManager/components/AppCard.vue';

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
  app: {
    key: string,
    description: string
    coverImg: string,
    name: string,
    version: string,
    tags: string,
  }
}

export default defineComponent({
  components: { AppCard, ClubButton, AppManagerMenu, ClubPage },
  setup() {
    const clubSlug = requireParam('clubSlug');

    const { data: appList, isLoading } = useLoadIndex<IClubApp, 'clubApps'>({
      url: () => `/api/club/${clubSlug.value}/app/club-apps`,
      key: 'clubApps'
    });

    // const $router = useRouter();

    // const onInstallClick = async (registryItem: IClubApp) => {
    //   await $router.push({
    //     name: 'club-app-install',
    //     params: {
    //       appKey: registryItem.key,
    //     }
    //   });
    // }

    const mapToAppCard = (clubApp: IClubApp) => {
      return {
        coverImg: clubApp.app?.coverImg || `https://ui-avatars.com/api/?name=${clubApp.title}&size=256&bold=true&format=svg&background=1D1D27&color=fff`,
        name: clubApp.title,
        tags: clubApp.app?.tags,
        description: clubApp.app?.description
      };
    };

    return {
      appList,
      columns,
      defaultPagination,
      isLoading,
      mapToAppCard
      // installDialog: ref(false),
      // onInstallClick,
    };
  }
});
</script>

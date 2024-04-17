<template>
  <club-page
    header='apps'
    sticky='top'
    :header-classes='{padding: {"q-px-md": true}}'
  >
    <template v-slot:header>
      <app-manager-menu />
    </template>

    <div class='flex flex-center q-my-md'>
      <template
        v-for='(app, i) of appList'
        v-bind:key='i'
      >
        <app-card
          :app='app'
          class='q-ma-sm'
        >
          <template v-slot:buttons>
            <q-btn
              v-if='!app.button'
              no-caps
              style='border-radius: 0 0 8px 8px'
              class='clubButton clubButtonActive full-width'
              icon='fa-solid fa-square-plus'
              label='install'
              disable
            />

            <q-btn
              v-else-if='app.button.href'
              no-caps
              style='border-radius: 0 0 8px 8px'
              class='clubButton clubButtonActive full-width'
              icon='fa-solid fa-square-plus'
              :label='(app.button || {}).label || "install"'
              type='a'
              :href='app.button.href'
              target='_blank'
            />

            <q-btn
              v-else
              no-caps
              style='border-radius: 0 0 8px 8px'
              class='clubButton clubButtonActive full-width'
              icon='fa-solid fa-square-plus'
              :label='(app.button || {}).label || "add"'
              @click='onInstallClick(app)'
            />
          </template>
        </app-card>
      </template>
    </div>

<!--    <div class='q-mb-md text-center'>-->
<!--      total members: 318-->
<!--    </div>-->

  </club-page>

<!--  <q-dialog v-model="installDialog">-->
<!--    <q-card dark class='dialog-width'>-->
<!--      <q-card-section>-->
<!--        <div class="text-h6">install app</div>-->
<!--      </q-card-section>-->

<!--      <q-card-section class="q-pt-none">-->
<!--        <q-input-->
<!--          label='title'-->
<!--          dark outlined-->
<!--          class='q-mb-md'-->
<!--          v-model='badgeName'-->
<!--        />-->

<!--        <q-select-->
<!--          label='type'-->
<!--          dark outlined-->
<!--          class='q-mb-md'-->
<!--          v-model='badgeType'-->
<!--          :options='badgeOptions'-->
<!--        >-->
<!--          <template v-slot:option="scope">-->
<!--            <q-item v-bind="scope.itemProps">-->
<!--              &lt;!&ndash;              <q-item-section avatar>&ndash;&gt;-->
<!--              &lt;!&ndash;                <q-icon :name="scope.opt.icon" />&ndash;&gt;-->
<!--              &lt;!&ndash;              </q-item-section>&ndash;&gt;-->
<!--              <q-item-section>-->
<!--                <q-item-label>{{ scope.opt.label }}</q-item-label>-->
<!--                <q-item-label caption>{{ scope.opt.caption }}</q-item-label>-->
<!--              </q-item-section>-->
<!--            </q-item>-->
<!--          </template>-->
<!--        </q-select>-->

<!--        <q-uploader-->
<!--          flat-->
<!--          url='/api/uploads/image'-->
<!--          class='q-mb-lg full-width clubBgDefault'-->
<!--          label='Upload image'-->
<!--          auto-upload-->
<!--          @uploaded='onImgUploaded'-->
<!--        />-->
<!--      </q-card-section>-->

<!--      <q-card-actions align="right">-->
<!--        <club-button-->
<!--          class='clubButton'-->
<!--          v-close-popup-->
<!--        >-->
<!--          cancel-->
<!--        </club-button>-->

<!--        <club-button-->
<!--          class='clubButtonActive'-->
<!--          v-close-popup-->
<!--          @click='createBadge'-->
<!--        >-->
<!--          add-->
<!--        </club-button>-->
<!--      </q-card-actions>-->
<!--    </q-card>-->
<!--  </q-dialog>-->

</template>

<script lang='ts'>
import { defaultPagination } from 'src/lib/components/table';
import { computed, defineComponent, onMounted, provide, ref, watch } from 'vue';
import ClubPage from 'components/clublayout/ClubPage.vue';
import { api } from 'boot/axios';
import { requireParam } from 'src/uses/useAppRoute';
import { useRouter } from 'vue-router';
import AppManagerMenu from 'src/modules/appManager/components/AppManagerMenu.vue';
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

interface IRegistryItem {
  key: string,
  description: string
  coverImg: string,
  name: string,
  version: string,
}

export default defineComponent({
  components: { AppCard, AppManagerMenu, ClubPage },
  setup() {
    const clubSlug = requireParam('clubSlug');

    const selected = ref([]);
    const searchText = ref('social engagement');

    const registry = ref<IRegistryItem[]>([]);
    const load = async () => {
      const result = await api.get<{apps: IRegistryItem[]}>(`/api/club/${clubSlug.value}/app/registry`);
      registry.value = result.data.apps;
    }
    onMounted(load);
    watch(clubSlug, load);

    provide('clubStyle', ref({
      socialColor: '#1D1D27',
      socialTextColor: '#FFFFFF'
    }));

    const freeBadge = {
      label: 'free',
      class: 'clubButtonGrass'
    }

    const subscriptionBadge = {
      label: 'available in subscription',
      class: 'clubButtonActive'
    }

    const installViaFormButton = {
      label: 'request beta',
      href: 'https://forms.gle/JjY7TBNeU9mshKq46'
    }

    const appList = computed(() => [
      ...registry.value.map((item) => ({
        ...item,
        button: {},
      })),
      {
        coverImg: 'http://store-images.s-microsoft.com/image/apps.55784.14473651905739879.7e8ace6f-b86f-4bec-9f23-d539d439d019.be0af39d-bd1f-4dc6-af9f-0791118700e8',
        name: '@ClubeeoBot',
        description: 'integration with Telegram',
        tags: '#telegram #integration #push',
        badge: freeBadge,
        button: installViaFormButton,
      },
      {
        coverImg: 'https://www.freepnglogos.com/uploads/discord-logo-png/concours-discord-cartes-voeux-fortnite-france-6.png',
        name: 'Discord bot',
        description: 'integration with Discord',
        tags: '#discord #integration #push',
        badge: freeBadge,
        button: installViaFormButton,
      },
      {
        coverImg: '/imgs/apps/giveaway.jpg',
        name: 'NFT giveaway',
        description: 'automated rewards',
        tags: '#NFT #rewards #giveaway',
        badge: subscriptionBadge,
        button: installViaFormButton,
      },
      // {
      //   coverImg: '/imgs/apps/token-gating.jpg',
      //   name: 'token-gating',
      //   description: 'tracks NFT and tokens ownership to give access to content, threads and apps',
      //   tags: '#NFT #token-gating',
      //   badge: freeBadge,
      //   button: installViaFormButton,
      // },
      // {
      //   coverImg: '/imgs/apps/gated-content.png',
      //   name: 'gated content',
      //   description: 'unlockable content and videos for NFT holders and community contributors',
      //   tags: '#rewards #token-gating #NFT',
      //   badge: freeBadge,
      //   button: installViaFormButton,
      // },
      {
        coverImg: '/imgs/apps/post.png',
        name: 'post & react',
        description: 'classical feed app: posts, comments and reactions',
        tags: '#voting #posts #community',
        badge: freeBadge,
        button: installViaFormButton,
      },
      {
        coverImg: '/imgs/apps/proposals.jpg',
        name: 'community proposals',
        description: 'off-chain DAO',
        tags: '#voting #governance #community',
        badge: freeBadge,
        button: installViaFormButton,
      },
      {
        coverImg: '/imgs/apps/qna.jpg',
        name: 'community-managed Q&A',
        description: 'your pocket Quora',
        tags: '#voting #governance #community',
        badge: freeBadge,
        button: installViaFormButton,
      },
      {
        coverImg: '/imgs/apps/task-reward.jpg',
        name: 'task & reward',
        description: 'facilitate community members contribution with custom task & reward campaign',
        tags: '#community #marketing #growth #template',
        badge: subscriptionBadge,
        button: installViaFormButton,
      },
      {
        coverImg: '/imgs/apps/referral.png',
        name: 'invite-a-friend campaign',
        description: 'template for referral campaign',
        tags: '#marketing #automation #template',
        badge: subscriptionBadge,
        button: installViaFormButton,
      },
      {
        coverImg: 'http://store-images.s-microsoft.com/image/apps.55784.14473651905739879.7e8ace6f-b86f-4bec-9f23-d539d439d019.be0af39d-bd1f-4dc6-af9f-0791118700e8',
        name: 'custom Telegram bot',
        description: 'your community bot in Telegram',
        tags: '#telegram #integration #push',
        badge: subscriptionBadge,
        button: installViaFormButton,
      },
      // {
      //   coverImg: '/imgs/apps/automation.jpg',
      //   name: 'no-code automation',
      //   description: 'glue apps together, customize rewarding, scoring and send notifications',
      //   tags: '#community #marketing #automation',
      //   badge: subscriptionBadge,
      //   button: installViaFormButton,
      // },
      // {
      //   coverImg: 'https://codegait.com/wp-content/uploads/2019/01/Third-party-Integrations.png',
      //   name: 'custom API integration',
      //   description: 'build your solution on top of Clubeeo API',
      //   tags: '#api #automation',
      //   badge: subscriptionBadge,
      //   button: installViaFormButton,
      // },

      // {
      //
      // }
      // {
      //   coverImg: '/demo/town.png',
      //   name: 'idle NFT',
      //   description: 'idler-style game to introduce your NFT collection in fun way',
      //   tags: '#game #engagement #idle #longplay',
      //   badge: {
      //     label: 'available in subscription',
      //     class: 'clubButtonActive'
      //   }
      // },
      // {
      //   coverImg: '/demo/abstract-isometric-blocks-background-vector.jpeg',
      //   name: 'NFT-tetris',
      //   description: 'classical game introducing your NFT collection during gameplay',
      //   tags: '#game #engagement',
      //   badge: {
      //     label: 'available in subscription',
      //     class: 'clubButtonActive'
      //   }
      // },
      //
      // {
      //   coverImg: '/demo/chatbot-application.jpg',
      //   name: 'RPG chatbot',
      //   description: 'free chatbot RPG game for Discord and Telegram<br />seamless integration with social tasks',
      //   tags: '#game #engagement #idle #longplay',
      //   badge: {
      //     label: 'free app',
      //     class: 'clubButtonGrass'
      //   }
      // },
    ]);

    const $router = useRouter();

    const onInstallClick = async (registryItem: IRegistryItem) => {
      await $router.push({
        name: 'club-app-install',
        params: {
          appKey: registryItem.key,
        }
      });
    }

    return {
      appList,
      selected,
      searchText,
      columns,
      defaultPagination,
      // installDialog: ref(false),
      onInstallClick,
    };
  }
});
</script>

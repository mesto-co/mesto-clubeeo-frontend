<template>
  <q-page class='clubPage'>

    <div class='text-h6 q-pb-md'>members</div>

    <div class='q-pb-md'>
      <q-tab-panels
        v-model='tab'
        animated
        class='q-pa-none q-ma-none bg-transparent'
      >

        <q-tab-panel
          name='init'
          class='q-pa-none q-ma-none bg-transparent row'
        >

          <div class='col'>
            <q-input
              label='Search'
              outlined dark dense
              v-model='searchText'
              style='width: 240px'
            >
              <template v-slot:append>
                <q-icon v-if="searchText !== ''" name='close' @click="searchText = ''" class='cursor-pointer' />
                <q-icon name='search' />
              </template>
            </q-input>
          </div>

          <div class='col text-right'>
            <div>
              <div class='q-pb-xs' style='color: rgba(255,255,255,0.66)'>filter by role</div>
              <q-badge class='q-ml-xs' color='grey-4' text-color='black'>standard</q-badge>
              <q-badge class='clubButtonActive q-ml-xs'>premium</q-badge>
              <q-badge class='clubButtonBlue q-ml-xs'>KYC passed</q-badge>
              <q-badge class='clubButtonActive q-ml-xs'>early bird</q-badge>
              <q-badge class='q-ml-xs' outline color='grey'>has BAYC</q-badge>
              <q-badge class='clubButtonActive q-ml-xs'>10+ NFTs</q-badge>
            </div>
          </div>

        </q-tab-panel>

        <q-tab-panel
          name='message'
          class='q-pa-none q-ma-none bg-transparent '
        >

        </q-tab-panel>

      </q-tab-panels>
    </div>

    <q-tab-panels
      v-model='tab'
      animated
      class='q-pa-none q-ma-none bg-transparent'
    >

      <q-tab-panel
        name='init'
        class='q-pa-none q-ma-none bg-transparent'
      >

        <q-table
          :rows='users'
          :columns='columns'
          row-key='screenName'
          hide-bottom
          dark
          style='background-color: rgb(29 29 39);'
          :pagination='defaultPagination'
          selection='multiple'
          class='q-mb-md'
          v-model:selected='selected'
        >

          <template v-slot:body-cell-wallets='props'>
            <q-td :props='props'>
              <div
                v-for='(wallet, i) in props.row.wallets'
                v-bind:key='i'
              >
                {{ shortenAddress(wallet.address) }}
              </div>
            </q-td>
          </template>

          <template v-slot:body-cell-roles='props'>
            <q-td :props='props'>
              <template
                v-for='(role, i) in props.row.roles'
                v-bind:key='i'
              >
                <q-chip
                  dense
                  square
                  size='12px'
                  :class='{[role.class]: true}'
                >{{ role.name }}
                </q-chip>
              </template>
            </q-td>
          </template>

          <template v-slot:body-cell-socials='props'>
            <q-td :props='props'>
              <q-btn
                dense rounded flat
                size='sm'
                :icon='mapSocialToIcon("twitter")'
              />

              <q-btn
                dense rounded flat
                size='sm'
                :icon='mapSocialToIcon("telegram")'
              />
            </q-td>
          </template>

        </q-table>

        <div class='text-right'>
          <q-btn
            no-caps
            :class='{clubButton: true, clubButtonActive: selected.length > 0, clubButtonDisable: selected.length === 0}'
            :disable='selected.length === 0'
            @click='onMakeAnOffer'
          >batch send
          </q-btn>
        </div>

      </q-tab-panel>

      <q-tab-panel
        name='message'
        class='q-pa-none q-ma-none bg-transparent '
      >
        <div>
          send message
        </div>

        <q-editor
          dark outlined
          style='width: 100%; background-color: transparent'
          v-model='message'
          :toolbar='[]'
        />

        <div class='q-pt-lg'>to</div>

        <q-table
          :rows='selected'
          :columns='columns'
          row-key='screenName'
          hide-bottom
          dark
          style='background-color: rgb(29 29 39);'
          :pagination='defaultPagination'
          class='q-mb-md'
        >

          <template v-slot:body-cell-wallets='props'>
            <q-td :props='props'>
              <div
                v-for='(wallet, i) in props.row.wallets'
                v-bind:key='i'
              >
                {{ shortenAddress(wallet.address) }}
              </div>
            </q-td>
          </template>

          <template v-slot:body-cell-roles='props'>
            <q-td :props='props'>
              <template
                v-for='(role, i) in props.row.roles'
                v-bind:key='i'
              >
                <q-chip
                  dense
                  square
                  size='12px'
                  :class='{[role.class]: true}'
                >{{ role.name }}
                </q-chip>
              </template>
            </q-td>
          </template>

          <template v-slot:body-cell-socials='props'>
            <q-td :props='props'>
              <q-btn
                dense rounded flat
                size='sm'
                :icon='mapSocialToIcon("twitter")'
              />

              <q-btn
                dense rounded flat
                size='sm'
                :icon='mapSocialToIcon("telegram")'
              />
            </q-td>
          </template>

        </q-table>

        <div class='text-right'>
          <q-btn
            no-caps
            :class='{clubButton: true, clubButtonActive: true}'
          >
            <q-icon :name='mapSocialToIcon("telegram")' class='q-mr-sm' />
            send messages
          </q-btn>
        </div>

      </q-tab-panel>

    </q-tab-panels>

  </q-page>
</template>

<script lang='ts'>
import { defaultPagination } from 'src/lib/components/table';
import { computed, defineComponent, ref } from 'vue';
import { mapSocialToIcon } from 'src/lib/components/socials';
import { shortenAddress } from 'src/lib/components/chains';

interface IFetchedUser {
  // id: number
  screenName: string
  imgUrl: string
  tokens: number
  amount: string
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
  { name: 'tokens', align: 'left', label: 'tokens', field: 'tokens', sortable: true },
  { name: 'amount', align: 'left', label: 'amount', field: 'amount', sortable: true },
  { name: 'socials', align: 'left', label: 'socials', field: 'socials' },
  { name: 'wallets', align: 'right', label: 'wallet', field: 'wallets' }
];

export default defineComponent({
  setup() {
    const selected = ref([]);
    const searchText = ref('');

    const users = ref<IFetchedUser[]>([
      {
        screenName: 'NFT Dude',
        imgUrl: '',
        roles: [{ name: 'standard' }],
        tokens: 1,
        amount: 'Ξ1.31',
        wallets: [{
          address: '0x0000...0000',
          chainNorm: 'Ethereum'
        }]
      },
      {
        screenName: 'Another One',
        imgUrl: '',
        tokens: 2,
        amount: 'Ξ0.03',
        roles: [{ name: 'premium', class: 'clubButtonActive' }, { name: 'KYC passed', class: 'clubButtonBlue' }],
        wallets: [{
          address: '0x0000...0001',
          chainNorm: 'Ethereum'
        }]
      },
      {
        screenName: 'Oldie',
        imgUrl: '',
        tokens: 1,
        amount: 'Ξ0.43',
        roles: [{ name: 'early bird', class: 'clubButtonActive' }, { name: 'standard' }],
        wallets: [{
          address: '0x0000...0002',
          chainNorm: 'Ethereum'
        }]
      },
      {
        screenName: 'Big Fan',
        imgUrl: '',
        tokens: 12,
        amount: 'Ξ24.11',
        roles: [{ name: '10+ NFTs', class: 'clubButtonActive' }, {
          name: 'premium',
          class: 'clubButtonActive'
        }, { name: 'KYC passed', class: 'clubButtonBlue' }],
        wallets: [{
          address: '0x0000...0003',
          chainNorm: 'Ethereum'
        }]
      }
    ]);

    const tab = ref('init');
    const message = ref('');

    const onMakeAnOffer = () => {
      tab.value = 'message';
      return;
    };

    const badges = computed(() => {
      return [
        {
          name: 'Twitter Hero',
          img: '/demo/me/badge_demo_1.jpeg',
          description: '10 likes and 10 reposts on Twitter'
        },
        {
          name: 'Early Adopter',
          img: '/demo/me/badge_demo_2.jpeg',
          description: 'First 100 club members'
        },
        {
          name: 'KYC passed',
          img: '/demo/me/badge_demo_kyc.svg',
          description: 'KYC certificate issued on Polygon',
          chain: 'matic',
          role: {
            name: 'KYC passed',
            class: 'clubButtonBlue'
          }
        }
      ].reverse();
    });

    return {
      tab,
      selected,
      users,
      searchText,
      columns,
      defaultPagination,
      message,
      mapSocialToIcon,
      shortenAddress,
      onMakeAnOffer,
      badges,
    };
  }
});
</script>

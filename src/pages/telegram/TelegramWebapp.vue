<template>
  <q-page class='clubPage' style='padding: 0'>

    <div
      class='q-mb-md'
      style='background-image: url("/demo/charitykiss_header.png"); height: 120px; background-size: cover; background-repeat: no-repeat; background-position: center center;'>
    </div>

    <div class='q-mb-md text-center'>
      <div class='text-h5 q-pb-sm'>Demo Club</div>
      Private club<br />
      DAO<br />
      To the moon
    </div>

    <div class='text-center q-mb-md'>
      <social-links
        :social-links='{twitter: "1", instagram: "1", web: "1"}'
      />
    </div>

    <div class='text-center q-mb-sm'>
      <q-btn
        no-caps
        class='clubButton clubButtonActive q-mx-sm q-mb-sm'
        icon='fab fa-telegram-plane'
        label='Demo Club in Telegram'
        disable
      />

      <q-btn
        no-caps
        class='clubButton clubButtonActive q-mx-sm q-mb-sm'
        icon='fab fa-discord'
        label='Demo Club in Discord'
        disable
      />
    </div>

    <div class='flex flex-center q-mb-md'>
      <q-card style='width: 320px; border-radius: 12px; background-color: #1D1D1D' flat class='q-ma-sm'>
        <q-img
          src='https://img.rarible.com/prod/video/upload/t_video_thumb_preview/prod-itemAnimations/0x7171965c9eb3ece226cca9f7eb2f0542e5c35366:72475762466921778884703330387740705564141322443071743540995683200273523671043/2e55ab85tv1'
        />

        <q-card-section class='text-center'>
          standard membership pass<br />
          <small>
            members: 318<br />
            0x03f...1234 @ ethereum
          </small>
        </q-card-section>

        <q-btn
          no-caps
          style='border-radius: 0 0 8px 8px'
          class='clubButton clubButtonActive full-width'
          icon='fa-solid fa-cart-shopping'
          label='collection on Rarible'
          disable
        />
      </q-card>

      <q-card style='width: 320px; border-radius: 12px; background-color: #1D1D1D' class='q-ma-sm' flat>
        <q-img
          src='https://img.rarible.com/prod/video/upload/t_video_thumb_preview/prod-itemAnimations/0x7171965c9eb3ece226cca9f7eb2f0542e5c35366:72475762466921778884703330387740705564141322443071743540995683200273523671043/2e55ab85tv1'
        />

        <q-card-section class='text-center'>
          premium membership pass<br />
          <small>
            members: 14<br />
            0x717...5366 @ ethereum
          </small>
        </q-card-section>

        <q-btn
          no-caps
          style='border-radius: 0 0 8px 8px'
          class='clubButton clubButtonActive full-width'
          icon='fa-solid fa-cart-shopping'
          label='collection on Rarible'
          disable
        />
      </q-card>

      <q-card style='width: 320px; border-radius: 12px; background-color: #1D1D1D' flat class='q-ma-sm'>
        <q-img
          src='https://img.rarible.com/prod/video/upload/t_video_thumb_preview/prod-itemAnimations/0x7171965c9eb3ece226cca9f7eb2f0542e5c35366:72475762466921778884703330387740705564141322443071743540995683200273523671043/2e55ab85tv1'
        />

        <q-card-section class='text-center'>
          premium+ membership pass<br />
          <small>
            members: 3<br />
            0x000...ffff @ ethereum
          </small>
        </q-card-section>

        <q-btn
          no-caps
          style='border-radius: 0 0 8px 8px'
          class='clubButton clubButtonActive full-width'
          icon='fa-solid fa-cart-shopping'
          label='collection on Rarible'
          disable
        />
      </q-card>
    </div>

    <div class='q-mb-md text-center'>
      total members: 318
    </div>

  </q-page>
</template>

<script lang='ts'>
import { defaultPagination } from 'src/lib/components/table';
import { defineComponent, provide, ref } from 'vue';
import SocialLinks from 'components/clubpage/SocialLinks.vue';

interface IFetchedUser {
  // id: number
  screenName: string
  imgUrl: string
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

export default defineComponent({
  components: { SocialLinks },
  setup() {
    const selected = ref([]);
    const searchText = ref('');

    const users = ref<IFetchedUser[]>([
      {
        screenName: 'NFT Dude',
        imgUrl: '',
        roles: [{ name: 'standard' }],
        amount: 1,
        wallets: [{
          address: '0x0000000000000000000000000',
          chainNorm: 'Ethereum'
        }]
      },
      {
        screenName: 'Another One',
        imgUrl: '',
        amount: 2,
        roles: [{ name: 'premium', class: 'clubButtonActive' }, { name: 'KYC passed', class: 'clubButtonBlue' }],
        wallets: [{
          address: '0x0000000000000000000000001',
          chainNorm: 'Ethereum'
        }]
      },
      {
        screenName: 'Oldie',
        imgUrl: '',
        amount: 1,
        roles: [{ name: 'early bird', class: 'clubButtonActive' }, { name: 'standard' }],
        wallets: [{
          address: '0x0000000000000000000000002',
          chainNorm: 'Ethereum'
        }]
      },
      {
        screenName: 'Big Fan',
        imgUrl: '',
        amount: 12,
        roles: [{ name: '10+ NFTs', class: 'clubButtonActive' }, {
          name: 'premium',
          class: 'clubButtonActive'
        }, { name: 'KYC passed', class: 'clubButtonBlue' }],
        wallets: [{
          address: '0x0000000000000000000000003',
          chainNorm: 'Ethereum'
        }]
      }
    ]);

    provide('clubStyle', ref({
      socialColor: '#1D1D27',
      socialTextColor: '#FFFFFF'
    }));

    return {
      selected,
      users,
      searchText,
      columns,
      defaultPagination
    };
  }
});
</script>

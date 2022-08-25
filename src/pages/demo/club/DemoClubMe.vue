<template>
  <q-page class='clubPage'>

    <div class='text-h6 q-pb-md'>me</div>

    <div
      class='q-mb-md'
      style='background-image: url("/demo/charitykiss_header.png"); height: 120px; background-size: cover; background-repeat: no-repeat; background-position: center center;'>
    </div>

    <div class='q-mb-md text-center'>
      <div class='text-h5 q-pb-sm'>Daw Johnson @ Demo Club</div>
      I'm active contributor in Demo Club community<br />
      💜 Demo Club ✌️
    </div>

    <div class='text-center q-mb-md'>
      <social-links
        :social-links='{twitter: "1", instagram: "1", telegram: "1"}'
      />
    </div>

    <!--    <div class='q-mb-md'>-->
    <!--      My community pass:-->
    <!--    </div>-->

    <!--    <div class='flex q-mb-md'>-->
    <!--      <q-card style='width: 180px; border-radius: 12px; background-color: #1D1D1D' class='q-mr-md' flat>-->
    <!--        <q-img-->
    <!--          src='https://img.rarible.com/prod/video/upload/t_video_thumb_preview/prod-itemAnimations/0x7171965c9eb3ece226cca9f7eb2f0542e5c35366:72475762466921778884703330387740705564141322443071743540995683200273523671043/2e55ab85tv1'-->
    <!--        />-->

    <!--        <q-card-section class='text-center'>-->
    <!--          <div>Demo Club</div>-->
    <!--          <q-badge class='clubButtonActive q-ml-xs'>premium</q-badge><br />-->
    <!--          <small>-->
    <!--&lt;!&ndash;            amount: 1<br />&ndash;&gt;-->
    <!--            0x717...5366 @ ethereum-->
    <!--          </small>-->
    <!--        </q-card-section>-->
    <!--      </q-card>-->
    <!--    </div>-->

    <!--    <div class='q-mb-md text-center'>-->
    <!--      total members: 318-->
    <!--    </div>-->

  </q-page>
</template>

<script lang='ts'>
import { defaultPagination } from 'src/lib/components/table';
import { computed, defineComponent, provide, ref } from 'vue';
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
      ];
    });

    const nfts = computed(() => {
      return [
        {
          name: 'Cat #0315',
          img: '/demo/me/nft_demo_1.png',
          description: 'Cat with common rarity',
          chain: 'near',
          role: {
            name: 'standard',
            class: 'clubButtonDisable'
          }
        },
        {
          name: 'Cat #1261',
          img: '/demo/me/nft_demo_2.png',
          description: 'Rare cat',
          chain: 'near',
          role: {
            name: 'premium',
            class: 'clubButtonActive'
          }
        },
      ];
    });

    provide('clubStyle', ref({
      socialColor: '#1D1D27',
      socialTextColor: '#FFFFFF'
    }));

    return {
      selected,
      users,
      searchText,
      badges,
      nfts,
      columns,
      defaultPagination
    };
  }
});
</script>

<template>

  <div class='landingPage'>
<!--    <q-page-->
<!--      class='row items-center justify-evenly'-->
<!--      :style='{backgroundColor: "#111117", color: "#ebebef"}'-->
<!--    >-->
<!--      <q-img-->
<!--        src='/imgs/Logo-White.svg'-->
<!--        style='width: 400px'-->
<!--      />-->
<!--    </q-page>-->

    <template
      v-for='(item, i) in data' :key='i'
    >
      <q-page
        class='row items-center justify-evenly'
        :style='item.style'
      >
        <div
          v-if='item.title || item.header || item.image'
          class='col-12 q-pa-md q-pt-xl'
        >
          <div
            v-if='item.image'
            class='text-center q-pb-lg'
          >
            <q-img
              :src='item.image.src'
              :style='item.image.style || {}'
            />
          </div>
          <h1
            v-if="item.header"
            class='col-12 text-center q-ma-none'
          >
            <span class='clubHeaderActive'>
              {{ item.header }}
            </span>
          </h1>
          <h2
            class='col-12 text-center q-ma-none'
            v-html='item.title.join("<br />")'
          />
        </div>

        <template
          v-for='(card, j) in item.cards' :key='j'
        >
          <card-renderer
            :card='card'
          />
        </template>

        <div class='text-center col-12'>
          <template v-if='getNextFor(data, i)'>
            <div>{{ getNextFor(data, i) }}</div>
            <q-icon name='fas fa-arrow-down' size='xl' />
          </template>
        </div>
      </q-page>
    </template>

    <q-page
      class='row items-center justify-evenly'
      style='background-color: #111117; color: #ebebef'
    >

      <div class='col-12 q-pa-sm q-pt-xl'>
        <h4
          class='col-12 text-center q-ma-none'
        ><span class='clubHeaderActive'>Featured clubs</span></h4>
      </div>

      <div class='row q-col-gutter-md flex-center'>
        <template
          v-for='club in clubs'
          v-bind:key='club.slug'
        >
          <div class='col-xs-12 col-md text-center' style='max-width: 180px'>
            <q-img
              :src='club.logoImg'
              :alt='`${club.name} logo`'
              style='width: min(160px, 20vw); border-radius: min(80px, 10vw)'
              ratio='1'
            />

            <q-btn
              class='full-width q-mt-md'
              :href='`https://clubeeo.com/${club.slug}`'
              type='a'
              target='_blank'
              no-caps flat
              style='background-color: #2b2e3b; border-radius: 8px'
            >{{ club.name }}
            </q-btn>
          </div>
        </template>
      </div>

      <div class='col-12 q-pa-sm'>
        <h4
          class='col-12 text-center q-ma-none'
        ><span class='clubHeaderActive'>Our partners</span></h4>
      </div>

      <h2 class='col-12 text-center q-pa-sm q-ma-none'>
        <q-btn
          flat
          style='background-color: #2b2e3b; border-radius: 8px'
          class='q-ma-sm'
          href='https://superdao.notion.site/About-Superdao-240d101034524747a05bfc1b90ee3185'
          target='_blank'
          type='a'
        >
          <q-img
            fit='scale-down'
            src='https://superdao.co/assets/images/logo.svg'
            height='69px' width='200px'
            alt='SuperDAO'
          />
        </q-btn>

        <q-btn
          flat
          style='background-color: #2b2e3b; border-radius: 8px'
          class='q-ma-sm'
          href='https://app.pass.hashbon.com'
          target='_blank'
          type='a'
        >
          <q-img
            fit='scale-down'
            src='https://app.pass.hashbon.com/static/media/img-logo-large-v2.143c11e7754c7198bc3cb53337b44fb2.svg'
            height='69px' width='200px'
            alt='HashbonPass'
          />

        </q-btn>

        <q-btn
          flat
          style='background-color: #2b2e3b; border-radius: 8px'
          class='q-ma-sm'
          href='https://astrodao.com'
          target='_blank'
          type='a'
        >
          <q-img
            fit='scale-down'
            src='https://astrodao.com/static/media/hero-astro-logo.54b9f45d.svg'
            height='69px' width='200px'
            alt='AstroDAO'
          />

        </q-btn>

      </h2>

      <div class='text-center col-12 q-pb-md'>
        <div>Join now</div>
        <q-icon name='fas fa-arrow-down' size='xl' />
      </div>
    </q-page>

    <q-page
      class='row items-center justify-evenly text-white bg-black'
    >

      <div class='text-center col-12'>
      </div>

      <h2 class='col-12 text-center q-pa-md q-pt-xl'>
        <q-btn
          size='xl'
          outline
          no-caps
          style='border-radius: 8px; font-size: 3.5rem; padding: 1rem 3rem'
          type='a'
          :href='formUrl'
          target='_blank'
        >
          Join now
        </q-btn>
      </h2>

      <div class='text-center col-12'>
        <q-btn
          icon='fab fa-twitter'
          size='xl'
          href='https://twitter.com/clubeeo_service'
          target='_blank'
          dense flat round
        ></q-btn>

        <q-btn
          icon='fab fa-telegram-plane'
          size='xl'
          href='https://t.me/clubeeo_en'
          target='_blank'
          dense flat round
        ></q-btn>
      </div>

      <!--      <div-->
      <!--        v-for='(card, j) in item.cards' :key='j'-->
      <!--        class='q-pa-md'-->
      <!--      >-->
      <!--        <h4 class='text-h4 q-ma-none q-pb-md'>-->
      <!--          {{ card.title }}-->
      <!--        </h4>-->
      <!--        <div>-->
      <!--          {{ card.text }}-->
      <!--        </div>-->
      <!--      </div>-->

      <!--      <div class='text-center col-12'>-->
      <!--        <template v-if='item.next'>-->
      <!--          <div>{{ item.next }}</div>-->
      <!--          <q-icon name='fas fa-arrow-down' size='xl' />-->
      <!--        </template>-->
      <!--      </div>-->
    </q-page>
  </div>

</template>

<script lang='ts'>
import { defineComponent, ref } from 'vue';
import CardRenderer from 'components/renderer/CardRenderer.vue';

export default defineComponent({
  name: 'PageIndex',
  components: { CardRenderer },
  setup() {
    const formUrl = 'https://docs.google.com/forms/d/e/1FAIpQLScDk4jfxeubDEMFQDkW67mWvBHHqCaTQVK76g_uBpyBCXuFWA/viewform?usp=sf_link';
    const data = ref([
      {
        style: {
          backgroundColor: '#111117',
          color: '#ebebef'
        },
        image: {
          src: '/imgs/Logo-White.svg',
          style: {
            maxWidth: '500px',
            maxHeight: '104px'
          }
        },
        // header: {img: '/imgs/Logo-White.svg'},
        title: ['turn any NFT collection into private club'],
        cards: [
          {
            title: 'push your community to the next level',
            button: {
              label: 'apply for beta',
              style: {
                borderRadius: '8px'
              },
              class: {
                clubButtonActive: true
              },
              href: formUrl
            }
          }
          // {
          //   title: 'Pick your blockchain',
          //   text: 'Ethereum, Polygon, Binance Chain, Solana'
          // },
          // {
          //   title: 'Self-governed community',
          //   text: 'Voting power based on token amount and metadata'
          // }
        ],
        next: 'exclusiveness and collaboration'
      },

      {
        style: {
          backgroundColor: '#1D1D27',
          // backgroundColor: '#0f1335',
          color: '#ebebef'
          // color: '#bfc5eb'
        },
        title: ['<span class="clubHeaderActive">Exclusiveness</span> and <span class="clubHeaderActive">collaboration</span>'],
        cards: [
          {
            title: '<span class="clubHeaderActive">Closed groups</span>',
            text: 'accessible by owners of your NFTs',
            class: ''
          },
          {
            title: '<span class="clubHeaderActive">Pages and feeds</span>',
            text: 'managed as a DAO',
            // button: {
            //   label: 'how does it work',
            // }
          }
        ],
        next: 'Value'
      },

      {
        // style: {
        //   backgroundColor: '#0e8e82',
        //   // backgroundColor: '#0f1335',
        //   color: '#c9eeea'
        //   // color: '#bfc5eb'
        // },
        title: ['<span class="clubHeaderActive">Value</span>'],
        cards: [
          {
            title: 'Long-term value provider',
            text: 'with sustainable community model',
            class: {'col-md-6': true, 'col-12': true},
          },
          {
            title: 'Self-governance',
            text: 'vote for rules & roles',
            class: {'col-md-6': true, 'col-12': true},
          },
          {
            title: 'Unique content',
            text: 'for your project\'s tokens owners',
            class: {'col-md-6': true, 'col-12': true},
          },
          {
            title: 'Integrations',
            text: 'the bridge between web2 and web3',
            class: {'col-md-6': true, 'col-12': true},
          }
        ],
        next: 'Supported Chains'
      },

      // {
      //   style: {
      //     backgroundColor: '#1D1D27',
      //     color: '#ebebef'
      //     // backgroundColor: '#0e8e82',
      //     // backgroundColor: '#0f1335',
      //     // color: '#c9eeea'
      //     // color: '#bfc5eb'
      //   },
      //   title: ['<span class="clubHeaderActive">Customization</span>'],
      //   cards: [
      //     {
      //       title: 'Unique content',
      //       text: 'for your project\'s tokens owners'
      //     },
      //     {
      //       title: 'Integrations',
      //       text: 'the bridge between web2 and web3'
      //     }
      //   ],
      //   next: 'Launch'
      // },

      {
        style: {
          backgroundColor: '#1D1D27',
          color: '#ebebef'
          // backgroundColor: '#0e8e82',
          // backgroundColor: '#0f1335',
          // color: '#c9eeea'
          // color: '#bfc5eb'
        },
        title: ['<span class="clubHeaderActive">Supported Chains</span>'],
        cards: [
          {
            chips: [
              {title: 'Ethereum', icon: '/icons/crypto/eth.svg'},
              {title: 'Polygon', icon: '/icons/crypto/matic.svg'},
              {title: 'NEAR', icon: '/icons/crypto/near.svg'},
              {title: 'Binance Smart Chain', icon: '/icons/crypto/bnb.svg'},
              {title: 'Avalanche', icon: '/icons/crypto/avax.svg'},
              {title: 'Fantom', icon: '/icons/crypto/fantom.svg'},
              {title: 'Cronos'},
            ]
          },
          {
            // title: 'Integrations',
            text: 'coming soon: ',
            chips: [
              {title: 'Solana', icon: '/icons/crypto/sol.svg'},
              {title: 'Algorand', icon: '/icons/crypto/algo.svg'},
              {title: 'TON', icon: '/icons/crypto/gram.svg'},
              {title: 'Polkadot', icon: '/icons/crypto/dot.svg'},
              {title: 'WAX', icon: '/icons/crypto/wax.svg'},
            ]
          }
        ],
        next: 'Launch'
      },

      {
        title: ['<span class="clubHeaderActive">Launch</span>'],
        cards: [
          {
            title: 'Launch the club before minting',
            text: 'and reward active members'
          },
          {
            title: 'Boost your campaign',
            text: 'with referral program'
          }
        ],
        next: 'Clubs & partners'
      }

      // {
      //   title: 'Ownership-based roles',
      //   text: 'for Discord & Telegram'
      // },
      // {
      //   title: 'Self-governed',
      //   text: 'community via voting & elections'
      // }
      // {
      //   title: 'Reward members',
      //   text: 'for assistance and positive impact',
      // }
      /**
       * Give equity to contributors
       Raise funds with tokens & NFTs
       Make decisions together
       Operate globally

       +
       Decide on extra emission
       Reward participants
       Build guilds
       Remove middlemen, own your work
       */
      // {
      //   style: {
      //     backgroundColor: '#0e8e82',
      //     // backgroundColor: '#0f1335',
      //     color: '#c9eeea'
      //     // color: '#bfc5eb'
      //   },
      //   title: [''],
      //   cards: [
      //     {
      //       title: 'Make decisions together',
      //       text: 'Start with configuration of your choice'
      //     },
      //     {
      //       title: 'Operate globally',
      //       text: 'Decentralized governing'
      //     }
      //   ],
      //   next: 'Join community'
      // },
      // {
      //   style: {
      //     backgroundColor: '#0e8e82',
      //     // backgroundColor: '#0f1335',
      //     color: '#c9eeea'
      //     // color: '#bfc5eb'
      //   },
      //   title: ['Roles & rules'],
      //   cards: [
      //     {
      //       title: 'Create your own system',
      //       text: 'Start with configuration of your choice'
      //     },
      //     {
      //       title: 'Let community decide',
      //       text: 'Decentralized governing'
      //     }
      //   ],
      //   next: 'Roles & rules'
      // },
    ]);

    const clubs = ref([
      {
        logoImg: '/demo/phdao.jpeg',
        slug: 'phdao',
        name: 'Photography DAO'
      }, {
        logoImg: '/demo/charitykiss_logo.svg',
        slug: 'charity-kiss',
        name: 'CharityKiss'
      }, {
        logoImg: 'https://clubeeo.com/demo/hashbon-logo-new.png',
        slug: 'hashbonpass',
        name: 'Hashbon Pass'
      }, {
        logoImg: 'https://paras-cdn.imgix.net/bafkreidzo5qxqduanqxicuyp3pileb5mie4ntl7jjloycplc5lrbw2ae6e?w=120&auto=format,compress',
        slug: 'aurora-doves',
        name: 'Aurora Doves'
      }, {
        logoImg: 'https://pbs.twimg.com/profile_images/1488408778500616193/8JlqP-b5_400x400.jpg',
        slug: 'tan69dao',
        name: 'TAN🤎DAO'
      }
    ]);

    return {
      data,
      formUrl,
      clubs,
      // eslint-disable-next-line
      getNextFor: (d: Array<any>, i: number) => d[i]['next'] as string || ((d[i + 1] || {})['title'] || [])[0]
    };
  }
});
</script>

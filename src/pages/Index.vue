<template>
  <!--  <demo-interactive-component />-->

  <div class="landingPage">
    <screen-page-snippet :style="item.style" :class="item.class">
      <div
        v-if="item.title || item.header || item.image || item.listator"
        class="col-12 q-pa-md q-pt-xl"
      >
        <div v-if="item.image" class="text-center q-pb-lg">
          <q-img :src="item.image.src" :style="item.image.style || {}" />
        </div>
        <h1 v-if="item.header" class="col-12 text-center q-ma-none">
          <span class="clubHeaderActive">
            {{ item.header }}
          </span>
        </h1>
        <h2
          v-if="item.title"
          class="col-12 text-center q-ma-none"
          v-html="item.title.join('<br />')"
        />
        <frontpage-listator v-if="item.listator" />
      </div>

      <template v-for="(card, j) in item.cards" :key="j">
        <card-renderer :card="card" />
      </template>

      <div>
        <social-links-snippet
          size="xl"
          :social-links="{
            telegram: 'https://t.me/clubeeo',
            discord: 'https://discord.gg/C6jHsjzZ3f',
            twitter: 'https://twitter.com/ClubeeoOfficial',
            reddit: 'https://www.reddit.com/r/clubeeo',
            linkedin: 'https://www.linkedin.com/company/clubeeo',
          }"
        />
      </div>
    </screen-page-snippet>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted } from 'vue';
import SocialLinksSnippet from '@components/snippets/SocialLinksSnippet.vue';
import { formUrl } from '@src/models/snippetData/links';
import { useGlobalConfigStore } from '@stores/globalConfigStore';
import { useRouter } from 'vue-router';
import ScreenPageSnippet from '@src/components/snippets/ScreenPageSnippet.vue';
import { styleDark } from '@src/models/snippetData/indexPageData';

export default defineComponent({
  name: 'PageIndex',
  components: {
    SocialLinksSnippet,
    ScreenPageSnippet,
  },
  setup() {
    const $router = useRouter();
    const $globalConfig = useGlobalConfigStore();

    onMounted(async () => {
      await $globalConfig.load();
      if ($globalConfig.data?.root?.redirect) {
        await $router.push($globalConfig.data?.root?.redirect);
      }
    });

    return {
      globalConfig: $globalConfig,
      formUrl,
      item: {
        style: styleDark,
        image: {
          src: '/imgs/Logo-White.svg',
          style: {
            maxWidth: 'min(500px, 66vw)',
            maxHeight: '104px',
          },
        },
        // header: {img: '/imgs/Logo-White.svg'},
        // title: ['turn any NFT collection into private club'],
        listator: true,
        cards: [
          {
            button: {
              label: 'apply for beta',
              style: {
                borderRadius: '8px',
              },
              class: {
                clubButtonActive: true,
              },
              href: formUrl,
            },
          },
        ],
        next: 'scroll to know more',
      },
    };
  },
});
</script>

<template>
  <q-layout view="lHh Lpr lFf">
    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { useMeta } from 'quasar';

const metaDescription = 'Turn any NFT collection into private club';

const metaData = {
  // sets document title
  title: 'Clubeeo',
  // // optional; sets final title as "Index Page - My Website", useful for multiple level meta
  // titleTemplate: title => `${title} - My Website`,

  // meta tags
  meta: {
    description: { name: 'description', content: metaDescription },
    keywords: { name: 'keywords', content: 'NFT, Token, Token-Gating, Community, Club, Clubeeo, Ethereum, Polygon, NEAR' },
    equiv: { 'http-equiv': 'Content-Type', content: 'text/html; charset=UTF-8' },
    // note: for Open Graph type metadata you will need to use SSR, to ensure page is rendered by the server
    ogTitle: {
      property: 'og:title',
      // optional; similar to titleTemplate, but allows templating with other meta properties
      template (ogTitle: string) {
        return `${ogTitle || 'Clubeeo'}`
      }
    },
    ogImage: {
      property: 'og:image',
      content: 'https://clubeeo.com/imgs/clubeeo-og-image.jpg',
    },
    ogDescription: {
      property: 'og:description',
      content: metaDescription,
    },
    ogUrl: {
      property: 'og:url',
      content: 'https://clubeeo.com',
    },
    ogType: {
      property: 'og:type',
      content: 'website'
    }
  },
}

export default defineComponent({
  name: 'PublicLayout',

  setup() {
    useMeta(metaData);

    return {
    };
  },
});
</script>

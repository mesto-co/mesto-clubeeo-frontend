<template>
  <divs
    v-if='Array.isArray(data)'
    :data='{items: data}'
  />

  <div
    v-else-if='typeof data !== "object"'
  >
    {{ data }}
  </div>

  <component
    v-else-if='snippet.propsMapping === "props"'
    :is='snippet.component'
    v-bind='data.props'
  >
    <template v-slot>
      <snippet-renderer
        :data='snippet.slot'
      />
    </template>
  </component>

  <component
    v-else-if='snippet.propsMapping === "flat"'
    :is='snippet.component'
    v-bind='data'
  />

  <component
    v-else
    :is='snippet.component'
    :data='data'
    :items='items'
    :style='data.style'
    :class='data.class'
  >
    <template
      v-for='(slotData, slotName) in (snippet.slots || {})'
      v-bind:key='slotName'
      v-slot:[slotName]
    >
      <snippet-renderer
        :data='slotData'
      />
    </template>

    <template
      v-if='!snippet.slots'
      v-slot
    >
      <snippet-renderer
        :data='snippet.slot'
      />
    </template>
  </component>
</template>

<script lang='ts'>
import { Component, computed, defineComponent } from 'vue';
import WhitelistButton from 'components/clubpage/WhitelistButton.vue';

import CardSnippet from 'components/snippets/CardSnippet.vue';
import ScreenPageSnippet from 'components/snippets/ScreenPageSnippet.vue';
import GenericContentSnippet from 'components/snippets/legacy/GenericContentSnippet.vue';
import GenericOurPartnersSnippet from 'components/snippets/legacy/GenericOurPartnersSnippet.vue';
import GenericXlOutlineSnippet from 'components/snippets/legacy/GenericXlOutlineSnippet.vue';
import GenericLandingPageSnippet from 'components/snippets/legacy/GenericLandingPageSnippet.vue';
import ButtonListRenderer from 'components/renderers/ButtonListRenderer.vue';
import div from 'components/snippets/elements/div.vue';
import divs from 'components/snippets/elements/divs.vue';
import html from 'components/snippets/elements/html.vue';
import LegacyMembersTableSnippet from 'components/snippets/legacy/LegacyMembersTableSnippet.vue';
import LayoutBackbone from 'src/backbones/LayoutBackbone.vue';
import SimplifiedBackbone from 'src/backbones/SimplifiedBackbone.vue';
import { QBtn } from 'quasar';
import Divs from 'components/snippets/elements/divs.vue';
import ClubButton from 'components/clubpage/ClubButton.vue';
import CardRenderer from 'components/renderers/CardRenderer.vue';
import DemoLeaderboardSnippet from 'components/snippets/demo/DemoLeaderboardSnippet.vue';
import HeroRenderer from 'components/renderers/HeroRenderer.vue';
import DemoLeaderboardStatusSnippet from 'components/snippets/demo/DemoLeaderboardStatusSnippet.vue';
import GenericOutlineSnippet from 'components/snippets/legacy/GenericOutlineSnippet.vue';

const snippetTypes: Record<string, {
  component: Component
  propsMapping?: 'props' | 'flat'
}> = {
  'div': { component: div },
  'divs': { component: divs },
  'html': { component: html },

  'renderer:buttonList': { component: ButtonListRenderer },
  'renderer:hero': { component: HeroRenderer, propsMapping: 'props' },

  whitelistButton: { component: WhitelistButton },
  screenPage: { component: ScreenPageSnippet },
  card: { component: CardSnippet },
  'card-renderer': { component: CardRenderer, propsMapping: 'props' },

  'demo:leaderboard': { component: DemoLeaderboardSnippet },
  'demo:leaderboardStatus': { component: DemoLeaderboardStatusSnippet },
  // 'demo:interactive': { component: DemoInteractiveComponent },

  'legacy:content': { component: GenericContentSnippet },
  'legacy:ourPartners': { component: GenericOurPartnersSnippet },
  'legacy:contentXlOutline': { component: GenericXlOutlineSnippet },
  'legacy:contentOutline': { component: GenericOutlineSnippet },
  'legacy:LandingPage': { component: GenericLandingPageSnippet },
  'legacy:MembersTable': { component: LegacyMembersTableSnippet },

  'backbone:layout': { component: LayoutBackbone },
  'backbone:simplified': { component: SimplifiedBackbone },

  'q-btn': { component: QBtn, propsMapping: 'props' },
  'club-button': { component: ClubButton, propsMapping: 'props' },
};

export default defineComponent({
  components: { Divs },
  props: {
    data: {
      type: Object //as Record<string, string>
    },
    items: {
      type: Array,
      required: false
    }
  },
  setup(props) {
    const snippet = computed(() => {
      const snippetType = props.data?.type as string;

      return {
        ...props.data,
        ...(snippetTypes[snippetType] || {})
      };
    });

    return {
      snippetTypes,
      snippet
    };
  }
});
</script>

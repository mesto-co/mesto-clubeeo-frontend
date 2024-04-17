<template>
  <landing-backbone
    style='color: #FFFFFF'
  >
    <hero-renderer
      v-if='data.top && !isSnippet(data.top)'
      :hero-img='data.top.heroImg || null'
      :logo-img='data.top.logoImg || null'
      :logo-mode='data.top.logoMode || null'
    />
    <div v-else>
      <snippet-renderer
        v-if='data.top && data.top.type'
        :data='data.top'
      />
    </div>

    <div
      v-if='data.middle && !isSnippet(data.middle)'
      class='q-mb-md text-center'
    >
      <div class='text-h5 q-pb-sm'>
        {{ data.middle.title }}
      </div>

      <div
        style='max-width: 550px; display: inline-block'
        v-html='data.middle.descriptionHtml'
      />
    </div>
    <div v-else>
      <snippet-renderer
        v-if='data.middle && isSnippet(data.middle)'
        :data='data.middle'
      />
    </div>

    <div
      v-if='data.footer && !isSnippet(data.footer)'
      class='text-center'
    >
      <social-links
        class='q-pb-md'
        :social-links="data.footer.socialLinks"
      />

      <powered-by-clubeeo
        v-html='data.footer.smallTextHtml'
      />
    </div>
    <div v-else>
      <snippet-renderer
        v-if='data.footer && data.footer.type'
        :data='data.footer'
      />
    </div>

    <template v-slot:aside>
      <template v-if='data.aside && !isSnippet(data.aside)'>
        <div>
          <snippet-renderer
            v-if='isSnippet(data.aside)'
            :data='data.aside.top'
          />
        </div>
        <div>
          <snippet-renderer
            v-if='isSnippet(data.aside.middle)'
            :data='data.aside.middle'
          />
        </div>
        <div>
          <snippet-renderer
            v-if='isSnippet(data.aside.footer)'
            :data='data.aside.footer'
          />
        </div>
      </template>
    </template>
  </landing-backbone>
</template>

<script lang='ts'>
import { defineComponent } from 'vue';
import LandingBackbone from '../../../backbones/LandingBackbone.vue';
import HeroRenderer from '../../renderers/HeroRenderer.vue';
import SocialLinks from '../../clubpage/SocialLinks.vue';
import PoweredByClubeeo from '../../clubpage/PoweredByClubeeo.vue';

export default defineComponent({
  components: { PoweredByClubeeo, SocialLinks, HeroRenderer, LandingBackbone }, // components: { CardRenderer }
  props: {
    data: {
      type: Object //as Record<string, string>
    }
  },
  setup() {
    return {
      isSnippet: (data: {type?: string} | Array<unknown>) => {
        return data && (Array.isArray(data) || data.type);
      }
    }
  }
});
</script>

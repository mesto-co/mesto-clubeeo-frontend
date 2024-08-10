<template>
  <div
    v-if="buyLinks.main || buyLinks.opensea || buyLinks.rarible"
    class="text-center q-pb-md"
  >
    <club-button :href="buyLinks.main || buyLinks.opensea || buyLinks.rarible">
      Buy NFT&nbsp;<q-icon name="fa-solid fa-chevron-right" size="xs" />
    </club-button>
  </div>
  <!--  <div-->
  <!--    v-else-if='buyLinks.collections'-->
  <!--    class='text-center q-pb-md'-->
  <!--  >-->
  <!--    <club-button-->
  <!--      @click='scrollToCollections'-->
  <!--    >-->
  <!--      Acquire membership&nbsp;<q-icon name='fa-solid fa-angles-down' size='xs' />-->
  <!--    </club-button>-->
  <!--  </div>-->
</template>

<script lang="ts">
import { defineComponent, inject, PropType, Ref } from 'vue';
import ClubButton from './ClubButton.vue';
import { IClubBuyLinks } from '@src/api/clubApi';
import { scroll } from 'quasar';
import { IClubStyle } from '@src/models/clubStyle';

const { getScrollTarget, setVerticalScrollPosition } = scroll;

// takes an element object
function scrollToElement(el: Element & { offsetTop?: number }) {
  const target = getScrollTarget(el);
  const offset = el.offsetTop || 0;
  const duration = 300;
  setVerticalScrollPosition(target, offset, duration);
}

export default defineComponent({
  components: { ClubButton },
  props: {
    buyLinks: {
      type: Object as PropType<IClubBuyLinks>,
    },
  },
  setup() {
    const clubStyle = inject('clubStyle') as Ref<IClubStyle>;

    const pageRefs = inject<{ clubPageCollections: Ref<Element> }>('pageRefs');

    const scrollToCollections = () => {
      if (pageRefs?.clubPageCollections) {
        scrollToElement(pageRefs.clubPageCollections.value);
      }
    };

    return {
      clubStyle,
      scrollToCollections,
    };
  },
});
</script>

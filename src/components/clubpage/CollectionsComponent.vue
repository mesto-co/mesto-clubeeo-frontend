<template>
  <div
    class="q-pa-lg text-center"
    :style="{ color: clubStyle.primaryTextColor }"
  >
    <!--    <div-->
    <!--      class='text-h4'-->
    <!--    >{{ clubName }}</div>-->
    <!--    <div class='text-h6 q-pb-lg'>club collections</div>-->

    <div class="flex q-col-gutter-md flex-center">
      <template
        v-for="collection in buyLinks.collections"
        v-bind:key="collection.url"
      >
        <div style="width: 280px">
          <q-card :style="{ ...cardStyle }" class="fit">
            <q-img :src="collection.coverImg" ratio="1" />
            <q-card-section class="text-center" style="flex-grow: 1">
              {{ collection.name }}
            </q-card-section>
            <club-button
              class="full-width"
              style="border-radius: 0 0 8px 8px"
              :href="collection.url"
            >
              <template v-if="collection.label">
                {{ collection.label }}
              </template>

              <template v-else>
                {{
                  collection.siteName ? `On ${collection.siteName}` : 'Buy'
                }}&nbsp;<q-icon name="fa-solid fa-chevron-right" size="xs" />
              </template>
            </club-button>
          </q-card>
        </div>
      </template>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, inject, PropType, Ref } from 'vue';
import ClubButton from './ClubButton.vue';
import { IClubBuyLinks } from '@src/api/clubApi';
import { IClubStyle } from '@src/models/clubStyle';

export default defineComponent({
  components: { ClubButton },
  props: {
    clubName: {
      type: String,
    },
    buyLinks: {
      type: Object as PropType<IClubBuyLinks>,
    },
  },
  setup() {
    const clubStyle = inject('clubStyle') as Ref<IClubStyle>;

    const cardStyle = computed(() => {
      return {
        backgroundColor: clubStyle.value.primaryColor,
        color: clubStyle.value.primaryTextColor,
        borderRadius: '12px',
        // border: `1px solid ${clubStyle.value.primaryTextColor}`,
        // boxShadow: `0 0 7px ${clubStyle.value.primaryTextColor}`,
        width: '280px',
      };
    });

    return {
      cardStyle,
      clubStyle,
    };
  },
});
</script>

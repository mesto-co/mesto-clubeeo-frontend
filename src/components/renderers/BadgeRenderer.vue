<template>
  <q-card
    :style="{ width: size }"
    style="border-radius: 12px; background-color: rgb(29, 29, 39)"
    class="q-mr-md"
    flat
  >
    <q-img ratio="1" :src="badgeImgSrc" />

    <q-card-section
      class="text-center q-pa-xs"
      :style="{ backgroundColor: btnBgColor }"
    >
      <div class="flex justify-between" style="font-size: 0.7rem">
        <div style="flex-grow: 2">
          {{ badge.clubBadge.name }}

          <template v-if="badge.clubBadge.badgeType === 'score'">
            <!--                  :style='{backgroundColor: themeParams.button_color, color: themeParams.button_text_color}'-->
            <q-badge class="q-ma-xs">{{ badge.value || 0 }} </q-badge>
          </template>
        </div>
      </div>
    </q-card-section>

    <q-tooltip class="bg-transparent overflow-hidden">
      <q-card
        width="280px"
        style="border-radius: 12px; background-color: rgb(29, 29, 39)"
        class="q-pb-md"
      >
        <q-img
          width="280px"
          height="280px"
          fit="cover"
          ratio="1"
          :src="badgeImgSrc"
        />

        <q-card-section class="text-center q-pa-xs">
          <div class="flex justify-between">
            <div style="flex-grow: 2" class="text-bold">
              {{ badge.clubBadge.name }}

              <template v-if="badge.clubBadge.badgeType === 'score'">
                <!--                  :style='{backgroundColor: themeParams.button_color, color: themeParams.button_text_color}'-->
                <q-badge class="q-ma-xs">{{ badge.value || 0 }} </q-badge>
              </template>
            </div>
          </div>

          <slot name="after-name"></slot>

          <div class="q-pt-sm">{{ badge.clubBadge.description }}</div>
        </q-card-section>
      </q-card>
    </q-tooltip>
  </q-card>
</template>

<script lang="ts">
import { computed, defineComponent, PropType, ref } from 'vue';
import { IMemberBadge } from '@src/models/badgeModels';
import { colors } from 'quasar';
const { blend, changeAlpha } = colors;

export default defineComponent({
  name: 'BadgeRenderer',
  props: {
    badge: {
      type: Object as PropType<IMemberBadge>,
      required: true,
    },
    size: {
      type: String,
      default: '100px',
    },
  },
  setup(props) {
    const themeParams = ref<
      Partial<{
        button_text_color: string;
        text_color: string;
        hint_color: string;
        link_color: string;
        button_color: string;
        secondary_bg_color: string;
        bg_color: string;
      }>
    >({
      hint_color: '#b1c3d5',
      text_color: '#ffffff',
      link_color: '#62bcf9',
      button_color: '#2ea6ff',
      secondary_bg_color: '#11117',
      button_text_color: '#ffffff',
      bg_color: '#1d1d27',
    });

    const btnBgColor = computed(() => {
      if (themeParams.value.bg_color && themeParams.value.text_color)
        return blend(
          changeAlpha(themeParams.value.text_color, 0.048),
          themeParams.value.bg_color
        );
      else return themeParams.value.bg_color;
    });

    return {
      badgeImgSrc: computed(
        () =>
          props.badge.clubBadge.img ||
          `https://ui-avatars.com/api/?name=${props.badge.clubBadge.slug}&size=128&bold=true&format=svg&background=1c1c1f&color=fff`
      ),
      btnBgColor,
    };
  },
});
</script>

<template>
  <q-card
    :style="{ width: size }"
    style="border-radius: 12px; background-color: rgb(29, 29, 39)"
    flat
    @click="dialogShown = !dialogShown"
  >
    <q-img ratio="1" :src="tokenImgSrc" />

    <q-card-section
      class="text-center q-pa-xs"
      :style="{ backgroundColor: btnBgColor }"
    >
      <div class="flex justify-between" style="font-size: 0.7rem">
        <div style="flex-grow: 2">
          {{ memberToken.metadata.name }}
          #{{ memberToken.tokenId }}

          <template v-if="memberToken.amount !== 1">
            <!--                  :style='{backgroundColor: themeParams.button_color, color: themeParams.button_text_color}'-->
            <q-badge class="q-ma-xs">{{ memberToken.amount }} </q-badge>
          </template>
        </div>
      </div>
    </q-card-section>

    <q-tooltip class="bg-transparent"> </q-tooltip>
  </q-card>

  <q-dialog v-model="dialogShown">
    <q-card
      width="280px"
      :style="{
        borderRadius: '12px',
        maxWidth: '280px',
        backgroundColor: themeParams.bg_color,
        color: themeParams.text_color,
      }"
      class="q-pb-md"
    >
      <q-img
        width="280px"
        height="280px"
        fit="cover"
        ratio="1"
        :src="tokenImgSrc"
      />

      <q-card-section class="text-center q-py-xs q-px-md">
        <div>
          <div style="flex-grow: 2" class="text-bold">
            {{ memberToken.metadata.name }}
            #{{ memberToken.tokenId }}

            <template v-if="memberToken.amount !== 1">
              <!--                  :style='{backgroundColor: themeParams.button_color, color: themeParams.button_text_color}'-->
              <q-badge class="q-ma-xs">{{ memberToken.amount }} </q-badge>
            </template>
          </div>

          <slot name="after-name"></slot>

          <div class="q-pt-sm">{{ memberToken.metadata.description }}</div>

          <div class="text-left q-pt-sm">
            <div
              v-for="(attr, i) in memberToken.metadata.attributes || []"
              :key="i"
            >
              <q-badge class="clubButtonActive">{{ attr.type }}</q-badge>
              {{ attr.description }}
            </div>
          </div>
        </div>
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<script lang="ts">
import { computed, defineComponent, PropType, ref } from 'vue';
import { colors } from 'quasar';
import { IMemberToken } from '@apps/EthGatingApp/lib/IMemberToken';

const { blend, changeAlpha } = colors;

export default defineComponent({
  props: {
    memberToken: {
      type: Object as PropType<IMemberToken>,
      required: true,
    },
    size: {
      type: String,
      default: '160px',
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
      tokenImgSrc: computed(
        () =>
          props.memberToken.metadata.image_url_cdn ||
          props.memberToken.metadata.image_url ||
          `https://ui-avatars.com/api/?name=${props.memberToken.tokenId}&size=128&bold=true&format=svg&background=1c1c1f&color=fff`
      ),
      themeParams,
      btnBgColor,
      dialogShown: ref(false),
    };
  },
});
</script>

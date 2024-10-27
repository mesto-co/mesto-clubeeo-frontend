<template>
  <div v-if="meInClub" class="flex meInClubWidget">
    <q-avatar>
      <q-img
        style="border-radius: 6px"
        height="34px"
        width="34px"
        :src="`https://ui-avatars.com/api/?name=${meInClub.screenName}&size=128&bold=true&format=svg&background=1c1c1f&color=fff`"
      />
    </q-avatar>

    <div style="padding: 6px 0; height: 36px; flex-grow: 2">
      <div style="font-size: 0.75rem; font-weight: bold">
        {{ meInClub.screenName }}
      </div>
    </div>

    <div class="flex q-pa-xs" style="flex-direction: column; justify-content: center; padding-right: 6px">
      <div>
        <slot />
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.meInClubWidget {
  height: 48px;
  width: 100%;
  background-color: rgb(29 29 39);
  justify-content: space-between;
  border-radius: 6px 6px 0 0;
}
</style>

<script lang="ts">
import { defineComponent, PropType } from 'vue';

interface IMeInClub {
  loggedIn: boolean;
  isMember: boolean;
  isAdmin: boolean;
  isPlatformAdmin: boolean;
  screenName: string;
  mainWallet: {
    address: string;
    chain: string;
  };
}

export default defineComponent({
  name: 'MeInClubWidget',

  components: {},

  props: {
    meInClub: {
      type: Object as PropType<IMeInClub>,
      required: true,
    },
  },

  setup() {
    return {};
  },
});
</script>

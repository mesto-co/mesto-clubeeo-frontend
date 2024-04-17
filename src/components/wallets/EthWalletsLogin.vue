<template>
  <div
    v-if='showMetaMask'
    class='full-width text-center q-pb-sm'
  >
    <wallet-login-btn-switcher
      :redirect-path='redirectPath'
      :class='buttonsClass'
      :app-data='appData'
      @loggedIn='onLoggedIn'
    />

    <!--          <meta-mask-login-btn-->
    <!--            @loggedIn='onLoggedIn'-->
    <!--          />-->
  </div>

  <div class='full-width text-center q-pb-sm'>
    <wallet-connect-login-btn
      :class='buttonsClass'
      :app-data='appData'
      @loggedIn='onLoggedIn'
    />
  </div>
</template>

<script lang='ts'>
import { computed, defineComponent, PropType } from 'vue';
import WalletConnectLoginBtn from './WalletConnectLoginBtn.vue';
import WalletLoginBtnSwitcher from './WalletLoginBtnSwitcher.vue';
import { useQuasar } from 'quasar';

export default defineComponent({
  components: { WalletLoginBtnSwitcher, WalletConnectLoginBtn },

  props: {
    redirectPath: {
      type: String,
      required: true
    },
    buttonsClass: {
      type: String,
      required: false
    },
    appData: Object as PropType<{ appId: number, clubId: number }>
  },

  emits: ['loggedIn'],

  setup(props, { emit }) {
    const $q = useQuasar();

    const onLoggedIn = () => emit('loggedIn');

    const showMetaMask = computed(() => {
      return !$q.platform.is.safari;
    });

    return {
      onLoggedIn,
      showMetaMask,
    }
  }
});
</script>

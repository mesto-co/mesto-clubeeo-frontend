<template>
  <q-page class='row content-center justify-evenly q-pa-md'>
    <div class='col text-center' style='max-width: 40rem'>

      <meta-mask-login-btn
        @loggedIn='onLoggedIn'
      />

    </div>
  </q-page>
</template>

<script lang='ts'>
import { computed, defineComponent } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import MetaMaskLoginBtn from 'components/MetaMaskLoginBtn.vue';

export default defineComponent({
  name: 'wallet-login-page',
  components: { MetaMaskLoginBtn },
  setup() {
    const $router = useRouter();
    const $route = useRoute();
    const slug = computed<string>(() => String($route.params.slug));

    const onLoggedIn = async () => {
      await $router.push({ name: 'club', params: { clubSlug: slug.value, threadId: 'general' } });
    };

    return {
      onLoggedIn
    };
  }
});
</script>

<style scoped>

</style>

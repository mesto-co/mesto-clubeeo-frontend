<template>
  <q-no-ssr>
    <q-layout view='lHh Lpr lFf'>
      <q-header
        class='md-hide lg-hide xl-hide'
        style='background-color: rgb(29 29 39)'
      >
        <q-toolbar>
          <q-btn
            flat
            dense
            round
            icon='menu'
            aria-label='Menu'
            @click='toggleLeftDrawer'
          />

          <q-toolbar-title>
            <slot
              name='toolbar-title'
            />
          </q-toolbar-title>

          <!--        <div>Quasar v{{ $q.version }}</div>-->
        </q-toolbar>
      </q-header>

      <q-drawer v-model='leftDrawerOpen' show-if-above bordered dark>
        <div class='flex' style='width: 299px'>

          <slot />

        </div>

      </q-drawer>

      <q-page-container>
        <router-view />
      </q-page-container>
    </q-layout>
  </q-no-ssr>
</template>

<script lang='ts'>
import { defineComponent, ref } from 'vue';

export default defineComponent({
  name: 'LayoutLayout',

  setup() {
    const leftDrawerOpen = ref(false);

    return {
      leftDrawerOpen,
      toggleLeftDrawer() {
        leftDrawerOpen.value = !leftDrawerOpen.value;
      }
    };
  }
});
</script>

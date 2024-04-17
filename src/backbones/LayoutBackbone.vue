<template>
  <q-no-ssr>
    <q-layout view='lHh Lpr lFf'>
      <q-drawer v-model='leftDrawerOpen' show-if-above bordered dark>
        <div class='flex' style='width: 299px'>

          <slot
            name='menu'
          />

        </div>

      </q-drawer>

      <q-page-container>
        <slot />
      </q-page-container>

      <q-footer
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
      </q-footer>
    </q-layout>
  </q-no-ssr>
</template>

<script lang='ts'>
import { defineComponent, ref } from 'vue';

export default defineComponent({
  name: 'LayoutBackbone',

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

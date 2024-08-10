<template>
  <template v-if="!dynamicApp.isLoading">
    <club-page
      class="text-left"
      sticky="top"
      :header-classes="{ padding: { 'q-px-md': true } }"
      :back-link="{ name: 'club-apps' }"
      :loading="dynamicApp.isLoading"
    >
      <template v-slot:header>
        <club-app-menu />
      </template>

      <div class="text-h6 q-pb-md">
        {{ dynamicApp.appSlug }}
      </div>

      <q-card dark class="clubCard" style="text-align: left">
        <q-card-section class="row">
          <div class="text-h6 inline-block">permissions</div>
          <q-space />
          <q-btn
            dense
            round
            icon="add"
            class="clubButtonActive"
            @click="onRoleAddClicked"
          />
        </q-card-section>

        <q-card-section>
          <q-list>
            <template v-for="role in dynamicApp.roles" :key="role.id">
              <q-item v-ripple>
                <div><role-renderer :role="role.clubRole" /></div>
              </q-item>
            </template>
          </q-list>
        </q-card-section>
      </q-card>
    </club-page>

    <q-dialog v-model="showRoleAddDialog">
      <pick-role-widget
        style="min-width: min(640px, 96vw)"
        :selected="dynamicApp.roles.map((role) => role.clubRole)"
        :club-slug="dynamicApp.clubSlug"
        @save="onRolesSaved"
      />
    </q-dialog>
  </template>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref, watch } from 'vue';
import { useDynamicAppStore } from '@stores/dynamicAppStore';
import { useRoute } from 'vue-router';
import ClubPage from '@components/clublayout/ClubPage.vue';
import RoleRenderer from '@components/renderers/RoleRenderer.vue';
import PickRoleWidget from '@components/widgets/PickRoleWidget.vue';
import { saveAppRoles } from '@src/api/clubApi';
import { routeParamToString } from '@src/lib/routerHelpers';
import ClubAppMenu from '@src/modules/appManager/components/ClubAppMenu.vue';

export default defineComponent({
  name: 'DynamicAppConfigPage',
  components: { ClubAppMenu, PickRoleWidget, RoleRenderer, ClubPage },
  setup() {
    const $route = useRoute();
    const $dynamicApp = useDynamicAppStore();

    const onLoad = async () => {
      const clubSlug = routeParamToString($route.params.clubSlug);
      const appSlug = routeParamToString($route.params.appSlug);

      if (!clubSlug || !appSlug) return;

      await $dynamicApp.load({ clubSlug, appSlug });
    };

    onMounted(async () => {
      await onLoad();
    });
    watch($route, onLoad, { deep: true });

    const showRoleAddDialog = ref(false);

    return {
      dynamicApp: $dynamicApp,
      showRoleAddDialog,
      onRoleAddClicked: () =>
        (showRoleAddDialog.value = !showRoleAddDialog.value),
      onRolesSaved: async (roles: Record<number, boolean>) => {
        const clubSlug = routeParamToString($route.params.clubSlug);
        const appSlug = routeParamToString($route.params.appSlug);

        await saveAppRoles({ clubSlug, appSlug, roles });

        await onLoad();
      },
    };
  },
});
</script>

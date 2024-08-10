<template>
  <template v-if="userData && userData.user">
    <q-card dark class="clubCard">
      <q-card-section class="row items-center q-pb-none">
        <div class="text-h6">roles</div>
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
          <q-item v-for="ucr in userData.user.userClubRoles" :key="ucr.id">
            <!--            <q-item-section side top>-->
            <!--              <q-checkbox v-model="selectedRoles[role.id]" />-->
            <!--            </q-item-section>-->

            <q-item-section>
              <div>
                <role-renderer v-if="ucr.clubRole" :role="ucr.clubRole" />
                <template v-else-if="ucr.clubRoleToken">
                  <role-renderer
                    :role="ucr.clubRoleToken.clubRole"
                    :disabled="!ucr.enabled"
                  />
                  [token-based role]
                </template>
              </div>
            </q-item-section>
          </q-item>
        </q-list>
      </q-card-section>
    </q-card>

    <q-dialog v-model="showRoleAddDialog">
      <pick-role-widget
        style="min-width: min(640px, 96vw)"
        :selected="
          userData.user.userClubRoles
            .map((role) => role.clubRole)
            .filter((v) => v)
        "
        :club-slug="userData.club.slug"
        @save="onRolesSaved"
      />
    </q-dialog>
  </template>
</template>

<script lang="ts">
import { defineComponent, PropType, ref } from 'vue';
import { state } from '@src/state';
import { ILoadMemberResponse, saveMemberRoles } from '@src/api/clubApi';
import RoleRenderer from '@components/renderers/RoleRenderer.vue';
import PickRoleWidget from '@components/widgets/PickRoleWidget.vue';

export default defineComponent({
  components: { PickRoleWidget, RoleRenderer },
  props: {
    clubSlug: {
      type: String,
      required: true,
    },
    memberId: {
      type: String,
      required: true,
    },
    userData: {
      type: Object as PropType<ILoadMemberResponse>,
      required: true,
    },
  },
  emits: ['saved'],
  setup(props, { emit }) {
    const showRoleAddDialog = ref(false);

    return {
      club: state.$club,

      showRoleAddDialog,
      onRoleAddClicked: () =>
        (showRoleAddDialog.value = !showRoleAddDialog.value),
      onRolesSaved: async (roles: Record<number, boolean>) => {
        if (!props.memberId) return;

        const args = {
          clubSlug: props.clubSlug,
          memberId: props.memberId,
          roles,
        };
        await saveMemberRoles(args);
        emit('saved', args);
      },
    };
  },
});
</script>

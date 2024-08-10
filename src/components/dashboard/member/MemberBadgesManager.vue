<template>
  <template v-if="userData && userData.user">
    <q-card dark class="clubCard">
      <q-card-section class="row items-center q-pb-none">
        <div class="text-h6">badges</div>
        <q-space />
        <q-btn
          dense
          round
          icon="add"
          class="clubButtonActive"
          @click="onBadgeAddClicked"
        />
      </q-card-section>

      <q-card-section>
        <div
          v-for="badge in userData.user.badges"
          :key="badge.id"
          class="inline-block q-pr-md q-pb-md"
        >
          <badge-renderer :badge="badge" size="120px">
            <template v-slot:after-name>
              <div v-if="badge.clubBadge.badgeType === 'basic'" class="q-pt-sm">
                type: basic | index: {{ badge.index }}
              </div>
              <div
                v-else-if="badge.clubBadge.badgeType === 'score'"
                class="q-pt-sm"
              >
                type: score | index: {{ badge.index }} | value:
                {{ badge.value }}
              </div>
              <div v-else class="q-pt-sm">
                type: {{ badge.clubBadge.badgeType }} | index: {{ badge.index }}
              </div>
            </template>
          </badge-renderer>
        </div>
      </q-card-section>
    </q-card>

    <q-dialog v-model="showBadgeAddDialog">
      <pick-badge-widget
        style="min-width: min(640px, 96vw)"
        :user-badges="userData.user.badges"
        :club-slug="userData.club.slug"
        :member="{ id: memberId }"
        @save="onBadgeUpdated"
      />
    </q-dialog>
  </template>
</template>

<script lang="ts">
import { defineComponent, PropType, ref } from 'vue';
import { state } from '@src/state';
import { ILoadMemberResponse } from '@src/api/clubApi';
import BadgeRenderer from '@components/renderers/BadgeRenderer.vue';
import PickBadgeWidget from '@components/widgets/PickBadgeWidget.vue';

export default defineComponent({
  components: { PickBadgeWidget, BadgeRenderer },
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
    const showBadgeAddDialog = ref(false);

    return {
      club: state.$club,

      showBadgeAddDialog,
      onBadgeAddClicked: () =>
        (showBadgeAddDialog.value = !showBadgeAddDialog.value),
      onBadgeUpdated: () => {
        showBadgeAddDialog.value = false;
        emit('saved');
      },
    };
  },
});
</script>

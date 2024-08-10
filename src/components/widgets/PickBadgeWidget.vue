<template>
  <q-card dark class="clubCard">
    <q-card-section class="row items-center q-pb-none">
      <div class="text-h6">edit badges</div>
      <q-space />
      <q-btn icon="close" flat round dense v-close-popup />
    </q-card-section>

    <q-card-section>
      <q-list>
        <q-item v-for="(badge, badgeIdx) in badges" :key="badge.id">
          <!--          <q-item-section side top>-->
          <!--            <q-checkbox v-model="selectedRoles[badge.id]" />-->
          <!--          </q-item-section>-->

          <!--          {{userBadgesByBadgeId[badge.id]}}-->

          <q-item-section>
            <div>
              <badge-renderer
                :badge="userBadgesByBadgeId[badge.id] || { clubBadge: badge }"
              />
            </div>
          </q-item-section>

          <q-item-section class="text-right full-height">
            <div v-if="badge.badgeType === 'score'">
              <club-button
                class="clubButtonActive q-mb-sm"
                :disabled="
                  !inputs[badgeIdx].value || inputs[badgeIdx].value == 0
                "
                @click="onAssign(badge, inputs[badgeIdx])"
                >assign
              </club-button>

              <q-input
                dark
                filled
                dense
                label="amount"
                v-model="inputs[badgeIdx].value"
                type="number"
              />
            </div>

            <div v-else-if="badge.badgeType === 'basic'">
              <club-button
                v-if="!userBadgesByBadgeId[badge.id]"
                class="clubButtonActive"
                @click="onAssign(badge, 1)"
                >assign</club-button
              >

              <club-button v-else disabled style="background: #303247"
                >assigned</club-button
              >
            </div>
          </q-item-section>
        </q-item>
      </q-list>
    </q-card-section>

    <q-card-actions class="float-right">
      <q-btn flat v-close-popup no-caps>close </q-btn>
    </q-card-actions>
  </q-card>
</template>

<script lang="ts">
import {
  computed,
  defineComponent,
  onMounted,
  PropType,
  reactive,
  ref,
  watch,
} from 'vue';
import { assignBadge, getBadges } from '@src/api/clubApi';
import BadgeRenderer from '@components/renderers/BadgeRenderer.vue';
import ClubButton from '@components/clubpage/ClubButton.vue';
import { IClubBadge, IMemberBadge } from '@src/models/badgeModels';
import fromEntries from 'fromentries';
import { Notify } from 'quasar';

export default defineComponent({
  components: { ClubButton, BadgeRenderer },
  props: {
    clubSlug: {
      type: String,
      required: true,
    },
    userBadges: {
      type: Array as PropType<Array<IMemberBadge>>,
      default: () => [],
    },
    member: {
      type: Object as PropType<{ id: string }>,
      required: true,
    },
  },
  // emits: ['save'],
  setup(props, { emit }) {
    const badges = ref<Array<IClubBadge>>([]);

    const selectedRoles = reactive<Record<number, boolean>>({});

    const inputs = ref<
      Array<{
        value: string;
      }>
    >([]);

    const onLoad = async () => {
      badges.value = await getBadges({ clubSlug: props.clubSlug });
      inputs.value = badges.value.map(() => ({ value: '' }));
    };

    onMounted(async () => {
      await onLoad();
    });
    watch(props, onLoad, { deep: true });

    const onAssign = async (
      badge: IClubBadge,
      opts: { value: string | number }
    ) => {
      const result = await assignBadge({
        clubSlug: props.clubSlug,
        memberId: props.member.id,
        badge: { id: badge.id, value: Number(opts.value) },
      });

      if (result.isCreated) {
        Notify.create({ type: 'positive', message: 'Badge assigned' });
      } else {
        Notify.create({ type: 'positive', message: 'Badge updated' });
      }

      emit('save', badge);
    };

    const userBadgesByBadgeId = computed(() =>
      fromEntries(props.userBadges.map((ub) => [ub.clubBadge.id, ub]))
    );

    return {
      inputs,
      badges,
      selectedRoles,
      onAssign,
      userBadgesByBadgeId,
    };
  },
});
</script>

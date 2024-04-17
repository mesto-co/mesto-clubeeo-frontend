<template>
  <q-page class='flex flex-center' style='background: #111117'>
    <div>

    </div>

    <div class='text-white text-center'>

      <club-button
        label='verify ownership'
        class='clubButtonActive q-ma-sm'
        @click='onVerifyClick'
      />

      <div class='flex flex-center q-px-md'>
        <div
          v-for='memberToken in memberTokens'
          :key='memberToken.id'
          class='inline-block q-ma-sm'
        >
          <token-card :memberToken='memberToken'/>
        </div>
      </div>
    </div>

    <div>

    </div>
  </q-page>
</template>

<script lang='ts'>
import { defineComponent, onMounted, PropType, ref } from 'vue';
import ClubButton from 'components/clubpage/ClubButton.vue';
import { api } from 'boot/axios';
import { Notify } from 'quasar';
import { IMemberToken } from 'src/apps/EthGatingApp/lib/IMemberToken';
import TokenCard from 'src/apps/EthGatingApp/components/TokenCard.vue';

export default defineComponent({
  components: { TokenCard, ClubButton },
  props: {
    appData: Object as PropType<{ appId: number, clubId: number }>
  },
  setup(props) {
    const memberTokens = ref<IMemberToken[]>([]);

    const load = async () => {
      if (!props.appData?.clubId || !props.appData?.appId) return;
      const result = await api.get<{
        memberTokens: IMemberToken[],
      }>(`/api/club/${props.appData.clubId}/apps/${props.appData.appId}/ethGating`);
      memberTokens.value = result.data.memberTokens;
    }

    onMounted(async () => {
      await load();
    });

    return {
      memberTokens,
      onVerifyClick: async () => {
        if (!props.appData?.clubId || !props.appData?.appId) return;
        await api.post(`/api/club/${props.appData.clubId}/apps/${props.appData.appId}/ethGating/verify`);

        Notify.create({
          message: 'updated',
          type: 'positive'
        });

        await load();
      },
    };
  }
});
</script>

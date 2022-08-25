<template>
  <club-button
    @click='onButtonClicked'
    :icon='applied ? "check" : "fa-solid fa-circle-check"'
    :label='buttonLabel'
    class='full-width q-mb-sm'
    scheme='inverse'
    :loading='isLoading'
    :disabled='applied'
  />
</template>

<script lang='ts'>
import { computed, defineComponent, PropType, ref } from 'vue';
import ClubButton from './ClubButton.vue';
import { IClub } from 'src/api/clubApi';
import { api } from 'boot/axios';
import { Notify } from 'quasar';

export default defineComponent({
  components: { ClubButton },
  props: {
    club: {
      type: Object as PropType<IClub>,
      required: true
    }
  },
  setup(props) {
    const applied = ref(false);
    const isLoading = ref(false);

    const onButtonClicked = async () => {
      isLoading.value = true;

      const result = await api.post<{
        clubFormApplication: {
          id: number,
          clubId: number,
          userId: number,
          formType: string,
        }
      }>(`/api/club/${props.club.id}/applications`, {
        formType: 'whitelist-application'
      });

      if (result.data.clubFormApplication.id) {
        applied.value = true;

        Notify.create({
          message: 'Your application has been sent. Thank you!',
          type: 'positive'
        });
      }

      isLoading.value = false;
    }

    const buttonLabel = computed(() => {
      if (applied.value) return 'Your application is sent';

      if (typeof props.club?.settings?.whitelistButton === 'object') {
        const label = props.club?.settings?.whitelistButton?.label;
        if (typeof label === 'string') return label;
      }

      // default
      return 'Apply to whitelist';
    })

    return {
      onButtonClicked,
      applied,
      buttonLabel,
      isLoading
    }
  }
})
</script>

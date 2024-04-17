<template>
  <club-page
    :header='appData.title'
    sticky='bottom'
    :loading='appData.isLoading || isLoading'
  >

    <div
      v-html='data.content'
    />

  </club-page>
</template>

<script lang='ts'>
import { defineComponent } from 'vue';
import { useLoad } from 'src/uses/useLoaders';
import ClubPage from 'components/clublayout/ClubPage.vue';
import { appProps } from 'src/apps/_common/appProps';

interface IPageAppData {
  content: string
}

export default defineComponent({
  components: { ClubPage },
  props: appProps,
  setup(props) {
    const { data, isLoading } = useLoad<IPageAppData, 'page'>({
      url: () => props.appData?.clubId && props.appData?.appId ? `/api/club/${props.appData.clubId}/apps/${props.appData.appId}/page` : null,
      key: 'page'
    });

    return {
      data,
      isLoading,
    }
  }
});
</script>

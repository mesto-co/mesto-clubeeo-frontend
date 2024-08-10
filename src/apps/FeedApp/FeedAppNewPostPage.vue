<template>
  <club-page :header="appData.title" sticky="bottom">
    <template v-slot:buttons>
      <club-button
        :to="{ name: 'club-dynamic-app' }"
        class="q-mx-md buttonSecondary"
        icon="fa-solid fa-angle-left"
        >back</club-button
      >
    </template>

    <div>
      <q-card
        flat
        bordered
        style="width: 100%; border: 0"
        :style="{ backgroundColor: theme.card.color }"
        :dark="theme.dark"
      >
        <q-card-section>
          <q-editor
            dark
            outlined
            style="width: 100%; background-color: transparent"
            v-model="text"
            :toolbar="[['bold', 'italic', 'underline', 'strike']]"
          />

          <!--          <q-input-->
          <!--            v-model='post.post.text'-->
          <!--            type='textarea'-->
          <!--            placeholder='text'-->
          <!--            filled-->
          <!--            :dark='theme.dark'-->
          <!--          />-->
        </q-card-section>

        <q-card-section class="text-right row">
          <!--          <div class='text-left col'>-->
          <!--            <q-btn-->
          <!--              flat dense-->
          <!--              color='pool'-->
          <!--              icon='fas fa-image'-->
          <!--            />-->
          <!--          </div>-->
          <div class="text-right col">
            <club-button
              class="clubButtonActive"
              :disable="appData.isLoading"
              @click="onPostSubmit"
              >{{ 'post' }}</club-button
            >
          </div>
        </q-card-section>
      </q-card>
    </div>
  </club-page>
</template>

<script lang="ts">
import { defineComponent, inject, ref, Ref } from 'vue';
import { state } from '@src/state';
import { Notify } from 'quasar';
import { useRouter } from 'vue-router';
import ClubPage from '@components/clublayout/ClubPage.vue';
import { IClubStyle } from '@src/models/clubStyle';
import ClubButton from '@components/clubpage/ClubButton.vue';
import { appProps } from '@apps/_common/appProps';
import { appAction } from '@src/api/appApi';

export default defineComponent({
  name: 'FeedAppNewPostPage',
  components: { ClubButton, ClubPage },
  props: appProps,
  setup(props) {
    const $router = useRouter();

    const text = ref('');

    const actionName = 'postCreate';

    const onPostSubmit = async () => {
      const clubId = props.appData?.clubId;
      const appId = props.appData?.appId;
      if (!clubId || !appId) return;

      const result = await appAction<{
        post: { id: string };
      }>({
        ...props.appData,
        actionName,
        data: {
          text: text.value,
        },
      });

      if (result.action?.result?.post?.id) {
        Notify.create({
          type: 'positive',
          message: `You've posted to ${props.appData.title}`,
        });
      }

      await $router.push({ name: 'club-dynamic-app' });
    };

    const clubStyle = inject('clubStyle') as Ref<IClubStyle>;

    return {
      onPostSubmit,
      clubApp: state.$clubApp.clubApp,
      post: state.$post,
      club: state.$club,
      text,

      theme: {
        dark: true,
        background: {
          color: clubStyle.value.color,
        },
        card: {
          color: clubStyle.value.primaryColor,
        },
      },
    };
  },
});
</script>

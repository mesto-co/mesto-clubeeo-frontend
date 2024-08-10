<template>
  <club-page :header="clubApp.clubApp.title">
    <template v-slot:buttons>
      <club-button
        :to="{ name: 'club-app-posts' }"
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
            v-model="post.post.text"
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
              :disable="!club.isLoading"
              @click="onPostSubmit"
              >{{ clubApp.data.submitButtonLabel || 'post' }}</club-button
            >
          </div>
        </q-card-section>
      </q-card>
    </div>
  </club-page>
</template>

<script lang="ts">
import { defineComponent, inject, onMounted, Ref } from 'vue';
import { state } from '@src/state';
import { Notify } from 'quasar';
import { useRouter } from 'vue-router';
import ClubPage from '@components/clublayout/ClubPage.vue';
import { IClubStyle } from '@src/models/clubStyle';
import ClubButton from '@components/clubpage/ClubButton.vue';

export default defineComponent({
  name: 'NewPostPage',
  components: { ClubButton, ClubPage },
  setup() {
    const $router = useRouter();

    onMounted(async () => {
      await state.$club.loadClub();
      await state.$clubApp.loadClubApp();
    });

    const onPostSubmit = async () => {
      await state.$post.createPost();

      Notify.create({
        type: 'positive',
        message: `You've posted to ${state.$club.club.name}`,
      });

      await $router.push({ name: 'club-app-posts' });
    };

    const clubStyle = inject('clubStyle') as Ref<IClubStyle>;

    return {
      onPostSubmit,
      clubApp: state.$clubApp.clubApp,
      post: state.$post,
      club: state.$club,

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

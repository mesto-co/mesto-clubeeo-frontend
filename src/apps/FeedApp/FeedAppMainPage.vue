<template>
  <club-page :header="appData.title" :loading="isLoading" sticky="bottom">
    <template v-slot:buttons>
      <club-button
        class="clubButtonActive q-px-md"
        icon="add"
        :to="{ name: 'club-dynamic-app-page', params: { appPage: 'new' } }"
        dense
        >{{ 'create post' }}</club-button
      >
    </template>

    <div class="q-px-sm q-pt-md">
      <q-card
        v-for="post of appData.appPageData.posts"
        :key="post.id"
        flat
        bordered
        class="q-mb-lg q-pb-sm"
        :dark="theme.dark"
        :style="{
          backgroundColor: theme.card.color,
          border: 0,
          borderRadius: '12px',
        }"
      >
        <q-card-section style="white-space: pre-line" v-html="post.text" />

        <q-img v-if="post.imgUrl" :src="post.imgUrl" />

        <q-card-section class="q-pb-none">
          <div class="row">
            <div class="col">
              <div class="row">
                <div class="col-auto" style="width: 24px">
                  <q-avatar v-if="post.author.imgUrl" size="24px">
                    <img :src="post.author.imgUrl" />
                  </q-avatar>
                </div>

                <div class="col q-pl-md">
                  <strong style="font-size: 0.9rem">{{
                    post.author.screenName
                  }}</strong>
                </div>
              </div>
            </div>
            <div class="col text-right text-grey" style="font-size: 0.7rem">
              {{ helpers.ago(post.createdAt) }}
            </div>
          </div>
        </q-card-section>
      </q-card>
    </div>
  </club-page>

  <!--  <main class='q-page q-layout-padding flex justify-center items-start' style='background: black'>-->
  <!--  </main>-->
</template>

<style lang="scss">
.clubeeo-post-comment {
  height: 24px;

  .q-field__control {
    height: 24px;
  }

  .q-btn {
    margin-top: -16px;
  }
}
</style>

<script lang="ts">
import { computed, defineComponent, inject, Ref, ref } from 'vue';
import ClubPage from '@components/clublayout/ClubPage.vue';
import { IClubStyle } from '@src/models/clubStyle';
import moment from 'moment';
import ClubButton from '@components/clubpage/ClubButton.vue';
import { appProps } from '@apps/_common/appProps';

export default defineComponent({
  components: { ClubButton, ClubPage },
  props: appProps,
  setup() {
    const expanded = ref(false);

    const valueClass = () => {
      return 'clubButtonActive';
      // return 'bg-grey-3 text-black';
    };

    const clubStyle = inject('clubStyle') as Ref<IClubStyle>;

    return {
      valueClass,
      expanded,

      helpers: {
        ago: (time: string, short = false) => {
          if (short) {
            return moment(time)
              .fromNow(true)
              .replace(/minute(s?)/, 'm')
              .replace('hours', 'h')
              .replace('an hour', '1 h')
              .replace('days', 'd')
              .replace('a day', '1 d');
          } else {
            return moment(time).fromNow();
          }
        },
      },

      theme: computed(() => ({
        dark: true,
        background: {
          color: clubStyle.value.color,
        },
        card: {
          color: clubStyle.value.primaryColor,
        },
      })),
    };
  },
});
</script>

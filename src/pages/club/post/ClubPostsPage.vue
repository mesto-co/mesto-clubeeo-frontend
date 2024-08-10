<template>
  <club-page
    :header="clubApp.clubApp.title"
    :loading="!postsModel.isLoading"
    sticky="bottom"
  >
    <template v-slot:buttons>
      <club-button
        class="clubButtonActive q-px-md"
        icon="add"
        :to="{ name: 'club-app-posts-new' }"
        dense
        >{{ clubApp.data.createButtonLabel || 'create post' }}</club-button
      >
    </template>

    <div class="q-px-sm q-pt-md">
      <q-card
        v-for="post of posts"
        :key="post.id"
        flat
        bordered
        class="q-mb-lg"
        :dark="theme.dark"
        :style="{
          backgroundColor: theme.card.color,
          border: 0,
          borderRadius: '12px',
        }"
      >
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

        <!--      style='font-family: "Roboto", "-apple-system", "Helvetica Neue", Helvetica, Arial, sans-serif'-->
        <q-card-section style="white-space: pre-line" v-html="post.text" />

        <q-img v-if="post.imgUrl" :src="post.imgUrl" />

        <q-card-section>
          <div class="row q-pb-sm">
            <div class="col" style="margin-left: -4px">
              <!--              <q-btn-->
              <!--                flat dense-->
              <!--                :icon='false ? "fas fa-heart" : "far fa-heart"'-->
              <!--              />-->
              <q-btn
                flat
                dense
                stack
                size="sm"
                icon="fas fa-arrow-up"
                :color="
                  post.myReactions.upvote
                    ? theme.dark
                      ? 'light-grey'
                      : 'black'
                    : 'grey'
                "
                :label="post.reactions.upvote || 0"
                @click="reactToPost(post, 'upvote')"
              />

              <q-btn
                flat
                dense
                stack
                size="sm"
                icon="fas fa-arrow-down"
                :color="
                  post.myReactions.downvote
                    ? theme.dark
                      ? 'light-grey'
                      : 'black'
                    : 'grey'
                "
                :label="post.reactions.downvote || 0"
                @click="reactToPost(post, 'downvote')"
              />
            </div>

            <!--            <div class='col text-right'>-->
            <!--              <q-btn-->
            <!--                flat dense-->
            <!--                icon='fas fa-comments'-->
            <!--                color='grey'-->
            <!--              />-->
            <!--            </div>-->
          </div>

          <div
            class="row q-pb-sm"
            style="color: rgba(255, 255, 255, 0.7); font-size: 0.618rem"
          >
            <div class="col text-right">
              {{ post.comments.length }} comments
            </div>
          </div>

          <div
            class="row"
            style="color: rgba(255, 255, 255, 0.7); font-size: 0.618rem"
          >
            <div class="col">
              <div
                v-for="comment of post.comments"
                :key="comment.id"
                class="row q-pb-xs"
              >
                <div class="col-auto" style="width: 16px">
                  <q-avatar v-if="comment.user.imgUrl" size="16px">
                    <img :src="comment.user.imgUrl" />
                  </q-avatar>
                </div>
                <div class="col q-pl-xs">
                  <div>
                    <strong>{{ comment.user.screenName }}</strong>
                    <div style="float: right">
                      {{ helpers.ago(comment.createdAt, true) }}
                    </div>
                  </div>
                  {{ comment.text }}
                </div>
              </div>
            </div>
          </div>

          <div
            v-if="post.comments && post.comments.length > 3"
            class="row"
            style="color: rgba(255, 255, 255, 0.7); font-size: 0.618rem"
          >
            <div class="col text-center">
              <q-btn dense unelevated round>...</q-btn>
            </div>
          </div>

          <div class="row q-pt-sm">
            <div class="col-auto" style="width: 24px">
              <q-avatar v-if="post.author.imgUrl" size="24px">
                <img :src="post.author.imgUrl" />
              </q-avatar>
            </div>

            <div class="col q-pl-md">
              <q-input
                rounded
                outlined
                dense
                :dark="theme.dark"
                class="clubeeo-post-comment"
                v-model="commentModels[post.id]"
                placeholder="Write a comment..."
                style="font-size: 0.75rem"
                @keydown.enter.prevent="submitComment(post)"
              >
                <template v-slot:after>
                  <q-btn
                    round
                    dense
                    flat
                    icon="send"
                    style="height: 24px; padding: 0"
                    @click="submitComment(post)"
                  />
                </template>
              </q-input>
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
import {
  computed,
  defineComponent,
  inject,
  onMounted,
  reactive,
  Ref,
  watch,
} from 'vue';
import { state } from '@src/state';
import { IPostView } from '@src/api/postApi';
import { postPostReaction, PostReactionTypes } from '@src/api/reactionApi';
import moment from 'moment';
import { postPostComment } from '@src/api/commentApi';
import ClubPage from '@components/clublayout/ClubPage.vue';
import ClubButton from '@components/clubpage/ClubButton.vue';
import { IClubStyle } from '@src/models/clubStyle';
import { usePosts } from '@src/uses/usePosts';
import { useRoute } from 'vue-router';

export default defineComponent({
  name: 'ClubPostsPage',
  components: { ClubButton, ClubPage },
  setup() {
    const $route = useRoute();

    const $posts = usePosts({
      $club: state.$club,
      $clubApp: state.$clubApp,
    });

    const onLoad = async () => {
      // console.log('posts:onLoad', {
      //   clubSlug: state.$club.clubSlugRouteParam.value,
      //   appSlug: state.$clubApp.clubAppSlugRouteParam.value,
      //   routeAppSlug: $route.params.appSlug,
      // })
      if (state.$club.clubSlugRouteParam.value) {
        await state.$club.loadClub();
        await state.$clubApp.loadClubApp({
          clubAppSlug: $route.params.appSlug.toString(),
        });
        await $posts.loadPostList();
      }
    };

    onMounted(onLoad);

    watch($route, onLoad);

    const reactToPost = async (
      post: IPostView,
      reaction: PostReactionTypes
    ) => {
      const response = await postPostReaction({ postId: post.id, reaction });
      Object.assign(post, response.post);
    };

    const commentModels = reactive<Record<number, string>>({});

    // const commentFactory = (post: IPostView) => {
    //   postCommentModels[post.id] = ref('');
    //   return postCommentModels[post.id];
    // }

    const submitComment = async (post: IPostView) => {
      const postId = post.id;
      const commentText = commentModels[postId];

      if (commentText) {
        const response = await postPostComment({ postId, text: commentText });
        commentModels[postId] = '';

        Object.assign(post, response.post);

        // state.$posts.updatePostState(post, response.post);
      }
    };

    // const postCommentsState: Record<number, { expanded: boolean }> = reactive({});

    // const postsView = computed(() => {
    //   return state.$posts.posts.value
    //     .map((post) => {
    //
    //       return {
    //         ...post,
    //         comments: (post.comments || []).slice(0, 3),
    //         commentsView: {
    //
    //         }
    //       }
    //     });
    // })

    const clubStyle = inject('clubStyle') as Ref<IClubStyle>;

    return {
      clubApp: state.$clubApp.clubApp,
      // posts: postsView,
      posts: $posts.posts,
      postsModel: $posts,

      reactToPost,
      submitComment,

      commentModels,

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

<template>
  <main class='q-page q-layout-padding flex justify-center items-start' style='background: black'>

    <div
      style='min-width: min(512px, 100vw)'
      class='q-px-sm'
    >

      <div class='q-pb-md text-right'>
        <q-btn
          :to='{name: "club-new-post"}'
          icon='add'
          no-caps
          outline
          :dark-percentage='theme.dark'
          style='color: rgba(255,255,255,0.75)'
        >Create post
        </q-btn>
      </div>


      <div style='color: red'>{{posts}}</div>
      <q-card
        v-for='post of posts'
        :key='post.id'
        flat bordered
        class='q-mb-lg'
        :dark='theme.dark'
        :style='{backgroundColor: theme.card.color, border: 0}'
      >
        <q-card-section class='q-pb-none'>
          <div class='row'>
            <div class='col'>
              <div class='row'>
                <div class='col-auto' style='width: 24px'>
                  <q-avatar size='24px'>
                    <img :src='post.author.imgUrl' />
                  </q-avatar>
                </div>

                <div class='col q-pl-md'>
                  <strong style='font-size: 0.9rem'>{{ post.author.screenName }}</strong>
                </div>
              </div>
            </div>
            <div class='col text-right text-grey' style='font-size: 0.7rem'>
              {{ helpers.ago(post.createdAt) }}
            </div>
          </div>
        </q-card-section>

        <!--      style='font-family: "Roboto", "-apple-system", "Helvetica Neue", Helvetica, Arial, sans-serif'-->
        <q-card-section
          style='white-space: pre-line'
        >
          {{ post.text }}
        </q-card-section>

        <q-img
          v-if='post.imgUrl'
          :src='post.imgUrl'
        />

        <q-card-section>
          <div class='row q-pb-sm'>
            <div class='col' style='margin-left: -4px'>
              <!--              <q-btn-->
              <!--                flat dense-->
              <!--                :icon='false ? "fas fa-heart" : "far fa-heart"'-->
              <!--              />-->
              <q-btn
                flat dense stack size='sm'
                icon='fas fa-arrow-up'
                :color='post.myReactions.upvote ? (theme.dark ? "light-grey" : "black") : "grey"'
                :label='post.reactions.upvote || 0'
                @click='reactToPost(post, "upvote")'
              />

              <q-btn
                flat dense stack size='sm'
                icon='fas fa-arrow-down'
                :color='post.myReactions.downvote ? (theme.dark ? "light-grey" : "black") : "grey"'
                :label='post.reactions.downvote || 0'
                @click='reactToPost(post, "downvote")'
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

          <div class='row q-pb-sm' style='color: rgba(255,255,255,0.7); font-size: 0.618rem'>
            <div class='col text-right'>
              {{ post.comments.length }} comments
            </div>
          </div>

          <div class='row' style='color: rgba(255,255,255,0.7); font-size: 0.618rem'>
            <div class='col'>
              <div
                v-for='comment of post.comments'
                :key='comment.id'
                class='row q-pb-xs'
              >
                <div class='col-auto' style='width: 16px'>
                  <q-avatar size='16px'>
                    <img :src='comment.user.imgUrl' />
                  </q-avatar>
                </div>
                <div class='col q-pl-xs'>
                  <div>
                    <strong>{{comment.user.screenName}}</strong>
                    <div style='float: right'>
                      {{ helpers.ago(comment.createdAt, true) }}
                    </div>
                  </div>
                  {{comment.text}}
                </div>
              </div>
            </div>
          </div>

          <div
            v-if='post.comments && post.comments.length > 3'
            class='row' style='color: rgba(255,255,255,0.7); font-size: 0.618rem'
          >
            <div class='col text-center'>
              <q-btn dense unelevated round>...</q-btn>
            </div>
          </div>

          <div class='row q-pt-sm'>
            <div class='col-auto' style='width: 24px'>
              <q-avatar size='24px'>
                <img :src='post.author.imgUrl' />
              </q-avatar>
            </div>

            <div class='col q-pl-md'>
              <q-input
                rounded outlined dense
                :dark='theme.dark'
                class='clubeeo-post-comment'
                v-model='commentModels[post.id]'
                placeholder='Write a comment...'
                style='font-size: 0.75rem'
                @keydown.enter.prevent='submitComment(post)'
              >
                <template v-slot:after>
                  <q-btn
                    round dense flat icon='send' style='height: 24px; padding: 0'
                    @click='submitComment(post)'
                  />
                </template>
              </q-input>
            </div>
          </div>
        </q-card-section>
      </q-card>

    </div>

  </main>
</template>

<style lang='scss'>
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

<script lang='ts'>
import { defineComponent, onMounted, reactive, watch } from 'vue';
import { state } from 'src/state';
import { IPostView } from 'src/api/postApi';
import { postPostReaction, PostReactionTypes } from 'src/api/reactionApi';
import moment from 'moment';
import { postPostComment } from 'src/api/commentApi';

export default defineComponent({
  name: 'ClubPostsPage',
  components: {},
  setup() {
    const onLoad = async () => {
      if (state.$club.clubSlugRouteParam.value) {
        await state.$club.loadClub();
        await state.$posts.loadPostList();
      }
    };

    onMounted(onLoad);

    watch(state.$club.clubSlugRouteParam, onLoad);

    const reactToPost = async (post: IPostView, reaction: PostReactionTypes) => {
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
    }

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

    return {
      // posts: postsView,
      posts: state.$posts.posts,

      reactToPost,
      submitComment,

      commentModels,

      helpers: {
        ago: (time: string, short = false) => {
          if (short) {
            return moment(time).fromNow(true)
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

      theme: {
        dark: true,
        background: {
          color: '#1D1F2B'
        },
        card: {
          color: '#273238'
        }
      }
    };
  }
});
</script>

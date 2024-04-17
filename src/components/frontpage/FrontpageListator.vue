<template>
  <div class='q-pa-md'>

    <q-carousel
      class='bg-transparent'
      swipeable
      animated
      v-model='slide'
      :autoplay='autoplay'
      ref='carousel'
      infinite
      style='height: auto; user-select: none;'
      @transition='onTransition'
    >
      <template
        v-for='post in postsView'
        v-bind:key='post.id'
      >
        <q-carousel-slide :name='post.id'>
          <h2
            style='font-size: 4vw; line-height: 6vw'
            class='col-12 text-center q-ma-none'
          >{{ post.text }}</h2>

          <div class='flex justify-between q-pt-md'>
            <div class='adaptive-padding-left'>
              <q-btn
                round dense icon='arrow_left'
                size='12px'
                class='clubButtonDisable q-mx-xs'
                @click='$refs.carousel.previous()'
              />
              <q-btn
                round dense icon='arrow_right'
                size='12px'
                class='clubButtonDisable q-mx-xs'
                @click='$refs.carousel.next()'
              />
              <q-circular-progress
                :value='progressValue'
                size='26px'
                class='q-mx-xs'
              />

            </div>

            <div class='text-right adaptive-padding-right'>
              <template
                v-for='(reaction, reactionSlug) in post.shownReactions'
                v-bind:key='reactionSlug'
              >
                <reaction-btn
                  :amount='reaction.value'
                  @click='onReactionClicked(post.id, reactionSlug)'
                >{{ reaction.emoji }}
                </reaction-btn>
              </template>

              <Transition name='fade'>
                <div v-if='showAll' style='display: inline-block'>
                  <template
                    v-for='(reaction, reactionSlug) in post.expandReactions'
                    v-bind:key='reactionSlug'
                  >
                    <reaction-btn
                      :amount='reaction.value'
                      @click='onReactionClicked(post.id, reactionSlug)'
                    >{{ reaction.emoji }}
                    </reaction-btn>
                  </template>
                </div>
              </Transition>

              <q-btn
                flat :class='{clubButtonActive: !showAll, clubButtonDisable: showAll, "q-ml-xs": true}'
                :icon='showAll ? "fa fa-chevron-right" : "fa fa-plus"'
                size='12px'
                dark-percentage dense round
                @click='showAll = !showAll'
              />
            </div>
          </div>
        </q-carousel-slide>
      </template>

      <!--      <template v-slot:control>-->
      <!--        <q-carousel-control-->
      <!--          position="bottom-left"-->
      <!--          class="q-gutter-xs adaptive-padding-right"-->
      <!--        >-->
      <!--          <q-btn-->
      <!--            round dense icon="arrow_left"-->
      <!--            size='12px'-->
      <!--            class='clubButtonDisable'-->
      <!--            @click="$refs.carousel.previous()"-->
      <!--          />-->
      <!--          <q-btn-->
      <!--            round dense icon="arrow_right"-->
      <!--            size='12px'-->
      <!--            class='clubButtonDisable'-->
      <!--            @click="$refs.carousel.next()"-->
      <!--          />-->
      <!--        </q-carousel-control>-->
      <!--      </template>-->
    </q-carousel>

    <q-slide-transition>
      <div
        v-if='showAll && !isLoggedIn'
        class='text-right adaptive-padding-right'
      >
        <div>
          <q-badge class='clubButtonDisable q-mb-md'>please verify your wallet</q-badge>
        </div>
        <div class='flex' style='flex-direction: row-reverse'>
          <div class='text-center'>
            <login-buttons
              :me-in-club='meInClub'
            />
          </div>
        </div>
      </div>
      <div
        v-else-if='showAll && isLoggedIn'
        class='text-right adaptive-padding-right'
      >
        <div class='flex' style='flex-direction: row-reverse'>
          <me-in-club-widget
            style='border-radius: 6px'
            :me-in-club='meInClub'
          />
        </div>
      </div>
    </q-slide-transition>
  </div>
</template>

<style>
.adaptive-padding-right {
  padding-right: 5vw
}

.adaptive-padding-left {
  padding-left: 5vw
}

.fade-enter-active,
.fade-leave-active {
  transform: translateX(30px);
  transition: all 0.33s;
}

.fade-enter,
.fade-leave-to {
  opacity: 0;
}

.fade-enter-to,
.fade-leave {
  transform: translateX(0);
}
</style>

<script lang='ts'>
import { computed, defineComponent, onMounted, onUnmounted, ref } from 'vue';
import LoginButtons from 'components/clubpage/LoginButtons.vue';
import { state } from 'src/state';
import MeInClubWidget from 'components/me/MeInClubWidget.vue';
import { postPostReaction, PostReactionTypes } from 'src/api/reactionApi';
import { getPostList, IPostView } from 'src/api/postApi';
import ReactionBtn from 'components/elements/ReactionBtn.vue';
import fromEntries from 'fromentries';

const reactionEmoji = {
  upvote: '👍',
  downvote: '👎',
  think: '🤔',
  fire: '🔥',
  heart: '❤️'
};
const reactionSlugs = Object.keys(reactionEmoji);

function getReactionEmoji(reaction: string) {
  return (reactionEmoji as Record<string, string>)[reaction];
}

export default defineComponent({
  components: { ReactionBtn, MeInClubWidget, LoginButtons },
  setup() {
    const showAll = ref(false);
    const posts = ref<Array<IPostView>>([]);
    const slide = ref<number>(0);
    const meInClub = state.$club.meInClub;

    const loadPosts = async () => {
      const clubPostsAppId = (state.$club.club.settings?.clubPostsCarouselAppId || '') as string;
      if (clubPostsAppId) {
        const response = await getPostList(state.$club.club.id, clubPostsAppId);
        posts.value = response.posts;
      }
    };

    const arraySample = <T>(arr: Array<T>) => {
      if (!arr || arr.length == 0) return null;
      return arr[Math.floor(Math.random() * arr.length)];
    };

    onMounted(async () => {
      await state.$club.loadClub({ background: true, redirect404: false });
      await loadPosts();
      slide.value = arraySample(posts.value)?.id || 0;
    });

    const isLoggedIn = computed(() => meInClub && meInClub?.isLoggedIn);

    const onReactionClicked = async (postId: number, reaction: string) => {
      if (!isLoggedIn.value) {
        // expand to show login form
        showAll.value = true;
      } else {
        await postPostReaction({ postId, reaction: reaction as PostReactionTypes });
        await loadPosts();
      }
    };

    const reactionView = (post: IPostView, reactionSlug: string) => {
      const reaction = post.reactions[reactionSlug];
      return {
        slug: reactionSlug,
        emoji: getReactionEmoji(reactionSlug),
        value: reaction || 0,
        isActive: post.myReactions[reactionSlug] > 0
      };
    };

    const postsView = computed(() => {
      return posts.value.map(item => {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        let shownReactions = fromEntries(reactionSlugs.map(v => {
          const reaction = item.reactions[v];
          if (reaction && reaction > 0) {
            return [v, reactionView(item, v)];
          } else {
            return null;
          }
        }).filter(v => v));

        // fallback, if no reactions yet
        if (Object.keys(shownReactions).length === 0) {
          shownReactions = {
            upvote: reactionView(item, 'upvote')
          };
        }

        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        const expandReactions = fromEntries(reactionSlugs.map(v => {
          if (!(v in shownReactions)) {
            return [v, reactionView(item, v)];
          } else {
            return null;
          }
        }).filter(v => v));

        return {
          ...item,
          shownReactions,
          expandReactions
        };
      });
    });

    const autoplay = computed(() => !showAll.value);

    const progressValue = ref(0);
    const tickMs = 50;
    const slideShowMs = 4500;
    const addPerTick = 100 * tickMs / slideShowMs;
    const progressInterval = setInterval(() => {
      if (autoplay.value) {
        progressValue.value = progressValue.value + addPerTick;
      } else {
        progressValue.value = 0;
      }
    }, tickMs);
    onUnmounted(() => {
      clearInterval(progressInterval);
    });

    const onTransition = () => {
      progressValue.value = 0;
    }

    return {
      meInClub,
      slide,
      progressValue,
      // autoplay: ref(false),
      autoplay,
      showAll,
      isLoggedIn,
      postsView,
      posts,
      // itemsView,
      onReactionClicked,
      onTransition,
    };
  }
});
</script>

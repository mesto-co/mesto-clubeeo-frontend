<template>
  <main class='q-page q-layout-padding flex justify-center items-start'>

    <div
      style='min-width: min(512px, 100vw)'
    >

      <div class='q-pb-md'>
        <q-btn
          :to='{name: "club"}'
          icon='fas fa-arrow-left'
          no-caps
          flat
          :style='{color: "rgba(255,255,255,0.7)"}'
          :dark-percentage='theme.dark'
        />
      </div>

      <q-card
        flat bordered
        style='width: 100%; border: 0'
        :style='{backgroundColor: theme.card.color}'
        :dark='theme.dark'
      >
        <q-card-section>
          <q-input
            v-model='post.post.text'
            type='textarea'
            placeholder='text'
            filled
            :dark='theme.dark'
          />
        </q-card-section>

        <q-card-section class='text-right row'>
          <div class='text-left col'>
            <q-btn
              flat dense
              color='pool'
              icon='fas fa-image'
            />
          </div>
          <div class='text-right col'>
            <q-btn
              unelevated
              color='pool'
              :disable='!club.isLoading'
              @click='onPostSubmit'
            ><strong>Post</strong></q-btn>
          </div>
        </q-card-section>
      </q-card>

    </div>

  </main>
</template>


<script lang='ts'>
import { defineComponent, onMounted } from 'vue';
import { state } from 'src/state';
import { Notify } from 'quasar';

export default defineComponent({
  name: 'NewPostPage',
  components: {},
  setup() {
    onMounted(async () => {
      await state.$club.loadClub();
    });

    const onPostSubmit = async () => {
      await state.$post.createPost();

      Notify.create({
        type: 'positive',
        message: `You've posted to ${state.$club.club.name}`
      });

      await state.$club.pushToClubRoot();
    };

    return {
      onPostSubmit,
      post: state.$post,
      club: state.$club,

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

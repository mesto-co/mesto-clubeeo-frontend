<template>
  <club-page header="Профиль" sticky="bottom" :loading="$profile.isLoading">
    <template v-slot:buttons>
      <div>
        <club-button
          class="clubButtonActive q-px-md q-mr-sm"
          dense
          @click="
            $router.push({
              name: 'club-dynamic-app-page',
              params: { appPage: 'edit' },
            })
          "
          >Редактировать</club-button
        >
      </div>
    </template>

    <div class="q-mb-md q-border-radius-md">
      <!-- Profile Header -->
      <div class="q-gutter-md q-pa-sm q-pt-md row no-wrap items-center">
        <!-- <q-avatar size="100px">
          <img
            :src="`https://api.multiavatar.com/${$profile.name || 'Pro'}.svg`"
          />
        </q-avatar> -->
        <div class="q-pl-md">
          <div class="text-h5">{{ $profile.name }}</div>
          <div class="text-subtitle1">{{ $profile.description }}</div>
          <div class="text-caption">{{ $profile.whoami }}</div>
          <!-- <div>
            <q-chip label="CEO Kutikuli" color="primary" text-color="white" />
            <q-chip
              label="Разработчик TypeScript"
              color="primary"
              text-color="white"
            />
          </div> -->
        </div>
      </div>

      <!-- Tags/Skills Section -->
      <div class="q-pa-md row">
        <profile-section label="Профессия" icon="fa-solid fa-briefcase" :items="$profile.professions" class="col" />
      </div>

      <q-separator dark inset />

      <div class="q-pa-md row">
        <profile-section label="Индустрия" icon="fa-solid fa-industry" :items="$profile.industries" class="col" />
      </div>

      <q-separator dark inset />

      <div class="q-pa-md row">
        <profile-section label="Навыки" icon="fa-solid fa-star" :items="$profile.skills" class="col" />
      </div>

      <q-separator dark inset />

      <!-- Experience Section -->
      <div class="q-pa-md row">
        <profile-section label="Работа" icon="fa-solid fa-briefcase" :items="$profile.workplaces" class="col" />
      </div>

      <q-separator dark inset />

      <div class="q-pa-md row">
        <profile-section
          label="Образование"
          icon="fa-solid fa-graduation-cap"
          :items="$profile.education"
          class="col"
        />
      </div>

      <q-separator dark inset />

      <!-- About Me Section -->
      <div class="q-pa-md">
        <!-- <q-card dark class="clubCard" flat>
          <q-card-section> -->
        <div class="text-right q-pb-md">
          Обо мне
          <q-icon name="fa-solid fa-user" class="q-px-sm" />
        </div>
        <div v-html="sanitizeHtmlAddBr($profile.aboutMe)" />
        <!-- </q-card-section>
        </q-card> -->
      </div>

      <q-separator dark inset />

      <!-- Project Section -->
      <div class="q-pa-md" v-if="$profile.project">
        <div class="text-right q-pb-md">
          О проекте
          <q-icon name="fa-solid fa-project-diagram" class="q-px-sm" />
        </div>

        <q-card dark class="clubCard" flat>
          <q-card-section>
            <div class="text-h6">{{ $profile.project.name }}</div>
            <div v-if="$profile.project.link">
              <a :href="$profile.project.link" target="_blank">{{ $profile.project.link }}</a>
            </div>

            <div class="q-py-md" v-html="sanitizeHtmlAddBr($profile.project.description)" />

            <div>
              <template v-for="status in $profile.project.statuses" :key="status">
                <q-chip color="orange" dense class="q-px-sm">{{ status }}</q-chip>
              </template>
            </div>
          </q-card-section>
        </q-card>
      </div>

      <!-- Social Media Links -->
      <!-- <div class="q-pa-md">
        <template
          v-for="socCode in Object.keys(socialsList)"
          v-bind:key="socCode"
        >
          <div class="q-pb-sm flex flex-center">
            <q-input
              :label="socCode"
              dark
              outlined
              style="width: 550px"
              v-model="socialLinks[socCode]"
              :rules="[
                (val) =>
                  !val ||
                  val.startsWith('https://') ||
                  'Should start with https://',
              ]"
            >
              <template v-slot:append>
                <q-avatar>
                  <q-icon :name="mapSocialToIcon(socCode)" size="sm" />
                </q-avatar>
              </template>
            </q-input>
          </div>
        </template> -->

      <!-- <div class="text-caption">Соц.сети:</div>
        <q-input
          filled
          dark
          v-model="socialLinks"
          placeholder="Ссылки на личные и публичные страницы"
        /> -->
      <!-- </div> -->
    </div>
  </club-page>
</template>

<script setup>
import { defineComponent, onMounted } from 'vue';
import ClubPage from '@components/clublayout/ClubPage.vue';
import ClubButton from '@components/clubpage/ClubButton.vue';
import { appProps } from '@apps/_common/appProps';
import { useProfileStore } from './profileStore';
import { sanitizeHtmlTelegram } from 'src/utils/sanitizeHtml';
import ProfileSection from './ProfileSection.vue';

defineComponent({
  components: { ClubPage, ClubButton, ProfileSection },
  props: appProps,
});

const $profile = useProfileStore();

// Fetch profile data when the component is mounted
onMounted(async () => {
  await $profile.fetchProfile();
});

const sanitizeHtmlAddBr = (messageText) => {
  return sanitizeHtmlTelegram(messageText).replace(/\n/g, '<br>');
};
</script>

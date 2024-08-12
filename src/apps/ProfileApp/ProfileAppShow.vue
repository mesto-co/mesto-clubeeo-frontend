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

    <div class="q-pa-md q-mb-md q-border-radius-md">
      <!-- Profile Header -->
      <div class="q-gutter-md q-pa-md row no-wrap items-center">
        <q-avatar size="100px">
          <img
            :src="`https://api.multiavatar.com/${$profile.name || 'Pro'}.svg`"
          />
        </q-avatar>
        <div>
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
        <div class="col">
          <q-expansion-item
            icon="fa-solid fa-briefcase"
            label="Профессия"
            default-opened
          >
            <q-chip
              v-for="profession in $profile.professions"
              :key="profession"
              :label="profession"
              class="q-mb-xs"
            />
          </q-expansion-item>
        </div>
      </div>

      <div class="q-pa-md row">
        <div class="col">
          <q-expansion-item
            icon="fa-solid fa-industry"
            label="Индустрия"
            default-opened
          >
            <q-chip
              v-for="industry in $profile.industries"
              :key="industry"
              :label="industry"
              class="q-mb-xs"
            />
          </q-expansion-item>
        </div>
      </div>

      <div class="q-pa-md row">
        <div class="col">
          <q-expansion-item
            icon="fa-solid fa-star"
            label="Навыки"
            default-opened
          >
            <q-chip
              v-for="skill in $profile.skills"
              :key="skill"
              :label="skill"
              class="q-mb-xs"
            />
          </q-expansion-item>
        </div>
      </div>

      <!-- Experience Section -->
      <div class="q-pa-md row">
        <div class="col">
          <q-expansion-item
            icon="fa-solid fa-briefcase"
            label="Работа"
            default-opened
          >
            <q-chip
              v-for="workplace in $profile.workplaces"
              :key="workplace"
              :label="workplace"
              class="q-mb-xs"
            />
          </q-expansion-item>
        </div>
      </div>
      <div class="q-pa-md row">
        <div class="col">
          <q-expansion-item
            icon="fa-solid fa-graduation-cap"
            label="Образование"
            default-opened
          >
            <q-chip
              v-for="educationItem in $profile.education"
              :key="educationItem"
              :label="educationItem"
              class="q-mb-xs"
            />
          </q-expansion-item>
        </div>
      </div>

      <!-- About Me Section -->
      <div class="q-pa-md">
        <q-card dark class="clubCard" flat>
          <q-card-section>
            <div class="text-h6">Обо мне:</div>
            <div v-html="sanitizeHtmlAddBr($profile.aboutMe)" />
          </q-card-section>
        </q-card>
      </div>

      <!-- Project Section -->
      <div class="q-pa-md" v-if="$profile.project">
        <q-card dark class="clubCard" flat>
          <q-card-section>
            <div class="text-h6">О проекте:</div>
            <div>
              <strong>Название:</strong>&nbsp; {{ $profile.project.name }}
            </div>
            <div>
              <strong>Ссылки:</strong>&nbsp;
              <a :href="$profile.project.link" target="_blank">{{
                $profile.project.link
              }}</a>
            </div>
            <div>
              <strong>Статус:</strong>
              <template
                v-for="status in $profile.project.statuses"
                :key="status"
              >
                <q-chip color="orange">{{ status }}</q-chip>
              </template>
            </div>
            <div><strong>Описание:</strong></div>
            <div v-html="sanitizeHtmlAddBr($profile.project.description)" />
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

defineComponent({
  components: { ClubPage, ClubButton },
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

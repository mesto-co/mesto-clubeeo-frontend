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
        <div class="q-pl-md">
          <div class="text-h5">{{ $profile.name }}</div>
          <div class="text-subtitle1">{{ $profile.description }}</div>
        </div>
      </div>

      <!-- About Me Section -->
      <div class="q-pa-md">
        <div class="text-right q-pb-md">
          Обо мне
          <q-icon name="fa-solid fa-user" class="q-px-sm" />
        </div>
        <div v-html="sanitizeHtmlAddBr($profile.aboutMe)" />
      </div>

      <q-separator dark inset />

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
      <div class="q-pa-md">
        <div class="text-right q-pb-md">
          Опыт работы
          <q-icon name="fa-solid fa-briefcase" class="q-px-sm" />
        </div>

        <div v-for="(workplace, index) in $profile.workplaces" :key="index" class="q-mb-md">
          <q-card dark class="clubCard" flat>
            <q-card-section>
              <div class="row q-col-gutter-md">
                <div class="col-12">
                  <div class="text-h6">{{ workplace.position }}</div>
                  <div class="text-subtitle1">{{ workplace.organization }}</div>
                  <div class="text-caption">
                    {{ formatDate(workplace.startDate) }} -
                    {{ workplace.current ? 'По настоящее время' : formatDate(workplace.endDate) }}
                  </div>

                  <div class="q-mt-sm" v-if="workplace.skills?.length">
                    <q-chip
                      v-for="skill in workplace.skills"
                      :key="skill"
                      dense
                      color="primary"
                      text-color="white"
                      class="q-ma-xs"
                    >
                      {{ skill }}
                    </q-chip>
                  </div>
                </div>
              </div>
            </q-card-section>
          </q-card>
        </div>
      </div>

      <q-separator dark inset />

      <!-- Education Section -->
      <div class="q-pa-md">
        <div class="text-right q-pb-md">
          Образование
          <q-icon name="fa-solid fa-graduation-cap" class="q-px-sm" />
        </div>

        <div v-for="(edu, index) in $profile.education" :key="index" class="q-mb-md">
          <q-card dark class="clubCard" flat>
            <q-card-section>
              <div class="row q-col-gutter-md">
                <div class="col-12">
                  <div class="text-h6">{{ edu.institution }}</div>
                  <div class="text-subtitle1">{{ edu.degree }}</div>
                  <div class="text-caption">{{ edu.startYear }} - {{ edu.endYear }}</div>
                </div>
              </div>
            </q-card-section>
          </q-card>
        </div>
      </div>

      <q-separator dark inset />

      <!-- Project Section -->
      <div class="q-pa-md">
        <div class="text-right q-pb-md">
          О проектах
          <q-icon name="fa-solid fa-project-diagram" class="q-px-sm" />
        </div>

        <div v-for="(project, index) in $profile.projects" :key="index" class="q-mb-md">
          <q-card dark class="clubCard" flat>
            <q-card-section>
              <div class="text-h6">{{ project.name }}</div>
              <div v-if="project.link">
                <a :href="project.link" target="_blank">{{ project.link }}</a>
              </div>

              <div class="q-py-md" v-html="sanitizeHtmlAddBr(project.description)" />

              <div>
                <template v-for="status in project.statuses" :key="status">
                  <q-chip color="orange" dense class="q-px-sm">{{ status }}</q-chip>
                </template>
              </div>
            </q-card-section>
          </q-card>
        </div>
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

const formatDate = (dateString) => {
  if (!dateString) return '';

  try {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('ru-RU', {
      year: 'numeric',
      month: 'long',
    }).format(date);
  } catch (e) {
    return dateString;
  }
};
</script>

<style scoped>
.text-h6 {
  font-size: 1.1rem;
  font-weight: 500;
}

.text-subtitle1 {
  font-size: 1rem;
  opacity: 0.8;
}

.text-caption {
  font-size: 0.9rem;
  opacity: 0.7;
}
</style>

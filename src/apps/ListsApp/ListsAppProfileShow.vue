<template>
  <div class="q-mb-md q-border-radius-md" v-if="profile">
    <!-- Profile Header -->
    <div class="q-gutter-md q-pa-sm q-pt-md row no-wrap items-center">
      <div class="q-pl-md">
        <div class="text-h5">{{ profile.name }}</div>
        <div class="text-subtitle1">{{ profile.description }}</div>
        <div class="text-caption">{{ profile.whoami }}</div>
      </div>
    </div>

    <!-- Tags/Skills Section -->
    <div class="q-pa-md row">
      <profile-section label="Профессия" icon="fa-solid fa-briefcase" :items="profile.professions" class="col" />
    </div>

    <q-separator dark inset />

    <div class="q-pa-md row">
      <profile-section label="Индустрия" icon="fa-solid fa-industry" :items="profile.industries" class="col" />
    </div>

    <q-separator dark inset />

    <div class="q-pa-md row">
      <profile-section label="Навыки" icon="fa-solid fa-star" :items="profile.skills" class="col" />
    </div>

    <q-separator dark inset />

    <!-- Experience Section -->
    <div class="q-pa-md row">
      <profile-section label="Работа" icon="fa-solid fa-briefcase" :items="profile.workplaces" class="col" />
    </div>

    <q-separator dark inset />

    <div class="q-pa-md row">
      <profile-section label="Образование" icon="fa-solid fa-graduation-cap" :items="profile.education" class="col" />
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
      <div v-html="sanitizeHtmlAddBr(profile.aboutMe)" />
      <!-- </q-card-section>
      </q-card> -->
    </div>

    <q-separator dark inset />

    <!-- Project Section -->
    <div class="q-pa-md" v-if="profile.project">
      <div class="text-right q-pb-md">
        О проекте
        <q-icon name="fa-solid fa-project-diagram" class="q-px-sm" />
      </div>

      <q-card dark class="clubCard" flat>
        <q-card-section>
          <div class="text-h6">{{ profile.project.name }}</div>
          <div v-if="profile.project.link">
            <a :href="profile.project.link" target="_blank">{{ profile.project.link }}</a>
          </div>

          <div class="q-py-md" v-html="sanitizeHtmlAddBr(profile.project.description)" />

          <div>
            <template v-for="status in profile.project.statuses" :key="status">
              <q-chip color="orange" dense class="q-px-sm">{{ status }}</q-chip>
            </template>
          </div>
        </q-card-section>
      </q-card>
    </div>
  </div>
  <q-loading :show="!profile" />
</template>

<script setup>
import { defineComponent } from 'vue';
import { sanitizeHtmlTelegram } from 'src/utils/sanitizeHtml';
import ProfileSection from '../ProfileApp/ProfileSection.vue';

defineComponent({
  components: { ProfileSection },
});

defineProps({
  profile: {
    type: Object,
    required: true,
  },
});

const sanitizeHtmlAddBr = (messageText) => {
  return sanitizeHtmlTelegram(messageText).replace(/\n/g, '<br>');
};
</script>

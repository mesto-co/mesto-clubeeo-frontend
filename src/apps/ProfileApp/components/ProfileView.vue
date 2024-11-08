<template>
  <div class="q-mb-md q-border-radius-md">
    <!-- Profile Header -->
    <div>
      <component :is="to ? 'router-link' : 'div'" :to="to" class="profile-header q-py-sm row no-wrap items-center">
        <div class="q-pl-md">
          <div class="text-h5">{{ profile.name }}</div>
          <div class="text-subtitle1">{{ profile.description }}</div>
        </div>
      </component>
    </div>

    <!-- About Me Section -->
    <template v-if="showAboutMe">
      <div class="q-pa-md">
        <div class="text-right q-pb-md">
          Обо мне
          <q-icon name="fa-solid fa-user" class="q-px-sm" />
        </div>
        <div v-html="sanitizeHtmlAddBr(profile.aboutMe)" />
      </div>
      <q-separator dark inset />
    </template>

    <!-- Tags/Skills Section -->
    <template v-if="showProfessions">
      <div class="q-pa-md row">
        <profile-section label="Профессия" icon="fa-solid fa-briefcase" :items="profile.professions" class="col" />
      </div>
      <q-separator dark inset />
    </template>

    <template v-if="showIndustries">
      <div class="q-pa-md row">
        <profile-section label="Индустрия" icon="fa-solid fa-industry" :items="profile.industries" class="col" />
      </div>
      <q-separator dark inset />
    </template>

    <template v-if="showSkills">
      <div class="q-pa-md row">
        <profile-section label="Навыки" icon="fa-solid fa-star" :items="profile.skills" class="col" />
      </div>
      <q-separator dark inset />
    </template>

    <!-- Experience Section -->
    <template v-if="showExperience">
      <div class="q-pa-md">
        <div class="text-right q-pb-md">
          Опыт работы
          <q-icon name="fa-solid fa-briefcase" class="q-px-sm" />
        </div>

        <div v-for="(workplace, index) in profile.workplaces" :key="index" class="q-mb-md">
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
    </template>

    <!-- Education Section -->
    <template v-if="showEducation">
      <div class="q-pa-md">
        <div class="text-right q-pb-md">
          Образование
          <q-icon name="fa-solid fa-graduation-cap" class="q-px-sm" />
        </div>

        <div v-for="(edu, index) in profile.education" :key="index" class="q-mb-md">
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
    </template>

    <!-- Project Section -->
    <template v-if="showProjects && profile.projects?.length">
      <div class="q-pa-md">
        <div class="text-right q-pb-md">
          О проектах
          <q-icon name="fa-solid fa-project-diagram" class="q-px-sm" />
        </div>

        <div v-for="(project, index) in profile.projects" :key="index" class="q-mb-md">
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
    </template>
  </div>
</template>

<script setup>
import { defineComponent } from 'vue';
import { sanitizeHtmlTelegram } from 'src/utils/sanitizeHtml';
import ProfileSection from '../ProfileSection.vue';

defineComponent({
  components: { ProfileSection },
});

defineProps({
  profile: {
    type: Object,
    required: true,
  },
  to: {
    type: [String, Object],
    default: null,
  },
  showAboutMe: {
    type: Boolean,
    default: true,
  },
  showProfessions: {
    type: Boolean,
    default: true,
  },
  showIndustries: {
    type: Boolean,
    default: true,
  },
  showSkills: {
    type: Boolean,
    default: true,
  },
  showExperience: {
    type: Boolean,
    default: true,
  },
  showEducation: {
    type: Boolean,
    default: true,
  },
  showProjects: {
    type: Boolean,
    default: true,
  },
});

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

const sanitizeHtmlAddBr = (messageText) => {
  return sanitizeHtmlTelegram(messageText).replace(/\n/g, '<br>');
};
</script>

<style scoped>
.profile-header {
  text-decoration: none;
  color: inherit;
  transition: background-color 0.3s;
}

.profile-header:hover {
  background-color: rgba(255, 255, 255, 0.07);
  cursor: pointer;
}

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

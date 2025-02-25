<template>
  <div class="q-mb-md q-border-radius-md">
    <!-- Profile Header -->
    <div>
      <component :is="to ? 'router-link' : 'div'" :to="to" class="profile-header q-py-sm row no-wrap items-center">
        <div class="q-pl-md">
          <user-avatar :user-id="profile.userId" size="100px" />
        </div>
        <div class="q-pl-md">
          <div class="text-h5">{{ profile.name }}</div>
          <div class="text-subtitle1">{{ profile.headline }}</div>
          <div class="text-caption" v-if="profile.location">
            <q-icon name="fa-solid fa-location-dot" /> {{ profile.location }}
          </div>
        </div>
      </component>
    </div>

    <template v-if="showSocialLinks && profile.socialLinks?.length">
      <profile-social-links :social-links="profile.socialLinks" />
    </template>

    <!-- About Me Section -->
    <template v-if="showAboutMe && profile.aboutMe">
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
    <template v-if="showProfessions && profile.professions?.length">
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

    <!-- Community Goals Section -->
    <template v-if="showCommunityGoals && profile.communityGoals?.length">
      <div class="q-pa-md">
        <div class="text-right q-pb-md">
          Цель в сообществе
          <q-icon name="fa-solid fa-bullseye" class="q-px-sm" />
        </div>
        <div class="row q-gutter-sm">
          <q-chip v-for="goal in profile.communityGoals" :key="goal" color="primary" text-color="white">
            {{ goal }}
          </q-chip>
        </div>
      </div>
      <q-separator dark inset />
    </template>

    <!-- Update Project Section -->
    <template v-if="showProjects && profile.projects?.length">
      <div class="q-pa-md">
        <div class="text-right q-pb-md">
          Проекты
          <q-icon name="fa-solid fa-project-diagram" class="q-px-sm" />
        </div>

        <div v-for="(project, index) in profile.projects" :key="index" class="q-mb-md">
          <q-card dark class="clubCard" flat>
            <q-card-section>
              <div class="row items-center q-mb-md">
                <div class="col-auto" v-if="project.logo">
                  <q-img :src="project.logo" width="50px" height="50px" />
                </div>
                <div class="col q-ml-md">
                  <div class="text-h6">{{ project.name }}</div>
                  <div class="text-caption">
                    Стадия: {{ projectStageLabel[project.stage] }} | Статус: {{ projectStatusLabel[project.status] }}
                  </div>
                </div>
              </div>

              <div v-if="project.website">
                <div class="text-caption">Сайт:</div>
                <a :href="project.website" target="_blank">{{ project.website }}</a>
              </div>

              <div class="q-py-md">
                <div class="text-caption">Идея проекта:</div>
                <div v-html="sanitizeHtmlAddBr(project.description)" />
              </div>

              <template v-if="project.pitchDeck || project.videoPitch">
                <div class="q-py-sm">
                  <template v-if="project.pitchDeck">
                    <div class="text-caption">Pitch Deck:</div>
                    <a :href="project.pitchDeck" target="_blank">Презентация проекта</a>
                  </template>
                  <template v-if="project.videoPitch">
                    <div class="text-caption">Video Pitch:</div>
                    <div class="video-container">
                      <!-- Add video embed component here -->
                    </div>
                  </template>
                </div>
              </template>

              <div class="q-py-sm">
                <div class="text-caption">Категория:</div>
                <q-chip color="primary" dense>{{ project.category }}</q-chip>
              </div>

              <div class="q-py-sm" v-if="project.tags?.length">
                <div class="text-caption">Тэги:</div>
                <q-chip v-for="tag in project.tags" :key="tag" color="secondary" dense>
                  {{ tag }}
                </q-chip>
              </div>

              <div class="q-py-sm" v-if="project.market">
                <div class="text-caption">Рынок:</div>
                {{ project.market }}
              </div>

              <div class="q-py-sm" v-if="project.needs?.length">
                <div class="text-caption">Запрос:</div>
                <q-chip v-for="need in project.needs" :key="need" color="orange" dense>
                  {{ need }}
                </q-chip>
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
import ProfileSocialLinks from './ProfileSocialLinks.vue';
import UserAvatar from './UserAvatar.vue';

defineComponent({
  components: {
    ProfileSection,
    ProfileSocialLinks,
    UserAvatar,
  },
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
  showCommunityGoals: {
    type: Boolean,
    default: true,
  },
  showSocialLinks: {
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

const projectStageLabel = {
  idea: 'Идея',
  mvp: 'MVP',
  first_sales: 'Есть первые продажи',
  invested: 'Получил инвестиции',
  operating_business: 'Действующий бизнес',
};

const projectStatusLabel = {
  active: 'Работает',
  paused: 'На паузе',
  closed: 'Закрыт',
  available: 'Отдам в добрые руки',
};
</script>

<style scoped>
.profile-header {
  text-decoration: none;
  color: inherit;
}

/* Only apply hover effects when it's a router-link */
a.profile-header {
  transition: background-color 0.3s;
}

a.profile-header:hover {
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

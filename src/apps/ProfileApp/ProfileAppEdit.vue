<template>
  <club-page sticky="bottom" :loading="$profile.isLoading">
    <template v-slot:buttons>
      <div>
        <club-button
          class="clubButtonGrey q-px-md q-mr-sm"
          dense
          @click="
            $router.push({
              name: 'club-dynamic-app',
              params: { appPage: '' },
            })
          "
          >Отменить</club-button
        >

        <template v-if="!$profile.roles.applicant && !$profile.roles.member && !$profile.roles.rejected">
          <club-button class="clubButtonActive q-px-md q-mr-sm" dense @click="onApply">Отправить заявку</club-button>
        </template>
        <template v-else>
          <club-button class="clubButtonActive q-px-md q-mr-sm" dense @click="onSaveProfile">Сохранить</club-button>
        </template>
      </div>
    </template>

    <div class="q-pa-sm q-border-radius-md">
      <!-- Profile Header -->
      <div class="q-pb-md no-wrap items-top q-col-gutter-md">
        <div class="row">
          <div class="col-12">
            <q-input outlined dark v-model="$profile.name" label="Имя" />
          </div>
        </div>
        <div class="row">
          <div class="col-12">
            <q-input outlined dark v-model="$profile.description" label="Описание" />
          </div>
        </div>
      </div>

      <!-- About Me Section -->
      <div class="q-pb-md">
        <q-card dark class="clubCard" flat>
          <q-card-section>
            <div class="text-h6">Обо мне:</div>
            <q-input type="textarea" outlined dark v-model="$profile.aboutMe" label="Описание" rows="5" />
          </q-card-section>
        </q-card>
      </div>

      <!-- Updated Skills Section -->
      <div class="q-py-md">
        <q-card dark class="clubCard" flat>
          <q-card-section>
            <div class="text-h6">Навыки</div>
            <div class="col q-mb-md">
              <ListsEngineSelect listType="professions" label="Профессия" v-model="$profile.professions" />
            </div>
            <div class="col q-mb-md">
              <ListsEngineSelect listType="activity-spheres" label="Индустрия" v-model="$profile.industries" />
            </div>
            <div class="col">
              <ListsEngineSelect
                listType="skills"
                label="Дополнительные навыки"
                v-model="$profile.skills"
                :options="allSkills"
              />
            </div>
          </q-card-section>
        </q-card>
      </div>

      <!-- Experience Section -->
      <div class="q-py-md">
        <q-card dark class="clubCard" flat>
          <q-card-section>
            <div class="text-h6">Опыт работы</div>
            <div v-for="(workplace, index) in $profile.workplaces" :key="index" class="q-mb-md">
              <div class="row q-col-gutter-md">
                <div class="col-12 col-md-6">
                  <q-input outlined dark v-model="workplace.organization" label="Организация" />
                </div>
                <div class="col-12 col-md-6">
                  <q-input outlined dark v-model="workplace.position" label="Должность" />
                </div>
                <div class="col-12 col-md-6">
                  <q-input
                    outlined
                    dark
                    v-model="workplace.startDate"
                    label="Дата начала"
                    mask="date"
                    :rules="['date']"
                  >
                    <template v-slot:append>
                      <q-icon name="event" class="cursor-pointer">
                        <q-popup-proxy cover transition-show="scale" transition-hide="scale">
                          <q-date v-model="workplace.startDate" mask="YYYY-MM-DD" dark today-btn>
                            <div class="row items-center justify-end">
                              <q-btn v-close-popup label="Закрыть" color="primary" flat />
                            </div>
                          </q-date>
                        </q-popup-proxy>
                      </q-icon>
                    </template>
                  </q-input>
                </div>
                <div class="col-12 col-md-6">
                  <q-input
                    outlined
                    dark
                    v-model="workplace.endDate"
                    label="Дата окончания"
                    mask="date"
                    :rules="['date']"
                    :disable="workplace.current"
                  >
                    <template v-slot:append>
                      <q-icon name="event" class="cursor-pointer">
                        <q-popup-proxy cover transition-show="scale" transition-hide="scale">
                          <q-date v-model="workplace.endDate" mask="YYYY-MM-DD" dark today-btn>
                            <div class="row items-center justify-end">
                              <q-btn v-close-popup label="Закрыть" color="primary" flat />
                            </div>
                          </q-date>
                        </q-popup-proxy>
                      </q-icon>
                    </template>
                  </q-input>
                  <q-checkbox
                    dark
                    v-model="workplace.current"
                    label="По настоящее время"
                    @update:model-value="onCurrentWorkplaceToggle(workplace)"
                  />
                </div>
                <div class="col-12">
                  <ListsEngineSelect listType="skills" label="Навыки" v-model="workplace.skills" />
                </div>
              </div>
              <q-btn flat color="negative" @click="removeWorkplace(index)" label="Удалить" class="q-mt-sm" />
            </div>
            <q-btn outline color="primary" @click="addWorkplace" label="Добавить место работы" class="q-mt-sm" />
          </q-card-section>
        </q-card>
      </div>

      <!-- Education Section -->
      <div class="q-py-md">
        <q-card dark class="clubCard" flat>
          <q-card-section>
            <div class="text-h6">Образование</div>
            <div v-for="(edu, index) in $profile.education" :key="index" class="q-mb-md">
              <div class="row q-col-gutter-md">
                <div class="col-12 col-md-6">
                  <q-input outlined dark v-model="edu.institution" label="Учебное заведение" />
                </div>
                <div class="col-12 col-md-6">
                  <q-input outlined dark v-model="edu.degree" label="Специальность/степень" />
                </div>
                <div class="col-12 col-md-6">
                  <q-input outlined dark v-model="edu.startYear" label="Год начала" mask="####">
                    <template v-slot:append>
                      <q-icon name="event" class="cursor-pointer">
                        <q-popup-proxy cover transition-show="scale" transition-hide="scale">
                          <q-date
                            v-model="edu.startYear"
                            minimal
                            mask="YYYY"
                            default-view="Years"
                            emit-immediately
                            navigation-min-year="1950"
                            navigation-max-year="2030"
                            dark
                            @click:year="(year) => (edu.startYear = year)"
                            v-close-popup
                          />
                        </q-popup-proxy>
                      </q-icon>
                    </template>
                  </q-input>
                </div>
                <div class="col-12 col-md-6">
                  <q-input outlined dark v-model="edu.endYear" label="Год окончания" mask="####">
                    <template v-slot:append>
                      <q-icon name="event" class="cursor-pointer">
                        <q-popup-proxy cover transition-show="scale" transition-hide="scale">
                          <q-date
                            v-model="edu.endYear"
                            minimal
                            mask="YYYY"
                            default-view="Years"
                            emit-immediately
                            navigation-min-year="1950"
                            navigation-max-year="2030"
                            dark
                            @click:year="(year) => (edu.endYear = year)"
                            v-close-popup
                          />
                        </q-popup-proxy>
                      </q-icon>
                    </template>
                  </q-input>
                </div>
              </div>
              <q-btn flat color="negative" @click="removeEducation(index)" label="Удалить" class="q-mt-sm" />
            </div>
            <q-btn outline color="primary" @click="addEducation" label="Добавить образование" class="q-mt-sm" />
          </q-card-section>
        </q-card>
      </div>

      <!-- Project Section -->
      <div class="q-py-md">
        <q-card dark class="clubCard" flat>
          <q-card-section>
            <div class="text-h6">О проектах</div>
            <div v-for="(project, index) in $profile.projects" :key="index" class="q-mb-md">
              <div class="row q-col-gutter-md">
                <div class="col-12">
                  <q-input outlined dark v-model="project.name" label="Название" />
                </div>
                <div class="col-12">
                  <q-input outlined dark v-model="project.link" label="Ссылка на проект" />
                </div>
                <div class="col-12">
                  <q-select
                    outlined
                    dark
                    v-model="project.statuses"
                    use-input
                    use-chips
                    multiple
                    hide-dropdown-icon
                    input-debounce="0"
                    new-value-mode="add-unique"
                    :options="['MVP', 'Ищу кофаундера', 'Ищу инвестиции']"
                    label="Статус"
                  />
                </div>
                <div class="col-12">
                  <q-input type="textarea" outlined dark v-model="project.description" label="Описание" rows="5" />
                </div>
              </div>
              <q-btn flat color="negative" @click="removeProject(index)" label="Удалить" class="q-mt-sm" />
            </div>
            <q-btn outline color="primary" @click="addProject" label="Добавить проект" class="q-mt-sm" />
          </q-card-section>
        </q-card>
      </div>

      <!-- Social Media Links -->
      <div class="q-py-md" style="display: none">
        <template v-for="socCode in Object.keys(socialsList)" v-bind:key="socCode">
          <div class="q-pb-sm flex flex-center">
            <q-input
              :label="socCode"
              dark
              outlined
              style="width: 550px"
              v-model="socialLinks[socCode]"
              :rules="[(val) => !val || val.startsWith('https://') || 'Should start with https://']"
            >
              <template v-slot:append>
                <q-avatar>
                  <q-icon :name="mapSocialToIcon(socCode)" size="sm" />
                </q-avatar>
              </template>
            </q-input>
          </div>
        </template>

        <!-- <div class="text-caption">Соц.сети:</div>
        <q-input
          filled
          dark
          v-model="socialLinks"
          placeholder="Ссылки на личные и публичные страницы"
        /> -->
      </div>
    </div>
  </club-page>
</template>

<script setup>
import { defineComponent, onMounted, ref, computed } from 'vue';
import { useRouter } from 'vue-router';
import { useQuasar } from 'quasar';
import ClubPage from '@components/clublayout/ClubPage.vue';
import ClubButton from '@components/clubpage/ClubButton.vue';
import { appProps } from '@apps/_common/appProps';
import { useProfileStore } from './profileStore';
import ListsEngineSelect from 'engines/lists/ListsEngineSelect.vue';

defineComponent({
  props: appProps,
});

const $profile = useProfileStore();
const $router = useRouter();
const $q = useQuasar();

// Fetch profile data when the component is mounted
onMounted(async () => {
  await $profile.fetchProfile();
});

const onError = (error) => {
  $q.notify({
    message: error.message,
    color: 'negative',
  });
};

const pushSuccessAndNotify = (message) => {
  $q.notify({
    message,
    color: 'positive',
  });

  $router.push({
    name: 'club-dynamic-app',
    params: { appPage: '' },
  });
};

const onApply = async () => {
  await $profile.saveProfile({
    onSuccess() {
      $profile.apply({
        onSuccess() {
          pushSuccessAndNotify('Заявка успешно отправлена');
        },
        onError,
      });
    },
    onError,
  });
};

const onSaveProfile = async () => {
  await $profile.saveProfile({
    onSuccess() {
      pushSuccessAndNotify('Профиль успешно сохранен');
    },
    onError,
  });
};

const socialsList = {
  web: 'web',
  telegram: 'telegram',
  linkedin: 'linkedin',
  twitter: 'twitter',
  youtube: 'youtube',
  facebook: 'facebook',
  tiktok: 'tiktok',
  discord: 'discord',
  instagram: 'instagram',
  reddit: 'reddit',
};

const socialToIconMap = {
  web: 'fa-solid fa-globe',
  telegram: 'fa-brands fa-telegram',
  linkedin: 'fa-brands fa-linkedin',
  twitter: 'fa-brands fa-twitter',
  youtube: 'fa-brands fa-youtube',
  facebook: 'fa-brands fa-facebook',
  tiktok: 'fa-brands fa-tiktok',
  instagram: 'fa-brands fa-instagram',
  discord: 'fa-brands fa-discord',
  reddit: 'fa-brands fa-reddit',
};

const mapSocialToIcon = (code) => {
  return socialToIconMap[code];
};

const socialLinks = ref({
  web: '',
  telegram: '',
  linkedin: '',
  twitter: '',
  youtube: '',
  facebook: '',
  tiktok: '',
  discord: '',
  instagram: '',
  reddit: '',
});

const allSkills = computed(() => {
  const workplaceSkills = $profile.workplaces?.flatMap((w) => w.skills || []) || [];
  return [...new Set([...workplaceSkills, ...($profile.skills || [])])];
});

const onCurrentWorkplaceToggle = (workplace) => {
  if (workplace.current) {
    workplace.endDate = '';
  }
};

const addWorkplace = () => {
  if (!Array.isArray($profile.workplaces)) {
    $profile.workplaces = [];
  }
  $profile.workplaces.push({
    organization: '',
    position: '',
    startDate: '',
    endDate: '',
    current: false,
    skills: [],
  });
};

const removeWorkplace = (index) => {
  $profile.workplaces.splice(index, 1);
};

const addEducation = () => {
  if (!Array.isArray($profile.education)) {
    $profile.education = [];
  }
  $profile.education.push({
    institution: '',
    degree: '',
    startYear: '',
    endYear: '',
  });
};

const removeEducation = (index) => {
  $profile.education.splice(index, 1);
};

const addProject = () => {
  if (!Array.isArray($profile.projects)) {
    $profile.projects = [];
  }
  $profile.projects.push({
    name: '',
    link: '',
    description: '',
    statuses: [],
  });
};

const removeProject = (index) => {
  $profile.projects.splice(index, 1);
};
</script>

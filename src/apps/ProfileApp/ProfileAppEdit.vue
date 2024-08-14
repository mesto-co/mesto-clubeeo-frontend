<template>
  <club-page header="Профиль" sticky="bottom" :loading="false">
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

        <club-button class="clubButtonActive q-px-md q-mr-sm" dense @click="onSaveProfile">Сохранить</club-button>
      </div>
    </template>

    <div class="q-pa-sm q-border-radius-md">
      <!-- Profile Header -->
      <div class="q-pb-md row no-wrap items-top">
        <!-- <q-avatar size="100px" class="q-py-md">
          <img
            :src="`https://api.multiavatar.com/${$profile.name || 'Pro'}.svg`"
          />
        </q-avatar> -->
        <div class="row q-gutter-md">
          <div class="col-12">
            <q-input outlined dark v-model="$profile.name" label="Имя" />
          </div>
          <div class="col-12">
            <q-input outlined dark v-model="$profile.description" label="Описание" />
          </div>
          <div class="col-12">
            <q-input outlined dark v-model="$profile.whoami" label="Самоидентификация" />
          </div>
        </div>
      </div>

      <!-- Tags/Skills Section -->
      <div class="q-pb-md row">
        <div class="col">
          <q-select
            label="Профессия"
            outlined
            dark
            v-model="$profile.professions"
            use-input
            use-chips
            multiple
            hide-dropdown-icon
            input-debounce="0"
            new-value-mode="add-unique"
            :options="['Разработчик', 'Тимлид', 'Продавец']"
          />
        </div>
      </div>

      <div class="q-pb-md row">
        <div class="col">
          <q-select
            label="Индустрия"
            outlined
            dark
            v-model="$profile.industries"
            use-input
            use-chips
            multiple
            hide-dropdown-icon
            input-debounce="0"
            new-value-mode="add-unique"
            :options="[]"
          />
        </div>
      </div>

      <div class="q-pb-md row">
        <div class="col">
          <q-select
            label="Навыки"
            outlined
            dark
            v-model="$profile.skills"
            use-input
            use-chips
            multiple
            hide-dropdown-icon
            input-debounce="0"
            new-value-mode="add-unique"
            :options="[]"
          />
        </div>
      </div>

      <!-- Experience Section -->
      <div class="q-pb-md row">
        <div class="col">
          <q-select
            label="Работа"
            outlined
            dark
            v-model="$profile.workplaces"
            use-input
            use-chips
            multiple
            hide-dropdown-icon
            input-debounce="0"
            new-value-mode="add-unique"
            :options="[]"
          />
        </div>
      </div>
      <div class="q-pb-md row">
        <div class="col">
          <q-select
            label="Образование"
            outlined
            dark
            v-model="$profile.education"
            use-input
            use-chips
            multiple
            hide-dropdown-icon
            input-debounce="0"
            new-value-mode="add-unique"
            :options="[]"
          />
        </div>
      </div>

      <!-- About Me Section -->
      <div class="q-py-md">
        <q-card dark class="clubCard" flat>
          <q-card-section>
            <div class="text-h6">Обо мне:</div>
            <q-input type="textarea" outlined dark v-model="$profile.aboutMe" label="Описание" rows="5" />
          </q-card-section>
        </q-card>
      </div>

      <!-- Project Section -->
      <div class="q-py-md" v-if="$profile.project">
        <q-card dark class="clubCard" flat>
          <q-card-section>
            <div class="text-h6">О проекте:</div>
            <q-input outlined dark v-model="$profile.project.name" label="Название" class="q-mb-md" />
            <q-input outlined dark v-model="$profile.project.link" label="Ссылка на проект" class="q-mb-md" />
            <q-select
              outlined
              dark
              v-model="$profile.project.statuses"
              use-input
              use-chips
              multiple
              hide-dropdown-icon
              input-debounce="0"
              new-value-mode="add-unique"
              :options="['MVP', 'Ищу кофаундера', 'Ищу инвестиции']"
              label="Статус"
              class="q-mb-md"
            />
            <q-input type="textarea" outlined dark v-model="$profile.project.description" label="Описание" rows="5" />
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
import { defineComponent, onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';
import { useQuasar } from 'quasar';
import ClubPage from '@components/clublayout/ClubPage.vue';
import ClubButton from '@components/clubpage/ClubButton.vue';
import { appProps } from '@apps/_common/appProps';
import { useProfileStore } from './profileStore';
// import CSelect from '@components/elements/CSelect.vue';

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

const onSaveProfile = async () => {
  await $profile.saveProfile({
    onSuccess() {
      $q.notify({
        message: 'Профиль успешно сохранен',
        color: 'positive',
      });

      $router.push({
        name: 'club-dynamic-app',
        params: { appPage: '' },
      });
    },
    onError(error) {
      $q.notify({
        message: error.message,
        color: 'negative',
      });
    },
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
</script>
